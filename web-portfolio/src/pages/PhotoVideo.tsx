import React, { useEffect } from 'react';
import ProjectSection from '../components/ProjectSection';
import { projects } from '../data/projects';
import { useLocation } from 'react-router-dom';

const PhotoVideo: React.FC = () => {
    const location = useLocation();

    // Filter to ONLY include "photography" and "video"
    const photoVideoProjects = projects.filter(
        p => p.id === 'photography' || p.id === 'video'
    );

    useEffect(() => {
        // Scroll to top on mount unless there's a hash
        if (!location.hash) {
            window.scrollTo(0, 0);
        } else {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-snow-white pt-24 pb-12">
            <div className="container mx-auto px-4 mb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tighter mb-4">
                    Other
                </h1>
                <p className="text-xl font-mono max-w-2xl mx-auto">
                    A collection of my photography and videography work.
                </p>
            </div>

            <div className="relative z-20">
                {photoVideoProjects.map((project, index) => (
                    <ProjectSection key={project.id} project={project} index={index} />
                ))}
            </div>

            <footer className="bg-neo-black text-neo-white py-12 border-t-4 border-neo-white text-center relative z-20 mt-12">
                <p className="text-xl font-bold uppercase">
                    © {new Date().getFullYear()} Silas Howe
                </p>
                <div className="mt-2">
                    <a href="https://www.linkedin.com/in/silashowe" target="_blank" rel="noopener noreferrer" className="hover:text-ski-orange transition-colors">LinkedIn</a>
                    <span className="mx-2">|</span>
                    <a href="mailto:silashowe1999@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-ski-orange transition-colors">Email</a>
                </div>
            </footer>
        </div>
    );
};

export default PhotoVideo;
