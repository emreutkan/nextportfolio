import React from 'react';
import styles from '../styles/Footer.module.css';

interface FooterProps {
    scrollToSection: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
    return (
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
    );
};

export default Footer;