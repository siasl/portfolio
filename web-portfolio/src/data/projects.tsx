import React from 'react';
import { RecipeAgentDemo } from '../components/previews/RecipeAgentDemo';
import DigestDemo from '../components/previews/DigestDemo';
import { AckSequence } from '../components/previews/CallLightPreview';

export interface MediaItem {
    type: 'image' | 'video' | 'iframe' | 'pano';
    src: string;
    alt?: string;
    description?: string | React.ReactNode;
    descriptionTitle?: string;
    fullWidth?: boolean;
    qrCode?: string;
    poster?: string;
    /** Show an image no wider than this (px), e.g. its native width. */
    maxWidth?: number;
    /** Link-out still (used in place of heavy embeds). */
    href?: string;
    hrefLabel?: string;
    /** Snapchat lens link shown beside a Snapcode. */
    lensUrl?: string;
}

export type CardMedia =
    | { kind: 'image'; src: string; alt: string; fit?: 'cover' | 'contain'; bg?: string; aspect?: string }
    | { kind: 'pair'; src: string; alt: string; side: string; sideAlt: string }
    | { kind: 'agent' }
    | { kind: 'call-light' }
    | { kind: 'pretty-pulses' }
    | { kind: 'video'; src: string; poster: string };

export interface StoryBlock {
    heading: string;
    /** 2 = section, 3 = step or sub-point inside a section. */
    level?: 2 | 3;
    /** stack: text column, then full-width media. split: text beside the media it describes. */
    layout?: 'stack' | 'split';
    /** Put the media on the left in a split. */
    reverse?: boolean;
    /** Short points shown side by side. */
    notes?: { title: string; body: React.ReactNode }[];
    lead?: MediaItem;
    body?: React.ReactNode;
    media?: MediaItem[];
    /** Code-built demo, always labeled as a reconstruction. */
    demo?: { node: React.ReactNode; label: string };
    columns?: 1 | 2 | 3 | 4;
}

export interface Project {
    id: string;
    title: string;
    /** Which part of the site the project belongs to. */
    group: 'work' | 'creative' | 'media';
    hook?: string;
    media: MediaItem[];
    links?: {
        label: string;
        url: string;
    }[];
    year?: string;
    summary?: string;
    /** Concrete outcome or decision surfaced on cards and case-study headers. */
    note?: string;
    card?: CardMedia;
    meta?: { label: string; value: string }[];
    lead?: MediaItem;
    leadKind?: 'call-light' | 'pretty-pulses' | 'do-board';
    leadNote?: string;
    story?: StoryBlock[];
}

