import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Projects.module.css'
import projects from '../data/projects'

export default function Projects() {
    const router = useRouter()
    const { id } = router.query

    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
    const [showDemo, setShowDemo] = useState(false)

    useEffect(() => {
        if (id) {
            const projectId = parseInt(id as string)
            const foundProject = projects.find(p => p.id === projectId)
            if (foundProject) {
                setSelectedProject(foundProject)
            }
        } else if (projects.length > 0) {
            setSelectedProject(projects[0])
        }
    }, [id])

    const handleProjectSelect = (project: typeof projects[0]) => {
        setSelectedProject(project)
        setShowDemo(false)
        router.push(`/projects?id=${project.id}`, undefined, { shallow: true })
    }

    const toggleDemo = () => {
        setShowDemo(!showDemo)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Projects | DevPortfolio</title>
                <meta name="description" content="My portfolio projects" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <Link href="/" className={styles.logo}>DevPortfolio</Link>
                <Link href="/" className={styles.backButton}>
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Home
                </Link>
            </header>

            <main className={styles.main}>
                <div className={styles.projectsNav}>
                    <h2 className={styles.projectsTitle}>Projects</h2>
                    <div className={styles.projectsList}>
                        {projects.map(project => (
                            <div
                                key={project.id}
                                className={`${styles.projectItem} ${selectedProject?.id === project.id ? styles.active : ''}`}
                                onClick={() => handleProjectSelect(project)}
                            >
                                <h3>{project.title}</h3>
                                <p>{project.shortDescription}</p>
                                <div className={styles.technologies}>
                                    {project.technologies.slice(0, 3).map((tech, idx) => (
                                        <span key={idx} className={styles.tech}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedProject && (
                    <div className={styles.projectDetail}>
                        <div className={styles.projectDetailHeader}>
                            <h1 className={styles.projectTitle}>{selectedProject.title}</h1>
                            <div className={styles.projectLinks}>
                                <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" fill="none" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    View on GitHub
                                </a>
                                {selectedProject.deploymentUrl && (
                                    <button className={styles.demoButton} onClick={toggleDemo}>
                                        {showDemo ? 'Hide Demo' : 'View Live Demo'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={styles.projectContent}>
                            <div className={styles.projectReadme}>
                                <div className={styles.markdownContent} dangerouslySetInnerHTML={{ __html: selectedProject.readme }} />

                                <div className={styles.projectTechnologies}>
                                    <h3>Technologies Used</h3>
                                    <div className={styles.techList}>
                                        {selectedProject.technologies.map((tech, idx) => (
                                            <span key={idx} className={styles.techItem}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.projectMedia}>
                                {showDemo && selectedProject.deploymentUrl ? (
                                    <div className={styles.demoContainer}>
                                        <iframe
                                            src={selectedProject.deploymentUrl}
                                            className={styles.demoFrame}
                                            title={`${selectedProject.title} demo`}
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <div className={styles.projectImagesContainer}>
                                        {selectedProject.images.map((image, idx) => (
                                            <div key={idx} className={styles.projectImage}>
                                                <img src={image} alt={`${selectedProject.title} screenshot ${idx + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className={styles.footer}>
                <p>© {new Date().getFullYear()} DevPortfolio. All rights reserved.</p>
            </footer>
        </div>
    )
}