import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const NotFound: React.FC = () => {
    useDocumentTitle('Page not found');
    return (
        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <h1 className="heading text-[2.4rem]">Page not found</h1>
            <p className="mt-4 max-w-prose leading-relaxed text-ink/85">
                There’s nothing at this address. It may have moved when I reorganized the site.
            </p>
            <p className="mt-6">
                <Link to="/" className="text-link inline-flex min-h-[44px] items-center font-semibold">
                    Go to the homepage
                </Link>
            </p>
        </section>
    );
};

export default NotFound;
