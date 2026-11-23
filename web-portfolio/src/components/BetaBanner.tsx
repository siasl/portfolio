const BETA_URL = 'https://beta.silashowe.com';

const BetaBanner: React.FC = () => (
    <a
        href={BETA_URL}
        className="group block w-full bg-ski-orange text-neo-white border-b-4 border-neo-black font-mono font-bold uppercase text-xs sm:text-sm tracking-wide hover:bg-neo-black transition-colors"
    >
        <span className="block py-3 pl-4 pr-28 sm:px-28 text-left sm:text-center">
            A new version of this portfolio is in progress —{' '}
            <span className="underline underline-offset-4">click here to see it</span>{' '}
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
    </a>
);

export default BetaBanner;
