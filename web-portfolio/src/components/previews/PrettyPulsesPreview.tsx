import React, { useRef } from 'react';
import { useStepLoop } from '../../hooks/useStepLoop';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { MousePointer2, Search, X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PanelHeader, PulseMark, PP_GRADIENT } from './PrettyPulsesUI';

const TOOLS = ['AI Playground', 'Answer AI', 'Triage AI', 'QSF Cleaner', 'Shard Manager'];
const QUERY = 'qsf';

// Timeline in ms: Act 1 searches the panel; Act 2 highlights a ticket ID and opens it.
const STEPS = [600, 800, 450, 220, 220, 220, 1100, 500, 900, 700, 450, 1700];

const PrettyPulsesPreview: React.FC<{ scale?: string }> = ({ scale = 'scale-[0.66] sm:scale-100' }) => {
    const reduced = useReducedMotion();
    const rootRef = useRef<HTMLDivElement>(null);
    const inView = useInView(rootRef, { amount: 0.3 });
    const step = useStepLoop(STEPS, inView, reduced, 9, 9);

    const act = step <= 6 ? 1 : 2;
    const panelOpen = step >= 2 && step <= 6;
    const typed = step >= 3 && step <= 6 ? QUERY.slice(0, step - 2) : '';
    const results = TOOLS.filter(t => t.toLowerCase().replace(/\s/g, '').includes(typed));
    const highlighted = step >= 8;
    const buttonShown = step >= 9;
    const ticketOpen = step === 11;

    // Cursor coordinates are relative to the ticket ID span.
    const cursor = (() => {
        if (step === 7) return { left: '0%', top: '45%', transition: { duration: 0.5, ease: 'easeOut' as const } };
        if (step === 8) return { left: '100%', top: '45%', transition: { duration: 0.85, ease: 'easeInOut' as const } };
        if (step >= 9) return { left: '30%', top: '175%', transition: { duration: 0.45, ease: 'easeInOut' as const } };
        return { left: '160%', top: '340%', transition: { duration: 0 } };
    })();

    return (
        <div ref={rootRef} className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            <div className={`flex w-full max-w-lg shrink-0 origin-center flex-col items-center gap-3 ${scale}`}>
                <div className="relative w-full overflow-hidden rounded-xl bg-white text-ink shadow-md ring-1 ring-black/10">
                    <div className="flex items-end gap-1 bg-[#EEF1F4] px-3 pt-2">
                        <div className="mr-2 flex gap-1.5 pb-2.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                            <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                            <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                        </div>
                        <div className={`flex w-28 items-center gap-1.5 rounded-t-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${ticketOpen ? 'text-ink/70' : 'bg-white'}`}>
                            <span className="h-2.5 w-2.5 rounded-sm bg-[#B5472B]" /> Inbox
                        </div>
                        <AnimatePresence>
                            {ticketOpen && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 128 }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-t-lg bg-white px-3 py-1.5 text-[10px] font-medium"
                                >
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-[#0B6E63]" /> CP_1234 · Ticket
                                    <X size={9} className="ml-auto shrink-0 text-ink/60" aria-hidden="true" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-2 border-b border-black/10 bg-white px-3 py-2">
                        <div className="flex-1 truncate rounded-sm bg-black/[0.05] px-3 py-1 font-mono text-[10px] text-muted">
                            {ticketOpen ? 'support.internal/tickets/CP_1234' : 'mail.google.com/inbox'}
                        </div>
                        <motion.div
                            className="relative flex h-6 w-6 items-center justify-center rounded-full text-ink"
                            style={{ background: PP_GRADIENT }}
                            animate={step === 1 ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                            transition={{ duration: 0.45 }}
                        >
                            <PulseMark size={13} />
                        </motion.div>
                    </div>

                    <div className="relative h-[244px] px-5 py-4">
                        <AnimatePresence mode="wait" initial={false}>
                            {ticketOpen ? (
                                <motion.div
                                    key="ticket"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="flex flex-col gap-3"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-sm bg-[#E0F2EF] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#0B6E63]">CP_1234</span>
                                        <span className="rounded-sm bg-[#FDECC8] px-2 py-0.5 text-[10px] font-semibold text-[#7A4B00]">In progress</span>
                                    </div>
                                    <div className="font-display text-base font-semibold">Customer can’t export survey responses</div>
                                    <div className="h-2 w-4/5 rounded bg-black/[0.08]" />
                                    <div className="h-2 w-3/5 rounded bg-black/[0.08]" />
                                    <div className="mt-1 rounded-lg border border-black/10 bg-[#F7F9FB] p-2.5">
                                        <div className="mb-1.5 text-[10px] font-semibold text-muted">LINKED JIRA</div>
                                        <div className="flex items-center gap-2 text-[11px]">
                                            <span className="h-3 w-3 rounded-sm bg-[#1D5696]" /> XM-8812 · Export times out on large surveys
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="mail" exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-2.5">
                                    <div className="flex items-center gap-2">
                                        <span className="h-6 w-6 rounded-full bg-[#1D5696]/20" />
                                        <div className="h-2.5 w-28 rounded bg-black/10" />
                                    </div>
                                    <div className="mt-1 text-[11px] text-muted">Customer issue</div>
                                    <div className="font-display text-[15px] font-semibold leading-snug sm:text-base">
                                        Ticket ID:{' '}
                                        <span className="relative inline-block">
                                            <motion.span
                                                className="absolute inset-y-0 left-0 rounded-sm bg-sky/30"
                                                initial={false}
                                                animate={{ width: highlighted ? '100%' : '0%' }}
                                                transition={{ duration: step === 8 ? 0.85 : 0.2, ease: 'easeInOut' }}
                                            />
                                            <span className="relative font-mono">CP_1234</span>

                                            <AnimatePresence>
                                                {buttonShown && (
                                                    <motion.span
                                                        className="absolute left-0 top-full z-10 mt-1.5 block"
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.25 }}
                                                    >
                                                        <motion.span
                                                            className="block whitespace-nowrap rounded-sm bg-[#1D7A46] px-3 py-1.5 font-body text-xs font-semibold text-white shadow-sm"
                                                            animate={step === 10 ? { scale: [1, 0.92, 1] } : { scale: 1 }}
                                                            transition={{ duration: 0.3, delay: 0.15 }}
                                                        >
                                                            Open Ticket
                                                        </motion.span>
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>

                                            {!reduced && act === 2 && (
                                                <motion.span
                                                    className="pointer-events-none absolute z-20 block text-ink drop-shadow"
                                                    style={{ marginLeft: -3, marginTop: -3 }}
                                                    initial={{ left: '160%', top: '340%' }}
                                                    animate={{ left: cursor.left, top: cursor.top }}
                                                    transition={cursor.transition}
                                                >
                                                    <MousePointer2 size={20} fill="white" aria-hidden="true" />
                                                </motion.span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="mt-9 h-2 w-full rounded bg-black/[0.08]" />
                                    <div className="h-2 w-5/6 rounded bg-black/[0.08]" />
                                    <div className="h-2 w-2/3 rounded bg-black/[0.08]" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {panelOpen && (
                                <motion.div
                                    className="absolute right-2 top-1 z-30 w-[190px] origin-top-right overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/15"
                                    initial={{ opacity: 0, scale: 0.9, y: -6 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <PanelHeader compact />
                                    <div className="p-2.5">
                                        <div className="flex items-center gap-1.5 rounded-sm bg-black/[0.05] px-2 py-1.5 text-[10px]">
                                            <Search size={10} className="text-muted" aria-hidden="true" />
                                            {typed ? <span className="font-mono">{typed}</span> : <span className="text-muted">Search…</span>}
                                            <span className="h-3 w-px bg-ink" />
                                        </div>
                                        <ul className="mt-1.5 min-h-[96px] space-y-0.5">
                                            <AnimatePresence initial={false}>
                                                {results.map(t => (
                                                    <motion.li
                                                        key={t}
                                                        layout
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.18 }}
                                                        className={`rounded px-2 py-[3px] text-[10.5px] ${step === 6 && t === 'QSF Cleaner' ? 'bg-[#E0F2EF] font-semibold text-[#0B6E63]' : 'text-[#1D5696]'}`}
                                                    >
                                                        {t}
                                                        {step === 6 && t === 'QSF Cleaner' && <span className="float-right font-mono text-[9px] text-muted">↵</span>}
                                                    </motion.li>
                                                ))}
                                            </AnimatePresence>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
                                ? 'Shortcut opens the panel to find any team tool'
                                : 'Highlight a ticket ID to open it in one click'}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default PrettyPulsesPreview;
