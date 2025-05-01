import React, { forwardRef } from 'react';
import styles from '../styles/About.module.css';

interface AboutProps {
    isVisible?: boolean;
}

const About = forwardRef<HTMLElement, AboutProps>(({ isVisible = false }, ref) => {
    return (
        <section id="about" ref={ref} className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
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
    );
});

About.displayName = 'About';

export default About;