import React, { useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Check, Loader2, Play } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useStepLoop } from '../../hooks/useStepLoop';

/*
 * Replays a real exchange with my Telegram recipe agent (Jan 2026): I shared an
 * Instagram Reel, it extracted the recipe from the video, and saved it to Notion.
 */

const INGREDIENTS = [
    '1/2 lb of pasta',
    '1.5 lbs of chicken breast',
    '22 grams of Parmesan cheese',
    '22 grams of Pecorino cheese',
    '3 cloves of garlic',
    '1/2 cup of skim milk',
];
const STEPS_TEXT = [
    'Cook the pasta according to package instructions.',
    'Cook the chicken breast until fully cooked, then slice.',
    'Sauté minced garlic in a little oil.',
    'Stir in skim milk and cheeses until melted and combined.',
];

type Msg = { id: string; from: 'me' | 'bot'; kind: 'reel' | 'text' | 'typing' | 'recipe' | 'saved' | 'list'; text?: string };

const TIMELINE: { ms: number; msgs: string[]; tool?: string; sub?: number; page?: number }[] = [
    { ms: 700, msgs: [] },
    { ms: 900, msgs: ['reel'] },
    { ms: 700, msgs: ['reel', 'typing1'], tool: 'reel', sub: 0 },
    { ms: 700, msgs: ['reel', 'typing1'], tool: 'reel', sub: 1 },
    { ms: 900, msgs: ['reel', 'typing1'], tool: 'reel', sub: 2 },
    { ms: 2600, msgs: ['reel', 'recipe'] },
    { ms: 700, msgs: ['reel', 'recipe', 'yes'] },
    { ms: 700, msgs: ['reel', 'recipe', 'yes', 'typing2'], tool: 'scraper', sub: 0, page: 1 },
    { ms: 800, msgs: ['reel', 'recipe', 'yes', 'typing2'], tool: 'scraper', sub: 1, page: 2 },
    { ms: 900, msgs: ['reel', 'recipe', 'yes', 'typing2'], tool: 'scraper', sub: 2, page: 3 },
    { ms: 2200, msgs: ['reel', 'recipe', 'yes', 'saved'], page: 3 },
    { ms: 800, msgs: ['reel', 'recipe', 'yes', 'saved', 'ask'], page: 3 },
    { ms: 900, msgs: ['reel', 'recipe', 'yes', 'saved', 'ask', 'typing3'], tool: 'notion', sub: 0, page: 3 },
    { ms: 3200, msgs: ['reel', 'recipe', 'yes', 'saved', 'ask', 'list'], page: 3 },
];

const MESSAGES: Record<string, Msg> = {
    reel: { id: 'reel', from: 'me', kind: 'reel' },
    typing1: { id: 'typing1', from: 'bot', kind: 'typing' },
    recipe: { id: 'recipe', from: 'bot', kind: 'recipe' },
    yes: { id: 'yes', from: 'me', kind: 'text', text: 'Yes' },
    typing2: { id: 'typing2', from: 'bot', kind: 'typing' },
    saved: { id: 'saved', from: 'bot', kind: 'saved' },
    ask: { id: 'ask', from: 'me', kind: 'text', text: 'what dinner recipes do I have' },
    typing3: { id: 'typing3', from: 'bot', kind: 'typing' },
    list: { id: 'list', from: 'bot', kind: 'list' },
};

const TOOLS: { id: string; name: string; subs: string[] }[] = [
    { id: 'reel', name: 'Extract_Instagram_Reel', subs: ['Download the Reel', 'Read the caption', 'Transcribe the audio'] },
    { id: 'scraper', name: 'Recipe_Scraper', subs: ['Structure it with Gemini', 'Create the Notion page', 'Add ingredients & steps'] },
    { id: 'notion', name: 'Get Notion Database Pages', subs: ['Filter to dinners'] },
];

const LIBRARY = [
    { name: 'Chicken and Red Lentil Soup', meta: '4 servings · 60 min' },
    { name: 'High Protein Low Calorie Alfredo', meta: '2 servings · 45 min' },
    { name: 'Frico', meta: '8 servings · 47 min' },
    { name: 'Smash Dumplings', meta: '4 servings · 25 min' },
];

const ease = [0.16, 1, 0.3, 1] as const;

