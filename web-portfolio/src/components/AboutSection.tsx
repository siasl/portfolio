import React from 'react';
import { resolveAssetUrl } from '../utils/urls';
import { KineticHeading, TopoDivider } from './AlpineMotifs';

/** Short bio, field-guide capability grid, and one long-exposure ski-hill photograph. */
const AboutSection: React.FC = () => (
    <section id="about" className="pt-2">
        <TopoDivider elevation="04 / ABOUT" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 sm:px-8 md:grid-cols-12 md:py-20">
            <div className="md:col-span-3">
                <KineticHeading as="h2" text="About" className="section-title" />
                <p className="mt-3 font-mono text-[12px] leading-relaxed text-muted">
                    New Hampshire → Colorado College → Salt Lake City → Boulder
                </p>
            </div>
            <div className="md:col-span-5">
                <div className="space-y-4 leading-relaxed text-ink/85">
                    <p>
                        I grew up in New Hampshire, studied computer science and studio art at Colorado College, and spent
                        four years at Qualtrics in support, escalations, and customer success. The common thread was sitting
                        between users and engineers, and building the small tool that made a recurring problem go away.
                    </p>
                    <p>
                        I’m now at CU Boulder’s ATLAS Institute, pushing that same instinct into physical and creative
                        technology: things you can hold, print, and play with, not just click.
                    </p>
                    <p>
                        When I’m not building, I’m usually skiing, out after dark with a camera, or making pop-up books.
                    </p>
                </div>
                <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-line pt-6 text-[15px] leading-relaxed">
                    <div className="rounded-sm border border-line p-3.5">
                        <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-accent">Design</dt>
                        <dd className="mt-1 text-ink/85">Research with real users, flows, paper and physical prototyping, interface design.</dd>
                    </div>
                    <div className="rounded-sm border border-line p-3.5">
                        <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-cobalt">Build</dt>
                        <dd className="mt-1 text-ink/85">JavaScript and TypeScript, React and React Native, Python, SQL, Chrome extensions, n8n and LLM agents.</dd>
                    </div>
                    <div className="rounded-sm border border-line p-3.5">
                        <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-pine">Make</dt>
                        <dd className="mt-1 text-ink/85">Laser cutting, paper engineering, printmaking, photography, After Effects.</dd>
                    </div>
                </dl>
            </div>
            <figure className="md:col-span-4">
                <img
                    src={resolveAssetUrl('/assets/cards/star-trails.jpg')}
                    alt="Star trails circling above a small wooden ski-lift hut at night"
                    width={1400}
                    height={1120}
                    loading="lazy"
                    className="w-full rounded-lg border border-line object-cover"
                />
                <figcaption className="mt-2.5 text-sm leading-relaxed text-muted">
                    Ski Hill Star Trails.
                </figcaption>
            </figure>
        </div>
    </section>
);

export default AboutSection;
