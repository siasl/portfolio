import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resolveAssetUrl } from '../utils/urls';
import PreviewVideo from './PreviewVideo';
import SketchEmbed from './SketchEmbed';
import JibbitzPreview from './previews/JibbitzPreview';
import { MockupPauseProvider } from './previews/MockupControls';
import { creativeCodeSketches } from '../data/creativeCode';
import { KineticHeading, MagneticCard, TopoDivider, TrailMarker } from './AlpineMotifs';

type Item = {
    kind: string;
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: React.ReactNode;
    to: string;
    className: string;
    imgClass: string;
    loop?: string;
};

const ITEMS: Item[] = [
    {
        kind: 'Book arts',
        src: '/assets/previews/book-arts.jpg',
        width: 960,
        height: 540,
        loop: '/assets/previews/book-arts.mp4',
        alt: 'A pop-up spread rising as a hand opens the page, with a small cut-paper figure and a handwritten note',
        caption: <>Pop-up paper engineering and hand-bound monotype books, including a camping-trip pop-up book and <i>Tied Up</i>.</>,
        to: '/work/book-arts',
        className: 'sm:col-span-2 md:col-span-7',
        imgClass: 'aspect-[16/9]',
    },
    {
        kind: 'Photography',
        src: '/assets/cards/milky-way.jpg',
        width: 1400,
        height: 933,
        alt: 'The Milky Way over Mount Monadnock',
        caption: <>The Milky Way over Mount Monadnock, New Hampshire.</>,
        to: '/photo-video#photography',
        className: 'sm:col-span-2 md:col-span-5',
        imgClass: 'aspect-[4/3]',
    },
    {
        kind: 'Video',
        src: '/assets/video/frisbeePoster.png',
        width: 1080,
        height: 1920,
        loop: '/assets/video/Perspective_3.mp4',
        alt: 'Looping preview of a forced-perspective video where I appear giant behind a house throwing a frisbee',
        caption: <>Forced-perspective frisbee video shot and edited in After Effects (8.2M views, 1M likes on TikTok).</>,
        to: '/photo-video#video',
        className: 'sm:col-span-1 md:col-span-6',
        imgClass: 'aspect-[4/5]',
    },
    {
        kind: 'XR',
        src: '/assets/previews/xr.jpg',
        width: 480,
        height: 984,
        loop: '/assets/previews/xr.mp4',
        alt: 'A Snapchat AR lens placing low-poly farm animals behind a fence in a real room',
        caption: <>AR lenses built in Snapchat Lens Studio: farm animals, furniture placement, a paper sailboat, and a retro radio.</>,
        to: '/work/xr',
        className: 'sm:col-span-1 md:col-span-6',
        imgClass: 'aspect-[4/5]',
    },
];

const FEATURED_SKETCH = creativeCodeSketches.find(s => s.id === 'loop-project') ?? creativeCodeSketches[0];