const Bubble: React.FC<{ msg: Msg; compact?: boolean }> = ({ msg, compact }) => {
    const me = msg.from === 'me';
    const base = `max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-snug shadow-sm ${me ? 'self-end rounded-br-md bg-[#E1FEC6] text-ink' : 'self-start rounded-bl-md bg-white text-ink'}`;

    if (msg.kind === 'typing') {
        return (
            <div className={`${base} flex gap-1 py-2.5`}>
                {[0, 1, 2].map(i => (
                    <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/50" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }} />
                ))}
            </div>
        );
    }
    if (msg.kind === 'reel') {
        return (
            <div className={`${base} w-[78%] p-1.5`}>
                <div className="rounded-lg border-l-2 border-[#1E6641] bg-black/[0.04] px-2 py-1.5">
                    <div className="text-[10px] font-semibold text-[#1E6641]">Instagram</div>
                    <div className="text-[10.5px]">High protein low calorie Alfredo. Just need 1/2lb of pasta and 1.5lbs of chicken breast for 4 servings.</div>
                    {!compact && (
                        <div className="mt-1.5 flex h-16 items-center justify-center rounded-md bg-[#E5DEC9]">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink">
                                <Play size={11} className="ml-0.5" fill="currentColor" aria-hidden="true" />
                            </span>
                        </div>
                    )}
                </div>
                <div className="mt-1 truncate px-1 text-[9.5px] font-medium text-[#1D5696]">instagram.com/reel/DTDZ5…</div>
            </div>
        );
    }
    if (msg.kind === 'recipe') {
        return (
            <div className={base}>
                <p>Here’s a recipe based on the Instagram Reel you provided:</p>
                <p className="mt-1.5 font-semibold">High Protein Low Calorie Alfredo</p>
                <ul className="mt-1 space-y-px text-ink/85">
                    {INGREDIENTS.slice(0, compact ? 3 : 6).map(i => <li key={i}>- {i}</li>)}
                    {compact && <li className="text-muted">…</li>}
                </ul>
                <p className="mt-1.5">Would you like to add it to your Notion?</p>
            </div>
        );
    }
    if (msg.kind === 'saved') {
        return (
            <div className={base}>
                The recipe has been added to your Notion. You can view it <span className="font-medium text-[#1D5696] underline">here</span>.
            </div>
        );
    }
    if (msg.kind === 'list') {
        return (
            <div className={base}>
                <p>Here are your dinner recipes currently stored in Notion:</p>
                <ol className="mt-1 space-y-0.5">
                    {LIBRARY.slice(0, compact ? 2 : 4).map((r, i) => (
                        <li key={r.name}><span className="font-medium">{i + 1}) {r.name}</span> <span className="text-muted">· {r.meta}</span></li>
                    ))}
                </ol>
                <p className="mt-1 text-muted">…and 16 more</p>
            </div>
        );
    }
    return <div className={base}>{msg.text}</div>;
};

