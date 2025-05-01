import React from 'react';
import styles from '../styles/Hero.module.css';

interface HeroProps {
    scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.floatingElement}></div>
            <div className={styles.floatingElement}></div>
            <div className={styles.floatingElement}></div>
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
            </div>
        </section>
    );
};

export default Hero;