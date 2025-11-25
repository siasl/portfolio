import React, { useState, useEffect } from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col font-system text-white select-none">
            {/* Top Menu Bar */}
            <div className="h-8 bg-glass-white/10 backdrop-blur-md flex items-center justify-between px-4 text-sm z-50 shadow-sm relative">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-lg"></span>
                    <span className="font-bold">Silas Howe</span>
                    <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">File</span>
                    <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">Edit</span>
                    <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">View</span>
                    <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">Go</span>
                    <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">Window</span>
                    <span className="hidden sm:inline opacity-90 hover:opacity-100 cursor-default">Help</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="opacity-90 hover:opacity-100 cursor-default">🔋 100%</span>
                    <span className="opacity-90 hover:opacity-100 cursor-default">📶</span>
                    <span className="font-medium">{formatTime(time)}</span>
                </div>
            </div>

            {/* Desktop Area */}
            <main className="flex-1 relative overflow-y-auto p-4 sm:p-8 z-0">
                {/* Desktop Icons (Decorative) */}
                <div className="absolute top-4 right-4 flex flex-col gap-6 items-center z-0 pointer-events-none sm:pointer-events-auto">
                    <div className="group flex flex-col items-center gap-1 cursor-pointer">
                        <div className="w-16 h-16 bg-blue-400/20 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg flex items-center justify-center text-4xl group-hover:bg-blue-400/30 transition-colors">
                            💾
                        </div>
                        <span className="text-xs font-medium drop-shadow-md bg-black/20 px-2 py-0.5 rounded-full">Macintosh HD</span>
                    </div>
                    <div className="group flex flex-col items-center gap-1 cursor-pointer">
                        <div className="w-16 h-16 bg-blue-400/20 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg flex items-center justify-center text-4xl group-hover:bg-blue-400/30 transition-colors">
                            📁
                        </div>
                        <span className="text-xs font-medium drop-shadow-md bg-black/20 px-2 py-0.5 rounded-full">Portfolio</span>
                    </div>
                </div>

                {/* Main Content Window Container */}
                <div className="max-w-6xl mx-auto h-full pb-24">
                    {children}
                </div>
            </main>

            {/* Dock */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-end gap-2 shadow-dock h-16 sm:h-20 transition-all duration-300 hover:scale-105">
                    {['📂', '🚀', 'safari', 'mail', 'terminal', 'trash'].map((icon, i) => (
                        <div key={i} className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 hover:bg-white/30 transition-all duration-200 flex items-center justify-center text-2xl sm:text-3xl cursor-pointer hover:-translate-y-2 relative group">
                            {icon === 'safari' ? '🧭' : icon === 'mail' ? '✉️' : icon === 'terminal' ? '💻' : icon === 'trash' ? '🗑️' : icon}
                            <div className="absolute -bottom-2 w-1 h-1 bg-white/50 rounded-full opacity-0 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Layout;
