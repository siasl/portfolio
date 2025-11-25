import React from 'react';
import type { Project } from '../data/projects';
import MediaGallery from './MediaGallery';
import { ExternalLink } from 'lucide-react';

interface ProjectSectionProps {
    project: Project;
    index: number;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project, index }) => {
    return (
        <section id={project.id} className="mb-16 max-w-5xl mx-auto px-4">
            <div className="glass-panel rounded-xl overflow-hidden shadow-window">
                {/* Window Title Bar */}
                <div className="bg-white/10 backdrop-blur-md px-4 py-3 flex items-center border-b border-white/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                    </div>
                    <div className="flex-1 text-center text-sm font-medium text-white/80 flex items-center justify-center gap-2">
                        <span>📁</span>
                        <span>{project.title}</span>
                    </div>
                    <div className="w-16"></div>
                </div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                        <div className="flex-1 w-full">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-100 rounded-full border border-blue-400/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="bg-black/20 rounded-lg p-6 mb-6 font-system text-base leading-relaxed text-white/90 border border-white/5">
                                {project.description}
                            </div>

                            {/* Links */}
                            {project.links && project.links.length > 0 && (
                                <div className="flex flex-wrap gap-4">
                                    {project.links.map(link => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium text-white border border-white/10"
                                        >
                                            <ExternalLink size={16} />
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <MediaGallery media={project.media} columns={project.columns} />
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;