const Chat: React.FC<{ msgs: Msg[]; compact?: boolean; className?: string }> = ({ msgs, compact, className = '' }) => (
    <div className={`flex flex-col overflow-hidden rounded-xl bg-[#C9D9C0] shadow-md ring-1 ring-black/10 ${className}`}>
        <div className="flex items-center gap-2 border-b border-black/10 bg-white px-3 py-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1D5696] text-[11px] font-bold text-white">N</span>
            <div className="leading-tight">
                <div className="text-[11px] font-semibold text-ink">Recipe Agent</div>
                <div className="text-[9px] text-muted">bot</div>
            </div>
        </div>
        <div className="relative flex flex-1 flex-col justify-end gap-1.5 overflow-hidden p-2.5">
            <AnimatePresence initial={false} mode="popLayout">
                {msgs.map(m => (
                    <motion.div
                        key={m.id}
                        layout
                        className={`flex shrink-0 flex-col ${m.from === 'me' ? 'items-end' : 'items-start'}`}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.35, ease }}
                    >
                        <Bubble msg={m} compact={compact} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </div>
);

const NotionPage: React.FC<{ stage: number; compact?: boolean }> = ({ stage, compact }) => (
    <div className={`overflow-hidden rounded-xl bg-white ${compact ? 'max-h-[300px]' : ''} text-ink shadow-md ring-1 ring-black/10`}>
        <div className="flex items-center gap-1.5 border-b border-black/10 px-3 py-1.5 text-[9px] text-muted">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-ink text-[8px] font-bold text-white">N</span>
            {stage >= 1 ? <>Recipes <span className="text-muted">/</span> <span className="truncate">High Protein Low Calorie Alfredo</span></> : 'Recipes'}
        </div>
        <div className={compact ? 'p-3' : 'p-4'}>
            <AnimatePresence mode="wait">
                {stage < 1 ? (
                    <motion.div key="empty" exit={{ opacity: 0 }} className="py-1">
                        <div className={`font-display font-bold ${compact ? 'text-sm' : 'text-lg'}`}>Recipes</div>
                        <ul className="mt-2 divide-y divide-black/10 text-[10.5px]">
                            {LIBRARY.filter(r => !r.name.startsWith('High Protein')).map(r => (
                                <li key={r.name} className="flex justify-between gap-2 py-1.5">
                                    <span className="truncate">{r.name}</span>
                                    <span className="shrink-0 text-muted">{r.meta.split(' · ')[1]}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ) : (
                    <motion.div key="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <motion.div initial={{ scale: 0.5, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className={compact ? 'text-2xl' : 'text-3xl'}>🍝</motion.div>
                        <div className={`mt-1 font-display font-bold leading-tight ${compact ? 'text-sm' : 'text-lg'}`}>High Protein Low Calorie Alfredo</div>
                        <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[10px]">
                            {[
                                ['Type', <span key="t" className="rounded-sm bg-[#FDECC8] px-1.5 py-px font-medium text-[#7A4B00]">Dinner</span>],
                                ['Servings', '2'],
                                ['Time', '45'],
                                ['Cooked', <span key="c" className="inline-block h-2.5 w-2.5 rounded-sm border border-ink/40 align-middle" />],
                                ...(compact ? [] : [['Original', <span key="o" className="font-medium text-[#1D5696] underline">instagram.com/reel/DTDZ5…</span>]]),
                            ].map(([k, v], i) => (
                                <React.Fragment key={i}>
                                    <span className="text-muted">{k}</span>
                                    <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>{v}</motion.span>
                                </React.Fragment>
                            ))}
                        </div>
                        {stage >= 2 && (
                            <div className="mt-3">
                                <div className="text-[11px] font-bold">Ingredients</div>
                                <ul className="mt-1 space-y-0.5 text-[10px]">
                                    {INGREDIENTS.slice(0, compact ? 3 : 6).map((ing, i) => (
                                        <motion.li key={ing} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.07 * i }}>• {ing}</motion.li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {stage >= 3 && !compact && (
                            <div className="mt-3">
                                <div className="text-[11px] font-bold">Instructions</div>
                                <ol className="mt-1 space-y-0.5 text-[10px]">
                                    {STEPS_TEXT.map((s, i) => (
                                        <motion.li key={s} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.07 * i }}>{i + 1}. {s}</motion.li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
);

const Trace: React.FC<{ tool?: string; sub?: number; done: Set<string> }> = ({ tool, sub = 0, done }) => (
    <div className="rounded-xl bg-[#181715] p-4 font-mono text-[10.5px] text-white/85 shadow-md ring-1 ring-white/15">
        <div className="mb-3 flex items-center justify-between text-[9.5px] uppercase tracking-[0.14em] text-white/75">
            n8n Agent · tools
            <span className="flex items-center gap-1.5 normal-case tracking-normal text-white/80">
                <span className={`h-1.5 w-1.5 rounded-full ${tool ? 'bg-[#6CA8E8]' : 'bg-white/45'}`} />
                {tool ? 'working' : 'idle'}
            </span>
        </div>
        <div className="space-y-2.5">
            {TOOLS.map(t => {
                const active = tool === t.id;
                const finished = done.has(t.id) && !active;
                return (
                    <div key={t.id} className={`rounded-lg border px-2.5 py-2 transition-colors duration-300 ${active ? 'border-[#6CA8E8] bg-[#6CA8E8]/15' : 'border-white/15'}`}>
                        <div className="flex items-center gap-2">
                            {active ? (
                                <Loader2 size={11} className="animate-spin text-[#6CA8E8]" aria-hidden="true" />
                            ) : finished ? (
                                <Check size={11} className="text-[#52B788]" aria-hidden="true" />
                            ) : (
                                <span className="h-[11px] w-[11px] rounded-full border border-white/40" />
                            )}
                            <span className={active || finished ? 'text-white' : 'text-white/75'}>{t.name}</span>
                        </div>
                        <AnimatePresence initial={false}>
                            {active && (
                                <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-5">
                                    {t.subs.map((s, i) => (
                                        <li key={s} className={`mt-1 flex items-center gap-1.5 ${i < sub ? 'text-[#52B788]' : i === sub ? 'text-white' : 'text-white/65'}`}>
                                            {i < sub ? '✓' : i === sub ? '›' : '·'} {s}
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
        <div className="mt-3 border-t border-white/15 pt-2.5 text-[9.5px] text-white/70">
            Also wired up: Brave web search · update/archive pages · shopping-list to-dos
        </div>
    </div>
);

function useAgentState() {
    const reduced = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.25 });
    const durations = React.useMemo(() => TIMELINE.map(t => t.ms), []);
    const step = useStepLoop(durations, inView, reduced, 10);
    const now = TIMELINE[step];
    const done = new Set<string>();
    TIMELINE.slice(0, step + 1).forEach(t => { if (t.tool) done.add(t.tool); });
    return { ref, now, done, msgs: now.msgs.map(id => MESSAGES[id]) };
}

export const RecipeAgentDemo: React.FC = () => {
    const { ref, now, done, msgs } = useAgentState();
    return (
        <div ref={ref} className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-[1fr_0.9fr_1fr]">
            <Chat msgs={msgs} className="h-[460px]" />
            <Trace tool={now.tool} sub={now.sub} done={done} />
            <NotionPage stage={now.page ?? 0} />
        </div>
    );
};

export const RecipeAgentPreview: React.FC<{ scale?: string }> = ({ scale = 'scale-[0.72] sm:scale-100 md:scale-[0.7] lg:scale-[0.9] xl:scale-100' }) => {
    const { ref, now, msgs } = useAgentState();
    return (
        <div ref={ref} className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            <div className={`relative flex w-full max-w-[520px] origin-center items-center gap-3 ${scale}`}>
                <Chat msgs={msgs} compact className="h-[300px] w-[55%] shrink-0" />
                <div className="min-w-0 flex-1">
                    <NotionPage stage={now.page ?? 0} compact />
                </div>
            </div>
        </div>
    );
};
