import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import About from '../components/About'
import Certificates from '../components/Certificates'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollIndicator from '../components/ScrollIndicator'

export default function Home() {
    const [activeNav, setActiveNav] = useState('home')
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const [visibleSections, setVisibleSections] = useState<{[key: string]: boolean}>({
        home: true,
        projects: false,
        about: false,
        certificates: false,
        contact: false
    })

    const sectionRefs = useRef<(HTMLElement | null)[]>([])
    const sections = ['home', 'projects', 'about', 'certificates', 'contact']
    const lastScrollTime = useRef<number>(0)
    const scrollCooldown = 1000

    const scrollToSection = (sectionId: string) => {
        if (isScrolling) return

        setIsScrolling(true)
        const element = document.getElementById(sectionId)
        if (element) {
            const headerOffset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })

            setActiveNav(sectionId)

            const sectionIndex = sections.findIndex(section => section === sectionId)
            if (sectionIndex !== -1) {
                setCurrentSectionIndex(sectionIndex)

                const newVisibleSections = {...visibleSections}
                Object.keys(newVisibleSections).forEach(key => {
                    newVisibleSections[key] = key === sectionId
                })
                setVisibleSections(newVisibleSections)
            }

            setTimeout(() => {
                setIsScrolling(false)
            }, scrollCooldown)
        } else {
            setIsScrolling(false)
        }
    }

    const calculateScrollProgress = () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrolled = (window.scrollY / windowHeight) * 100
        setScrollProgress(scrolled)
    }

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault()

        const now = Date.now()
        if (now - lastScrollTime.current < scrollCooldown || isScrolling) {
            return
        }

        lastScrollTime.current = now

        if (e.deltaY > 0) {
            navigateToNextSection()
        } else {
            navigateToPreviousSection()
        }
    }

    useEffect(() => {
        const wheelListener = (e: WheelEvent) => handleWheel(e)
        window.addEventListener('wheel', wheelListener, { passive: false })

        sectionRefs.current = sections.map(section => document.getElementById(section))

        calculateScrollProgress()

        window.addEventListener('resize', calculateScrollProgress)

        setTimeout(() => {
            const firstSection = document.getElementById('home')
            if (firstSection) {
                const newVisibleSections = {...visibleSections}
                newVisibleSections.home = true
                setVisibleSections(newVisibleSections)
            }
        }, 100)

        return () => {
            window.removeEventListener('wheel', wheelListener)
            window.removeEventListener('resize', calculateScrollProgress)
        }
    }, [isScrolling])

    const navigateToPreviousSection = () => {
        if (currentSectionIndex > 0 && !isScrolling) {
            const prevSection = sections[currentSectionIndex - 1]
            scrollToSection(prevSection)
        }
    }

    const navigateToNextSection = () => {
        if (currentSectionIndex < sections.length - 1 && !isScrolling) {
            const nextSection = sections[currentSectionIndex + 1]
            scrollToSection(nextSection)
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (isScrolling) return

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault()
            navigateToNextSection()
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault()
            navigateToPreviousSection()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [currentSectionIndex, isScrolling])

    return (
        <div className={styles.container}>
            <Head>
                <title>DevPortfolio</title>
                <meta name="description" content="Developer portfolio website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header activeNav={activeNav} scrollToSection={scrollToSection} />
            <Hero scrollToSection={scrollToSection} />
            <Projects ref={el => sectionRefs.current[1] = el} isVisible={visibleSections.projects} />
            <About ref={el => sectionRefs.current[2] = el} isVisible={visibleSections.about} />
            <Certificates ref={el => sectionRefs.current[3] = el} isVisible={visibleSections.certificates} />
            <Contact ref={el => sectionRefs.current[4] = el} isVisible={visibleSections.contact} />
            <Footer scrollToSection={scrollToSection} />

            <ScrollIndicator
                scrollProgress={scrollProgress}
                navigateToPreviousSection={navigateToPreviousSection}
                navigateToNextSection={navigateToNextSection}
            />
        </div>
    )
}