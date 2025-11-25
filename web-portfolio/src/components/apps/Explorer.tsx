import React, { useState } from 'react';
import { projects } from '../../data/projects';

const Explorer: React.FC = () => {
    const [currentPath] = useState('Computer > Local Disk (C:) > Projects');
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    return (
        <div className="flex flex-col h-full bg-white font-segoe">
            {/* Address Bar */}
            <div className="h-8 bg-gradient-to-b from-[#f0f0f0] to-[#dcdcdc] flex items-center px-2 gap-2 border-b border-[#a0a0a0]">
                <div className="flex gap-1">
                    <button className="w-6 h-6 rounded-full hover:bg-white/50 flex items-center justify-center text-gray-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="w-6 h-6 rounded-full hover:bg-white/50 flex items-center justify-center text-gray-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                </div>
                <div className="flex-1 bg-white border border-[#a0a0a0] h-6 flex items-center px-2 text-sm text-[#1e1e1e] shadow-inner">
                    <img src="https://img.icons8.com/color/48/folder-invoices--v1.png" alt="" className="w-4 h-4 mr-2" />
                    {currentPath}
                </div>
                <div className="w-48 bg-white border border-[#a0a0a0] h-6 flex items-center px-2 text-sm text-gray-400 shadow-inner">
                    Search
                </div>
            </div>

            {/* Toolbar */}
            <div className="h-8 bg-[#eef3fa] border-b border-[#d9d9d9] flex items-center px-2 text-sm text-[#1e1e1e] gap-4">
                <button className="hover:text-blue-600">Organize</button>
                <button className="hover:text-blue-600">Views</button>
                <button className="hover:text-blue-600">Burn</button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-[#f0f4fa] border-r border-[#d9d9d9] p-2 text-sm overflow-y-auto">
                    <div className="mb-4">
                        <div className="font-bold text-[#1e1e1e] mb-1 flex items-center gap-1">
                            <span className="text-xs">▼</span> Favorite Links
                        </div>
                        <div className="pl-4 flex flex-col gap-1 text-[#1e1e1e]">
                            <div className="flex items-center gap-2 hover:bg-[#dcebfd] px-1 rounded-sm cursor-pointer">
                                <img src="https://img.icons8.com/color/48/documents.png" className="w-4 h-4" /> Documents
                            </div>
                            <div className="flex items-center gap-2 hover:bg-[#dcebfd] px-1 rounded-sm cursor-pointer">
                                <img src="https://img.icons8.com/color/48/pictures-folder.png" className="w-4 h-4" /> Pictures
                            </div>
                            <div className="flex items-center gap-2 hover:bg-[#dcebfd] px-1 rounded-sm cursor-pointer">
                                <img src="https://img.icons8.com/color/48/music-folder.png" className="w-4 h-4" /> Music
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-[#1e1e1e] mb-1 flex items-center gap-1">
                            <span className="text-xs">▼</span> Folders
                        </div>
                        <div className="pl-4 flex flex-col gap-1 text-[#1e1e1e]">
                            <div className="flex items-center gap-2 hover:bg-[#dcebfd] px-1 rounded-sm cursor-pointer font-bold">
                                <img src="https://img.icons8.com/color/48/folder-invoices--v1.png" className="w-4 h-4" /> Projects
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-white p-4 overflow-y-auto">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                        {projects.map(project => (
                            <div
                                key={project.id}
                                className={`flex flex-col items-center gap-1 p-2 border border-transparent hover:bg-[#e5f3fb] hover:border-[#d9f0fc] rounded-sm cursor-pointer group ${selectedProject === project.id ? 'bg-[#cce8ff] border-[#99d1ff]' : ''}`}
                                onClick={() => setSelectedProject(project.id)}
                            >
                                <img src="https://img.icons8.com/color/96/folder-invoices--v1.png" alt="Folder" className="w-16 h-16 drop-shadow-sm" />
                                <div className="text-center text-sm text-[#1e1e1e] group-hover:text-black leading-tight">
                                    {project.title}
                                </div>
                                <div className="text-xs text-gray-500">{project.tags[0]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="h-6 bg-[#f0f4fa] border-t border-[#d9d9d9] flex items-center px-4 text-xs text-[#1e1e1e]">
                {projects.length} items
            </div>
        </div>
    );
};

export default Explorer;
