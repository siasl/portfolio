import React, { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import { LightboxProvider } from './Lightbox';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    // Scroll to the hashed section after navigation, otherwise start at the top.
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.slice(1);
            const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 120);
            return () => clearTimeout(timer);
        }
        window.scrollTo(0, 0);
    }, [location.pathname, location.hash]);

    return (
        <MotionConfig reducedMotion="user">
            <LightboxProvider>
                <div id="top" className="min-h-screen overflow-x-clip">
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-sm focus:bg-paper focus:px-4 focus:py-2 focus:font-semibold focus:text-ink focus:ring-2 focus:ring-accent"
                    >
                        Skip to main content
                    </a>
                    <SiteHeader />
                    <main id="main">{children}</main>
                </div>
            </LightboxProvider>
        </MotionConfig>
    );
};

export default Layout;
