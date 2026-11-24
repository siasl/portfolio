import React, { useId, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Check, Download, Image as ImageIcon, Layers, Box } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useStepLoop } from '../../hooks/useStepLoop';

/**
 * Animated reconstruction of the Jibbitz 3D Generator (jibbitz.silashowe.com):
 * Act 1 quantizes an image to four filament colors; Act 2 extrudes it onto a Crocs backing stem.
 */

const PALETTE = [
    { name: 'Charcoal', hex: '#212936', dark: '#131820' },
    { name: 'Terracotta', hex: '#D9583B', dark: '#9B3721' },
    { name: 'Marigold', hex: '#F4C144', dark: '#BA8B1B' },
    { name: 'Cream', hex: '#FAF7F0', dark: '#CEC7B8' },
] as const;

const STEPS = [1300, 1150, 1300, 1050, 2200, 2100];
const EASE = [0.16, 1, 0.3, 1] as const;

// Stacked shaded copies of the raised 0.8 mm filament regions produce the 3D relief above the 1.8 mm base.
const RaisedColorRegions: React.FC<{ shaded?: boolean; clipId: string }> = ({ shaded = false, clipId }) => {
    const cTerra = shaded ? PALETTE[1].dark : PALETTE[1].hex;
    const cGold = shaded ? PALETTE[2].dark : PALETTE[2].hex;
    const cCream = shaded ? PALETTE[3].dark : PALETTE[3].hex;

    return (
        <g>
            <g clipPath={`url(#${clipId})`}>
                <path d="M 127 81 Q 143 79 158 83 L 158 104 L 145 104 Z" fill={cTerra} />
                <circle cx="131" cy="61" r="11.5" fill={cGold} />
                <polygon points="82,74 96,104 83,104" fill={cTerra} />
                <polygon points="107,54 148,106 110,106" fill={cTerra} />
                <polygon points="107,54 94,74 101,72 106,77 112,71 120,74" fill={cCream} />
                <path
                    d="M 106 105 Q 115 111 103 118 Q 97 122 108 127"
                    fill="none"
                    stroke={cCream}
                    strokeWidth="4.2"
                    strokeLinecap="round"
                />
            </g>
            <circle cx="110" cy="82" r="46.5" fill="none" stroke={cCream} strokeWidth="3.2" />
        </g>
    );
};

const QuantizedBadge: React.FC<{ clipId: string }> = ({ clipId }) => (
    <g>
        <circle cx="110" cy="82" r="52" fill={PALETTE[0].hex} />
        <RaisedColorRegions clipId={clipId} />
    </g>
);

const OriginalBadge: React.FC<{ clipId: string; uid: string }> = ({ clipId, uid }) => (
    <g>
        <circle cx="110" cy="82" r="52" fill="#222B3A" />
        <g clipPath={`url(#${clipId})`}>
            <rect x="60" y="32" width="100" height="100" fill={`url(#${uid}-orig-sky)`} />
            <circle cx="131" cy="61" r="22" fill={`url(#${uid}-orig-glow)`} />
            <circle cx="131" cy="61" r="11.5" fill={`url(#${uid}-orig-sun)`} />
            <polygon points="62,106 82,74 100,106" fill={`url(#${uid}-orig-far)`} />
            <polygon points="68,106 107,54 114,106" fill={`url(#${uid}-orig-mtn-dark)`} />
            <polygon points="107,54 148,106 110,106" fill={`url(#${uid}-orig-mtn-lit)`} />
            <polygon points="107,54 94,74 101,72 106,77 112,71 120,74" fill={`url(#${uid}-orig-snow)`} />
            <path d="M 60 104 Q 92 98 118 104 T 160 103 L 160 132 L 60 132 Z" fill={`url(#${uid}-orig-fg)`} />
            <path
                d="M 106 105 Q 115 111 103 118 Q 97 122 108 127"
                fill="none"
                stroke="#F7EFE2"
                strokeOpacity="0.85"
                strokeWidth="4.2"
                strokeLinecap="round"
            />
        </g>
        <circle cx="110" cy="82" r="46.5" fill="none" stroke="#EDE7DC" strokeWidth="3.2" strokeOpacity="0.88" />
    </g>
);

