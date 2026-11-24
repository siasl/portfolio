import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SketchEmbed from '../components/SketchEmbed';
import {
    CREATIVE_CODE_CLASS,
    CREATIVE_CODE_REPO,
    creativeCodeSketches,
    type CreativeCodeSketch,
} from '../data/creativeCode';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { KineticHeading, TopoDivider, TrailMarker } from '../components/AlpineMotifs';

const SketchSection: React.FC<{ sketch: CreativeCodeSketch }> = ({ sketch }) => {
    const heading = (
        <div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="heading text-2xl md:text-[1.9rem]">{sketch.title}</h2>
                <span className="font-mono text-[12.5px] text-muted">{sketch.tools}</span>
            </div>
            <div className="mt-3 max-w-prose space-y-3 leading-relaxed text-ink/85">
                <p>{sketch.summary}</p>
                {sketch.details && <p>{sketch.details}</p>}
            </div>
        </div>
    );

    if (sketch.layout === 'split') {
        return (
            <section id={sketch.id} className="border-t border-line py-12 md:py-16">
                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-12">
                    <div className={`md:col-span-5 ${sketch.reverse ? 'md:order-2' : ''}`}>
                        {heading}
                    </div>
                    <div className={`md:col-span-7 ${sketch.reverse ? 'md:order-1' : ''}`}>
                        <SketchEmbed sketch={sketch} />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id={sketch.id} className="border-t border-line py-12 md:py-16">
            {heading}
            <div className="mt-7">
                <SketchEmbed sketch={sketch} />
            </div>
        </section>
    );
};

const CreativeCode: React.FC = () => {
    useDocumentTitle('Creative Code');

    const scrollToSketch = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <article>
                <header className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 md:pt-12">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <Link
                            to={{ pathname: '/', hash: '#making' }}
                            className="link-underline inline-flex min-h-[44px] items-center text-[15px] text-muted hover:text-accent"
                        >
                            ← Back to Making
                        </Link>
                        <TrailMarker tier="green" label="Creative Code" />
                    </div>

                    <KineticHeading
                        as="h1"
                        immediate
                        text="Creative Code"
                        className="heading mt-4 text-[2.4rem] sm:text-[3.3rem]"
                    />
                    <p className="mt-4 max-w-2xl text-[1.1rem] leading-relaxed text-ink/85">
                        Interactive sketches and experiments built for{' '}
                        <a
                            href={CREATIVE_CODE_CLASS}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link"
                        >
                            Creative Coding
                        </a>{' '}
                        in CU Boulder’s ATLAS Institute Creative Technology &amp; Design master’s program.
                    </p>

                    <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line text-[14px] sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
                        <div className="bg-paper p-3.5">
                            <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">Year</dt>
                            <dd className="mt-1 font-medium text-ink">2026</dd>
                        </div>
                        <div className="bg-paper p-3.5">
                            <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">Context</dt>
                            <dd className="mt-1 font-medium text-ink">ATLAS Institute, CU Boulder</dd>
                        </div>
                        <div className="bg-paper p-3.5">
                            <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">Built with</dt>
                            <dd className="mt-1 font-medium text-ink">p5.js, Matter.js, D3.js, WebGL / GLSL</dd>
                        </div>
                        <div className="bg-paper p-3.5">
                            <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">Source</dt>
                            <dd className="mt-1 font-medium text-ink">
                                <a
                                    href={CREATIVE_CODE_REPO}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-link"
                                >
                                    GitHub repository ↗
                                </a>
                            </dd>
                        </div>
                    </dl>

                    <nav aria-label="Sketches on this page" className="mt-6 flex flex-wrap gap-x-2 gap-y-1 text-[15px]">
                        {creativeCodeSketches.map(sketch => (
                            <a
                                key={sketch.id}
                                href={`#${sketch.id}`}
                                onClick={scrollToSketch(sketch.id)}
                                className="text-link inline-flex min-h-[44px] items-center px-2"
                            >
                                {sketch.shortTitle}
                            </a>
                        ))}
                    </nav>
                </header>

                <div className="mx-auto mt-8 max-w-6xl px-5 pb-10 sm:px-8">
                    {creativeCodeSketches.map(sketch => (
                        <SketchSection key={sketch.id} sketch={sketch} />
                    ))}
                </div>

                <TopoDivider elevation="MORE IN MAKING" />
                <nav aria-label="Related work">
                    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
                        <Link to="/photo-video" className="group inline-block min-h-[44px]">
                            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted">More in Making</span>
                            <span className="heading mt-1 block text-3xl transition-colors group-hover:text-accent">
                                Photo &amp; Video →
                            </span>
                        </Link>
                    </div>
                </nav>
            </article>
            <Footer />
        </>
    );
};

export default CreativeCode;
