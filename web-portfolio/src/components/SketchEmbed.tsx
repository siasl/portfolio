import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CreativeCodeSketch } from '../data/creativeCode';
import { useReducedMotion } from '../hooks/useReducedMotion';
import PreviewVideo from './PreviewVideo';
import { MockupPauseProvider } from './previews/MockupControls';

interface SketchEmbedProps {
    sketch: CreativeCodeSketch;
    /** Hide the outer toolbar (used for compact preview tiles). */
    compact?: boolean;
}

const LOAD_TIMEOUT_MS = 12000;

/**
 * Responsive, lazily mounted iframe wrapper for Creative Code sketches.
 * Handles fixed-canvas scaling, tall-scroll frames, click-to-load heavy apps, and timeout fallbacks.
 */
const SketchEmbed: React.FC<SketchEmbedProps> = ({ sketch, compact = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [active, setActive] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [timedOut, setTimedOut] = useState<boolean>(false);
    const [reloadCount, setReloadCount] = useState<number>(0);
    const [previewPaused, setPreviewPaused] = useState<boolean>(false);
    const reducedMotion = useReducedMotion();

    const effectiveLoadMode: 'auto' | 'click' =
        reducedMotion && sketch.loadMode === 'auto' ? 'click' : sketch.loadMode;

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => setContainerWidth(el.clientWidth);
        update();

        if (typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(update);
            ro.observe(el);
            return () => ro.disconnect();
        }
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        if (effectiveLoadMode !== 'auto' || active) return;
        const el = containerRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setActive(true);
            return;
        }
        const observer = new IntersectionObserver(
            entries => {
                if (entries.some(e => e.isIntersecting)) {
                    setActive(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '180px 0px' },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [effectiveLoadMode, active]);

    useEffect(() => {
        if (!active || loaded) return;
        const timer = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
        return () => window.clearTimeout(timer);
    }, [active, loaded, reloadCount]);

    const { frame } = sketch;
    const maxWidthStyle =
        frame.kind === 'fixed' || frame.kind === 'tall-scroll'
            ? { maxWidth: frame.maxWidth }
            : undefined;

    let stageHeight: number;
    let iframeStyle: React.CSSProperties;
    let scrolling: 'no' | 'yes' | 'auto' = 'auto';

    if (frame.kind === 'fixed') {
        const w = containerWidth || Math.min(frame.maxWidth, frame.width);
        const scale = w / frame.width;
        stageHeight = Math.round(frame.height * scale);
        scrolling = 'no';
        iframeStyle = {
            width: frame.width,
            height: frame.height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
        };
    } else if (frame.kind === 'tall-scroll') {
        const w = containerWidth || Math.min(frame.maxWidth, frame.width);
        const scale = Math.min(1, w / frame.width);
        stageHeight = Math.round(frame.viewportHeight * scale);
        scrolling = 'yes';
        iframeStyle =
            scale < 1
                ? {
                      width: frame.width,
                      height: frame.viewportHeight,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                  }
                : {
                      width: '100%',
                      height: frame.viewportHeight,
                  };
    } else {
        const minW = frame.minWidth ?? 0;
        if (minW > 0 && containerWidth > 0 && containerWidth < minW) {
            const scale = containerWidth / minW;
            stageHeight = Math.round(frame.height * scale);
            iframeStyle = {
                width: minW,
                height: frame.height,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
            };
        } else {
            stageHeight = frame.height;
            iframeStyle = {
                width: '100%',
                height: frame.height,
            };
        }
    }

    if (sketch.preview) {
        return (
            <div className="overflow-hidden rounded-lg border border-line bg-paper">
                {!compact && (
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line bg-paper px-3.5 py-1 text-[13px] text-muted">
                        <span className="py-2">{sketch.interactionHint}</span>
                        <div className="flex shrink-0 flex-wrap items-center gap-3 text-ink">
                            <button
                                type="button"
                                onClick={() => setPreviewPaused(p => !p)}
                                aria-pressed={previewPaused}
                                className="text-link inline-flex min-h-[44px] items-center px-1 font-medium"
                            >
                                {previewPaused ? 'Play clip' : 'Pause clip'}
                            </button>
                            <a href={sketch.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-[44px] items-center px-1">
                                Open live ↗
                            </a>
                            <a href={sketch.codeUrl} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-[44px] items-center px-1">
                                Code ↗
                            </a>
                        </div>
                    </div>
                )}
                <MockupPauseProvider paused={previewPaused}>
                    <div style={{ backgroundColor: frame.bg }}>
                        <PreviewVideo
                            src={sketch.preview.video}
                            poster={sketch.preview.poster}
                            style={{ aspectRatio: sketch.preview.aspect }}
                            className="mx-auto block w-full max-w-3xl object-cover"
                        />
                    </div>
                </MockupPauseProvider>
            </div>
        );
    }

    const handleReload = () => {
        setLoaded(false);
        setTimedOut(false);
        setActive(true);
        setReloadCount(c => c + 1);
    };

    const handleLaunch = () => {
        setLoaded(false);
        setTimedOut(false);
        setActive(true);
    };

    const handleUnload = () => {
        setActive(false);
        setLoaded(false);
        setTimedOut(false);
    };

    return (
        <div
            className="overflow-hidden rounded-lg border border-line bg-paper"
            style={maxWidthStyle}
        >
            {!compact && (
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line bg-paper px-3.5 py-1 text-[13px] text-muted">
                    <span className="py-2">{sketch.interactionHint}</span>
                    <div className="flex shrink-0 flex-wrap items-center gap-3 text-ink">
                        {active && (
                            <button
                                type="button"
                                onClick={handleReload}
                                className="text-link inline-flex min-h-[44px] items-center px-1 font-medium"
                            >
                                Reload
                            </button>
                        )}
                        {active && effectiveLoadMode === 'click' && (
                            <button
                                type="button"
                                onClick={handleUnload}
                                className="text-link inline-flex min-h-[44px] items-center px-1 font-medium"
                            >
                                Close
                            </button>
                        )}
                        <a
                            href={sketch.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link inline-flex min-h-[44px] items-center px-1"
                        >
                            Open full screen ↗
                        </a>
                        <a
                            href={sketch.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link inline-flex min-h-[44px] items-center px-1"
                        >
                            Code ↗
                        </a>
                    </div>
                </div>
            )}

            <div
                ref={containerRef}
                className="relative w-full overflow-hidden"
                style={{
                    height: active || effectiveLoadMode === 'auto' ? stageHeight : undefined,
                    minHeight: !active && effectiveLoadMode === 'click' ? 240 : undefined,
                    backgroundColor: active ? (frame.bg ?? '#FFFFFF') : undefined,
                }}
            >
                {active ? (
                    <>
                        {!loaded && (
                            <div
                                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-paper/95 px-6 text-center text-[14px] text-ink"
                                aria-live="polite"
                            >
                                {timedOut ? (
                                    <>
                                        <p className="font-semibold">
                                            {sketch.shortTitle} is taking longer than expected to load.
                                        </p>
                                        <p className="max-w-md text-[13.5px] text-muted">
                                            External embeds can be blocked by offline networks or browser privacy settings.
                                        </p>
                                        <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                                            <button type="button" onClick={handleReload} className="control-btn">
                                                Retry embed
                                            </button>
                                            <a
                                                href={sketch.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-link inline-flex min-h-[44px] items-center px-2 font-medium"
                                            >
                                                Open in new tab ↗
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-muted">Loading {sketch.shortTitle}…</span>
                                )}
                            </div>
                        )}
                        <iframe
                            key={`${sketch.id}-${reloadCount}`}
                            src={sketch.liveUrl}
                            title={sketch.title}
                            scrolling={scrolling}
                            loading="lazy"
                            onLoad={() => { setLoaded(true); setTimedOut(false); }}
                            allow="fullscreen; autoplay"
                            referrerPolicy="no-referrer"
                            className="block border-0"
                            style={iframeStyle}
                        />
                    </>
                ) : effectiveLoadMode === 'click' ? (
                    <div className="flex min-h-[260px] flex-col items-start justify-center gap-4 bg-paper px-6 py-10 sm:px-8">
                        <div className="max-w-prose space-y-1.5">
                            <p className="font-semibold text-ink">
                                Interactive embed ready to load
                            </p>
                            {sketch.loadNote && (
                                <p className="text-[15px] leading-relaxed text-ink/80">
                                    {sketch.loadNote}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                type="button"
                                onClick={handleLaunch}
                                className="inline-flex min-h-[44px] items-center rounded-sm bg-ink px-4 py-2 text-[15px] font-semibold text-paper transition-[background-color,transform] duration-150 hover:bg-accent active:scale-[0.98]"
                            >
                                Load {sketch.shortTitle}
                            </button>
                            <a
                                href={sketch.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-link inline-flex min-h-[44px] items-center px-1 text-[15px] font-medium text-ink"
                            >
                                Open in new tab ↗
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-paper text-[14px] text-muted">
                        Loading {sketch.shortTitle}…
                    </div>
                )}
            </div>
        </div>
    );
};

export default SketchEmbed;
