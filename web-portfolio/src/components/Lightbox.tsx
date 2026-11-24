import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { resolveAssetUrl } from '../utils/urls';

export type LightboxItem = { src: string; alt: string; caption?: React.ReactNode };

type Ctx = { open: (items: LightboxItem[], index: number) => void };
const LightboxContext = createContext<Ctx>({ open: () => {} });

/** Full-size image viewer with focus trapping, Escape to close, and arrow-key navigation. */
export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<{ items: LightboxItem[]; index: number } | null>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const returnFocus = useRef<HTMLElement | null>(null);

    const open = useCallback((items: LightboxItem[], index: number) => {
        returnFocus.current = document.activeElement as HTMLElement;
        setState({ items, index });
    }, []);
    const close = useCallback(() => {
        setState(null);
        returnFocus.current?.focus();
    }, []);
    const step = useCallback((delta: number) => {
        setState(s => (s ? { ...s, index: (s.index + delta + s.items.length) % s.items.length } : s));
    }, []);

    useEffect(() => {
        if (!state) return;
        closeRef.current?.focus();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                close();
            } else if (e.key === 'ArrowRight') {
                step(1);
            } else if (e.key === 'ArrowLeft') {
                step(-1);
            } else if (e.key === 'Tab' && dialogRef.current) {
                const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
                );
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [state, close, step]);

    const item = state?.items[state.index];
    const many = (state?.items.length ?? 0) > 1;

    return (
        <LightboxContext.Provider value={{ open }}>
            {children}
            {state && item && (
                <div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={item.alt || 'Enlarged image'}
                    className="hero-surface fixed inset-0 z-[100] flex flex-col bg-[#141312]/95 text-white"
                    onClick={close}
                >
                    <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80" onClick={e => e.stopPropagation()}>
                        <span className="font-mono text-[13px]">{many ? `${state.index + 1} / ${state.items.length}` : ''}</span>
                        <button
                            ref={closeRef}
                            type="button"
                            onClick={close}
                            className="inline-flex min-h-[44px] items-center rounded-sm border border-white/45 px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 active:scale-95"
                        >
                            Close (Esc)
                        </button>
                    </div>
                    <div className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
                        <img
                            src={resolveAssetUrl(item.src)}
                            alt={item.alt}
                            className="max-h-full max-w-full object-contain"
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-4 text-[15px] text-white/90" onClick={e => e.stopPropagation()}>
                        {many ? (
                            <button
                                type="button"
                                onClick={() => step(-1)}
                                className="inline-flex min-h-[44px] shrink-0 items-center rounded-sm border border-white/45 px-3.5 py-2 text-[14px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 active:scale-95"
                            >
                                ← Previous
                            </button>
                        ) : <span />}
                        <p className="max-w-2xl text-center">{item.caption}</p>
                        {many ? (
                            <button
                                type="button"
                                onClick={() => step(1)}
                                className="inline-flex min-h-[44px] shrink-0 items-center rounded-sm border border-white/45 px-3.5 py-2 text-[14px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 active:scale-95"
                            >
                                Next →
                            </button>
                        ) : <span />}
                    </div>
                </div>
            )}
        </LightboxContext.Provider>
    );
};

export const useLightbox = () => useContext(LightboxContext);

/** Image button that opens full size in the lightbox. */
export const ZoomImage: React.FC<{
    src: string;
    alt: string;
    caption?: React.ReactNode;
    className?: string;
    group?: LightboxItem[];
    index?: number;
}> = ({ src, alt, caption, className = '', group, index = 0 }) => {
    const { open } = useLightbox();
    const items = group ?? [{ src, alt, caption }];
    return (
        <button
            type="button"
            onClick={() => open(items, group ? index : 0)}
            className="group block w-full cursor-zoom-in rounded-lg text-left transition-opacity active:opacity-90"
            aria-label={`Enlarge image: ${alt || 'project media'}`}
        >
            <img src={resolveAssetUrl(src)} alt={alt} loading="lazy" decoding="async" className={className} />
        </button>
    );
};
