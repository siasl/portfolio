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

const MediaDescription: React.FC<{ title?: string; body?: string | React.ReactNode }> = ({ title, body }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // If there is no body, just show the title (if it exists)
    if (!body) {
        return title ? (
            <div className="mt-3 px-1" onClick={(e) => e.stopPropagation()}>
                <div className="font-bold font-mono text-lg text-neo-black">
                    {title}
                </div>
            </div>
        ) : null;
    }

    return (
        <div className="mt-3 px-1" onClick={(e) => e.stopPropagation()}>
            <div className="font-bold font-mono text-lg text-neo-black">
                {title || "Description"}
            </div>

            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="font-mono text-neo-black whitespace-pre-wrap text-base">
                        {body}
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-ski-orange font-bold font-mono hover:underline text-sm uppercase mt-1"
            >
                {isOpen ? 'Read Less' : 'Read More...'}
            </button>
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
                        className={`border-4 border-neo-black shadow-neo bg-white p-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 cursor-pointer group ${item.fullWidth ? `md:col-span-${columns}` : ''}`}
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
                                {item.qrCode && (
                                    <button
                                        className="absolute top-2 right-2 bg-neo-white p-2 border-2 border-neo-black shadow-neo-sm hover:bg-neo-green transition-colors z-20 pointer-events-auto"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedMedia({ type: 'image', src: item.qrCode!, alt: 'Snapchat QR Code' });
                                        }}
                                        title="Show Snapcode"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="3" width="7" height="7"></rect>
                                            <rect x="14" y="14" width="7" height="7"></rect>
                                            <rect x="3" y="14" width="7" height="7"></rect>
                                        </svg>
                                    </button>
                                )}
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
                        {(item.description || item.descriptionTitle) && (
                            <MediaDescription title={item.descriptionTitle} body={item.description} />
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
                            className="border-4 border-neo-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-black p-2 max-w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedMedia.type === 'video' ? (
                                <video
                                    src={selectedMedia.src}
                                    poster={selectedMedia.poster}
                                    controls
                                    autoPlay
                                    className="max-h-[80vh] w-auto max-w-full object-contain"
                                />
                            ) : (
                                <img
                                    src={selectedMedia.src}
                                    alt={selectedMedia.alt || 'Full screen media'}
                                    className="max-h-[80vh] w-auto max-w-full object-contain"
                                />
                            )}
                            {(selectedMedia.description || selectedMedia.descriptionTitle) && (
                                <div className="mt-4 text-white text-center max-w-3xl mx-auto">
                                    {selectedMedia.descriptionTitle && (
                                        <div className="text-2xl font-bold font-mono mb-2">
                                            {selectedMedia.descriptionTitle}
                                        </div>
                                    )}
                                    {selectedMedia.description && (
                                        <div className="text-xl font-mono whitespace-pre-wrap">
                                            {selectedMedia.description}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MediaGallery;