export const JibbitzPreview: React.FC<{ className?: string; scale?: string }> = ({
    className = 'aspect-[16/11]',
    scale = 'scale-[0.58] sm:scale-[0.95] md:scale-[0.74] lg:scale-[0.96] xl:scale-[1.04]',
}) => {
    const rawId = useId();
    const uid = rawId.replace(/:/g, '');
    const circleClipId = `${uid}-circle-clip`;
    const scanClipId = `${uid}-scan-clip`;

    const rootRef = useRef<HTMLDivElement>(null);
    const inView = useInView(rootRef, { amount: 0.25 });
    const reduced = useReducedMotion();
    const step = useStepLoop(STEPS, inView, reduced, 4, 4);

    const isScanning = step === 1;
    const isQuantized = step >= 2;
    const is3D = step >= 3;
    const isExported = step === 5;
    const act = is3D ? 2 : 1;
    const activeTab = step === 0 ? 0 : step <= 2 ? 1 : 2;

    return (
        <div ref={rootRef} className={`relative overflow-hidden rounded-lg bg-[#EAE3D5] ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                <div className={`flex w-[496px] shrink-0 origin-center flex-col items-center gap-3 ${scale}`}>
                    <div className="relative w-full overflow-hidden rounded-xl bg-white text-ink shadow-md ring-1 ring-black/10">
                        <div className="flex items-center gap-2 border-b border-black/10 bg-[#F4F1EA] px-3 py-2">
                            <div className="flex gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                                <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                                <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                            </div>
                            <div className="ml-1 flex-1 truncate rounded-sm bg-white px-3 py-0.5 font-mono text-[10px] text-muted ring-1 ring-black/10">
                                jibbitz.silashowe.com
                            </div>
                            <span className="rounded-sm bg-[#F7CA44]/50 px-2 py-0.5 font-mono text-[9px] font-semibold text-ink">
                                4 colors
                            </span>
                        </div>

                        <div className="grid h-[236px] grid-cols-[174px_1fr]">
                            <div className="flex flex-col justify-between border-r border-black/10 bg-[#FCF8EE] p-3">
                                <div className="space-y-2.5">
                                    <div>
                                        <div className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-muted">Image</div>
                                        <div className="mt-1 flex items-center gap-1.5 rounded-sm bg-white px-2 py-1 text-[10px] font-medium text-ink ring-1 ring-black/10">
                                            <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm bg-[#F7CA44] text-ink">
                                                <ImageIcon size={9} strokeWidth={2.5} aria-hidden="true" />
                                            </span>
                                            <span className="truncate font-mono text-[9.5px]">boulder-peak.png</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between text-[8.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                                            <span>Palette</span>
                                            <span className="font-mono normal-case tracking-normal text-ink/70">
                                                {isQuantized ? '4 colors' : isScanning ? 'reducing…' : 'auto'}
                                            </span>
                                        </div>
                                        <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                                            {PALETTE.map((swatch, i) => (
                                                <motion.div
                                                    key={swatch.name}
                                                    className="flex flex-col items-center gap-1"
                                                    initial={false}
                                                    animate={{
                                                        scale: isQuantized ? 1 : isScanning ? [0.85, 1.06, 1] : 0.85,
                                                        opacity: isQuantized ? 1 : isScanning ? 0.75 : 0.3,
                                                    }}
                                                    transition={{ duration: 0.35, delay: isScanning ? i * 0.08 : 0, ease: EASE }}
                                                >
                                                    <span
                                                        className="h-5 w-full rounded-sm shadow-sm ring-1 ring-black/15"
                                                        style={{ backgroundColor: swatch.hex }}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                                        <div className={`rounded-sm bg-white px-2 py-1 ring-1 transition-colors duration-300 ${is3D ? 'ring-amber/80' : 'ring-black/10'}`}>
                                            <div className="text-[8px] uppercase tracking-wider text-muted">Base</div>
                                            <div className="font-mono text-[10.5px] font-semibold text-ink">1.8 mm</div>
                                        </div>
                                        <div className={`rounded-sm bg-white px-2 py-1 ring-1 transition-colors duration-300 ${is3D ? 'ring-amber/80' : 'ring-black/10'}`}>
                                            <div className="text-[8px] uppercase tracking-wider text-muted">Color</div>
                                            <div className="font-mono text-[10.5px] font-semibold text-ink">0.8 mm</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 pt-2">
                                    <motion.div
                                        className={`flex flex-1 items-center justify-center gap-1 rounded-sm px-2 py-1.5 text-[10px] font-semibold shadow-sm transition-colors duration-300 ${
                                            isExported ? 'bg-[#212936] text-white' : 'bg-[#F7CA44] text-ink ring-1 ring-black/10'
                                        }`}
                                        animate={isExported ? { scale: [1, 0.94, 1] } : { scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {isExported ? (
                                            <>
                                                <Check size={11} strokeWidth={3} className="text-[#52B788]" aria-hidden="true" />
                                                <span>charm.3mf</span>
                                            </>
                                        ) : (
                                            <>
                                                <Download size={10} strokeWidth={2.5} aria-hidden="true" />
                                                <span>Export 3MF</span>
                                            </>
                                        )}
                                    </motion.div>
                                    <div className="rounded-sm bg-white px-2 py-1.5 font-mono text-[9.5px] font-semibold text-ink/80 ring-1 ring-black/10">
                                        STL
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex flex-col bg-[#FFFDFB] p-2.5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 rounded-sm bg-black/[0.04] p-0.5 text-[9px] font-medium">
                                        {[
                                            { label: 'Image', Icon: ImageIcon },
                                            { label: '4 colors', Icon: Layers },
                                            { label: '3D charm', Icon: Box },
                                        ].map(({ label, Icon }, idx) => {
                                            const active = activeTab === idx;
                                            return (
                                                <span
                                                    key={label}
                                                    className={`flex items-center gap-1 rounded-sm px-2 py-0.5 transition-colors duration-300 ${
                                                        active ? 'bg-white text-ink shadow-sm ring-1 ring-black/10' : 'text-muted'
                                                    }`}
                                                >
                                                    <Icon size={9} strokeWidth={2.2} aria-hidden="true" />
                                                    {label}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <span className="font-mono text-[9px] text-muted">
                                        {is3D ? '32 × 32 mm' : 'Grid 112'}
                                    </span>
                                </div>

                                <div className="relative flex flex-1 items-center justify-center overflow-hidden">
                                    <svg viewBox="0 0 232 168" className="h-full w-full max-w-[290px] overflow-visible" aria-hidden="true">
                                        <defs>
                                            <clipPath id={circleClipId}>
                                                <circle cx="110" cy="82" r="45" />
                                            </clipPath>
                                            <clipPath id={scanClipId}>
                                                <motion.rect
                                                    x="50"
                                                    y="24"
                                                    width="120"
                                                    initial={false}
                                                    animate={{ height: isQuantized ? 120 : isScanning ? 120 : 0 }}
                                                    transition={{ duration: isScanning ? 0.95 : 0.15, ease: 'easeInOut' }}
                                                />
                                            </clipPath>
                                            <linearGradient id={`${uid}-orig-sky`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#1D3557" />
                                                <stop offset="46%" stopColor="#567AA1" />
                                                <stop offset="76%" stopColor="#DF8361" />
                                                <stop offset="100%" stopColor="#F8C868" />
                                            </linearGradient>
                                            <radialGradient id={`${uid}-orig-glow`} cx="50%" cy="50%" r="50%">
                                                <stop offset="0%" stopColor="#FFE9A3" stopOpacity="0.85" />
                                                <stop offset="100%" stopColor="#F4C144" stopOpacity="0" />
                                            </radialGradient>
                                            <radialGradient id={`${uid}-orig-sun`} cx="40%" cy="35%" r="65%">
                                                <stop offset="0%" stopColor="#FFF6D1" />
                                                <stop offset="100%" stopColor="#F2B43A" />
                                            </radialGradient>
                                            <linearGradient id={`${uid}-orig-far`} x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#5C708E" />
                                                <stop offset="100%" stopColor="#35445D" />
                                            </linearGradient>
                                            <linearGradient id={`${uid}-orig-mtn-dark`} x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#324158" />
                                                <stop offset="100%" stopColor="#1B2331" />
                                            </linearGradient>
                                            <linearGradient id={`${uid}-orig-mtn-lit`} x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#EC8262" />
                                                <stop offset="100%" stopColor="#B4432C" />
                                            </linearGradient>
                                            <linearGradient id={`${uid}-orig-snow`} x1="0" y1="0" x2="0.8" y2="1">
                                                <stop offset="0%" stopColor="#FFFFFF" />
                                                <stop offset="100%" stopColor="#D7E3F0" />
                                            </linearGradient>
                                            <linearGradient id={`${uid}-orig-fg`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#2A3649" />
                                                <stop offset="100%" stopColor="#161C27" />
                                            </linearGradient>
                                            <linearGradient id={`${uid}-base-wall`} x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#141922" />
                                                <stop offset="38%" stopColor="#344054" />
                                                <stop offset="72%" stopColor="#1D2432" />
                                                <stop offset="100%" stopColor="#12161E" />
                                            </linearGradient>
                                            <linearGradient id={`${uid}-stem-wall`} x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#141820" />
                                                <stop offset="45%" stopColor="#3E4A60" />
                                                <stop offset="100%" stopColor="#151922" />
                                            </linearGradient>
                                            <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
                                                <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
                                                <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
                                            </linearGradient>
                                        </defs>

                                        {/* Isometric 3D printer build plate shown during extruded charm preview. */}
                                        <motion.g initial={false} animate={{ opacity: is3D ? 1 : 0 }} transition={{ duration: 0.45 }}>
                                            <g stroke="rgba(28,27,25,0.08)" strokeWidth="0.75">
                                                {[-3, -2, -1, 0, 1, 2, 3].map(i => (
                                                    <React.Fragment key={i}>
                                                        <line x1={110 + i * 18 - 64} y1={126 + i * 9 + 32} x2={110 + i * 18 + 64} y2={126 + i * 9 - 32} />
                                                        <line x1={110 + i * 18 - 64} y1={126 - i * 9 - 32} x2={110 + i * 18 + 64} y2={126 - i * 9 + 32} />
                                                    </React.Fragment>
                                                ))}
                                            </g>
                                            <ellipse cx="110" cy="149" rx="46" ry="13" fill="rgba(28,27,25,0.1)" />
                                            <ellipse cx="110" cy="147" rx="23" ry="8" fill="rgba(28,27,25,0.18)" />
                                        </motion.g>

                                        <g>
                                            <motion.g initial={false} animate={{ opacity: is3D ? 1 : 0, y: is3D ? 0 : -16 }} transition={{ duration: 0.55, ease: EASE }}>
                                                <ellipse cx="110" cy="138" rx="21" ry="9.5" fill="#12161E" />
                                                <path d="M 89 134.5 L 89 138 A 21 9.5 0 0 0 131 138 L 131 134.5 Z" fill={`url(#${uid}-base-wall)`} />
                                                <ellipse cx="110" cy="134.5" rx="21" ry="9.5" fill="#273040" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" />
                                                <path d="M 101 108 L 101 133.5 A 9 4.2 0 0 0 119 133.5 L 119 108 Z" fill={`url(#${uid}-stem-wall)`} />
                                            </motion.g>

                                            <motion.g initial={false} animate={{ opacity: is3D ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }}>
                                                <ellipse cx="110" cy="88" rx="52" ry="32.2" fill="#131820" />
                                                <path d="M 58 77 L 58 88 A 52 32.2 0 0 0 162 88 L 162 77 Z" fill={`url(#${uid}-base-wall)`} />
                                                <ellipse cx="110" cy="77" rx="52" ry="32.2" fill={PALETTE[0].hex} stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" />
                                            </motion.g>

                                            <motion.g initial={false} animate={{ opacity: is3D ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE }}>
                                                {[4.5, 3.5, 2.5, 1.5, 0.7].map(dy => (
                                                    <g key={dy} transform={`translate(0, ${72.5 + dy - 82 * 0.62}) scale(1, 0.62)`}>
                                                        <RaisedColorRegions shaded clipId={circleClipId} />
                                                    </g>
                                                ))}
                                                <g transform={`translate(0, ${72.5 - 82 * 0.62}) scale(1, 0.62)`}>
                                                    <RaisedColorRegions clipId={circleClipId} />
                                                    <circle cx="110" cy="82" r="52" fill={`url(#${uid}-sheen)`} />
                                                </g>
                                            </motion.g>

                                            <motion.g
                                                style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
                                                initial={false}
                                                animate={{ scaleY: is3D ? 0.62 : 1, y: is3D ? -9.5 : 0, opacity: is3D ? 0 : 1 }}
                                                transition={{ duration: 0.5, ease: EASE }}
                                            >
                                                {!isQuantized && <OriginalBadge clipId={circleClipId} uid={uid} />}
                                                <g clipPath={isQuantized ? undefined : `url(#${scanClipId})`}>
                                                    <QuantizedBadge clipId={circleClipId} />
                                                </g>
                                            </motion.g>

                                            <AnimatePresence>
                                                {isScanning && (
                                                    <motion.g
                                                        key="scanline"
                                                        initial={{ y: 28, opacity: 0 }}
                                                        animate={{ y: 136, opacity: [0, 1, 1, 0] }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.95, ease: 'easeInOut' }}
                                                    >
                                                        <line x1="52" y1="0" x2="168" y2="0" stroke="#F7CA44" strokeWidth="2.5" strokeLinecap="round" />
                                                        <line x1="56" y1="0" x2="164" y2="0" stroke="#1C1B19" strokeWidth="0.9" strokeDasharray="3 3" />
                                                    </motion.g>
                                                )}
                                            </AnimatePresence>
                                        </g>

                                        <motion.g initial={false} animate={{ opacity: is3D ? 1 : 0, x: is3D ? 0 : -6 }} transition={{ duration: 0.4, delay: is3D ? 0.2 : 0 }} className="font-mono">
                                            <line x1="167" y1="74" x2="174" y2="74" stroke="rgba(28,27,25,0.45)" strokeWidth="0.9" />
                                            <text x="177" y="76.5" fontSize="8" fill="#52504D">0.8 mm</text>
                                            <line x1="167" y1="84" x2="174" y2="84" stroke="rgba(28,27,25,0.45)" strokeWidth="0.9" />
                                            <text x="177" y="86.5" fontSize="8" fill="#52504D">1.8 mm</text>
                                            <line x1="135" y1="135" x2="150" y2="135" stroke="rgba(28,27,25,0.4)" strokeWidth="0.85" strokeDasharray="2 2" />
                                            <text x="153" y="137.5" fontSize="8" fill="#52504D">Crocs stem</text>
                                        </motion.g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-8">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={act}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.3 }}
                                className="whitespace-nowrap rounded-sm border border-ink/20 bg-white px-3 py-1.5 text-xs font-medium text-ink"
                            >
                                {act === 1
                                    ? 'Drop in any image, quantized to four filament colors'
                                    : 'Extruded into a 3D Crocs charm for STL or 3MF export'}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JibbitzPreview;
