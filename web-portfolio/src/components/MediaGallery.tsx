import React from 'react';

interface MediaItem {
    type: 'image' | 'video' | 'iframe';
    src: string;
    alt?: string;
    description?: string | React.ReactNode;
    fullWidth?: boolean;
    qrCode?: string;
}

interface MediaGalleryProps {
    media: MediaItem[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media }) => {
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

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 items-start">
                {media.map((item, index) => (
                    <div
                        key={index}
                        className={`border-4 border-neo-black shadow-neo bg-white p-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 cursor-pointer group ${item.fullWidth ? 'md:col-span-2' : ''}`}
                        onClick={() => item.type !== 'iframe' && setSelectedMedia(item)}
                    >
                        {item.type === 'video' ? (
                            <div className="relative">
                                <video
                                    src={item.src}
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
                        {item.description && (
                            <div className="mt-3 text-lg font-mono text-neo-black px-1 whitespace-pre-wrap">
                                {item.description}
                            </div>
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
                            {selectedMedia.description && (
                                <div className="mt-4 text-xl font-mono text-white text-center max-w-3xl mx-auto whitespace-pre-wrap">
                                    {selectedMedia.description}
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
