import React from 'react';
import { KineticHeading, TopoDivider } from './AlpineMotifs';

/** Contact: the email address, large and plain. */
const Footer: React.FC = () => (
    <footer id="contact" className="pt-2">
        <TopoDivider elevation="05 / CONTACT" />
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
            <KineticHeading as="h2" text="Contact" className="section-title" />
            <a
                href="mailto:silashowe1999@gmail.com"
                className="heading mt-4 inline-flex min-h-[44px] items-center break-all text-[1.8rem] underline decoration-ink/30 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent active:opacity-75 sm:text-[2.6rem]"
            >
                silashowe1999@gmail.com
            </a>
            <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[12px]">© {new Date().getFullYear()} Silas Howe · Boulder, Colorado</p>
                <div className="flex items-center gap-4">
                    <a
                        href="https://www.linkedin.com/in/silashowe/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex min-h-[44px] items-center px-2 hover:text-accent"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/siasl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex min-h-[44px] items-center px-2 hover:text-accent"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
