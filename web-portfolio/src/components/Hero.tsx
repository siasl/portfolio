import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const Hero: React.FC = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden border-b-4 border-neo-black bg-salt-white">
            {/* Grid Background */}
            <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-10 pointer-events-none">
                {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-neo-black" />
                ))}
            </div>

            {/* Trail Map Line Decoration */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 100 Q 200 600 500 300 T 1200 800" stroke="#FF4500" strokeWidth="10" fill="none" strokeDasharray="20 20" />
                <path d="M0 800 Q 400 200 800 500 T 1600 200" stroke="#20B2AA" strokeWidth="10" fill="none" />
                <path d="M0 8000 Q 400 200 800 500 T 1600 200" stroke="#20B2AA" strokeWidth="10" fill="none" />
            </svg>

            <div className="relative z-10 flex flex-col items-center w-full px-4">
                <div className="text-center max-w-4xl">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="bg-white border-4 border-neo-black shadow-neo-lg p-8 md:p-16 transform -rotate-2 "
                    >
                        <h1 className="text-6xl md:text-9xl font-black font-display uppercase tracking-tighter leading-none">
                            Silas<br />Howe <br />Portfolio
                        </h1>
                    </motion.div>


                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 text-xl font-bold bg-ski-orange text-white inline-block px-4 py-1 border-2 border-neo-black transform hover:rotate-10 transition-transform duration-300"
                    >
                        DESIGN • TECH
                    </motion.p>
                </div>

                {/* Table of Contents */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 w-full max-w-7xl px-4"
                >
                    {projects.filter(p => p.id !== 'photography' && p.id !== 'video').map((project) => (
                        <a
                            key={project.id}
                            href={`#${project.id}`}
                            className="text-lg font-bold uppercase hover:text-ski-orange hover:underline decoration-4 underline-offset-4 transition-colors whitespace-nowrap"
                        >
                            {project.title}
                        </a>
                    ))}
                    <Link
                        to="/photo-video"
                        className="text-lg font-bold uppercase hover:text-ski-orange hover:underline decoration-4 underline-offset-4 transition-colors whitespace-nowrap"
                    >
                        Other
                    </Link>
                    <a
                        href="https://jibbitz.silashowe.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold uppercase hover:text-ski-orange hover:underline decoration-4 underline-offset-4 transition-colors whitespace-nowrap"
                    >
                        Jibbitz
                    </a>
                    <a
                        href="https://github.com/siasl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold uppercase hover:text-ski-orange hover:underline decoration-4 underline-offset-4 transition-colors whitespace-nowrap"
                    >
                        GitHub
                    </a>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-neo-black text-neo-white py-4 border-t-4 border-neo-black overflow-hidden whitespace-nowrap flex">
                {/* Two identical sets of content for seamless looping */}
                {[0, 1].map((index) => (
                    <motion.div
                        key={index}
                        initial={{ x: "0%" }}
                        animate={{ x: "-100%" }}
                        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                        className="flex gap-8 text-2xl font-bold uppercase pr-8 shrink-0"
                    >
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="flex items-center gap-8">
                                <span>Product Design</span>
                                <span className="text-white text-4xl pb-1">♦♦</span>
                                <span>Hardware</span>
                                <span className="text-[#009E60] text-5xl pb-2">●</span>
                                <span>Photography</span>
                                <span className="text-[#007FFF] text-4xl pb-2">■</span>
                                <span>XR</span>
                                <span className="text-white text-4xl pb-1">♦</span>
                                <span>Video</span>
                                <span className="text-[#009E60] text-5xl pb-2">●</span>
                            </span>
                        ))}
                    </motion.div>
                ))}
            </div>
        </section >
    );
};

export default Hero;
