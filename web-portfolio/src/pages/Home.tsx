import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import ProjectSection from '../components/ProjectSection';
import { projects } from '../data/projects';
import { useLocation } from 'react-router-dom';

const Home: React.FC = () => {
    const location = useLocation();

    // Filter out "photography" and "video" projects for the home page
    const homeProjects = projects.filter(
        p => p.id !== 'photography' && p.id !== 'video'
    );

    useEffect(() => {
        // Handle scrolling to hash element if present
        if (location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                // Small timeout to ensure DOM is ready
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <>
            <Hero />
            <div className="relative z-20">
                {homeProjects.map((project, index) => (
                    <ProjectSection key={project.id} project={project} index={index} />
                ))}
            </div>
            <footer className="bg-neo-black text-neo-white py-12 border-t-4 border-neo-white text-center relative z-20">
                <p className="text-xl font-bold uppercase">
                    © {new Date().getFullYear()} Silas Howe
                </p>
                <div className="mt-2">
                    <a href="https://www.linkedin.com/in/silashowe" target="_blank" rel="noopener noreferrer" className="hover:text-ski-orange transition-colors">LinkedIn</a>
                    <span className="mx-2">|</span>
                    <a href="mailto:silashowe1999@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-ski-orange transition-colors">Email</a>
                </div>
            </footer>
        </>
    );
};

export default Home;
