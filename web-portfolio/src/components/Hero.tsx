import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto mt-12 glass-panel rounded-xl overflow-hidden shadow-window">
            {/* Window Title Bar */}
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 flex items-center border-b border-white/10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                </div>
                <div className="flex-1 text-center text-sm font-medium text-white/80">
                    Welcome
                </div>
                <div className="w-16"></div> {/* Spacer for centering */}
            </div>

            {/* Window Content */}
            <div className="p-8 text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
                        Silas Howe
                    </h1>
                    <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
                        <span className="font-medium text-white tracking-wide">DESIGN • TECH • CREATIVE</span>
                    </div>
                </motion.div>

                {/* Navigation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                    {[
                        { id: 'call-light', label: 'Call Light', icon: '💡' },
                        { id: 'do-board', label: 'Do Board', icon: '📋' },
                        { id: 'personal-automations', label: 'Automations', icon: '⚡️' },
                        { id: 'video', label: 'Video', icon: '🎥' },
                        { id: 'photography', label: 'Photography', icon: '📸' },
                        { id: 'xr', label: 'XR', icon: '🕶️' },
                        { id: 'book-arts', label: 'Book Arts', icon: '📚' },
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/20 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-200 group hover:-translate-y-1"
                        >
                            <span className="text-4xl mb-3 filter drop-shadow-md">{item.icon}</span>
                            <span className="text-sm font-medium text-white/90 group-hover:text-white">{item.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
