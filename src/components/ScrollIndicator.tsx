import React from 'react';
import styles from '../styles/ScrollIndicator.module.css';

interface ScrollIndicatorProps {
    scrollProgress: number;
    navigateToPreviousSection: () => void;
    navigateToNextSection: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
                                                             scrollProgress,
                                                             navigateToPreviousSection,
                                                             navigateToNextSection
                                                         }) => {
    return (
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
    );
};

export default ScrollIndicator;