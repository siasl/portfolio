const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;

export const resolveAssetUrl = (url?: string) => {
    if (!url) return url;
    if (ABSOLUTE_URL_PATTERN.test(url) || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) {
        return url;
    }

    const base = import.meta.env.BASE_URL || '/';
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    const normalizedPath = url.replace(/^\/+/, '');

    return `${normalizedBase}${normalizedPath}`;
};
