import React, { useState } from 'react';
import type { MediaItem } from '../data/projects';
import { resolveAssetUrl } from '../utils/urls';
import { ZoomImage, type LightboxItem } from './Lightbox';

const captionOf = (item: MediaItem) => item.descriptionTitle || item.description;

/** A still with a button; the heavy 360° viewer only loads when asked for. */
const PanoLauncher: React.FC<{ item: MediaItem }> = ({ item }) => {
    const [on, setOn] = useState(false);
    if (on) {
        return (
            <div className="aspect-[2/1] w-full overflow-hidden rounded-lg border border-line bg-black">
                <iframe src={item.src} title={item.descriptionTitle ?? '360° view'} className="h-full w-full" allowFullScreen />
            </div>
        );
    }
    return (
        <div className="relative overflow-hidden rounded-lg border border-line">
            <img src={resolveAssetUrl(item.poster)} alt={item.alt ?? ''} loading="lazy" className="aspect-[2/1] w-full object-cover sm:aspect-[4/1]" />
            <button type="button" onClick={() => setOn(true)} className="control-btn absolute bottom-3 left-3 shadow-sm">
                Launch 360° view
            </button>
        </div>
    );
};

/** One real artifact (image, video, or embed) with a plain caption underneath. Images enlarge on click. */
export const Figure: React.FC<{ item: MediaItem; className?: string; group?: LightboxItem[]; index?: number }> = ({ item, className = '', group, index }) => {
    const caption = captionOf(item);
    const accessibleCaption = typeof caption === 'string' ? caption : item.descriptionTitle;
    let media: React.ReactNode = null;
    if (item.type === 'image' && item.href) {
        media = (
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
                <img src={resolveAssetUrl(item.src)} alt={item.alt ?? ''} loading="lazy" decoding="async" className="w-full rounded-lg border border-line" />
                <span className="mt-2 inline-flex min-h-[44px] items-center text-[15px] font-semibold underline decoration-ink/35 underline-offset-[4px] transition-colors group-hover:text-accent group-hover:decoration-accent">
                    {item.hrefLabel ?? 'Open'} ↗
                </span>
            </a>
        );
    } else if (item.type === 'image') {
        media = (
            <ZoomImage
                src={item.src}
                alt={item.alt ?? ''}
                caption={caption}
                group={group}
                index={index}
                className="w-full rounded-lg border border-line bg-white/40 dark:bg-white/5"
            />
        );
    } else if (item.type === 'video') {
        media = (
            <video
                src={resolveAssetUrl(item.src)}
                poster={resolveAssetUrl(item.poster)}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label={item.alt ?? accessibleCaption ?? 'Project video'}
                className="w-full rounded-lg border border-line bg-black"
            />
        );
    } else if (item.type === 'pano') {
        media = <PanoLauncher item={item} />;
    } else {
        media = (
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-line bg-black/5">
                <iframe src={item.src} title={item.descriptionTitle ?? 'Embedded media'} className="h-full w-full" allowFullScreen loading="lazy" />
            </div>
        );
    }
    return (
        <figure className={className} style={item.maxWidth ? { maxWidth: item.maxWidth } : undefined}>
            {media}
            {(caption || item.qrCode) && (
                <figcaption className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/75">
                    {item.descriptionTitle && item.description ? (
                        <>
                            <span className="font-semibold text-ink">{item.descriptionTitle}</span>
                            <span className="mt-1 block">{item.description}</span>
                        </>
                    ) : caption}
                    {item.qrCode && (
                        <span className="mt-3 flex items-center gap-3">
                            <img
                                src={resolveAssetUrl(item.qrCode)}
                                alt={item.descriptionTitle ? `Snapcode for ${item.descriptionTitle} lens` : 'Snapchat lens Snapcode'}
                                width={120}
                                height={120}
                                className="h-[120px] w-[120px] shrink-0"
                            />
                            {item.lensUrl && (
                                <a href={item.lensUrl} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-[44px] items-center text-[15px]">
                                    Open in Snapchat ↗
                                </a>
                            )}
                        </span>
                    )}
                </figcaption>
            )}
        </figure>
    );
};

/** Lightbox entries for every image in a set, so arrow keys move between them. */
export const lightboxGroup = (media: MediaItem[]): LightboxItem[] =>
    media.filter(m => m.type === 'image' && !m.href).map(m => ({ src: m.src, alt: m.alt ?? '', caption: captionOf(m) }));

export const FigureGrid: React.FC<{ media: MediaItem[]; columns?: 1 | 2 | 3 | 4; className?: string }> = ({ media, columns = 1, className = '' }) => {
    const cols = media.length === 1 ? 'grid-cols-1'
        : columns === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        : columns === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : columns === 2 ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1';
    const group = lightboxGroup(media);
    return (
        <div className={`grid gap-x-6 gap-y-8 ${cols} ${className}`}>
            {media.map((m, i) => {
                const gi = group.findIndex(g => g.src === m.src);
                return <Figure key={`${m.src}-${i}`} item={m} group={gi >= 0 && group.length > 1 ? group : undefined} index={gi} />;
            })}
        </div>
    );
};
