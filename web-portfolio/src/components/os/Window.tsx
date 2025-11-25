import React, { useRef } from 'react';
import Draggable from 'react-draggable';

interface WindowProps {
    id: string;
    title: string;
    icon?: string;
    isOpen: boolean;
    isActive: boolean;
    isMinimized: boolean;
    onClose: () => void;
    onMinimize: () => void;
    onFocus: () => void;
    children: React.ReactNode;
    initialPosition?: { x: number; y: number };
    width?: number;
    height?: number;
}

const Window: React.FC<WindowProps> = ({
    title,
    icon,
    isOpen,
    isActive,
    isMinimized,
    onClose,
    onMinimize,
    onFocus,
    children,
    initialPosition = { x: 100, y: 50 },
    width = 600,
    height = 400,
}) => {
    const nodeRef = useRef(null);

    if (!isOpen || isMinimized) return null;

    return (
        <Draggable
            handle=".window-titlebar"
            defaultPosition={initialPosition}
            nodeRef={nodeRef}
            onStart={onFocus}
        >
            <div
                ref={nodeRef}
                className={`absolute flex flex-col rounded-lg overflow-hidden transition-opacity duration-200 ${isActive ? 'z-50 opacity-100' : 'z-40 opacity-90'}`}
                style={{
                    width: width,
                    height: height,
                    // Vista Aero Glass Effect
                    background: 'linear-gradient(to bottom, rgba(20, 30, 40, 0.6) 0%, rgba(20, 30, 40, 0.4) 15%, rgba(20, 30, 40, 0.2) 100%)',
                    backdropFilter: 'blur(10px) saturate(110%)',
                    boxShadow: isActive
                        ? '0 0 0 1px rgba(255,255,255,0.4), 0 0 15px rgba(100, 200, 255, 0.4), 0 20px 50px rgba(0,0,0,0.6)'
                        : '0 0 0 1px rgba(255,255,255,0.2), 0 5px 20px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
                onClick={onFocus}
            >
                {/* Aero Glass Titlebar */}
                <div className="window-titlebar h-8 flex items-center justify-between px-2 select-none cursor-default relative overflow-hidden">
                    {/* Glossy shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-50 pointer-events-none" />

                    <div className="flex items-center gap-2 text-white text-shadow-sm relative z-10">
                        {icon && <img src={icon} alt="" className="w-4 h-4 drop-shadow-md" />}
                        <span className="font-segoe text-sm tracking-wide drop-shadow-md font-medium">{title}</span>
                    </div>
                    <div className="flex items-center gap-1 relative z-10">
                        <button
                            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                            className="w-7 h-5 flex items-center justify-center rounded-sm hover:bg-white/20 transition-colors group border border-transparent hover:border-white/30 hover:shadow-inner"
                        >
                            <div className="w-2 h-0.5 bg-white shadow-sm group-hover:bg-white" />
                        </button>
                        <button
                            className="w-7 h-5 flex items-center justify-center rounded-sm hover:bg-white/20 transition-colors group border border-transparent hover:border-white/30 hover:shadow-inner"
                        >
                            <div className="w-2 h-2 border border-white shadow-sm" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="w-11 h-5 flex items-center justify-center rounded-sm bg-[#d34646] hover:bg-[#e81123] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.3)] border border-[#b02b2b]"
                        >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#f0f0f0] relative overflow-hidden border-t border-white/30 m-[5px] mt-0 mb-[5px] rounded-b-[4px] shadow-inner">
                    <div className="absolute inset-0 overflow-auto p-4 text-black font-sans">
                        {children}
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default Window;
