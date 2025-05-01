import React, { forwardRef } from 'react';
import styles from '../styles/Certificates.module.css';

interface CertificatesProps {
    isVisible?: boolean;
}

const Certificates = forwardRef<HTMLElement, CertificatesProps>(({ isVisible = false }, ref) => {
    return (
        <section id="certificates" ref={ref} className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
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
    );
});

Certificates.displayName = 'Certificates';

export default Certificates;