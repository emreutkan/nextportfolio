import React, { forwardRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Projects.module.css';

const Projects = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section id="projects" ref={ref} className={styles.section}>
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
    );
});

Projects.displayName = 'Projects';

export default Projects;