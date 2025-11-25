import React, { useState } from 'react';
import Taskbar from './Taskbar';
import Window from './Window';
import Explorer from '../apps/Explorer';
import PurblePlace from '../apps/PurblePlace';

interface WindowState {
    id: string;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    icon?: string;
    content: React.ReactNode;
    width?: number;
    height?: number;
}

const Desktop: React.FC = () => {
    const [windows, setWindows] = useState<WindowState[]>([
        {
            id: 'projects',
            title: 'Projects',
            isOpen: true,
            isMinimized: false,
            icon: 'https://img.icons8.com/color/48/folder-invoices--v1.png',
            content: <Explorer />,
            width: 800,
            height: 600
        },
        {
            id: 'purble-place',
            title: 'Purble Place',
            isOpen: false,
            isMinimized: false,
            icon: 'https://img.icons8.com/color/48/cake.png',
            content: <PurblePlace />,
            width: 600,
            height: 500
        },
        {
            id: 'about',
            title: 'About Me.txt',
            isOpen: false,
            isMinimized: false,
            icon: 'https://img.icons8.com/color/48/notepad.png',
            content: (
                <div className="p-4 font-mono text-sm bg-white h-full">
                    <h1 className="text-xl font-bold mb-4">About Silas Howe</h1>
                    <p className="mb-2">I am a Product Designer and Creative Technologist based in Salt Lake City.</p>
                    <p className="mb-2">I love building things that live at the intersection of design and technology.</p>
                    <p className="mb-2">This portfolio is designed to look like Windows Vista, my favorite OS aesthetic.</p>
                    <br />
                    <p>Feel free to explore my projects using the folder icon!</p>
                </div>
            ),
            width: 500,
            height: 400
        }
    ]);
    const [activeWindowId, setActiveWindowId] = useState<string>('projects');
    const [isStartOpen, setIsStartOpen] = useState(false);

    const handleClose = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    };

    const handleMinimize = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
        setActiveWindowId('');
    };

    const handleFocus = (id: string) => {
        setActiveWindowId(id);
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
        if (isStartOpen) setIsStartOpen(false);
    };

    const handleWindowClick = (id: string) => {
        const window = windows.find(w => w.id === id);
        if (window) {
            if (window.isMinimized || activeWindowId !== id) {
                handleFocus(id);
            } else {
                handleMinimize(id);
            }
        }
        if (isStartOpen) setIsStartOpen(false);
    };

    const handleIconDoubleClick = (id: string) => {
        const existingWindow = windows.find(w => w.id === id);
        if (existingWindow) {
            setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false } : w));
            setActiveWindowId(id);
        }
    };

    return (
        <div
            className="fixed inset-0 overflow-hidden select-none font-sans"
            onClick={() => setIsStartOpen(false)}
        >
            {/* Wallpaper - Vista Aurora Style */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#004e8c] via-[#003b6a] to-[#000000] z-0">
                <div className="absolute inset-0 bg-[url('https://i.redd.it/1lu31x1angtb1.jpg')] bg-cover bg-center opacity-100" />
                {/* Aurora effects using CSS gradients */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#40c4ff]/20 to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#00d4ff]/10 to-transparent blur-3xl" />
            </div>

            {/* Desktop Icons Area */}
            <div className="relative z-10 w-full h-[calc(100vh-40px)] p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-4 content-start items-start justify-start">
                <div
                    className="w-24 flex flex-col items-center gap-1 group cursor-pointer"
                    onDoubleClick={() => handleIconDoubleClick('projects')}
                >
                    <img src="https://img.icons8.com/color/96/folder-invoices--v1.png" alt="Projects" className="w-12 h-12 drop-shadow-md group-hover:opacity-80" />
                    <span className="text-white text-xs text-center font-segoe text-shadow-sm bg-black/0 group-hover:bg-white/10 px-1 rounded-sm border border-transparent group-hover:border-white/20">Projects</span>
                </div>
                <div
                    className="w-24 flex flex-col items-center gap-1 group cursor-pointer"
                    onDoubleClick={() => handleIconDoubleClick('purble-place')}
                >
                    <img src="https://img.icons8.com/color/96/cake.png" alt="Purble Place" className="w-12 h-12 drop-shadow-md group-hover:opacity-80" />
                    <span className="text-white text-xs text-center font-segoe text-shadow-sm bg-black/0 group-hover:bg-white/10 px-1 rounded-sm border border-transparent group-hover:border-white/20">Purble Place</span>
                </div>
                <div
                    className="w-24 flex flex-col items-center gap-1 group cursor-pointer"
                    onDoubleClick={() => handleIconDoubleClick('about')}
                >
                    <img src="https://img.icons8.com/color/96/notepad.png" alt="About Me" className="w-12 h-12 drop-shadow-md group-hover:opacity-80" />
                    <span className="text-white text-xs text-center font-segoe text-shadow-sm bg-black/0 group-hover:bg-white/10 px-1 rounded-sm border border-transparent group-hover:border-white/20">About Me.txt</span>
                </div>
                <div className="w-24 flex flex-col items-center gap-1 group cursor-pointer">
                    <img src="https://img.icons8.com/color/96/recycle-bin.png" alt="Recycle Bin" className="w-12 h-12 drop-shadow-md group-hover:opacity-80" />
                    <span className="text-white text-xs text-center font-segoe text-shadow-sm bg-black/0 group-hover:bg-white/10 px-1 rounded-sm border border-transparent group-hover:border-white/20">Recycle Bin</span>
                </div>
            </div>

            {/* Windows Area */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {windows.map(window => (
                    <div key={window.id} className="pointer-events-auto">
                        <Window
                            id={window.id}
                            title={window.title}
                            icon={window.icon}
                            isOpen={window.isOpen}
                            isActive={activeWindowId === window.id}
                            isMinimized={window.isMinimized}
                            onClose={() => handleClose(window.id)}
                            onMinimize={() => handleMinimize(window.id)}
                            onFocus={() => handleFocus(window.id)}
                            width={window.width}
                            height={window.height}
                        >
                            {window.content}
                        </Window>
                    </div>
                ))}
            </div>

            <Taskbar
                windows={windows.map(w => ({ ...w, isActive: activeWindowId === w.id }))}
                activeWindowId={activeWindowId}
                onWindowClick={handleWindowClick}
                isStartOpen={isStartOpen}
                onStartClick={() => setIsStartOpen(!isStartOpen)}
            />
        </div>
    );
};

export default Desktop;
