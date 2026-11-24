import React from 'react';
import { KineticHeading, TopoDivider } from './AlpineMotifs';

type Role = { when: string; title: string; org: string; body?: string };

const ROLES: Role[] = [
    {
        when: '2026 – now',
        title: 'M.S. Creative Technology & Design',
        org: 'CU Boulder, ATLAS Institute',
    },
    {
        when: '2025 – 2026',
        title: 'Technical Success Manager',
        org: 'Qualtrics',
        body: 'Lead technical advisor for two of Qualtrics’ largest healthcare clients. Built a routing tool matching each patient complaint to the manager who already knows that patient, and migrated a national dental group onto native ticketing (~35,000 tickets in its first 30 days).',
    },
    {
        when: '2023 – 2025',
        title: 'Escalation Engineer',
        org: 'Qualtrics',
        body: 'Triaged 8 to 10 complex bug reports daily and owned the team’s internal tooling (Pretty Pulses Chrome extension, Slack bots). Designed the live X4 conference support desk, cutting wait times by 23%.',
    },
    {
        when: '2022 – 2023',
        title: 'Senior Product Specialist',
        org: 'Qualtrics',
        body: 'Built daily-use Raycast calculators, snippets, and shared link libraries for the department, and spent six weeks onboarding a new support team in Mexico City.',
    },
    {
        when: '2021 – 2022',
        title: 'Analytics Intern',
        org: 'LotLinx',
        body: 'Replaced the CFO’s manual daily, weekly, and monthly reporting with an automated Apps Script pipeline into BigQuery.',
    },
    {
        when: '2018 – 2022',
        title: 'B.A. Computer Science, minor in Studio Art',
        org: 'Colorado College',
    },
];

/** Trail-log experience timeline: scannable outcomes for hiring managers. */
const ExperienceSection: React.FC = () => (
    <section id="experience" className="pt-2">
        <TopoDivider elevation="02 / EXPERIENCE" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-14 sm:px-8 md:grid-cols-12 md:py-20">
            <div className="md:col-span-4">
                <KineticHeading as="h2" text="Experience" className="section-title" />
                <div className="mt-4 rounded-sm border border-line bg-paper p-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-cobalt">Measured impact</div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink/85">
                        Internal tools built across these roles saved my teams an estimated 350+ hours a year.
                    </p>
                </div>
            </div>
            <ol className="divide-y divide-line md:col-span-8">
                {ROLES.map(role => (
                    <li key={role.title} className="grid grid-cols-1 gap-1.5 py-5 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                        <div className="font-mono text-[13px] text-muted sm:pt-0.5">{role.when}</div>
                        <div>
                            <h3 className="font-bold text-ink">
                                {role.title} <span className="font-normal text-muted">· {role.org}</span>
                            </h3>
                            {role.body && <p className="mt-1.5 max-w-prose leading-relaxed text-ink/85">{role.body}</p>}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export default ExperienceSection;
