import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const MAKING_PAGES = [
    { label: 'Creative Code', to: '/creative-code' },
    { label: 'Book Arts', to: '/work/book-arts' },
    { label: 'XR', to: '/work/xr' },
    { label: 'Photo & Video', to: '/photo-video' },
];

const ThemeToggle: React.FC = () => {
    const { theme, toggle } = useTheme();
    const dark = theme === 'dark';
    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-ink/85 transition-colors hover:bg-ink/5 hover:text-accent active:scale-95"
        >
            {dark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
};

/** Sticky header: the single translucent surface on the site so scrolling content reads beneath it without heavy chrome. */
const SiteHeader: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [makingOpen, setMakingOpen] = useState(false);
    const menuBtnRef = useRef<HTMLButtonElement>(null);
    const makingBtnRef = useRef<HTMLButtonElement>(null);
    const makingContainerRef = useRef<HTMLLIElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(false);
        setMakingOpen(false);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                menuBtnRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    useEffect(() => {
        if (!makingOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMakingOpen(false);
                makingBtnRef.current?.focus();
            }
        };
        const onPointerDown = (e: MouseEvent) => {
            if (makingContainerRef.current && !makingContainerRef.current.contains(e.target as Node)) {
                setMakingOpen(false);
            }
        };
        window.addEventListener('keydown', onKey);
        window.addEventListener('mousedown', onPointerDown);
        return () => {
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('mousedown', onPointerDown);
        };
    }, [makingOpen]);

    const go = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(false);
        setMakingOpen(false);
        if (location.pathname === '/') {
            document.getElementById(id)?.scrollIntoView();
        } else {
            navigate(`/#${id}`);
        }
    };

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
                <Link
                    to="/"
                    className="inline-flex min-h-[44px] items-center font-serif text-xl font-medium transition-colors hover:text-accent active:opacity-75"
                    onClick={() => window.scrollTo(0, 0)}
                >
                    Silas Howe
                </Link>

                <div className="flex items-center gap-2 md:gap-5">
                    <nav aria-label="Main" className="hidden md:block">
                        <ul className="flex items-center gap-1 text-[15px]">
                            <li>
                                <a href="#work" onClick={go('work')} className="link-underline inline-flex min-h-[44px] items-center px-3 hover:text-accent">
                                    Work
                                </a>
                            </li>
                            <li>
                                <a href="#experience" onClick={go('experience')} className="link-underline inline-flex min-h-[44px] items-center px-3 hover:text-accent">
                                    Experience
                                </a>
                            </li>
                            <li
                                ref={makingContainerRef}
                                className="relative"
                                onMouseEnter={() => setMakingOpen(true)}
                                onMouseLeave={() => setMakingOpen(false)}
                            >
                                <button
                                    ref={makingBtnRef}
                                    type="button"
                                    aria-expanded={makingOpen}
                                    aria-controls="making-dropdown"
                                    onClick={() => setMakingOpen(o => !o)}
                                    className="link-underline inline-flex min-h-[44px] items-center gap-1.5 px-3 hover:text-accent"
                                >
                                    <span>Making</span>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                        className={`transition-transform duration-150 ${makingOpen ? 'rotate-180' : ''}`}
                                    >
                                        <path d="M2.5 4.5 6 8l3.5-3.5" />
                                    </svg>
                                </button>
                                {makingOpen && (
                                    <div
                                        id="making-dropdown"
                                        className="absolute right-0 top-full z-50 min-w-[12rem] pt-1"
                                    >
                                        <ul className="rounded-sm border border-line bg-paper p-1.5 shadow-md">
                                            <li>
                                                <a
                                                    href="#making"
                                                    onClick={go('making')}
                                                    className="flex min-h-[44px] items-center rounded-sm px-3 text-[14.5px] font-semibold text-ink transition-colors hover:bg-ink/5 hover:text-accent active:opacity-75"
                                                >
                                                    All Making
                                                </a>
                                            </li>
                                            <li aria-hidden="true" className="my-1 border-t border-line" />
                                            {MAKING_PAGES.map(page => (
                                                <li key={page.to}>
                                                    <Link
                                                        to={page.to}
                                                        onClick={() => setMakingOpen(false)}
                                                        className="flex min-h-[44px] items-center rounded-sm px-3 text-[14.5px] text-ink transition-colors hover:bg-ink/5 hover:text-accent active:opacity-75"
                                                    >
                                                        {page.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li>
                                <a href="#about" onClick={go('about')} className="link-underline inline-flex min-h-[44px] items-center px-3 hover:text-accent">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#contact" onClick={go('contact')} className="link-underline inline-flex min-h-[44px] items-center px-3 hover:text-accent">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <ThemeToggle />

                    <button
                        ref={menuBtnRef}
                        type="button"
                        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-ink/50 px-3 text-[14px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent active:scale-95 md:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        onClick={() => setOpen(o => !o)}
                    >
                        {open ? 'Close' : 'Menu'}
                    </button>
                </div>
            </div>

            {open && (
                <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-paper md:hidden">
                    <ul className="mx-auto max-w-6xl px-5 py-2">
                        <li>
                            <a href="#work" onClick={go('work')} className="flex min-h-[44px] items-center py-2 text-lg font-medium hover:text-accent active:opacity-75">
                                Work
                            </a>
                        </li>
                        <li>
                            <a href="#experience" onClick={go('experience')} className="flex min-h-[44px] items-center py-2 text-lg font-medium hover:text-accent active:opacity-75">
                                Experience
                            </a>
                        </li>
                        <li>
                            <a href="#making" onClick={go('making')} className="flex min-h-[44px] items-center py-2 text-lg font-medium hover:text-accent active:opacity-75">
                                Making
                            </a>
                            <ul className="mb-1 ml-3 border-l border-line pl-3">
                                {MAKING_PAGES.map(page => (
                                    <li key={page.to}>
                                        <Link
                                            to={page.to}
                                            onClick={() => setOpen(false)}
                                            className="flex min-h-[44px] items-center py-1.5 text-[15.5px] text-muted transition-colors hover:text-accent active:opacity-75"
                                        >
                                            {page.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <a href="#about" onClick={go('about')} className="flex min-h-[44px] items-center py-2 text-lg font-medium hover:text-accent active:opacity-75">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#contact" onClick={go('contact')} className="flex min-h-[44px] items-center py-2 text-lg font-medium hover:text-accent active:opacity-75">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default SiteHeader;
