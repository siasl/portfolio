import React from 'react';

interface StartMenuProps {
    isOpen: boolean;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div
            className="absolute bottom-10 left-0 w-[400px] h-[550px] rounded-tr-lg flex flex-col overflow-hidden z-[60]"
            style={{
                background: 'rgba(20, 30, 40, 0.85)',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 10px 40px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Top User Area */}
            <div className="absolute -top-8 right-4 w-16 h-16 bg-white rounded-md border-2 border-[#6b7c92] shadow-lg z-10 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Silas" alt="User" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-1 mt-2">
                {/* Left Column - Pinned/Recent Apps */}
                <div className="w-3/5 bg-white m-2 rounded-sm flex flex-col p-1">
                    <div className="flex-1 overflow-y-auto">
                        <button className="w-full flex items-center gap-2 p-2 hover:bg-[#e5f3fb] hover:shadow-inner rounded-sm transition-colors group text-left">
                            <div className="w-8 h-8 bg-blue-500 rounded-sm" />
                            <div>
                                <div className="font-bold text-sm text-[#1e1e1e]">Internet Explorer</div>
                                <div className="text-xs text-gray-500 group-hover:text-[#1e1e1e]">Browse the internet</div>
                            </div>
                        </button>
                        <button className="w-full flex items-center gap-2 p-2 hover:bg-[#e5f3fb] hover:shadow-inner rounded-sm transition-colors group text-left">
                            <div className="w-8 h-8 bg-green-500 rounded-sm" />
                            <div>
                                <div className="font-bold text-sm text-[#1e1e1e]">Windows Explorer</div>
                                <div className="text-xs text-gray-500 group-hover:text-[#1e1e1e]">Browse files</div>
                            </div>
                        </button>
                        <button className="w-full flex items-center gap-2 p-2 hover:bg-[#e5f3fb] hover:shadow-inner rounded-sm transition-colors group text-left">
                            <div className="w-8 h-8 bg-purple-500 rounded-sm" />
                            <div>
                                <div className="font-bold text-sm text-[#1e1e1e]">Purble Place</div>
                                <div className="text-xs text-gray-500 group-hover:text-[#1e1e1e]">Play games</div>
                            </div>
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-2 p-1 relative">
                        <input
                            type="text"
                            placeholder="Start Search"
                            className="w-full bg-white border border-[#8e9bb3] rounded-sm px-2 py-1 text-sm italic text-gray-500 focus:outline-none focus:border-[#3c7fb1]"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right Column - System Links */}
                <div className="w-2/5 text-white p-2 pt-8 flex flex-col gap-1 text-sm">
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm font-bold">Silas Howe</button>
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm">Documents</button>
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm">Pictures</button>
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm">Music</button>
                    <div className="h-px bg-[#6b7c92]/50 my-1" />
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm">Recent Items</button>
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm">Computer</button>
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm">Network</button>
                    <div className="h-px bg-[#6b7c92]/50 my-1" />
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm">Control Panel</button>
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm">Default Programs</button>
                    <button className="text-left px-3 py-1 hover:bg-[#3c4e66] rounded-sm">Help and Support</button>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-10 bg-gradient-to-r from-[#1a2533] to-[#3c4e66] flex items-center justify-end px-4 gap-2">
                <button className="p-1 hover:bg-white/10 rounded-sm border border-transparent hover:border-white/20 transition-all">
                    <div className="w-6 h-6 bg-[#d34646] rounded-sm flex items-center justify-center shadow-inner border border-[#b02b2b]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                            <line x1="12" y1="2" x2="12" y2="12"></line>
                        </svg>
                    </div>
                </button>
                <button className="p-1 hover:bg-white/10 rounded-sm border border-transparent hover:border-white/20 transition-all">
                    <div className="w-6 h-6 bg-[#3c4e66] rounded-sm flex items-center justify-center shadow-inner border border-[#2a3a4f]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 21a9 9 0 1 0-9-9c0 4.97 4.03 9 9 9z"></path>
                            <path d="M12 7v5l3 3"></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default StartMenu;
