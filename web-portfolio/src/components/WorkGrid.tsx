import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { workProjects, type Project } from '../data/projects';
import { resolveAssetUrl } from '../utils/urls';
import { RecipeAgentPreview } from './previews/RecipeAgentDemo';
import { MockupPauseProvider } from './previews/MockupControls';
import AnimatedLead from './AnimatedLead';
import { KineticHeading, MagneticCard } from './AlpineMotifs';

/** Asymmetric grid spans so the four project cards follow content weight instead of a uniform template. */
const SPANS: Record<string, string> = {
    'call-light': 'md:col-span-7',
    'pretty-pulses': 'md:col-span-5',
    'personal-automations': 'md:col-span-5',
    'do-board': 'md:col-span-7',
};

const CardMedia: React.FC<{ project: Project }> = ({ project }) => {
    const card = project.card;
    if (!card) return null;
    if (card.kind === 'pair') {
        return (
            <div className="flex aspect-[4/3] items-center gap-4 overflow-hidden rounded-lg bg-[#E4ECEA] p-5 dark:bg-[#26302D]">
                <img src={resolveAssetUrl(card.side)} alt="" loading="lazy" className="h-full w-auto rounded-sm object-contain shadow-sm" />
                <img src={resolveAssetUrl(card.src)} alt="" loading="lazy" className="min-w-0 flex-1 rounded-sm object-contain shadow-sm" />
            </div>
        );
    }
    if (card.kind === 'call-light' || card.kind === 'pretty-pulses') return <AnimatedLead kind={card.kind} />;
    if (card.kind === 'video') return <AnimatedLead kind="do-board" className="aspect-[16/11]" />;
    if (card.kind === 'agent') {
        return (
            <div className="theme-light relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-[#E8E4DA] dark:bg-paper">
                <RecipeAgentPreview />
            </div>
        );
    }
    return (
        <div className={`overflow-hidden rounded-lg ${card.bg ?? 'bg-[#E7E2D8] dark:bg-[#2E2A24]'} ${card.aspect ?? 'aspect-[4/3]'} ${card.fit === 'contain' ? 'flex items-center justify-center p-5' : ''}`}>
            <img
                src={resolveAssetUrl(card.src)}
                alt=""
                loading="lazy"
                className={card.fit === 'contain' ? 'max-h-full max-w-full rounded-sm object-contain shadow-sm' : 'h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]'}
            />
        </div>
    );
};

const WorkGrid: React.FC = () => {
    const [paused, setPaused] = useState(false);

    return (
        <section id="work" className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="font-mono text-[11px] tracking-[0.08em] text-muted">01 / SELECTED PROJECTS</div>
                    <KineticHeading as="h2" text="Selected projects" className="section-title mt-1" />
                </div>
                <button
                    type="button"
                    onClick={() => setPaused(p => !p)}
                    aria-pressed={paused}
                    className="control-btn self-start sm:self-end"
                >
                    {paused ? 'Play previews' : 'Pause previews'}
                </button>
            </div>

            <MockupPauseProvider paused={paused}>
                <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-12">
                    {workProjects.map(project => (
                        <article key={project.id} className={SPANS[project.id] ?? 'md:col-span-6'}>
                            <MagneticCard strength={4}>
                                <Link to={`/work/${project.id}`} className="group block">
                                    {/* Hide decorative UI strings inside animated reconstructions from the link's accessible name. */}
                                    <div aria-hidden="true">
                                        <CardMedia project={project} />
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="heading text-2xl transition-colors group-hover:text-accent md:text-[1.7rem]">
                                            {project.title}
                                        </h3>
                                        {project.year && (
                                            <p className="mt-1 font-mono text-[12.5px] tracking-[0.04em] text-muted">
                                                {project.year}
                                            </p>
                                        )}
                                        <p className="mt-2.5 max-w-prose leading-relaxed text-ink/85">{project.summary}</p>
                                        {project.note && (
                                            <p className="mt-2.5 border-t border-line pt-2 font-mono text-[12.5px] leading-snug text-ink/80">
                                                {project.note}
                                            </p>
                                        )}
                                        <span className="mt-3 inline-flex min-h-[44px] items-center text-[15px] font-semibold underline decoration-ink/35 underline-offset-[4px] transition-colors group-hover:text-accent group-hover:decoration-accent">
                                            Read case study
                                        </span>
                                    </div>
                                </Link>
                            </MagneticCard>
                        </article>
                    ))}
                </div>
            </MockupPauseProvider>
        </section>
    );
};

export default WorkGrid;
