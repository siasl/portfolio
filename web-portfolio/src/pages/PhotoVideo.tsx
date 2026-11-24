import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { Figure } from '../components/StoryMedia';
import { ZoomImage, type LightboxItem } from '../components/Lightbox';
import { getProject } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { KineticHeading, TrailMarker } from '../components/AlpineMotifs';

const PhotoVideo: React.FC = () => {
    useDocumentTitle('Photo & Video');
    const photos = getProject('photography')?.media ?? [];
    const videos = getProject('video')?.media ?? [];
    const group: LightboxItem[] = photos.map(p => ({ src: p.src, alt: p.alt ?? '' }));
    const [lead, ...rest] = photos;
    const shorts = videos.filter(v => v.type === 'video');
    const long = videos.filter(v => v.type === 'iframe');

    return (
        <>
            <article className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 md:pt-12">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                        to={{ pathname: '/', hash: '#making' }}
                        className="link-underline inline-flex min-h-[44px] items-center text-[15px] text-muted hover:text-accent"
                    >
                        ← Back to Making
                    </Link>
                    <TrailMarker tier="green" label="Photo & Video" />
                </div>

                <KineticHeading
                    as="h1"
                    immediate
                    text="Photo & Video"
                    className="heading mt-4 text-[2.4rem] sm:text-[3.3rem]"
                />
                <p className="mt-4 max-w-2xl text-[1.1rem] leading-relaxed text-ink/85">
                    Night skies, mountains, and short videos that play with perspective. I shot and edited everything here.
                </p>
                <nav aria-label="On this page" className="mt-4 flex gap-3 text-[15px]">
                    <a
                        href="#photography"
                        onClick={e => { e.preventDefault(); document.getElementById('photography')?.scrollIntoView(); }}
                        className="text-link inline-flex min-h-[44px] items-center px-2"
                    >
                        Photography
                    </a>
                    <a
                        href="#video"
                        onClick={e => { e.preventDefault(); document.getElementById('video')?.scrollIntoView(); }}
                        className="text-link inline-flex min-h-[44px] items-center px-2"
                    >
                        Video
                    </a>
                </nav>

                <section id="photography" className="mt-10 border-t border-line pt-10">
                    <h2 className="heading text-2xl md:text-[1.9rem]">Photography</h2>
                    {lead && (
                        <div className="mt-6">
                            <ZoomImage src={lead.src} alt={lead.alt ?? ''} group={group} index={0} className="w-full rounded-lg border border-line" />
                        </div>
                    )}
                    {/* Masonry columns keep mixed aspect ratios from leaving ragged gaps. */}
                    <div className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3">
                        {rest.map((p, i) => (
                            <div key={p.src} className="mb-6 break-inside-avoid">
                                <ZoomImage src={p.src} alt={p.alt ?? ''} group={group} index={i + 1} className="w-full rounded-lg border border-line" />
                            </div>
                        ))}
                    </div>
                </section>

                <section id="video" className="mt-12 border-t border-line pt-10">
                    <h2 className="heading text-2xl md:text-[1.9rem]">Video</h2>
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {shorts.map(v => <Figure key={v.src} item={v} />)}
                    </div>
                    <div className="mt-10">
                        {long.map(v => <Figure key={v.src} item={v} />)}
                    </div>
                </section>
            </article>
            <Footer />
        </>
    );
};

export default PhotoVideo;
