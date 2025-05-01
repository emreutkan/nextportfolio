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

                </button>
                <button aria-label="Next section" onClick={navigateToNextSection}>

                </button>
            </div>
        </div>
    );
};

export default ScrollIndicator;