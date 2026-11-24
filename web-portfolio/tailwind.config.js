/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // RGB channel tokens keep Tailwind opacity modifiers (e.g. text-ink/80) working across themes.
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--ink) / var(--line-alpha))',
        pine: 'rgb(var(--pine) / <alpha-value>)',
        cobalt: 'rgb(var(--cobalt) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        // Used only inside product reconstructions, never for site chrome.
        coral: '#FF6B5B',
        teal: '#1FB8A6',
        violet: '#7C5CFF',
        amber: '#F2A33A',
        sky: '#3D7BFF',
        moss: '#3FAE6B',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        display: ['"National Park"', 'system-ui', 'sans-serif'],
        body: ['"National Park"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '4px',
        md: '6px',
        lg: '10px',
        xl: '12px',
        '2xl': '16px',
      },
      maxWidth: {
        prose: '38rem',
      },
    },
  },
  plugins: [],
}
