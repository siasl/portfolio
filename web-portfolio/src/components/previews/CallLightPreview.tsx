import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Check, Frown, GlassWater, Utensils, Bath } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMockupPaused } from './MockupControls';

// Categories, messages, and colors matching the shipped nurse feed.
const REQUESTS = [
    { room: 'Room 204', cat: 'Thirsty', msg: 'Soft Drink', color: '#4FA7E0', Icon: GlassWater },
    { room: 'Room 211', cat: 'Discomfort', msg: 'Sharp Pain Increase', color: '#FF6F6F', Icon: Frown },
    { room: 'Room 207', cat: 'Hungry', msg: 'Large Meal', color: '#EAD92E', Icon: Utensils },
    { room: 'Room 202', cat: 'Sanitary', msg: 'Brushing Teeth', color: '#3EE3A3', Icon: Bath },
];
const AGES = ['8s', '1m 16s', '7m 44s', '12m 38s'];

/** Animated reconstruction of the nurse feed: requests stream in and older ones get acknowledged. */
const CallLightPreview: React.FC<{ scale?: string }> = ({ scale = 'scale-[0.78] sm:scale-100' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduced = useReducedMotion();
    const paused = useMockupPaused();
    const [tick, setTick] = useState(3);

    useEffect(() => {
        if (!inView || reduced || paused) return;
        const id = setInterval(() => setTick(t => t + 1), 1800);
        return () => clearInterval(id);
    }, [inView, reduced, paused]);

    const visible = Array.from({ length: 4 }, (_, i) => tick - i)
        .filter(n => n >= 0)
        .map(n => ({ n, ...REQUESTS[n % REQUESTS.length] }));

    return (
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
            <div className={`w-full max-w-md origin-center ${scale} overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/10`}>
                <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
                    <span className="font-display text-sm font-semibold text-ink">Nurse feed</span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                        <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                        Live
                    </span>
                </div>
                <div className="flex h-[248px] flex-col gap-2 overflow-hidden p-3">
                    <AnimatePresence initial={false} mode="popLayout">
                        {visible.map(({ n, room, cat, msg, color, Icon }, i) => (
                            <motion.div
                                key={n}
                                layout
                                initial={{ opacity: 0, y: -24, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-ink"
                                style={{ backgroundColor: color }}
                            >
                                <div className="w-16 shrink-0 text-[11px] font-semibold leading-tight">
                                    {room}
                                    <div className="mt-0.5 text-[9.5px] font-normal opacity-80">{AGES[i]}</div>
                                </div>
                                <div className="min-w-0 flex-1 text-center">
                                    <div className="flex items-center justify-center gap-1.5 font-display text-sm font-bold">
                                        {cat} <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
                                    </div>
                                    <div className="truncate text-xs italic">{msg}</div>
                                </div>
                                <div
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors duration-500 ${i >= 2 ? 'bg-ink text-white' : 'text-ink'}`}
                                >
                                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default CallLightPreview;

const ACK_DUR = [1600, 2400, 1600];

/** Two-step acknowledge flow: open request, acknowledged across devices, then completed. */
export const AckSequence: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduced = useReducedMotion();
    const paused = useMockupPaused();
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (reduced) { setStep(1); return; }
        if (!inView || paused) return;
        const id = setTimeout(() => setStep(s => (s + 1) % 3), ACK_DUR[step]);
        return () => clearTimeout(id);
    }, [step, inView, reduced, paused]);

    const labels = ['Open request', 'Acknowledged · synced to every nurse device', 'Completed · removed from the feed'];

    return (
        <div ref={ref} className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-xl bg-white p-3 shadow-md ring-1 ring-black/10">
                <div className="relative h-[60px]">
                    <AnimatePresence initial={false}>
                        {step < 2 && (
                            <motion.div
                                key="row"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 0.35 }}
                                className="absolute inset-0 flex items-center gap-3 rounded-xl px-3 text-ink"
                                style={{ backgroundColor: '#4FA7E0' }}
                            >
                                <div className="w-16 shrink-0 text-[11px] font-semibold leading-tight">
                                    Room 204
                                    <div className="mt-0.5 text-[9.5px] font-normal opacity-80">12m 38s</div>
                                </div>
                                <div className="min-w-0 flex-1 text-center">
                                    <div className="flex items-center justify-center gap-1.5 font-display text-sm font-bold">
                                        Thirsty <GlassWater size={14} strokeWidth={2.5} aria-hidden="true" />
                                    </div>
                                    <div className="text-xs italic">Soft Drink</div>
                                </div>
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors duration-300 ${step === 1 ? 'bg-ink text-white' : 'text-ink'}`}>
                                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {step === 2 && <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">Request completed</div>}
                </div>
            </div>
            <ol className="mt-4 space-y-1.5 text-[14px]">
                {labels.map((l, i) => (
                    <li key={l} className={`flex items-center gap-2 transition-colors ${i === step ? 'font-semibold text-ink' : 'text-ink/70'}`}>
                        <span className={`h-2 w-2 shrink-0 rounded-full ${i === step ? 'bg-accent' : 'bg-ink/35'}`} />
                        {i === 0 ? 'First tap: ' : i === 1 ? '' : 'Second tap: '}{l}
                    </li>
                ))}
            </ol>
        </div>
    );
};
