import React from 'react';
import Hero from '../components/Hero';
import WorkGrid from '../components/WorkGrid';
import ExperienceSection from '../components/ExperienceSection';
import MakingSection from '../components/MakingSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Home: React.FC = () => {
    useDocumentTitle();
    return (
    <>
        <Hero />
        <WorkGrid />
        <ExperienceSection />
        <MakingSection />
        <AboutSection />
        <Footer />
    </>
    );
};

export default Home;
