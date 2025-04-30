import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [activeNav, setActiveNav] = useState('home')
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const sectionRefs = useRef<(HTMLElement | null)[]>([])
    const sections = ['home', 'projects', 'about', 'certificates', 'contact']
    const sunRef = useRef<SVGSVGElement>(null)
    const sunlightRef = useRef<SVGPathElement>(null)

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

    const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)
        window.addEventListener('mousemove', handleMouseMove)

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
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    useEffect(() => {
        const updateSunlight = () => {
            if (sunlightRef.current && sunRef.current) {
                const heroSection = document.getElementById('home');
                if (heroSection) {
                    const rect = heroSection.getBoundingClientRect();
                    const sunRect = sunRef.current.getBoundingClientRect();

                    const sunCenterX = sunRect.left + sunRect.width / 2 - rect.left;
                    const sunCenterY = sunRect.top + sunRect.height / 2 - rect.top;

                    const x = mousePosition.x - rect.left;
                    const y = mousePosition.y - rect.top;

                    const angle = Math.atan2(y - sunCenterY, x - sunCenterX);
                    const length = 500;

                    const endX = sunCenterX + Math.cos(angle) * length;
                    const endY = sunCenterY + Math.sin(angle) * length;

                    sunlightRef.current.setAttribute('d', `M${sunCenterX},${sunCenterY} L${endX},${endY}`);
                }
            }
        };

        updateSunlight();
    }, [mousePosition]);

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
                    <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className={activeNav === 'projects' ? styles.active : ''}>Projects</a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className={activeNav === 'about' ? styles.active : ''}>About</a>
                    <a href="#certificates" onClick={(e) => { e.preventDefault(); scrollToSection('certificates'); }} className={activeNav === 'certificates' ? styles.active : ''}>Certificates</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className={activeNav === 'contact' ? styles.active : ''}>Contact</a>
                </nav>
            </header>

            <section id="home" className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>Software Engineer & Full-Stack Developer</h1>
                        <p className={styles.heroSubtitle}>Crafting digital experiences through code and creativity</p>
                        <div className={styles.heroButtons}>
                            <button className={styles.primaryButton}>
                                Download CV
                                <span className={styles.buttonGlow}></span>
                            </button>
                            <button className={styles.secondaryButton} onClick={() => scrollToSection('projects')}>
                                View Projects
                            </button>
                        </div>
                    </div>
                    <div className={styles.heroImage}>
                        <div className={styles.avatarContainer}>
                            <svg ref={sunRef} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className={styles.avatar}>
                                <defs>
                                    <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                        <stop offset="0%" stopColor="#FFFFFF" />
                                        <stop offset="70%" stopColor="#FFCC33" />
                                        <stop offset="100%" stopColor="#FF9900" />
                                    </radialGradient>
                                    <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="15" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>
                                <circle cx="150" cy="150" r="80" fill="url(#sunGradient)" filter="url(#sunGlow)" />
                                <path ref={sunlightRef} d="M150,150 L250,150" stroke="rgba(255, 204, 51, 0.6)" strokeWidth="4" className={styles.sunlight}>
                                    <animate attributeName="stroke-opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" ref={el => sectionRefs.current[1] = el} className={styles.section}>
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

            <section id="about" ref={el => sectionRefs.current[2] = el} className={styles.section}>
                <div className={styles.sectionContent}>
                    <h2 className={styles.sectionTitle}>About Me</h2>
                    <div className={styles.aboutContent}>
                        <div className={styles.aboutText}>
                            <p>I'm a passionate software engineer specializing in frontend and full-stack development with expertise in modern web technologies.</p>
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

            <section id="certificates" ref={el => sectionRefs.current[3] = el} className={styles.section}>
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

            <section id="contact" ref={el => sectionRefs.current[4] = el} className={styles.section}>
                <div className={styles.sectionContent}>
                    <h2 className={styles.sectionTitle}>Contact Me</h2>
                    <div className={styles.socialLinks}>
                        <a href="#" className={styles.socialLink}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                        </a>
                        <a href="#" className={styles.socialLink}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" strokeWidth="2" />
                                <rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
                                <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </a>
                        <a href="#" className={styles.socialLink}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                                <circle cx="18" cy="6" r="1" fill="currentColor" />
                            </svg>
                        </a>
                        <a href="#" className={styles.socialLink}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>© {new Date().getFullYear()} DevPortfolio. All rights reserved.</p>
                    <div className={styles.footerNav}>
                        <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
                        <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
                        <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
                        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
                    </div>
                </div>
            </footer>

            <div className={styles.scrollIndicator}>
                <div className={styles.scrollProgress} style={{ height: `${scrollProgress}%` }}></div>
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