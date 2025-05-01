import React from 'react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
    activeNav: string;
    scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeNav, scrollToSection }) => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>DevPortfolio</div>
            <nav className={styles.nav}>
                <a
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                    className={activeNav === 'projects' ? styles.active : ''}
                >
                    Projects
                </a>
                <a
                    href="#about"
                    onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                    className={activeNav === 'about' ? styles.active : ''}
                >
                    About
                </a>
                <a
                    href="#certificates"
                    onClick={(e) => { e.preventDefault(); scrollToSection('certificates'); }}
                    className={activeNav === 'certificates' ? styles.active : ''}
                >
                    Certificates
                </a>
                <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                    className={activeNav === 'contact' ? styles.active : ''}
                >
                    Contact
                </a>
            </nav>
        </header>
    );
};

export default Header;