import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { caseStudies, getProject, type StoryBlock } from '../data/projects';
import Footer from '../components/Footer';
import { Figure, FigureGrid } from '../components/StoryMedia';
import { resolveAssetUrl } from '../utils/urls';
import AnimatedLead from '../components/AnimatedLead';
import { MockupControls } from '../components/previews/MockupControls';
import { KineticHeading, TopoDivider, TrailMarker, type TrailTier } from '../components/AlpineMotifs';

const PROJECT_TIERS: Record<string, TrailTier> = {
    'call-light': 'black',
    'pretty-pulses': 'blue',
    'personal-automations': 'blue',
    'do-board': 'black',
    'xr': 'green',
    'book-arts': 'green',
};

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="max-w-prose space-y-4 leading-relaxed text-ink/85">{children}</div>
);

const Demo: React.FC<{ demo: NonNullable<StoryBlock['demo']> }> = ({ demo }) => (
    <figure className="mt-8">
        <MockupControls label="reconstruction">
            <div className="theme-light rounded-lg border border-line bg-[#EDE9DF] p-3 sm:p-4 dark:bg-paper">
                {demo.node}
            </div>
        </MockupControls>
        <figcaption className="mt-2.5 max-w-prose text-[15px] leading-relaxed text-ink/75">{demo.label}</figcaption>
    </figure>
);

