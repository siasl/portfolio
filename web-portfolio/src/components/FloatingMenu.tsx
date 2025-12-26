import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Identify current page
    const isHome = location.pathname === '/';
    const isPhotoVideo = location.pathname === '/photo-video';

    // Get relevant projects for the CURRENT page menu
    const homeSections = projects.filter(p => p.id !== 'photography' && p.id !== 'video');
    const photoVideoSections = projects.filter(p => p.id === 'photography' || p.id === 'video');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (id: string, path: string) => {
        setIsOpen(false);
        if (location.pathname !== path) {
            navigate(`${path}#${id}`);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`fixed top-4 right-4 z-[100] px-4 py-2 bg-neo-black text-neo-white font-bold font-mono border-2 border-white shadow-neo-sm hover:bg-ski-orange transition-colors uppercase ${scrolled ? 'visible' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Close' : 'Menu'}
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-[90]"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-80 bg-snow-white border-l-4 border-neo-black z-[95] p-8 shadow-neo-lg overflow-y-auto"
                        >
                            <div className="flex flex-col gap-8 mt-16">
                                {/* Home Section */}
                                <div>
                                    <button
                                        onClick={() => handleNavigation('', '/')}
                                        className={`text-2xl font-black uppercase mb-4 hover:text-ski-orange transition-colors ${isHome ? 'text-ski-orange' : 'text-neo-black'}`}
                                    >
                                        Home
                                    </button>
                                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-neo-black/20">
                                        {homeSections.map(project => (
                                            <button
                                                key={project.id}
                                                onClick={() => handleNavigation(project.id, '/')}
                                                className="text-left font-mono font-bold text-neo-black hover:text-ski-orange transition-colors uppercase text-sm"
                                            >
                                                {project.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Photo & Video Section */}
                                <div>
                                    <button
                                        onClick={() => handleNavigation('', '/photo-video')}
                                        className={`text-2xl font-black uppercase mb-4 hover:text-ski-orange transition-colors ${isPhotoVideo ? 'text-ski-orange' : 'text-neo-black'}`}
                                    >
                                        Other
                                    </button>
                                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-neo-black/20">
                                        {photoVideoSections.map(project => (
                                            <button
                                                key={project.id}
                                                onClick={() => handleNavigation(project.id, '/photo-video')}
                                                className="text-left font-mono font-bold text-neo-black hover:text-ski-orange transition-colors uppercase text-sm"
                                            >
                                                {project.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingMenu;
