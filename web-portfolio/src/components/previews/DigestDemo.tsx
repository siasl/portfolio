import React, { useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Clock, Database, Filter, Images, Image as ImageIcon, Video, Send, RotateCw } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useStepLoop } from '../../hooks/useStepLoop';

/*
 * Replays the n8n Instagram Digest workflow. Node logic, account count,
 * caption format, and 8 AM delivery match the real Telegram channel.
 */

const PIPELINE = [
    { id: 'cron', icon: <Clock size={14} aria-hidden="true" />, title: 'Every morning, 8:00', detail: '19 accounts: ski areas, breweries, bands, a climbing gym' },
    { id: 'apify', icon: <Send size={14} className="rotate-45" aria-hidden="true" />, title: 'Scrape with Apify', detail: 'Instagram API Scraper, newest posts only' },
    { id: 'dedupe', icon: <Database size={14} aria-hidden="true" />, title: 'Skip what I’ve seen', detail: 'n8n data table of posts already sent' },
    { id: 'date', icon: <Filter size={14} aria-hidden="true" />, title: 'Last 24 hours', detail: 'Date filter drops anything older' },
];

const LANES = [
    { id: 'gallery', icon: <Images size={13} aria-hidden="true" />, label: 'Carousels', detail: 'sent as one album' },
    { id: 'photo', icon: <ImageIcon size={13} aria-hidden="true" />, label: 'Photos', detail: 'photo + caption' },
    { id: 'video', icon: <Video size={13} aria-hidden="true" />, label: 'Videos', detail: 'downloaded, then uploaded' },
];

const POSTS = [
    { lane: 'gallery', user: 'arapahoe_basin', time: '2025-11-25T20:16:37Z', line: 'Feeling a bit more like ourselves this morning 😊🙃', bg: '#DCE7F2' },
    { lane: 'photo', user: 'fisherbrewing', time: '2026-10-18T22:04:11Z', line: 'Snag a pint or two and pair it with some delicious food 🍺', bg: '#F0DEC5' },
    { lane: 'video', user: 'thefrontclimbing', time: '2026-10-19T08:00:40Z', line: 'Learn the meanings behind the names of the poses you practice. 📖', bg: '#D4E6DC' },
];

const DURATIONS = [700, 700, 700, 700, 1300, 1300, 1100, 1400, 2600];
const RATE_LIMIT_STEP = 6;
const DONE_STEP = 8;

const ease = [0.16, 1, 0.3, 1] as const;

const PostCard: React.FC<{ post: typeof POSTS[number] }> = ({ post }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease }}
        className="w-[88%] shrink-0 self-start overflow-hidden rounded-2xl rounded-bl-md bg-white text-ink shadow-sm"
    >
        {post.lane === 'gallery' ? (
            <div className="grid h-24 grid-cols-[2fr_1fr] gap-0.5">
                <div style={{ backgroundColor: post.bg }} />
                <div className="grid grid-rows-3 gap-0.5">
                    {[0.9, 0.7, 0.5].map((op, i) => <div key={i} style={{ backgroundColor: post.bg, opacity: op }} />)}
                </div>
            </div>
        ) : (
            <div className="relative flex h-24 items-center justify-center" style={{ backgroundColor: post.bg }}>
                {post.lane === 'video' && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/75 text-white">▶</span>
                )}
            </div>
        )}
        <div className="px-2.5 py-2 text-[10px] leading-snug">
            <div className="font-mono text-[9px] text-muted">{post.time} - <span className="font-semibold text-ink">{post.user}</span></div>
            <div className="mt-0.5">{post.line}</div>
            <div className="mt-0.5 truncate font-medium text-[#1D5696]">instagram.com/p/…</div>
        </div>
    </motion.div>
);

export const DigestDemo: React.FC = () => {
    const reduced = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.25 });
    const step = useStepLoop(DURATIONS, inView, reduced, DONE_STEP);

    const shown = step < 4 ? 0 : step === 4 ? 1 : step <= RATE_LIMIT_STEP ? 2 : 3;
    const activeLane = step === 4 ? 'gallery' : step === 5 ? 'photo' : step === 6 || step === 7 ? 'video' : null;
    const rateLimited = step === RATE_LIMIT_STEP;

    return (
        <div ref={ref} className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div>
                <div className="space-y-2">
                    {PIPELINE.map((node, i) => {
                        const lit = step >= i;
                        const current = step === i;
                        return (
                            <div key={node.id}>
                                <motion.div
                                    className={`flex items-start gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 transition-shadow duration-300 ${current ? 'ring-2 ring-[#1D5696]' : 'ring-black/10'}`}
                                    animate={current ? { scale: [1, 1.015, 1] } : { scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${lit ? 'bg-[#1D5696] text-white' : 'bg-[#1D5696]/15 text-[#1D5696]'} transition-colors duration-300`}>{node.icon}</span>
                                    <div>
                                        <div className="text-sm font-semibold text-ink">{node.title}</div>
                                        <div className="text-xs text-muted">{node.detail}</div>
                                    </div>
                                </motion.div>
                                <div className="ml-[26px] h-2 w-px bg-[#1D5696]/35" />
                            </div>
                        );
                    })}
                    <div className="grid grid-cols-3 gap-2">
                        {LANES.map(lane => {
                            const active = activeLane === lane.id;
                            const done = (lane.id === 'gallery' && step >= 5) || (lane.id === 'photo' && step >= 6) || (lane.id === 'video' && step >= 8);
                            return (
                                <div key={lane.id} className={`relative rounded-xl bg-white px-2.5 py-2 shadow-sm ring-1 transition-shadow duration-300 ${active ? 'ring-2 ring-[#1D5696]' : done ? 'ring-[#1E6641]' : 'ring-black/10'}`}>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">{lane.icon}{lane.label}</div>
                                    <div className="mt-0.5 text-[10.5px] leading-tight text-muted">{lane.detail}</div>
                                    <AnimatePresence>
                                        {lane.id === 'video' && rateLimited && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute -top-3 right-1 flex items-center gap-1 whitespace-nowrap rounded-sm bg-amber px-2 py-0.5 text-[9.5px] font-semibold text-ink shadow-sm"
                                            >
                                                <RotateCw size={9} className="animate-spin" aria-hidden="true" /> 429 · wait 30s, retry
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mx-auto flex h-[470px] w-full max-w-[330px] flex-col overflow-hidden rounded-xl bg-[#B9CCD9] shadow-md ring-1 ring-black/10">
                <div className="flex items-center gap-2 border-b border-black/10 bg-white px-3 py-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E6641] text-[11px] font-bold text-white">I</span>
                    <div className="leading-tight">
                        <div className="text-[11px] font-semibold text-ink">Instagram</div>
                        <div className="text-[9px] text-muted">daily digest · 8:01 AM</div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-2.5">
                    <AnimatePresence initial={false} mode="popLayout">
                        {POSTS.slice(0, shown).map(p => <PostCard key={p.user} post={p} />)}
                        {step >= DONE_STEP && (
                            <motion.div
                                key="done"
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="shrink-0 self-start rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[11px] text-ink shadow-sm"
                            >
                                New Instagram posts have been loaded!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default DigestDemo;
