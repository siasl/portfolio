import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { resolveAssetUrl } from '../utils/urls';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMockupPaused } from './previews/MockupControls';

interface PreviewVideoProps {
    src: string;
    poster: string;
    className?: string;
    style?: React.CSSProperties;
}

/** Muted looping clip that plays only while on screen and unpaused. */
const PreviewVideo: React.FC<PreviewVideoProps> = ({ src, poster, className, style }) => {
    const ref = useRef<HTMLVideoElement>(null);
    const inView = useInView(ref, { margin: '10% 0px 10% 0px' });
    const reduced = useReducedMotion();
    const paused = useMockupPaused();

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        if (inView && !reduced && !paused) {
            video.play().catch(() => { /* autoplay blocked: poster stays */ });
        } else {
            video.pause();
        }
    }, [inView, reduced, paused]);

    return (
        <video
            ref={ref}
            src={resolveAssetUrl(src)}
            poster={resolveAssetUrl(poster)}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className={className}
            style={style}
        />
    );
};

export default PreviewVideo;
