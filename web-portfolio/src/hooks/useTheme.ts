import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const read = (): Theme =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light';

/** Site theme. The initial class is set by an inline script in index.html; this keeps it in sync. */
export function useTheme() {
    const [theme, setTheme] = useState<Theme>(read);

    // Follow the system setting until the visitor picks a theme themselves.
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (e: MediaQueryListEvent) => {
            let saved: string | null = null;
            try { saved = localStorage.getItem('theme'); } catch { /* storage unavailable */ }
            if (saved) return;
            document.documentElement.classList.toggle('dark', e.matches);
            setTheme(e.matches ? 'dark' : 'light');
        };
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    const toggle = useCallback(() => {
        const next: Theme = read() === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', next === 'dark');
        try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
        setTheme(next);
    }, []);

    return { theme, toggle };
}
