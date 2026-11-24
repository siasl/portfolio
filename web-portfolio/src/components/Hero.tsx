import React from 'react';
import { motion } from 'framer-motion';
import { resolveAssetUrl } from '../utils/urls';
import { KineticHeading } from './AlpineMotifs';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Full-bleed night-sky hero with alpine contour geometry and hiring-manager focus. */
const Hero: React.FC = () => {
    const reduced = useReducedMotion();

    const scrollToWork = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById('work')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    };

    return (
        <section className="hero-surface relative isolate overflow-hidden bg-[#0B0B0C] text-white">
            <img
                src={resolveAssetUrl('/assets/cards/mountains-wide.jpg')}
                alt=""
                width={2400}
                height={1594}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 -z-10 h-full w-full object-cover object-[65%_40%] md:object-[50%_40%]"
            />
            {/* Shade behind the copy so text stays above 7:1 contrast across the full hero width. */}
            <div
                className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/75 to-black/55 md:bg-gradient-to-r md:from-black/90 md:via-black/70 md:to-black/20"
                aria-hidden="true"
            />
            {/* Topographic contour lines anchored to the upper-right photo corner. */}
            <svg
                viewBox="0 0 420 260"
                fill="none"
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-full w-[420px] text-white/15 lg:block"
            >
                <path d="M90 -20 C 140 60, 240 40, 290 120 C 330 185, 380 175, 440 230" stroke="currentColor" strokeWidth="1.2" />
                <path d="M140 -20 C 185 50, 265 35, 315 105 C 350 155, 395 150, 445 195" stroke="currentColor" strokeWidth="1" />
                <path d="M195 -20 C 235 40, 295 30, 340 90 C 370 130, 405 128, 445 160" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 4" />
                <path d="M255 -20 C 285 28, 330 24, 365 72 C 390 105, 418 106, 445 125" stroke="currentColor" strokeWidth="0.8" />
            </svg>

            <div className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 md:py-24">
                <div className="max-w-2xl">
                    {/* Lift-ticket metadata strip: real location and credentials, not a decorative pill. */}
                    <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-l-2 border-[#E47456] pl-3 font-mono text-[12px] tracking-[0.05em] text-white/85">
                        <span>BOULDER, CO</span>
                        <span aria-hidden="true">·</span>
                        <span>CU BOULDER ATLAS M.S.</span>
                        <span aria-hidden="true">·</span>
                        <span>EX-QUALTRICS</span>
                    </div>

                    <KineticHeading
                        as="h1"
                        immediate
                        text="I’m Silas Howe. I design tools people rely on, then build them myself."
                        className="heading text-[2.2rem] sm:text-[2.9rem] md:text-[3.35rem]"
                    />

                    <motion.p
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6 max-w-prose text-[1.06rem] leading-relaxed text-white/90"
                    >
                        Four years at Qualtrics building internal extensions and healthcare workflows that saved teams
                        350+ hours a year. Now in CU Boulder’s Creative Technology &amp; Design master’s program,
                        combining software engineering with physical craft, creative code, and night-sky photography.
                    </motion.p>

                    <motion.div
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 flex flex-wrap items-center gap-3"
                    >
                        <a
                            href="#work"
                            onClick={scrollToWork}
                            className="inline-flex min-h-[44px] items-center rounded-sm bg-[#F4F1EA] px-5 py-2.5 text-[15px] font-semibold text-[#1C1B19] transition-[background-color,color,transform] duration-150 hover:bg-[#E47456] hover:text-[#181715] active:scale-[0.98]"
                        >
                            View selected work
                        </a>
                        <a
                            href="mailto:silashowe1999@gmail.com"
                            className="inline-flex min-h-[44px] items-center px-2.5 text-[15px] underline decoration-white/50 underline-offset-[4px] hover:decoration-white active:opacity-75"
                        >
                            Email
                        </a>
                        <a
                            href="https://www.linkedin.com/in/silashowe/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center px-2.5 text-[15px] underline decoration-white/50 underline-offset-[4px] hover:decoration-white active:opacity-75"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/siasl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center px-2.5 text-[15px] underline decoration-white/50 underline-offset-[4px] hover:decoration-white active:opacity-75"
                        >
                            GitHub
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
