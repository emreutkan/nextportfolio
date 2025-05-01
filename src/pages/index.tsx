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

    const sectionRefs = useRef<(HTMLElement | null)[]>([])
    const sections = ['home', 'projects', 'about', 'certificates', 'contact']

    const scrollToSection = (sectionId: string) => {
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
        }
    }

    const handleScroll = () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrolled = (window.scrollY / windowHeight) * 100
        setScrollProgress(scrolled)

        const pageYOffset = window.pageYOffset
        let newIndex = 0

        sections.forEach((section, index) => {
            const element = document.getElementById(section)
            if (element) {
                const rect = element.getBoundingClientRect()
                const offsetTop = element.offsetTop - 100

                if (rect.top < window.innerHeight * 0.8) {
                    const sectionElement = sectionRefs.current[index]
                    if (sectionElement && !sectionElement.classList.contains(styles.visible)) {
                        sectionElement.classList.add(styles.visible)
                    }
                }

                if (pageYOffset >= offsetTop) {
                    newIndex = index
                    setActiveNav(section)
                }
            }
        })

        setCurrentSectionIndex(newIndex)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)

        sectionRefs.current = sections.map(section => document.getElementById(section))

        setTimeout(() => {
            handleScroll()

            const firstSection = sectionRefs.current[0]
            if (firstSection && !firstSection.classList.contains(styles.visible)) {
                firstSection.classList.add(styles.visible)
            }
        }, 100)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    const navigateToPreviousSection = () => {
        if (currentSectionIndex > 0) {
            const prevSection = sections[currentSectionIndex - 1]
            scrollToSection(prevSection)
        }
    }

    const navigateToNextSection = () => {
        if (currentSectionIndex < sections.length - 1) {
            const nextSection = sections[currentSectionIndex + 1]
            scrollToSection(nextSection)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>DevPortfolio</title>
                <meta name="description" content="Developer portfolio website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header activeNav={activeNav} scrollToSection={scrollToSection} />
            <Hero scrollToSection={scrollToSection} />
            <Projects ref={el => sectionRefs.current[1] = el} />
            <About ref={el => sectionRefs.current[2] = el} />
            <Certificates ref={el => sectionRefs.current[3] = el} />
            <Contact ref={el => sectionRefs.current[4] = el} />
            <Footer scrollToSection={scrollToSection} />

            <ScrollIndicator
                scrollProgress={scrollProgress}
                navigateToPreviousSection={navigateToPreviousSection}
                navigateToNextSection={navigateToNextSection}
            />
        </div>
    )
}