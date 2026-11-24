import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type TrailTier = 'green' | 'blue' | 'black';

const TRAIL_META: Record<TrailTier, { label: string; color: string; short: string }> = {
    green: { label: 'Exploration', color: 'text-pine', short: 'Green circle: exploration and creative study' },
    blue: { label: 'Shipped Tool', color: 'text-cobalt', short: 'Blue square: shipped tool or automation' },
    black: { label: 'End-to-End Build', color: 'text-ink', short: 'Black diamond: multi-part product or hardware system' },
};

/** Functional ski trail-difficulty marker paired with visible category text. */
export const TrailMarker: React.FC<{
    tier: TrailTier;
    label?: string;
    className?: string;
}> = ({ tier, label, className = '' }) => {
    const meta = TRAIL_META[tier];
    const text = label ?? meta.label;
    return (
        <span className={`inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold tracking-[0.02em] ${meta.color} ${className}`}>
            <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" className="shrink-0">
                {tier === 'green' && <circle cx="6" cy="6" r="5" fill="currentColor" />}
                {tier === 'blue' && <rect x="1.25" y="1.25" width="9.5" height="9.5" rx="1" fill="currentColor" />}
                {tier === 'black' && <polygon points="6,0.6 11.4,6 6,11.4 0.6,6" fill="currentColor" />}
            </svg>
            <span>{text}</span>
        </span>
    );
};

/** Subtle topographic contour line divider tying major sections to the alpine trail-map motif. */
export const TopoDivider: React.FC<{ elevation?: string; className?: string }> = ({ elevation, className = '' }) => (
    <div className={`relative mx-auto max-w-6xl px-5 sm:px-8 ${className}`} aria-hidden="true">
        <div className="relative flex items-center">
            <svg
                viewBox="0 0 1120 26"
                preserveAspectRatio="none"
                className="h-[22px] w-full text-ink/20"
                fill="none"
            >
                <path
                    d="M0 13 C 140 4, 240 22, 390 13 C 540 4, 680 21, 830 12 C 950 5, 1040 19, 1120 13"
                    stroke="currentColor"
                    strokeWidth="1.15"
                />
                <path
                    d="M0 18 C 160 10, 270 25, 420 17 C 570 9, 710 24, 860 16 C 970 10, 1055 21, 1120 17"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    strokeDasharray="4 4"
                    opacity="0.65"
                />
            </svg>
            {elevation && (
                <span className="ml-3 shrink-0 font-mono text-[11px] tracking-[0.06em] text-muted">
                    {elevation}
                </span>
            )}
        </div>
    </div>
);

/**
 * Kinetic word-by-word heading entrance inspired by the SILAS Loop sketch.
 * Uses aria-label on the heading and aria-hidden spans so screen readers read plain text.
 */
export const KineticHeading: React.FC<{
    as?: 'h1' | 'h2' | 'h3';
    text: string;
    className?: string;
    immediate?: boolean;
}> = ({ as = 'h2', text, className = '', immediate = false }) => {
    const reduced = useReducedMotion();
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [seen, setSeen] = useState(immediate);
    const words = text.split(' ');
    const Tag = as;

    useEffect(() => {
        if (seen || reduced) return;
        const el = headingRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') {
            setSeen(true);
            return;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 80 && rect.bottom > -80) {
            setSeen(true);
            return;
        }
        const observer = new IntersectionObserver(
            entries => {
                if (entries.some(e => e.isIntersecting)) {
                    setSeen(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '80px 0px', threshold: 0 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [seen, reduced]);

    if (reduced) {
        return <Tag className={className}>{text}</Tag>;
    }

    return (
        <Tag ref={headingRef} className={className} aria-label={text}>
            <span aria-hidden="true" className="inline">
                {words.map((word, idx) => (
                    <span key={`${word}-${idx}`} className="inline-block overflow-hidden align-bottom">
                        <motion.span
                            className="inline-block"
                            initial={{ y: '65%', opacity: 0 }}
                            animate={seen ? { y: '0%', opacity: 1 } : { y: '65%', opacity: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: Math.min(idx * 0.035, 0.3),
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {word}
                        </motion.span>
                        {idx < words.length - 1 ? '\u00A0' : ''}
                    </span>
                ))}
            </span>
        </Tag>
    );
};

/**
 * Spring-weighted card wrapper inspired by the Color-Attraction Generator and Physics Clock.
 * Subtly pulls toward the pointer on desktop and settles back with spring physics; static on touch or reduced motion.
 */
export const MagneticCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    strength?: number;
}> = ({ children, className = '', strength = 5 }) => {
    const reduced = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.6 });
    const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.6 });

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        rawX.set(nx * strength * 2);
        rawY.set(ny * strength * 2 - 2);
    };

    const onLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    if (reduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            whileTap={{ scale: 0.992 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
