import React from 'react';
import type { Project } from '../data/projects';
import MediaGallery from './MediaGallery';
import { ExternalLink } from 'lucide-react';

interface ProjectSectionProps {
    project: Project;
    index: number;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project, index }) => {
    const isEven = index % 2 === 0;
    const bgColor = isEven ? 'bg-neo-white' : 'bg-neo-green';

    return (
        <section id={project.id} className={`py-20 border-b-4 border-neo-black ${bgColor}`}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                    <div className="flex-1">
                        <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 break-words leading-none">
                            <span className="bg-neo-black text-neo-white px-2 box-decoration-clone">
                                {project.title}
                            </span>
                        </h2>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {project.tags.map((tag, i) => {
                                // Assign trail difficulty based on index for visual flair
                                // 0: Green Circle, 1: Blue Square, 2: Black Diamond, 3: Double Black Diamond
                                const typeIndex = i % 4;
                                const difficulty = ['●', '■', '♦', '♦♦'][typeIndex];

                                // Colors matching ski trail ratings
                                let colorClass = '';
                                if (typeIndex === 0) colorClass = 'text-[#009E60]'; // Green
                                else if (typeIndex === 1) colorClass = 'text-[#007FFF]'; // Blue
                                else if (typeIndex === 2) colorClass = 'text-black'; // Black
                                else colorClass = 'text-[#000000]'; // Double Black

                                return (
                                    <span key={tag} className="border-2 border-neo-black px-3 py-1 font-bold text-sm uppercase bg-white shadow-neo-sm flex items-center gap-2">
                                        <span className={`text-lg leading-none ${colorClass}`}>{difficulty}</span>
                                        {tag}
                                    </span>
                                );
                            })}
                        </div>

                        <p className="text-xl md:text-2xl font-medium max-w-2xl border-l-4 border-neo-black pl-6">
                            {project.description}
                        </p>

                        {project.links && project.links.length > 0 && (
                            <div className="mt-8 flex flex-col gap-4">
                                {project.links.map(link => (
                                    <a
                                        key={link.url}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-lg font-bold hover:underline decoration-4 underline-offset-4"
                                    >
                                        <ExternalLink size={24} />
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <MediaGallery media={project.media} />
            </div>
        </section>
    );
};

export default ProjectSection;