export const projects: Project[] = [
    {
        id: 'call-light',
        title: 'Call Light',
        group: 'work',
        year: '2022',
        summary: 'A tablet app that lets hospital patients tell nurses exactly what they need, instead of just switching on a call light.',
        note: 'For a patient in isolation, a request goes from ten steps with two PPE changes to six steps with one.',
        card: { kind: 'call-light' },
        leadKind: 'call-light',
        leadNote: 'Reconstruction of the nurse feed. Categories, messages, and colors match the shipped app.',
        hook: 'A tablet app that lets hospital patients tell nurses exactly what they need, instead of just switching on a call light.',
        meta: [
            { label: 'Role', value: 'Product designer, frontend engineer' },
            { label: 'Team', value: '4 people' },
            { label: 'Built with', value: 'React Native (Expo), Go, PostgreSQL' },
            { label: 'Context', value: 'Senior computer science capstone, Colorado College' },
        ],
        story: [
            {
                heading: 'The shipped feed',
                layout: 'split',
                body: <p>This is the nurse feed as we built it, running on our test devices, which is why the rooms carry our names. Requests from a nurse’s own rooms sit above the line; everything else sits below. Within each group, requests are ordered by time and by priority, so a sharp pain increase outranks a snack. The animation above restyles it but keeps the same categories, messages, and colors.</p>,
                media: [{ type: 'image', src: '/assets/call-light/Feed Screen.png', alt: 'The shipped Call Light nurse feed: color-coded request rows such as Discomfort, Thirsty, Hungry, and Sanitary, each with a room name, time since request, and a check button', descriptionTitle: 'The shipped nurse feed.' }],
            },
            {
                heading: 'The problem',
                body: (
                    <>
                        <p>A hospital call light is one bit of information: on or off. To learn what a patient wants, a nurse has to walk to the room and ask. In 2021 that mattered more than usual. For a patient in isolation, a nurse put on PPE just to hear the request, took it off, fetched the thing, and put PPE on again to deliver it.</p>
                        <p>We mapped both flows for our final presentation. Letting the patient say what they need up front removes the first trip entirely.</p>
                    </>
                ),
                media: [{ type: 'image', src: 'assets/call-light/Procedure Diagram.png', alt: 'Diagram comparing the steps per request before and after Call Light, for a normal patient and an isolation patient, with PPE steps highlighted in red', descriptionTitle: 'From our final presentation. Red steps are PPE changes. Click to enlarge.' }],
            },
            {
                heading: 'Scope',
                body: <p>With input from Heart of the Rockies Regional Medical Center and Southern New Hampshire Health, we set the scope early. Call Light was for smaller, lower-budget hospitals. It was explicitly <em>not</em> for emergencies, not a replacement for the existing call system, and not integrated with other medical hardware. That kept the patient side small enough to get right.</p>,
            },
            {
                heading: 'Design decisions',
                body: <p>Most decisions came from two goals in our presentation: keep patient interaction simple, and keep patients’ privacy intact.</p>,
                notes: [
                    { title: 'A few large categories for patients', body: 'Thirsty, Hungry, Sanitary, Discomfort, and Assistance, each with a follow-up choice such as “Soft Drink.” Every button is large and every screen has one job.' },
                    { title: 'Color, icon, and word together', body: 'Each category has its own color, but we never relied on color alone. We checked the palette for color blindness and paired every color with an icon and a label.' },
                    { title: 'Icons were a real problem', body: 'There’s no international standard for medical request icons. We used Font Awesome and looked at healthicons.org, which is trying to create one.' },
                    { title: 'No names', body: 'Devices are registered by room, and the system stores no patient or nurse names. A new tablet asks for a room name and a setup password, then requests approval as a patient or nurse device. Dedicated devices, not personal phones, kept setup and privacy simple.' },
                ],
            },
            {
                heading: 'The patient side',
                level: 3,
                body: <p>The patient app is a single screen with what our documentation called “two and a half layers.” The first layer is five large category buttons, with Assistance as a catch-all. Tapping one opens the specific requests for that category, plus Cancel. Choosing one sends it to the nurses and shows a confirmation, which returns to the first layer when tapped.</p>,
                media: [
                    { type: 'image', src: '/assets/call-light/patient-categories.png', alt: 'The patient tablet’s first layer: five full-width buttons for Discomfort, Thirsty, Hungry, Sanitary, and Assistance, each with its own color and icon', descriptionTitle: '1. Pick a category.' },
                    { type: 'image', src: '/assets/call-light/patient-sanitary.png', alt: 'The Sanitary options on the patient tablet: Lavatory, Brushing Teeth, Help Washing, and Cancel', descriptionTitle: '2. Pick the specific request, or cancel.' },
                    { type: 'image', src: '/assets/call-light/patient-confirm.png', alt: 'A confirmation banner on the patient tablet reading “A nurse has been notified: Lavatory, press to clear”', descriptionTitle: '3. Confirmation that a nurse was notified.' },
                ],
                columns: 3,
            },
            {
                heading: 'Favorites, so a nurse sees their own rooms first',
                level: 3,
                layout: 'split',
                body: <p>On the room list, a nurse stars the rooms they’re covering for the shift. On the feed, requests from those rooms sit above a divider, so a nurse isn’t scanning every request on the floor.</p>,
                media: [{ type: 'image', src: 'assets/call-light/Room List Screen.png', alt: 'The room list screen, with starred rooms grouped above unstarred ones', descriptionTitle: 'The room list. Starred rooms rise to the top of the feed.' }],
            },
            {
                heading: 'Acknowledged, then completed',
                level: 3,
                layout: 'split',
                reverse: true,
                body: <p>One tap on a request tells everyone “I’ve got this”: the check fills in on every nurse’s device, so two people don’t answer the same call. A second tap marks it done and clears it from the feed.</p>,
                demo: { node: <AckSequence />, label: 'Reconstruction of the two-step flow, using a request from the shipped feed.' },
                media: [{ type: 'image', src: '/assets/call-light/acknowledge-sequence.png', alt: 'Three stacked screenshots of the shipped feed: a request is tapped once and its check fills in, then tapped again and it disappears from the list', descriptionTitle: 'The shipped app, from our documentation: tap once, tap again, gone.' }],
            },
            {
                heading: 'Two screens for nurses',
                level: 3,
                body: <p>The nurse app has only two screens, the feed and the room list, with a bar at the bottom to switch between them.</p>,
                media: [{ type: 'image', src: 'assets/call-light/Basic Navigation.png', alt: 'Navigation diagram showing the nurse feed and room list screens and how a nurse moves between them', descriptionTitle: 'Navigation between the two nurse screens. Click to enlarge.' }],
            },
            {
                heading: 'What we tested, and what we didn’t',
                body: (
                    <>
                        <p>We ran end-to-end tests on every patient button combination (49 paths, at least 17 checks each), manually tested every nurse-side feature across multiple devices, and unit-tested the backend endpoints.</p>
                        <p>We never tested with nurses or patients in a clinical setting. The benefits described here are design goals, not measured results.</p>
                    </>
                ),
            },
            {
                heading: 'What I’d change',
                body: <p>More time for research and testing before building, and defining user flows earlier. We moved fast on code and caught some flow questions late.</p>,
            },
        ],
        media: [],
        links: [
            { label: 'Final presentation (PDF)', url: '/assets/call-light/Call_Light_Block_7_Presentation.pdf' }
        ]
    },
    {
        id: 'pretty-pulses',
        title: 'Pretty Pulses',
        group: 'work',
        year: '2023 – 2025',
        summary: 'A Chrome extension I owned for Qualtrics’ Resolution Team: one panel for every internal tool, and an Open Ticket button on any highlighted ticket ID.',
        note: 'Estimated to save the team 60+ hours a year.',
        card: { kind: 'pretty-pulses' },
        leadKind: 'pretty-pulses',
        leadNote: 'Reconstruction of the two main flows. The shipped versions are shown below.',
        hook: 'A Chrome extension that put a support team’s tools one click away.',
        meta: [
            { label: 'Role', value: 'Owner and maintainer' },
            { label: 'Team', value: 'Resolution Team, Qualtrics' },
            { label: 'Built with', value: 'JavaScript, Chrome extension APIs' },
        ],
        story: [
            {
                heading: 'Open Ticket',
                body: (
                    <>
                        <p>Our team worked across many internal tools, and tickets often reached us as an email with the ID in the subject line. Before, opening one meant copying the ID, switching to the ticketing tool, and searching for it. With the extension, you highlight the ID and click Open Ticket.</p>
                        <p>I owned and maintained the extension: fixing bugs, taking feature requests from the team, and adding the features on this page.</p>
                    </>
                ),
                media: [{ type: 'image', src: '/assets/cards/pp-open-ticket.png', alt: 'Gmail showing an example ticket email with the ticket ID highlighted and a green Open Ticket button directly beneath it', descriptionTitle: 'The shipped extension in Gmail.' }],
            },
            {
                heading: 'The panel',
                layout: 'split',
                reverse: true,
                body: (
                    <>
                        <p>Clicking the toolbar icon, or using a keyboard shortcut, opens a panel. This is its Tooling tab, top to bottom:</p>
                        <ul className="list-disc space-y-1.5 pl-5">
                            <li><b>Res Handbook and PTO links</b>, one click away.</li>
                            <li><b>Find an Odo/Jira issue</b> by ID, straight from the panel.</li>
                            <li><b>Jira search</b> by text, filtered to teams and optionally to bugs only.</li>
                            <li><b>Sourcegraph search</b> for an error snippet, to find where it comes from in the code.</li>
                            <li><b>Theme selection</b>, plus links to file bugs or feature requests and to the documentation.</li>
                            <li><b>Feature toggles</b> for the Open Ticket button and screenshot embeds.</li>
                        </ul>
                        <p>The Misc tab holds a searchable list of tools: AI tools, utilities like QSF Cleaner, the shard manager, logins, and Grafana dashboards.</p>
                    </>
                ),
                media: [{ type: 'image', src: '/assets/cards/pp-panel.png', alt: 'The Pretty Pulses Tooling tab: handbook and PTO links, Jira issue lookup, Jira search, Sourcegraph search, theme selection, and feature toggles', descriptionTitle: 'The shipped panel, at actual size. Internal links are redacted.', maxWidth: 420 }],
            },
            {
                heading: 'Features that don’t screenshot well',
                notes: [
                    { title: 'Jira inside the internal ticket', body: 'Linked Jira issues render in the ticket page, so nobody tabs out to check status.' },
                    { title: 'Screenshot embeds', body: 'Zight screenshot links show inline in tickets instead of as bare URLs.' },
                    { title: 'QSF Cleaner', body: 'A one-click fix for a survey-file cleanup the team used to do by hand.' },
                ],
            },
            {
                heading: 'How “60+ hours a year” was estimated',
                body: <p>I timed how long common tasks took without the extension, then extrapolated the difference by how often those tasks came up and how many people on the team used it. It’s an estimate, not a measurement, but it’s built from real task timings.</p>,
            },
        ],
        media: [
            { type: 'image', src: '/assets/personal-automations/pretty_pulses.png', alt: 'My annotated one-page overview of Pretty Pulses: both panel tabs and the Open Ticket button in Gmail, with internal links redacted', descriptionTitle: 'My original one-page overview, including the Misc tab. Click to enlarge.' },
        ],
    },
    {
        id: 'personal-automations',
        title: 'Personal Automations',
        group: 'work',
        year: '2025 – 2026',
        summary: 'Self-hosted n8n workflows: a Telegram agent that turns cooking Reels into Notion recipes, and a daily digest that replaces my Instagram feed.',
        note: 'Manages 20 dinner recipes extracted from Reels and recipe sites, plus a daily 19-account digest.',
        card: { kind: 'agent' },
        hook: 'A Telegram agent for recipes and a daily Instagram digest, both self-hosted in n8n.',
        meta: [
            { label: 'Role', value: 'Solo builder' },
            { label: 'Built with', value: 'Self-hosted n8n (Docker), OpenAI and Gemini, Notion API, Apify, Telegram' },
        ],
        story: [
            {
                heading: 'Reel → recipe → Notion',
                body: (
                    <>
                        <p>In January I sent my recipe agent a cooking Reel. It downloaded the video, read the caption, transcribed the audio, and replied with a structured recipe. I said “Yes,” and it created a Notion page with an emoji, meal type, servings, time, ingredients, and steps.</p>
                        <p>The agent runs on a Telegram trigger. Its tools are other n8n workflows: a Reel extractor, a recipe scraper that hands messy text to Gemini to structure, Brave web search, and Notion reads and writes. When a site blocks the scraper (the New York Times often does), it says so and offers options instead of failing silently.</p>
                    </>
                ),
                demo: { node: <RecipeAgentDemo />, label: 'Reconstruction of the real January conversation. Message text, tool names, and Notion fields come from the chat and the workflow.' },
            },
            {
                heading: 'Instagram digest',
                body: (
                    <>
                        <p>Every morning at 8, a workflow pulls the newest posts from 19 accounts I care about (ski areas, breweries, bands, a climbing gym) using an Apify scraper. It skips anything it has already sent, keeps the last 24 hours, and posts carousels, photos, and videos to a private Telegram channel. I get the ski report without the feed.</p>
                        <p>Most of the work went into failure handling. Telegram rate-limits bots, so each branch catches a 429, waits 30 seconds, and retries. Anything else, like a video over the upload limit, gets reported to the channel.</p>
                    </>
                ),
                demo: { node: <DigestDemo />, label: 'Left: how the workflow runs. Right: an example of what reaches the channel. Account names and caption format are real; photos are abstracted.' },
            },
            {
                heading: 'The workflow in n8n',
                level: 3,
                media: [{ type: 'image', src: '/assets/cards/n8n-digest.png', alt: 'The Instagram digest workflow in the n8n editor, with separate groups for carousels, single images, and videos', descriptionTitle: 'The actual workflow, grouped by post type. Click to enlarge.' }],
            },
            {
                heading: 'Video walkthroughs',
                media: [
                    { type: 'iframe', src: 'https://www.youtube.com/embed/pSGgV2VVAcY', descriptionTitle: 'Recipe agent walkthrough.' },
                    { type: 'iframe', src: 'https://www.youtube.com/embed/37RvtquWNng', descriptionTitle: 'Instagram digest walkthrough.' },
                ],
                columns: 1,
            },
            {
                heading: 'Smaller experiments',
                notes: [
                    { title: 'Fantasy baseball briefing', body: 'An agent that reviews my ESPN lineup, the news, and league free agents each morning and suggests roster moves.' },
                    { title: 'Home Assistant', body: 'Dashboards built on data from a reverse-engineered OpenSnow API, and automations triggered by ZigBee sensors.' },
                    { title: 'Fantasy football statistics', body: <>A visualization project, <a href="https://github.com/siasl/FantasyFootball" target="_blank" rel="noopener noreferrer" className="text-link">on GitHub</a>.</> },
                ],
            },
        ],
        media: [],
    },
    {
        id: 'do-board',
        title: 'Do Board',
        group: 'work',
        year: '2021',
        summary: 'A laser-cut to-do board where each row has its own tactile feel as you erase a finished task.',
        note: 'Three prototypes: paper, laser-cut with LEDs, then a final version without electronics.',
        card: { kind: 'video', src: '/assets/previews/do-board.mp4', poster: '/assets/previews/do-board.jpg' },
        leadKind: 'do-board',
        hook: 'A tactile to-do list, prototyped three times.',
        meta: [
            { label: 'Role', value: 'Designer and maker' },
            { label: 'Made with', value: 'Paper, laser-cut wood, copper tape, LEDs' },
        ],
        story: [
            {
                heading: 'The idea',
                body: <p>Checking a box in a to-do app feels like nothing. Inspired by mechanical keyboards, I wanted finishing a task to be physical: each row of the board has its own distinct tactility as you erase the task you’ve completed.</p>,
                media: [{ type: 'image', src: '/assets/do-board/Do_Board_Image_8873.jpeg', alt: 'All three Do Board prototypes side by side: a paper version, a laser-cut version with copper tape and LEDs, and the final wood-grain board', descriptionTitle: 'All three prototypes. Back: paper. Left: laser-cut with LEDs. Right: the final board.' }],
            },
            {
                heading: '1. Sketches and a paper prototype',
                level: 3,
                layout: 'split',
                body: <p>I started with sketches of the board and its parts, then built a quick version out of paper and tape.</p>,
                media: [
                    { type: 'image', src: '/assets/do-board/Dec_21_2021_Photo.jpeg', alt: 'Pencil sketch of the board layout with notes on its parts', descriptionTitle: 'Board layout and parts.' },
                    { type: 'image', src: '/assets/do-board/Dec_21_2021_Photo_(1).jpeg', alt: 'Pencil sketch of the stand and a slider', descriptionTitle: 'The stand and a slider.' },
                    { type: 'image', src: '/assets/do-board/Do_Board_IMG_8868.jpeg', alt: 'The paper and tape prototype', descriptionTitle: 'The paper prototype.' },
                    { type: 'image', src: '/assets/do-board/Do_Board_IMG_8871.jpeg', alt: 'Close-up of the paper prototype’s rows, labeled To-do', descriptionTitle: 'Its rows, up close.' },
                ],
                columns: 2,
            },
            {
                heading: '2. The LED version',
                level: 3,
                layout: 'split',
                reverse: true,
                body: <p>The second version was laser-cut, with copper tape running to a green LED at the end of each row, so a finished task would light up. It worked. But I didn’t want something to be electronic that didn’t need to be.</p>,
                media: [
                    { type: 'image', src: '/assets/do-board/IMG_8859.jpeg', alt: 'The laser-cut prototype with copper tape traces on each row', descriptionTitle: 'Copper tape on every row.' },
                    { type: 'image', src: '/assets/do-board/IMG_8864.jpeg', alt: 'The laser-cut prototype with its LEDs lit', descriptionTitle: 'Lit up.' },
                    { type: 'image', src: '/assets/do-board/IMG_8860.jpeg', alt: 'Close-up of the green LEDs along the board’s edge', descriptionTitle: 'The LEDs, up close.' },
                ],
                columns: 3,
            },
            {
                heading: '3. The final board',
                level: 3,
                layout: 'split',
                body: (
                    // TODO(Silas): describe how each row’s tactile mechanism differs (what you feel on each row, and how it’s made).
                    <p>The final board drops the electronics. The feel comes from the board itself, inspired by mechanical keyboards: you know a task is done because of how the row feels under your hand, not because something lights up.</p>
                ),
                columns: 3,
                media: [
                    { type: 'video', src: '/assets/do-board/Do_Board_Video_V2.mp4', poster: '/assets/do-board/DoBoard_Poster.png', descriptionTitle: 'The final board in use.' },
                    { type: 'image', src: '/assets/do-board/Do_Board_IMG_8843.jpeg', alt: 'Close-up of two rows of the final board with their metal discs', descriptionTitle: 'Two rows, up close.' },
                    { type: 'image', src: '/assets/do-board/Do_Board_IMG_8855.jpeg', alt: 'The finished wood-grain Do Board', descriptionTitle: 'The finished board.' },
                ],
            },
        ],
        media: [],
    },
    {
        id: 'xr',
        title: 'XR',
        group: 'creative',
        year: '2021',
        summary: 'Snapchat lenses, photogrammetry scans, and an experimental VR space.',
        hook: 'Snapchat lenses, photogrammetry, and an experimental VR space.',
        meta: [{ label: 'Made with', value: 'Snapchat Lens Studio, Polycam, Photoshop, Audacity, Open Brush' }],
        story: [
            {
                heading: 'Snapchat lenses',
                body: <p>Four AR lenses I built in Lens Studio, each one a study in a different part of AR. Three are still live; scan a Snapcode to try one.</p>,
                media: [
                    // TODO(Silas): add each lens’s share link as lensUrl to show an “Open in Snapchat” link.
                    { type: 'video', src: '/assets/xr/Snapchat_Video_(2).mp4', alt: 'Farm Animal lens demo', descriptionTitle: 'Farm Animal', description: 'Placing animals in space, with sound.', qrCode: '/assets/xr/image.png' },
                    { type: 'video', src: '/assets/xr/Snapchat-1064081822.mp4', alt: 'Furniture placement lens demo', descriptionTitle: 'Furniture', description: 'Placing furniture that fits and interacts with a real room.', qrCode: '/assets/xr/image 1.png' },
                    { type: 'video', src: '/assets/xr/Snapchat_Video_(1).mp4', alt: 'Paper Sailboat lens demo', descriptionTitle: 'Paper Sailboat', description: 'Real-world materials and depth.', qrCode: '/assets/xr/image 2.png' },
                    { type: 'video', src: '/assets/xr/Screen_Recording_Feb_24_2021_from_Google_Photos.mp4', alt: 'Retro Radio lens demo', descriptionTitle: 'Retro Radio', description: 'Music and real-world context beyond what’s spatially there. No longer live.' },
                ],
                columns: 4,
            },
            {
                heading: 'A databent VR space',
                layout: 'split',
                body: <p>I painted a 360° environment in Photoshop, then opened the image file in Audacity, an audio editor, and edited the raw data as if it were sound. The distortions are the result.</p>,
                media: [{ type: 'pano', src: 'https://panoraven.com/en/embed/LtyX6M4M7S', poster: '/assets/xr/vr-databent.jpg', alt: 'A databent panorama: a painted landscape smeared into bands of magenta, green, and blue', descriptionTitle: 'A flattened strip of the panorama.' }],
            },
            {
                heading: 'Photogrammetry',
                body: <p>Scans made with Polycam. I used the bedroom scan as a canvas for VR painting in Open Brush; those files were lost when my laptop was stolen.</p>,
                media: [
                    { type: 'image', src: '/assets/xr/scan-bedroom.jpg', alt: '3D scan of my college bedroom', descriptionTitle: 'My college bedroom.', href: 'https://sketchfab.com/models/055f250172434630ab35bf64f4a211bd', hrefLabel: 'View the 3D model on Sketchfab' },
                    { type: 'image', src: '/assets/xr/scan-drum.jpg', alt: '3D scan of a buffalo drum', descriptionTitle: 'A buffalo drum.', href: 'https://sketchfab.com/models/816e7f9cdefe48a9b48082471d2edbce', hrefLabel: 'View the 3D model on Sketchfab' },
                ],
                columns: 2,
            },
        ],
        media: [],
    },
    {
        id: 'book-arts',
        title: 'Book Arts',
        group: 'creative',
        year: '2020',
        summary: 'Pop-up paper engineering, monotype prints, and hand binding.',
        hook: 'Pop-up paper engineering, monotype prints, and hand binding.',
        meta: [{ label: 'Made with', value: 'Cut paper, pen, monotype printing, hand binding' }],
        lead: { type: 'video', src: '/assets/book-arts/aspens_pop_up.mp4', poster: '/assets/book-arts/aspens_poster.png', alt: 'A pop-up spread of cut-paper birch trees rising as the page opens', descriptionTitle: 'Walking through the aspens at night, from a pop-up book about a camping trip gone wrong.' },
        story: [
            {
                heading: 'A camping trip gone wrong',
                layout: 'split',
                // TODO(Silas): add the story beats, one per spread, so each can sit next to its pop-up.
                body: <p>Each spread is pen drawing on layered, cut paper that rises as the page opens. The aspens above are one stop on the trip; the trout is another.</p>,
                media: [{ type: 'video', src: '/assets/book-arts/Trout_Pop_Up_Page.mp4', poster: '/assets/book-arts/trout_poster.png', alt: 'A pop-up spread with a cut-paper trout', descriptionTitle: 'The trout spread.' }],
            },
            {
                heading: 'Tied Up',
                layout: 'split',
                reverse: true,
                body: <p>A hand-bound book of monotype prints.</p>,
                media: [
                    { type: 'image', src: '/assets/book-arts/20201216_010544.jpg', alt: 'Three hand-bound copies of Tied Up with kraft covers and exposed stitching', descriptionTitle: 'Three copies of Tied Up.' },
                    { type: 'image', src: '/assets/book-arts/TiedUp_Cover.jpg', alt: 'The binding of Tied Up, seen from the spine', descriptionTitle: 'The binding.' },
                    { type: 'image', src: '/assets/book-arts/20201215_194859.jpg', alt: 'One of the monotype prints from Tied Up', descriptionTitle: 'One of the prints.' },
                ],
                columns: 2,
            },
        ],
        media: [],
        links: [],
    },
    {
        id: 'video',
        title: 'Video',
        group: 'media',
        media: [
            { type: 'video', src: '/assets/video/Perspective_3.mp4', poster: '/assets/video/frisbeePoster.png', descriptionTitle: 'Frisbee, forced perspective. Shot and edited in After Effects; 8.2M views and 1M likes on TikTok.' },
            { type: 'video', src: '/assets/video/Ball_Persepective_video.mp4', poster: '/assets/video/ballPoster.png', descriptionTitle: 'Ball, forced perspective. Shot and edited in After Effects; 2.7M views on TikTok.' },
            { type: 'video', src: '/assets/video/Video_Normal_Size.mp4', poster: '/assets/video/CarPoster.png', descriptionTitle: 'Car, another perspective experiment.' },
            { type: 'iframe', src: 'https://www.youtube.com/embed/SHSzfIY1MVs', descriptionTitle: 'Ski Bum, a filmmaking class final I co-wrote, co-directed, and co-edited.' }
        ]
    },
    {
        id: 'photography',
        title: 'Photography',
        group: 'media',
        media: [
            { type: 'image', src: '/assets/photography/Photography/Ski Hill Star Trails/Ski_Hill_Star_Trails.jpeg', alt: 'Star trails circling over a small wooden ski-lift hut at night' },
            { type: 'image', src: '/assets/photography/Photography/Monadnock Milky Way/Monadnock_Milky_Way.jpg', alt: 'The Milky Way over Mount Monadnock, with a glow along the horizon' },
            { type: 'image', src: '/assets/photography/Photography/Nepal Photo (1)/Nepal_Photo_(1).jpg', alt: 'Jagged snow-covered peaks in Nepal, in black and white' },
            { type: 'image', src: '/assets/photography/Photography/Nepal 70/Nepal_70.jpg', alt: 'A mani stone carved with Tibetan script beside a trail in Nepal, with a porter walking past' },
            { type: 'image', src: '/assets/photography/Photography/Photo May 23 2019.jpeg', alt: 'A golden stupa spire strung with prayer flags, seen from below' },
            { type: 'image', src: '/assets/photography/Photography/Photo Jun 15 2019 (1)/Photo_Jun_15_2019_(1).jpeg', alt: 'A turquoise lake far below a rocky mountain ridge' },
            { type: 'image', src: '/assets/photography/Photography/Monarch.jpg', alt: 'A monarch caterpillar hanging in a J from a grass stem, beaded with water' },
            { type: 'image', src: '/assets/photography/Photography/Photo Jul 26 2018/Photo_Jul_26_2018.jpg', alt: 'A red eft salamander crawling through bright green moss' },
            { type: 'image', src: '/assets/photography/Photography/Photo Sept 27 2024 (3)/Photo_Sept_27_2024_(3).jpg', alt: 'Rows of blue stadium seats seen from above' }
        ]
    },
];

export const workProjects = projects.filter(p => p.group === 'work');
export const caseStudies = projects.filter(p => p.group !== 'media');

export const getProject = (id?: string) => projects.find(p => p.id === id);
