import React, { useState, useEffect } from 'react';
import StartMenu from './StartMenu';

interface TaskbarProps {
    windows: { id: string; title: string; isOpen: boolean; isActive: boolean; isMinimized: boolean; icon?: string }[];
    activeWindowId: string;
    onWindowClick: (id: string) => void;
    isStartOpen: boolean;
    onStartClick: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onWindowClick, isStartOpen, onStartClick }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="fixed bottom-0 left-0 right-0 h-10 flex items-center px-1 z-50 select-none"
            style={{
                background: 'linear-gradient(to bottom, rgba(20, 30, 40, 0.9) 0%, rgba(20, 30, 40, 0.7) 50%, rgba(0, 0, 0, 0.8) 51%, rgba(0, 0, 0, 1) 100%)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.5)'
            }}
        >
            {/* Start Button */}
            <div className="relative z-[70]">
                <button
                    className="relative group"
                    onClick={onStartClick}
                >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-[#1f4e79] to-[#0f2438] border-2 border-[#5c8cb5] shadow-[0_0_10px_rgba(31,78,121,0.8)] flex items-center justify-center overflow-hidden transition-all ${isStartOpen ? 'brightness-125 shadow-[0_0_15px_rgba(31,78,121,1)]' : 'hover:brightness-110'}`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.3)]" />
                        <div className="w-4 h-4 bg-gradient-to-br from-[#f26522] via-[#8dc63f] to-[#00aeef] rounded-full opacity-80" />
                    </div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-3 bg-white/20 rounded-full blur-sm" />
                </button>
                <StartMenu isOpen={isStartOpen} />
            </div>

            {/* Window List */}
            <div className="flex-1 flex items-center px-2 gap-1 overflow-x-auto">
                {windows.filter(w => w.isOpen).map(window => (
                    <button
                        key={window.id}
                        onClick={() => onWindowClick(window.id)}
                        className={`
                            h-8 px-2 min-w-[140px] max-w-[200px] rounded-sm flex items-center gap-2 border transition-all
                            ${window.isActive && !window.isMinimized
                                ? 'bg-gradient-to-b from-[#f0f0f0]/30 to-[#f0f0f0]/10 border-[#ffffff]/40 shadow-inner'
                                : 'bg-gradient-to-b from-[#ffffff]/10 to-transparent border-transparent hover:bg-[#ffffff]/20 hover:border-[#ffffff]/20'
                            }
                        `}
                    >
                        {window.icon && <img src={window.icon} alt="" className="w-4 h-4" />}
                        <span className="text-white text-xs truncate font-segoe shadow-black drop-shadow-sm">{window.title}</span>
                    </button>
                ))}
            </div>

            {/* System Tray */}
            <div className="h-full bg-[#0f1820]/50 px-3 flex flex-col justify-center items-center text-white text-xs font-sans border-l border-[#3c4e66]/50 min-w-[80px]">
                <div>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
                <div className="text-[10px] text-gray-300">{time.toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default Taskbar;
