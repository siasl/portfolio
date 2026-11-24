import { useEffect } from 'react';

/** Sets the browser tab title, e.g. "Call Light · Silas Howe". */
export const useDocumentTitle = (title?: string) => {
    useEffect(() => {
        document.title = title ? `${title} · Silas Howe` : 'Silas Howe';
    }, [title]);
};
