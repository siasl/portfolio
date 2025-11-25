import React from 'react';

export interface Project {
    id: string;
    title: string;
    description: string | React.ReactNode;
    tags: string[];
    columns?: number;
    media: {
        type: 'image' | 'video' | 'iframe';
        src: string;
        alt?: string;
        description?: string | React.ReactNode;
        descriptionTitle?: string;
        fullWidth?: boolean;
        qrCode?: string;
        poster?: string;
    }[];
    links?: {
        label: string;
        url: string;
    }[];
}

export const projects: Project[] = [
    {
        id: 'call-light',
        title: 'Call Light',
        description: (
            <>
                <b>Computer Science Major Senior Project</b>
                {'\n'}I served as product manager, designer and front end developer. We came up with a prototype of a novel way for patients to communicate with their nurses while in the hospital.
                {'\n'}{'\n'}
                The purpose of this project was to address antiquated communication between nurses and patients on the medical surgical floor of the hospital. In this environment a nurse is frequently responsible for multiple patients. The current system is inefficient because the only way the patient can contact a nurse is by activating a light above their door via a button. While a call light is usually not an emergency, as those are typically caught in real time through existing technologies, the nurse must respond as quickly as possible because there is no way of knowing why the light has been activated without speaking to the patient. After the light has been activated, the nurse frequently has to make trips to other parts of the floor before returning to meet the needs of the patient.
                {'\n'}{'\n'}
                There are so many steps that are required to meet the needs of a patient that simply having a patient turning on their call light becomes a very time consuming process. This can be compounded by the presence of COVID-19 patients who require the nurse to apply and remove additional protective equipment every time the enter and leave the patient’s room. Our project will introduce a way for an alert and aware patient to be in direct contact with their nurse via an application. This app will allow for the patient to make requests of the nurse and receive confirmation from the nurse that the request will be fulfilled. This allows nurses to remove unneeded trips to and from a patients room and prioritize their current task based on time sensitivity. An important feature of this app is that it will also be designed to end any ability for a patient to contact a nurse either when the nurse’s shift is over or when the patient is discharged from the medical surgical unit.
            </>
        ),
        tags: ['Product Management', 'Design', 'Frontend'],
        media: [
            { type: 'image', src: 'assets/call-light/Procedure Diagram.png', alt: 'Call Light Procedure Diagram', descriptionTitle: 'Call Light Procedure Diagram' },
            { type: 'image', src: 'assets/call-light/Basic Navigation.png', alt: 'Basic Navigation Diagram', descriptionTitle: 'Basic Navigation Diagram' },
            {
                type: 'image', src: 'assets/call-light/Room List Screen.png', alt: 'Room List Screen', descriptionTitle: 'Room List Screen', description: <><p>The room screen list shows all the rooms (or patient devices) that are registered with the system. The main purpose of this screen is marking rooms as “favorite” which will make requests that come from those rooms easier to access on the feed screen. This is a scrollable list so if there are more rooms than can fit on the screen, make sure you scroll to see the rest. {'\n'}{'\n'}
                    <b>1. Screen Title</b> - This tells you what screen you are on{'\n'}
                    <b>2. Favorite Button</b>- This is the button you use to favorite or unfavorite a room. When a room is favorited the star is yellow. When it is not, the star is black. It is suggested that you mark the rooms you are covering during your shift as favorite while leaving the rest as un-favorited so that your assigned rooms are easier to access.{'\n'}
                    <b>3. Room Title</b> - This is the name of the device.{'\n'}
                    <b>4. Separator</b> - The separator separates the favorited rooms from the unfavorited rooms{'\n'}
                    <b>5. Navigation Bar</b> - This is how you navigate between the two screens. The screen that you are currently in will be highlighted blue.</p></>
            },
            {
                type: 'image', src: 'assets/call-light/Feed Screen.png', alt: 'Feed Screen', descriptionTitle: 'Feed Screen', description: <><p>The Feed Screen shows all of the requests that are being made by patient devices. The requests coming from the favorited devices will be put at the top of the list. Requests are sorted in reverse chronological order. This means that the most recent requests will be at the bottom of their section and the oldest requests will be at the top. Requests are colored based on their category. The colors match those that are on the patient device.
                    {'\n'}{'\n'}
                    <b>1. Room Title</b> - This tells you which room or device sent the request.{'\n'}
                    <b>2. Time Stamp</b> - This tells you how long it has been since the request was submitted{'\n'}
                    <b>3. Request Category</b> - This is the general category of the request. Requests are colored to match their categories.{'\n'}
                    <b>4. Request Message</b> - This gives more detailed information on what the patient is requesting.{'\n'}
                    <b>5. Acknowledge Button (Request has been acknowledged)</b> - This button is used to mark requests as acknowledged or completed. If it is filled in, that means it has been acknowledged. The request state syncs across nurse devices so if another nurse has marked it as acknowledged, the button will reflect that status. If this button is pressed when it’s in this state, the request will be marked as completed. More information is provided for this down below.{'\n'}
                    <b>6. Acknowledge Button (Request has NOT been acknowledge)</b> - When the acknowledge button is pressed while it isn’t filled in, the request will be marked as acknowledged.
                    The Separator - This separates the favorites section from the non favorite sections</p></>
            }
        ],
        links: [
            { label: 'Presentation PDF', url: '/assets/call-light/Call_Light_Block_7_Presentation.pdf' }
        ]
    },
    {
        id: 'do-board',
        title: 'Do Board',
        description: 'A tactile to-do list I designed. Inspired by mechanical keyboards, each row has a distinct and satisfying tactility as you erase each task you complete. Originally, I was planning to light up LEDs to indicate a task being completed, but as I iterated on the design, I decided simple was better.',
        tags: ['Product Design', 'Hardware', 'Prototyping'],
        columns: 2,
        media: [
            { type: 'video', src: '/assets/do-board/Do_Board_Video_V2.mp4', descriptionTitle: 'Do Board Promo Video', fullWidth: true, poster: '/assets/do-board/DoBoard_Poster.png' },
            { type: 'image', src: '/assets/do-board/Do_Board_IMG_8855.jpeg', alt: 'Do Board Prototype', descriptionTitle: 'Close-up of the finished Do Board prototype.' },
            { type: 'image', src: '/assets/do-board/Do_Board_IMG_8843.jpeg', alt: 'Do Board Close up', descriptionTitle: 'Detailed view of the final iteration.' },
            { type: 'image', src: '/assets/do-board/Do_Board_IMG_8868.jpeg', alt: 'V1 Paper Prototype', descriptionTitle: 'V1 Paper Prototype' },
            { type: 'image', src: '/assets/do-board/IMG_8859.jpeg', alt: 'V2 Laser Cut', descriptionTitle: 'V2 - Still using lights and electronics.' },
            { type: 'image', src: '/assets/do-board/IMG_8864.jpeg', alt: 'V2 Laser Cut', descriptionTitle: 'V2 - lighting up ' },
            { type: 'image', src: '/assets/do-board/Do_Board_Image_8873.jpeg', alt: 'All iterations', descriptionTitle: 'All iterations' },
            { type: 'image', src: '/assets/do-board/Dec_21_2021_Photo_(1).jpeg', alt: 'Design Drawing', descriptionTitle: 'Design Drawings' },
            { type: 'image', src: '/assets/do-board/Dec_21_2021_Photo.jpeg', alt: 'Design Drawing', descriptionTitle: 'Design Drawings' },
        ]
    },
    {
        id: 'personal-automations',
        title: 'Personal Automations',
        description: 'Instagram digest - Stay in the know without the infinite feed! An automation that sends me posts from important Instagram accounts to me on Telegram daily. Scrapes Instagram using Apify Actors. Also includes an AI Recipe Bot.',
        tags: ['Automation', 'Coding', 'AI'],
        media: [
            {
                type: 'iframe', src: 'https://www.youtube.com/embed/37RvtquWNng', descriptionTitle: 'Instagram Digest Creator'
            },
            { type: 'iframe', src: 'https://www.youtube.com/embed/pSGgV2VVAcY', descriptionTitle: 'AI Recipe Bot' }
        ]
    },
    {
        id: 'video',
        title: 'Video',
        description: 'Video projects.',
        tags: ['Video', 'Editing'],
        media: [
            { type: 'video', src: '/assets/video/Perspective_3.mp4', poster: '/assets/video/frisbeePoster.png', descriptionTitle: 'Frisbee Video - 8.2M views, 1M Likes on Tiktok' },
            { type: 'video', src: '/assets/video/Ball_Persepective_video.mp4', poster: '/assets/video/ballPoster.png', descriptionTitle: 'Ball Video - 2.7M views, 107.3k Likes on Tiktok' },
            { type: 'video', src: '/assets/video/Video_Normal_Size.mp4', poster: '/assets/video/CarPoster.png', descriptionTitle: 'Car Video - Playing with perspective, car' },
            { type: 'iframe', src: 'https://www.youtube.com/embed/SHSzfIY1MVs', descriptionTitle: 'Ski Bum - Basic Filmmaking Final Project' }
        ]
    },
    {
        id: 'photography',
        title: 'Photography',
        description: 'A collection of my photography work.',
        tags: ['Photography'],
        media: [
            { type: 'image', src: '/assets/photography/Photography/Ski Hill Star Trails/Ski_Hill_Star_Trails.jpeg', alt: 'Ski Hill Star Trails' },
            { type: 'image', src: '/assets/photography/Photography/Nepal 70/Nepal_70.jpg', alt: 'Nepal 70' },
            { type: 'image', src: '/assets/photography/Photography/Nepal Photo/Nepal_Photo.jpg', alt: 'Nepal Photo' },
            { type: 'image', src: '/assets/photography/Photography/Nepal Photo (1)/Nepal_Photo_(1).jpg', alt: 'Nepal Photo 1' },
            { type: 'image', src: '/assets/photography/Photography/Nepal Photo (2)/Nepal_Photo_(2).jpg', alt: 'Nepal Photo 2' },
            { type: 'image', src: '/assets/photography/Photography/Photo Jun 15 2019 (1)/Photo_Jun_15_2019_(1).jpeg', alt: 'Photo Jun 15 2019' },
            { type: 'image', src: '/assets/photography/Photography/Photo Sept 27 2024 (3)/Photo_Sept_27_2024_(3).jpg', alt: 'Photo Sept 27 2024' },
            { type: 'image', src: '/assets/photography/Photography/Photo Sept 27 2024 (2)/Photo_Sept_27_2024_(2).jpg', alt: 'Photo Sept 27 2024' },
            { type: 'image', src: '/assets/photography/Photography/Photo Sept 27 2024 (4)/Photo_Sept_27_2024_(4).jpg', alt: 'Photo Sept 27 2024' },
            { type: 'image', src: '/assets/photography/Photography/Monadnock Milky Way/Monadnock_Milky_Way.jpg', alt: 'Monadnock Milky Way' },
            { type: 'image', src: '/assets/photography/Photography/Photo Jul 26 2018/Photo_Jul_26_2018.jpg', alt: 'Photo Jul 26 2018' }
        ]
    },
    {
        id: 'xr',
        title: 'XR',
        description: 'AR and VR projects including Snapchat Lenses (Farm Animal, Furniture Placement, Paper Sailboat, Retro Radio) and Photogrammetry. \nClick the squares icon in the corner of each video to view the lens in Snapchat.',
        tags: ['AR', 'VR', 'Snapchat Lens', 'Photogrammetry'],
        columns: 4,
        media: [
            { type: 'video', src: '/assets/xr/Snapchat_Video_(2).mp4', descriptionTitle: 'Farm Animal Lens', qrCode: '/assets/xr/image.png' },
            { type: 'video', src: '/assets/xr/Snapchat-1064081822.mp4', descriptionTitle: 'Furniture Lens', qrCode: '/assets/xr/image 1.png' },
            { type: 'video', src: '/assets/xr/Snapchat_Video_(1).mp4', descriptionTitle: 'Sailboat Lens', qrCode: '/assets/xr/image 2.png' },
            { type: 'video', src: '/assets/xr/Screen_Recording_Feb_24_2021_from_Google_Photos.mp4', descriptionTitle: 'Retro Radio Lens' },
            { type: 'iframe', src: 'https://panoraven.com/en/embed/LtyX6M4M7S', descriptionTitle: 'An experimental VR environment I created in Photoshop. Then I exported the image to Audacity, an audio editor where I was able to manipulate the raw data of the image to create the distortions you see now. \n---\nClick and drag on it. Click the full screen button to view it in full screen. If you have VR glasses, even better!', fullWidth: true },
            { type: 'iframe', src: 'https://sketchfab.com/models/055f250172434630ab35bf64f4a211bd/embed' },
            { type: 'iframe', src: 'https://sketchfab.com/models/816e7f9cdefe48a9b48082471d2edbce/embed' },
        ]
    },
    {
        id: 'book-arts',
        title: 'Book Arts',
        columns: 4,
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
    }
];
