import React, { createContext, useContext, useEffect, useState } from 'react';

interface ScrollContextType {
    currentSection: string;
    scrollTo: (sectionId: string) => void;
    isScrolling: boolean;
}

const ScrollContext = createContext<ScrollContextType>({
    currentSection: '',
    scrollTo: () => {},
    isScrolling: false,
});

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSection, setCurrentSection] = useState('');
    const [isScrolling, setIsScrolling] = useState(false);

    const scrollTo = (sectionId: string) => {
        setIsScrolling(true);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            setCurrentSection(sectionId);
            setTimeout(() => setIsScrolling(false), 1000);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isScrolling) return;

            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id') || '';

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    setCurrentSection(sectionId);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolling]);

    return (
        <ScrollContext.Provider value={{ currentSection, scrollTo, isScrolling }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = () => useContext(ScrollContext);