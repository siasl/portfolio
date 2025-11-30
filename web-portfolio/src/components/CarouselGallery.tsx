import React, { useRef, useState, useEffect } from 'react';

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

interface CarouselGalleryProps {
    media: MediaItem[];
}

const CarouselGallery: React.FC<CarouselGalleryProps> = ({ media }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!media || media.length === 0) return null;

    const scrollToindex = (index: number) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const itemWidth = container.clientWidth;
            container.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const itemWidth = container.clientWidth;
            const newIndex = Math.round(container.scrollLeft / itemWidth);
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        }
    };

    // Debounce scroll handler to avoid excessive updates
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            let timeoutId: ReturnType<typeof setTimeout>;
            const onScroll = () => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(handleScroll, 50);
            };
            container.addEventListener('scroll', onScroll);
            return () => {
                container.removeEventListener('scroll', onScroll);
                clearTimeout(timeoutId);
            };
        }
    }, [activeIndex]);

    return (
        <div className="w-full relative">
            {/* Main Carousel View */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full aspect-video border-4 border-neo-black bg-neo-white shadow-neo"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {media.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center bg-black relative"
                    >
                        {item.type === 'video' ? (
                            <video
                                src={item.src}
                                poster={item.poster}
                                controls
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : item.type === 'iframe' ? (
                            <iframe
                                src={item.src}
                                title={item.alt || 'Embedded content'}
                                className="w-full h-full border-0"
                                allowFullScreen
                            />
                        ) : (
                            <img
                                src={item.src}
                                alt={item.alt || 'Project media'}
                                className="max-w-full max-h-full object-contain"
                            />
                        )}


                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {activeIndex > 0 && (
                <button
                    onClick={() => scrollToindex(activeIndex - 1)}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-neo-white border-2 border-neo-black p-2 shadow-neo-sm hover:translate-x-[-2px] hover:shadow-none transition-all z-10"
                    aria-label="Previous image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
            )}

            {activeIndex < media.length - 1 && (
                <button
                    onClick={() => scrollToindex(activeIndex + 1)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-neo-white border-2 border-neo-black p-2 shadow-neo-sm hover:translate-x-[2px] hover:shadow-none transition-all z-10"
                    aria-label="Next image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            )}

            {/* Active Item Caption */}
            {(media[activeIndex].description || media[activeIndex].descriptionTitle) && (
                <div className="mt-4 border-l-4 border-neo-black pl-4">
                    {media[activeIndex].descriptionTitle && (
                        <h4 className="font-bold text-lg mb-1">{media[activeIndex].descriptionTitle}</h4>
                    )}
                    {media[activeIndex].description && (
                        <div className="text-base">{media[activeIndex].description}</div>
                    )}
                </div>
            )}

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {media.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToindex(index)}
                        className={`flex-shrink-0 w-24 h-16 border-2 transition-all duration-200 ${activeIndex === index
                            ? 'border-neo-black ring-2 ring-neo-green ring-offset-2 opacity-100'
                            : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                    >
                        {item.type === 'video' ? (
                            item.poster ? (
                                <img
                                    src={item.poster}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                    <span className="text-white text-xs">Video</span>
                                </div>
                            )
                        ) : item.type === 'iframe' ? (
                            item.poster ? (
                                <img
                                    src={item.poster}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                    <span className="text-white text-xs">Embed</span>
                                </div>
                            )
                        ) : (
                            <img
                                src={item.src}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CarouselGallery;
