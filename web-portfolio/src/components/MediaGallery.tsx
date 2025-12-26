import React from 'react';

interface MediaItem {
    type: 'image' | 'video' | 'iframe';
    src: string;
    alt?: string;
    description?: string | React.ReactNode;
    descriptionTitle?: string;
    fullWidth?: boolean;
    qrCode?: string;
    poster?: string;
}

interface MediaGalleryProps {
    media: MediaItem[];
    columns?: number;
}

const MediaDescription: React.FC<{ title?: string; body?: string | React.ReactNode; onQrCodeClick?: () => void }> = ({ title, body, onQrCodeClick }) => {
    const isShort = typeof body === 'string' && body.length < 150;
    const [expanded, setExpanded] = React.useState(false);
    const showContent = isShort || expanded;

    // If there is no body, just show the title (if it exists)
    if (!body) {
        if (!title && !onQrCodeClick) return null;
        return (
            <div className="mt-3 px-1" onClick={(e) => e.stopPropagation()}>
                {title && (
                    <div className="font-bold font-mono text-lg text-neo-black">
                        {title}
                    </div>
                )}
                {onQrCodeClick && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onQrCodeClick();
                        }}
                        className="text-ski-orange font-bold font-mono hover:underline text-sm uppercase mt-1 block"
                    >
                        click here to view lens
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="mt-3 px-1" onClick={(e) => e.stopPropagation()}>
            <div className="font-bold font-mono text-lg text-neo-black">
                {title || "Description"}
            </div>

            <div className={`grid transition-all duration-300 ease-in-out ${showContent ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="font-mono text-neo-black whitespace-pre-wrap text-base">
                        {body}
                    </div>
                </div>
            </div>

            {!isShort && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-ski-orange font-bold font-mono hover:underline text-sm uppercase mt-1"
                >
                    {expanded ? 'Read Less' : 'Read More...'}
                </button>
            )}

            {onQrCodeClick && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onQrCodeClick();
                    }}
                    className="text-ski-orange font-bold font-mono hover:underline text-sm uppercase mt-1 block"
                >
                    click here to view lens
                </button>
            )}
        </div>
    );
};

const ScrollableDescription: React.FC<{ title?: string; body?: string | React.ReactNode }> = ({ title, body }) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [showScrollIndicator, setShowScrollIndicator] = React.useState(false);

    const checkScroll = () => {
        if (contentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
            // Show indicator if there is more content to scroll to (with a small buffer)
            setShowScrollIndicator(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 10);
        }
    };

    React.useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [title, body]);

    return (
        <div className="relative mt-4 max-w-3xl mx-auto flex-shrink-0 max-h-[30vh] flex flex-col min-h-0">
            <div
                ref={contentRef}
                onScroll={checkScroll}
                className="overflow-y-auto px-4 pb-2 text-white text-center"
            >
                {title && (
                    <div className="text-2xl font-bold font-mono mb-2 sticky top-0 bg-black py-1 z-10">
                        {title}
                    </div>
                )}
                {body && (
                    <div className="text-xl font-mono whitespace-pre-wrap">
                        {body}
                    </div>
                )}
            </div>
            {showScrollIndicator && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            )}
        </div>
    );
};

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, columns = 2 }) => {
    const [selectedMedia, setSelectedMedia] = React.useState<MediaItem | null>(null);

    if (!media || media.length === 0) return null;

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedMedia(null);
            }
        };

        if (selectedMedia) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedMedia]);

    // Dynamic grid class based on columns prop
    const gridClass = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    }[columns] || 'md:grid-cols-2';

    return (
        <>
            <div className={`grid grid-cols-1 ${gridClass} gap-8 mt-8 items-start`}>
                {media.map((item, index) => (
                    <div
                        key={index}
                        className={`border-4 border-neo-black shadow-neo bg-white p-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 cursor-pointer group ${item.fullWidth ? 'md:col-span-full' : ''}`}
                        onClick={() => item.type !== 'iframe' && setSelectedMedia(item)}
                    >
                        {item.type === 'video' ? (
                            <div className="relative">
                                <video
                                    src={item.src}
                                    poster={item.poster}
                                    className="w-full h-auto border-2 border-neo-black transition-all duration-500 pointer-events-none"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-neo-white border-2 border-neo-black p-3 rounded-full shadow-neo-sm group-hover:scale-110 transition-transform duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-neo-black">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        ) : item.type === 'iframe' ? (
                            <iframe
                                src={item.src}
                                title={item.alt || 'Embedded content'}
                                className="w-full h-full aspect-video border-2 border-neo-black"
                                allowFullScreen
                            />
                        ) : (
                            <img
                                src={item.src}
                                alt={item.alt || 'Project media'}
                                className="w-full h-auto border-2 border-neo-black transition-all duration-500"
                            />
                        )}

                        {/* Description */}
                        {(item.description || item.descriptionTitle || item.qrCode) && (
                            <MediaDescription
                                title={item.descriptionTitle}
                                body={item.description}
                                onQrCodeClick={item.qrCode ? () => setSelectedMedia({ type: 'image', src: item.qrCode!, alt: 'Snapchat QR Code' }) : undefined}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-[200] bg-neo-black/90 flex items-center justify-center p-4 md:p-8"
                    onClick={() => setSelectedMedia(null)}
                >
                    <div className="relative max-w-7xl max-h-full w-full flex items-center justify-center">
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="absolute -top-12 right-0 text-white hover:text-neo-green transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div
                            className="border-4 border-neo-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-black p-2 w-full max-w-6xl h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex-1 min-h-0 relative w-full bg-black">
                                {selectedMedia.type === 'video' ? (
                                    <video
                                        src={selectedMedia.src}
                                        poster={selectedMedia.poster}
                                        controls
                                        autoPlay
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                ) : (
                                    <img
                                        src={selectedMedia.src}
                                        alt={selectedMedia.alt || 'Full screen media'}
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                )}
                            </div>
                            {(selectedMedia.description || selectedMedia.descriptionTitle) && (
                                <ScrollableDescription title={selectedMedia.descriptionTitle} body={selectedMedia.description} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MediaGallery;
