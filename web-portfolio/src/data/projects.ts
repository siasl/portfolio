export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    media: {
        type: 'image' | 'video' | 'iframe';
        src: string;
        alt?: string;
        description?: string;
    }[];
    links?: {
        label: string;
        url: string;
    }[];
}

export const projects: Project[] = [
    {
        id: 'do-board',
        title: 'Do Board',
        description: 'A tactile to-do list I designed. Inspired by mechanical keyboards, each row has a distinct and satisfying tactility as you erase each task you complete. Originally, I was planning to light up LEDs to indicate a task being completed, but as I iterated on the design, I decided simple was better.',
        tags: ['Product Design', 'Hardware', 'Prototyping'],
        media: [
            { type: 'video', src: '/assets/do-board/Do_Board_Video_V2.mp4', description: 'Final prototype demonstration showing the tactile mechanism.' },
            { type: 'image', src: '/assets/do-board/Do_Board_IMG_8855.jpeg', alt: 'Do Board Prototype', description: 'Close-up of the finished Do Board prototype.' },
            { type: 'image', src: '/assets/do-board/Do_Board_IMG_8843.jpeg', alt: 'Do Board Close up', description: 'Detail view of the toggle switches.' },
            { type: 'image', src: '/assets/do-board/Do_Board_IMG_8871.jpeg', alt: 'V1 Paper Prototype', description: 'Early paper prototype to test the concept.' },
            { type: 'image', src: '/assets/do-board/Do_Board_IMG_8868.jpeg', alt: 'V1 Paper Prototype' },
            { type: 'image', src: '/assets/do-board/IMG_8859.jpeg', alt: 'V2 Laser Cut' },
            { type: 'image', src: '/assets/do-board/IMG_8860.jpeg', alt: 'V2 Laser Cut' },
            { type: 'image', src: '/assets/do-board/IMG_8864.jpeg', alt: 'V2 Laser Cut' },
            { type: 'image', src: '/assets/do-board/Do_Board_Image_8873.jpeg', alt: 'All iterations' },
            { type: 'image', src: '/assets/do-board/Dec_21_2021_Photo_(1).jpeg', alt: 'Design Drawing' },
            { type: 'image', src: '/assets/do-board/Dec_21_2021_Photo.jpeg', alt: 'Design Drawing' },
        ]
    },
    {
        id: 'book-arts',
        title: 'Book Arts',
        description: 'Tied Up - Monotype prints and book binding. A zine I designed in photoshop/illustrator.',
        tags: ['Print', 'Design', 'Book Binding'],
        media: [
            { type: 'image', src: '/assets/book-arts/20201216_010544.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201215_194819.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201215_194841.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201215_194849.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201215_194859.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201215_194906.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201215_194916.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201215_194924.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201215_194932.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201215_194938.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201216_010601.jpg', alt: 'Book Art' },
            { type: 'image', src: '/assets/book-arts/20201216_010606.jpg', alt: 'Book Art' },
        ],
        links: [
            { label: 'Howe_Quaranzine.pdf', url: '/assets/book-arts/Howe_Quaranzine.pdf' }
        ]
    },
    {
        id: 'call-light',
        title: 'Call Light',
        description: 'Computer Science final project - I served as product manager, designer and front end developer. We came up with a prototype of a novel way for patients to communicate with their nurses while in the hospital.',
        tags: ['Product Management', 'Design', 'Frontend'],
        media: [],
        links: [
            { label: 'Presentation PDF', url: '/assets/call-light/Call_Light_Block_7_Presentation.pdf' }
        ]
    },
    {
        id: 'personal-automations',
        title: 'Personal Automations',
        description: 'Instagram digest - Stay in the know without the infinite feed! An automation that sends me posts from important Instagram accounts to me on Telegram daily. Scrapes Instagram using Apify Actors. Also includes an AI Recipe Bot.',
        tags: ['Automation', 'Coding', 'AI'],
        media: [
            { type: 'image', src: '/assets/personal-automations/SCR-20251101-pgvs.png', alt: 'Instagram Digest' },
            { type: 'iframe', src: 'https://www.youtube.com/embed/37RvtquWNng' },
            { type: 'iframe', src: 'https://www.youtube.com/embed/pSGgV2VVAcY' }
        ]
    },
    {
        id: 'photography',
        title: 'Photography',
        description: 'A collection of my photography work.',
        tags: ['Photography'],
        media: [
            { type: 'image', src: '/assets/photography/Photography/Monadnock Milky Way/Monadnock_Milky_Way.jpg', alt: 'Monadnock Milky Way' },
            { type: 'image', src: '/assets/photography/Photography/Nepal 70/Nepal_70.jpg', alt: 'Nepal 70' },
            { type: 'image', src: '/assets/photography/Photography/Nepal Photo/Nepal_Photo.jpg', alt: 'Nepal Photo' },
            { type: 'image', src: '/assets/photography/Photography/Nepal Photo (1)/Nepal_Photo_(1).jpg', alt: 'Nepal Photo 1' },
            { type: 'image', src: '/assets/photography/Photography/Nepal Photo (2)/Nepal_Photo_(2).jpg', alt: 'Nepal Photo 2' },
            { type: 'image', src: '/assets/photography/Photography/Photo Jul 26 2018/Photo_Jul_26_2018.jpg', alt: 'Photo Jul 26 2018' },
            { type: 'image', src: '/assets/photography/Photography/Photo Jun 15 2019 (1)/Photo_Jun_15_2019_(1).jpeg', alt: 'Photo Jun 15 2019' },
            { type: 'image', src: '/assets/photography/Photography/Photo Sept 27 2024 (2)/Photo_Sept_27_2024_(2).jpg', alt: 'Photo Sept 27 2024' },
            { type: 'image', src: '/assets/photography/Photography/Photo Sept 27 2024 (3)/Photo_Sept_27_2024_(3).jpg', alt: 'Photo Sept 27 2024' },
            { type: 'image', src: '/assets/photography/Photography/Photo Sept 27 2024 (4)/Photo_Sept_27_2024_(4).jpg', alt: 'Photo Sept 27 2024' },
            { type: 'image', src: '/assets/photography/Photography/Ski Hill Star Trails/Ski_Hill_Star_Trails.jpeg', alt: 'Ski Hill Star Trails' },
        ]
    },
    {
        id: 'video',
        title: 'Video',
        description: 'Video projects.',
        tags: ['Video', 'Editing'],
        media: [
            { type: 'video', src: '/assets/video/Video_Normal_Size.mp4' },
            { type: 'video', src: '/assets/video/Perspective_3.mp4' },
            { type: 'iframe', src: 'https://www.youtube.com/embed/SHSzfIY1MVs' }
        ]
    },
    {
        id: 'xr',
        title: 'XR',
        description: 'AR and VR projects including Snapchat Lenses (Farm Animal, Furniture Placement, Paper Sailboat, Retro Radio) and Photogrammetry.',
        tags: ['AR', 'VR', 'Snapchat Lens', 'Photogrammetry'],
        media: [
            { type: 'video', src: '/assets/xr/Snapchat_Video_(2).mp4' },
            { type: 'image', src: '/assets/xr/image.png', alt: 'Farm Animal Lens' },
            { type: 'video', src: '/assets/xr/Snapchat-1064081822.mp4' },
            { type: 'image', src: '/assets/xr/image 1.png', alt: 'Furniture Lens' },
            { type: 'video', src: '/assets/xr/Snapchat_Video_(1).mp4' },
            { type: 'image', src: '/assets/xr/image 2.png', alt: 'Sailboat Lens' },
            { type: 'video', src: '/assets/xr/Screen_Recording_Feb_24_2021_from_Google_Photos.mp4' },
            { type: 'image', src: '/assets/xr/image 3.png', alt: 'Retro Radio Lens' },
            { type: 'iframe', src: 'https://panoraven.com/en/embed/LtyX6M4M7S' },
            { type: 'iframe', src: 'https://sketchfab.com/models/055f250172434630ab35bf64f4a211bd/embed' },
            { type: 'iframe', src: 'https://sketchfab.com/models/816e7f9cdefe48a9b48082471d2edbce/embed' },
        ]
    },
    {
        id: 'ai-disclosure',
        title: 'AI Disclosure',
        description: "The use of AI in creative and coding projects is on the rise and everyone seems to have their own beliefs on the morality of it. For the sake of transparency, I want to disclose that I \"vibe coded\" the template of this website. I'm still grappling with what types of AI usage I like and don't like. I don't believe it should be used to generate images or videos to replace human creativity. I chose to use it on this website because I felt it was in the same vein as using an out of the box template from a website builder like Squarespace or Wix. In those cases, I wouldn't be building the site from scratch either and would be building off of someone else's work. I'm very open to discussing this topic and would love to hear your thoughts. Feel free to reach out to me via email or on LinkedIn.",
        tags: [],
        media: []
    }
];
