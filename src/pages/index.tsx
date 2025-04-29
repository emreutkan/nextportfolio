import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [activeNav, setActiveNav] = useState('home')
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

    const sectionRefs = useRef<(HTMLElement | null)[]>([])
    const sections = ['home', 'projects', 'about', 'certificates', 'contact']

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setActiveNav(sectionId)
        }
    }

    const handleScroll = () => {
        const pageYOffset = window.pageYOffset
        let newIndex = 0

        sections.forEach((section, index) => {
            const element = document.getElementById(section)
            if (element) {
                const offsetTop = element.offsetTop - 100

                if (pageYOffset >= offsetTop) {
                    newIndex = index
                    setActiveNav(section)

                    const sectionElement = sectionRefs.current[index]
                    if (sectionElement && !sectionElement.classList.contains(styles.visible)) {
                        sectionElement.classList.add(styles.visible)
                    }
                }
            }
        })

        setCurrentSectionIndex(newIndex)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        sectionRefs.current = sections.map(section => document.getElementById(section))

        setTimeout(() => {
            handleScroll()
        }, 100)

        return () => window.removeEventListener('scroll', handleScroll)
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

            <header className={styles.header}>
                <div className={styles.logo}>DevPortfolio</div>
                <nav className={styles.nav}>
                    <a href="#projects" onClick={() => scrollToSection('projects')} className={activeNav === 'projects' ? styles.active : ''}>Projects</a>
                    <a href="#about" onClick={() => scrollToSection('about')} className={activeNav === 'about' ? styles.active : ''}>About</a>
                    <a href="#certificates" onClick={() => scrollToSection('certificates')} className={activeNav === 'certificates' ? styles.active : ''}>Certificates</a>
                    <a href="#contact" onClick={() => scrollToSection('contact')} className={activeNav === 'contact' ? styles.active : ''}>Contact</a>
                </nav>
            </header>

            <section id="home" className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>Software Engineer & Full-Stack Developer</h1>
                        <p className={styles.heroSubtitle}>Crafting digital experiences through code and creativity</p>
                        <div className={styles.heroButtons}>
                            <button className={styles.primaryButton}>Download CV</button>
                            <button className={styles.secondaryButton} onClick={() => scrollToSection('projects')}>View Projects</button>
                        </div>
                    </div>
                    <div className={styles.heroImage}>
                        <div className={styles.avatarContainer}>
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={styles.avatar}>
                                <circle cx="100" cy="100" r="80" fill="#F0F0F0" />
                                <circle cx="70" cy="80" r="10" fill="#333" />
                                <circle cx="130" cy="80" r="10" fill="#333" />
                                <path d="M 70 120 Q 100 150 130 120" stroke="#333" strokeWidth="5" fill="none" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" className={`${styles.section} ${styles.visible}`}>
                <div className={styles.sectionContent}>
                    <h2 className={styles.sectionTitle}>Featured Projects</h2>
                    <div className={styles.featuredProjects}>
                        <Link href="/projects" className={styles.viewAllProjects}>
                            View All Projects
                        </Link>
                        <div className={styles.projectHighlights}>
                            <div className={styles.projectPreview}>
                                <div className={styles.projectIcon}>
                                    <svg viewBox="0 0 24 24" width="48" height="48">
                                        <rect width="18" height="22" x="3" y="1" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                                        <line x1="8" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                                        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
                                        <line x1="8" y1="18" x2="12" y2="18" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>Mobile App - HealthTracker</h3>
                                <p>A comprehensive health monitoring application built with React Native</p>
                                <div className={styles.technologies}>
                                    <span className={styles.tech}>React Native</span>
                                    <span className={styles.tech}>Firebase</span>
                                    <span className={styles.tech}>Redux</span>
                                </div>
                                <Link href="/projects?id=1" className={styles.projectLink}>
                                    View Details <span className={styles.arrow}>→</span>
                                </Link>
                            </div>
                            <div className={styles.projectPreview}>
                                <div className={styles.projectIcon}>
                                    <svg viewBox="0 0 24 24" width="48" height="48">
                                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                        <path d="M2 12h20M12 2a15 15 0 0 1 0 20" fill="none" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>E-Commerce Platform</h3>
                                <p>Full-stack e-commerce solution with advanced features</p>
                                <div className={styles.technologies}>
                                    <span className={styles.tech}>Next.js</span>
                                    <span className={styles.tech}>MongoDB</span>
                                    <span className={styles.tech}>Stripe</span>
                                </div>
                                <Link href="/projects?id=2" className={styles.projectLink}>
                                    View Details <span className={styles.arrow}>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className={`${styles.section} ${styles.visible}`}>
                <div className={styles.sectionContent}>
                    <h2 className={styles.sectionTitle}>About Me</h2>
                    <div className={styles.aboutContent}>
                        <div className={styles.aboutText}>
                            <p>I&#39;m a passionate software engineer specializing in frontend and full-stack development with expertise in modern web technologies.</p>
                            <p>With a focus on creating user-centric experiences, I blend technical skills with creative problem-solving to build efficient and scalable applications.</p>
                            <h3>Skills</h3>
                            <div className={styles.skillGrid}>
                                <div className={styles.skillCategory}>
                                    <h4>Frontend</h4>
                                    <ul className={styles.skillList}>
                                        <li>React / Next.js</li>
                                        <li>TypeScript</li>
                                        <li>CSS Modules / SASS</li>
                                        <li>Responsive Design</li>
                                    </ul>
                                </div>
                                <div className={styles.skillCategory}>
                                    <h4>Backend</h4>
                                    <ul className={styles.skillList}>
                                        <li>Node.js</li>
                                        <li>Express</li>
                                        <li>REST APIs</li>
                                        <li>GraphQL</li>
                                    </ul>
                                </div>
                                <div className={styles.skillCategory}>
                                    <h4>Database</h4>
                                    <ul className={styles.skillList}>
                                        <li>MongoDB</li>
                                        <li>PostgreSQL</li>
                                        <li>Firebase</li>
                                        <li>Redis</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="certificates" className={`${styles.section} ${styles.visible}`}>
                <div className={styles.sectionContent}>
                    <h2 className={styles.sectionTitle}>Certificates</h2>
                    <div className={styles.certificatesGrid}>
                        <div className={styles.certificateCard}>
                            <div className={styles.certificateIcon}>
                                <svg viewBox="0 0 24 24" width="36" height="36">
                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor" />
                                    <path d="M19 6H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <div className={styles.certificateContent}>
                                <h3>Advanced React & Redux</h3>
                                <p>Udemy</p>
                                <span className={styles.certificateDate}>2023</span>
                            </div>
                        </div>
                        <div className={styles.certificateCard}>
                            <div className={styles.certificateIcon}>
                                <svg viewBox="0 0 24 24" width="36" height="36">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <div className={styles.certificateContent}>
                                <h3>Full-Stack Web Development</h3>
                                <p>Coursera</p>
                                <span className={styles.certificateDate}>2022</span>
                            </div>
                        </div>
                        <div className={styles.certificateCard}>
                            <div className={styles.certificateIcon}>
                                <svg viewBox="0 0 24 24" width="36" height="36">
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className={styles.certificateContent}>
                                <h3>UI/UX Design Fundamentals</h3>
                                <p>Interaction Design Foundation</p>
                                <span className={styles.certificateDate}>2021</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className={`${styles.section} ${styles.visible}`}>
                <div className={styles.sectionContent}>

                    <div className={styles.socialLinks}>
                        <a href="#" className={styles.socialLink}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </a>
                        <a href="#" className={styles.socialLink}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" strokeWidth="2" />
                                <rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
                                <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>© {new Date().getFullYear()} DevPortfolio. All rights reserved.</p>
                    <div className={styles.footerNav}>
                        <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
                        <a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a>
                        <a href="#about" onClick={() => scrollToSection('about')}>About</a>
                        <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
                    </div>
                </div>
            </footer>

            <div className={styles.scrollIndicator}>
                <div className={styles.scrollButtons}>
                    <button aria-label="Previous section" onClick={navigateToPreviousSection}>
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button aria-label="Next section" onClick={navigateToNextSection}>
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}