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

    if (!body) {
        return title ? (
            <div className="mt-2 px-1">
                <div className="font-medium text-sm text-white/90">
                    {title}
                </div>
            </div>
        ) : null;
    }

    return (
        <div className="mt-2 px-1">
            <div className="font-medium text-sm text-white/90">
                {title || "Description"}
            </div>

            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="text-white/80 whitespace-pre-wrap text-sm bg-white/5 rounded-lg p-3 border border-white/10">
                        {body}
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="mt-2 text-xs font-medium text-blue-300 hover:text-blue-200 transition-colors"
            >
                {isOpen ? 'Read Less' : 'Read More...'}
            </button>
        </div>
    );
};

const ScrollableDescription: React.FC<{ title?: string; body?: string | React.ReactNode }> = ({ title, body }) => {
    return (
        <div className="relative mt-4 max-w-3xl mx-auto flex-shrink-0 max-h-[30vh] flex flex-col min-h-0 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="overflow-y-auto px-2 pb-2 text-white text-center custom-scrollbar">
                {title && (
                    <div className="text-lg font-bold mb-2 sticky top-0 bg-transparent py-1 z-10">
                        {title}
                    </div>
                )}
                {body && (
                    <div className="text-base whitespace-pre-wrap text-left text-white/90">
                        {body}
                    </div>
                )}
            </div>
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

    const gridClass = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    }[columns] || 'md:grid-cols-2';

    return (
        <>
            <div className={`grid grid-cols-1 ${gridClass} gap-6 mt-4 items-start`}>
                {media.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-white/5 p-2 rounded-xl border border-white/10 hover:bg-white/10 transition-colors ${item.fullWidth ? 'md:col-span-full' : ''}`}
                    >
                        <div
                            className="rounded-lg overflow-hidden cursor-pointer group relative aspect-video bg-black/20"
                            onClick={() => item.type !== 'iframe' && setSelectedMedia(item)}
                        >
                            {item.type === 'video' ? (
                                <div className="relative w-full h-full">
                                    <video
                                        src={item.src}
                                        poster={item.poster}
                                        className="w-full h-full object-cover pointer-events-none"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:scale-110 transition-transform duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                            </svg>
                                        </div>
                                    </div>
                                    {item.qrCode && (
                                        <button
                                            className="absolute top-2 right-2 bg-white/20 p-2 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors z-20 pointer-events-auto"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedMedia({ type: 'image', src: item.qrCode!, alt: 'Snapchat QR Code' });
                                            }}
                                            title="Show Snapcode"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
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
                                    className="w-full h-full"
                                    allowFullScreen
                                />
                            ) : (
                                <img
                                    src={item.src}
                                    alt={item.alt || 'Project media'}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                        </div>

                        {(item.description || item.descriptionTitle) && (
                            <MediaDescription title={item.descriptionTitle} body={item.description} />
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                    onClick={() => setSelectedMedia(null)}
                >
                    <div className="relative max-w-7xl max-h-full w-full flex flex-col items-center justify-center">
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div
                            className="w-full max-w-6xl h-[80vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex-1 min-h-0 relative w-full rounded-xl overflow-hidden shadow-2xl bg-black">
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