/** One story section. Text stays in a ~65-character column; artifacts run full width or sit beside the text. */
const Block: React.FC<{ block: StoryBlock }> = ({ block }) => {
    const sub = block.level === 3;
    const Heading = sub ? 'h3' : 'h2';
    const heading = (
        <Heading className={`heading ${sub ? 'text-xl md:text-[1.45rem]' : 'text-2xl md:text-[1.95rem]'}`}>{block.heading}</Heading>
    );
    const media = block.media && block.media.length > 0 ? <FigureGrid media={block.media} columns={block.columns} /> : null;

    if (block.layout === 'split') {
        return (
            <section className={sub ? 'py-8 md:py-10' : 'border-t border-line py-12 md:py-16'}>
                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-12">
                    <div className={`md:col-span-5 ${block.reverse ? 'md:order-2' : ''}`}>
                        {heading}
                        {block.body && <div className="mt-4"><Body>{block.body}</Body></div>}
                    </div>
                    <div className={`md:col-span-7 ${block.reverse ? 'md:order-1' : ''}`}>
                        {block.lead && <Figure item={block.lead} />}
                        {block.demo && block.media ? (
                            <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-[1fr_minmax(0,220px)]">
                                <figure>
                                    <MockupControls label="reconstruction">
                                        <div className="theme-light rounded-lg border border-line bg-[#EDE9DF] p-3 sm:p-4 dark:bg-paper">
                                            {block.demo.node}
                                        </div>
                                    </MockupControls>
                                    <figcaption className="mt-2.5 text-[15px] leading-relaxed text-ink/75">{block.demo.label}</figcaption>
                                </figure>
                                {media}
                            </div>
                        ) : media}
                        {block.demo && !block.media && (
                            <figure>
                                <MockupControls label="reconstruction">
                                    <div className="theme-light rounded-lg border border-line bg-[#EDE9DF] p-3 sm:p-4 dark:bg-paper">
                                        {block.demo.node}
                                    </div>
                                </MockupControls>
                                <figcaption className="mt-2.5 text-[15px] leading-relaxed text-ink/75">{block.demo.label}</figcaption>
                            </figure>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={sub ? 'py-8 md:py-10' : 'border-t border-line py-12 md:py-16'}>
            {heading}
            {block.body && <div className="mt-4"><Body>{block.body}</Body></div>}
            {block.notes && (
                <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {block.notes.map(n => (
                        <div key={n.title} className="max-w-prose rounded-sm border border-line p-4">
                            <dt className="font-semibold text-ink">{n.title}</dt>
                            <dd className="mt-1.5 leading-relaxed text-ink/85">{n.body}</dd>
                        </div>
                    ))}
                </dl>
            )}
            {block.lead && <Figure item={block.lead} className="mt-8" />}
            {media && <div className="mt-8">{media}</div>}
            {block.demo && <Demo demo={block.demo} />}
        </section>
    );
};

const CaseStudy: React.FC = () => {
    const { id } = useParams();
    const project = getProject(id);
    const valid = project && project.group !== 'media';
    useDocumentTitle(valid ? project.title : 'Page not found');
    if (!valid) return <NotFound />;

    const index = caseStudies.findIndex(p => p.id === project.id);
    const next = caseStudies[(index + 1) % caseStudies.length];
    const back = project.group === 'work' ? '#work' : '#making';
    const backLabel = project.group === 'work' ? '← Back to Selected projects' : '← Back to Making';
    const tier = PROJECT_TIERS[project.id] ?? 'blue';

    return (
        <>
            <article>
                <header className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 md:pt-12">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <Link
                            to={{ pathname: '/', hash: back }}
                            className="link-underline inline-flex min-h-[44px] items-center text-[15px] text-muted hover:text-accent"
                        >
                            {backLabel}
                        </Link>
                        <TrailMarker tier={tier} />
                    </div>

                    <KineticHeading
                        as="h1"
                        immediate
                        text={project.title}
                        className="heading mt-4 text-[2.4rem] sm:text-[3.3rem]"
                    />
                    <p className="mt-4 max-w-2xl text-[1.12rem] leading-relaxed text-ink/85">{project.summary ?? project.hook}</p>

                    {project.note && (
                        <p className="mt-4 max-w-2xl rounded-sm border border-line bg-paper px-4 py-3 font-mono text-[13px] leading-relaxed text-ink">
                            <span className="mr-2 font-semibold uppercase tracking-[0.06em] text-cobalt">Outcome:</span>
                            {project.note}
                        </p>
                    )}

                    {(project.meta?.length || project.year) && (
                        <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line text-[14px] sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
                            {project.year && (
                                <div className="bg-paper p-3.5">
                                    <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">Year</dt>
                                    <dd className="mt-1 font-medium text-ink">{project.year}</dd>
                                </div>
                            )}
                            {project.meta?.map(m => (
                                <div key={m.label} className="bg-paper p-3.5">
                                    <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{m.label}</dt>
                                    <dd className="mt-1 font-medium text-ink">{m.value}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </header>

                {project.leadKind && (
                    <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
                        <MockupControls label={`${project.title} preview`}>
                            <AnimatedLead kind={project.leadKind} size="lead" className="aspect-[4/3] sm:aspect-[16/9]" />
                        </MockupControls>
                        {project.leadNote && <p className="mt-2 text-[15px] text-ink/75">{project.leadNote}</p>}
                    </div>
                )}

                {project.lead && !project.leadKind && (
                    <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
                        <Figure item={project.lead} />
                    </div>
                )}

                <div className="mx-auto mt-12 max-w-6xl px-5 pb-10 sm:px-8">
                    {project.story?.map(block => <Block key={block.heading} block={block} />)}

                    {project.media.length > 0 && (
                        <section className="border-t border-line py-12 md:py-16">
                            <FigureGrid media={project.media} columns={project.media.length > 1 ? 2 : 1} />
                        </section>
                    )}

                    {project.links && project.links.length > 0 && (
                        <div className="flex flex-wrap gap-4 border-t border-line pt-8 text-[15px]">
                            {project.links.map(link => (
                                <a
                                    key={link.url}
                                    href={resolveAssetUrl(link.url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-link inline-flex min-h-[44px] items-center"
                                >
                                    {link.label} ↗
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <TopoDivider elevation="NEXT PROJECT" />
                <nav aria-label="Next project">
                    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
                        <Link to={`/work/${next.id}`} className="group inline-block min-h-[44px]">
                            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted">Next project</span>
                            <span className="heading mt-1 block text-3xl transition-colors group-hover:text-accent">
                                {next.title} →
                            </span>
                        </Link>
                    </div>
                </nav>
            </article>
            <Footer />
        </>
    );
};

export default CaseStudy;