/** Mixed-ratio gallery of creative coding, paper engineering, video, photography, XR, and standalone tools. */
const MakingSection: React.FC = () => {
    const [paused, setPaused] = useState(false);

    return (
        <section id="making" className="pt-2">
            <TopoDivider elevation="03 / MAKING" />
            <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <KineticHeading as="h2" text="Making" className="section-title" />
                        <p className="mt-2.5 max-w-prose leading-relaxed text-ink/85">
                            Creative coding, paper engineering, printmaking, video, photography, AR lenses, and standalone browser tools.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setPaused(p => !p)}
                        aria-pressed={paused}
                        className="control-btn self-start sm:self-end"
                    >
                        {paused ? 'Play motion' : 'Pause motion'}
                    </button>
                </div>

                <MockupPauseProvider paused={paused}>
                    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-12">
                        <div className="grid grid-cols-1 items-center gap-6 sm:col-span-2 md:col-span-12 md:grid-cols-12">
                            <div className="md:col-span-7">
                                <div className="mb-2 flex items-center justify-between border-b border-line pb-1.5">
                                    <TrailMarker tier="green" label="Creative code" />
                                    <span className="font-mono text-[12px] text-muted">p5.js · Matter.js · D3 · WebGL</span>
                                </div>
                                {paused ? (
                                    <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-line bg-[#181715] px-6 text-center font-mono text-[13px] text-[#ECE8DF]">
                                        SILAS Loop paused. Select Play motion above to resume.
                                    </div>
                                ) : (
                                    <SketchEmbed sketch={FEATURED_SKETCH} compact />
                                )}
                            </div>
                            <div className="md:col-span-5">
                                <MagneticCard strength={4}>
                                    <Link to="/creative-code" className="group block">
                                        <h3 className="heading text-2xl transition-colors group-hover:text-accent md:text-[1.7rem]">
                                            Creative Code sketches
                                        </h3>
                                        <p className="mt-2 max-w-prose leading-relaxed text-ink/85">
                                            Interactive experiments from Creative Coding at CU Boulder’s ATLAS Institute:
                                            a color-attraction generator, a 3D Gaussian-splat point cloud, D3 visualizations
                                            of my Spotify library, a Matter.js physics clock, and a cowbell-detecting neural net.
                                        </p>
                                        <span className="mt-3 inline-flex min-h-[44px] items-center text-[15px] font-semibold underline decoration-ink/35 underline-offset-[4px] transition-colors group-hover:text-accent group-hover:decoration-accent">
                                            Open all {creativeCodeSketches.length} live sketches
                                        </span>
                                    </Link>
                                </MagneticCard>
                            </div>
                        </div>

                        {ITEMS.map(item => (
                            <figure key={item.src} className={item.className}>
                                <MagneticCard strength={4}>
                                    <Link to={item.to} className="group block">
                                        <div className="mb-2 flex items-center justify-between border-b border-line pb-1.5">
                                            <TrailMarker tier="green" label={item.kind} />
                                            <span className="text-[13px] font-semibold text-muted transition-colors group-hover:text-accent">
                                                View
                                            </span>
                                        </div>
                                        {item.loop ? (
                                            <PreviewVideo src={item.loop} poster={item.src} className={`w-full rounded-lg object-cover ${item.imgClass}`} />
                                        ) : (
                                            <img
                                                src={resolveAssetUrl(item.src)}
                                                alt={item.alt}
                                                width={item.width}
                                                height={item.height}
                                                loading="lazy"
                                                className={`w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.015] ${item.imgClass}`}
                                            />
                                        )}
                                    </Link>
                                </MagneticCard>
                                <figcaption className="mt-2.5 max-w-prose text-[15px] leading-relaxed text-ink/80">{item.caption}</figcaption>
                            </figure>
                        ))}

                        <figure className="sm:col-span-2 md:col-span-12">
                            <MagneticCard strength={4}>
                                <a
                                    href="https://jibbitz.silashowe.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group grid grid-cols-1 items-center gap-6 md:grid-cols-12"
                                >
                                    <div className="md:col-span-7">
                                        <div className="mb-2 flex items-center justify-between border-b border-line pb-1.5">
                                            <TrailMarker tier="blue" label="Browser tool" />
                                            <span className="font-mono text-[12px] text-muted">STL / 3MF export ↗</span>
                                        </div>
                                        <div aria-hidden="true" className="theme-light dark:rounded-lg dark:bg-paper dark:p-3">
                                            <JibbitzPreview />
                                        </div>
                                    </div>
                                    <div className="md:col-span-5">
                                        <h3 className="heading text-2xl transition-colors group-hover:text-accent md:text-[1.7rem]">
                                            Jibbitz generator
                                        </h3>
                                        <p className="mt-2 max-w-prose leading-relaxed text-ink/85">
                                            Turns any uploaded image into a 3D-printable Crocs charm in the browser: reduces
                                            the art to four filament colors, extrudes the relief in 3D, and exports print-ready STL and 3MF files.
                                        </p>
                                        <span className="mt-3 inline-flex min-h-[44px] items-center text-[15px] font-semibold underline decoration-ink/35 underline-offset-[4px] transition-colors group-hover:text-accent group-hover:decoration-accent">
                                            Launch jibbitz.silashowe.com ↗
                                        </span>
                                    </div>
                                </a>
                            </MagneticCard>
                        </figure>
                    </div>
                </MockupPauseProvider>
            </div>
        </section>
    );
};

export default MakingSection;
