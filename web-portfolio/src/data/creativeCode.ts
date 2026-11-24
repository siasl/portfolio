export type SketchFrame =
    | {
          kind: 'responsive';
          /** Desktop iframe height in px. */
          height: number;
          /** Minimum virtual width in px; scales down smoothly on narrower viewports. */
          minWidth?: number;
          bg?: string;
      }
    | {
          kind: 'fixed';
          /** Exact rendered visual width of the sketch canvas in px. */
          width: number;
          /** Exact rendered visual height of the sketch canvas in px. */
          height: number;
          /** Maximum CSS width on desktop in px. */
          maxWidth: number;
          bg?: string;
      }
    | {
          kind: 'tall-scroll';
          /** Rendered visual width of the tall scrollable sketch in px. */
          width: number;
          /** Visible viewport height of the scrollable frame in px. */
          viewportHeight: number;
          maxWidth: number;
          bg?: string;
      };

export interface CreativeCodeSketch {
    id: string;
    title: string;
    shortTitle: string;
    tools: string;
    summary: string;
    details?: string;
    interactionHint: string;
    liveUrl: string;
    codeUrl: string;
    layout: 'stack' | 'split';
    reverse?: boolean;
    /** 'auto' mounts when scrolled into view; 'click' waits for a user click (for multi-MB data/WebGL/audio apps). */
    loadMode: 'auto' | 'click';
    loadNote?: string;
    /** Show a looping recording instead of embedding the live sketch; the live version opens in a new tab. */
    preview?: { video: string; poster: string; /** Recording width / height. */ aspect: number };
    frame: SketchFrame;
}

export const CREATIVE_CODE_REPO = 'https://github.com/siasl/Creative-Code';
export const CREATIVE_CODE_CLASS = 'https://cacheflowe.github.io/ctd-creative-coding/';

export const creativeCodeSketches: CreativeCodeSketch[] = [
    {
        id: 'generator',
        title: 'Color-Attraction Generator',
        shortTitle: 'Generator',
        tools: 'p5.js',
        summary:
            'Generative art made by colored balls that attract each other based on color similarity and size, leaving trails as they move across the canvas.',
        details:
            'Inspired by orbital mechanics and Agar.io. You can tune color-likeness sensitivity, velocity, attraction strength, blend modes, wall bouncing, and collision merging, then export a JPG without the controls.',
        interactionHint: 'Click the canvas to place balls, press Paused to start, or press H to hide the UI.',
        liveUrl: 'https://siasl.github.io/Creative-Code/generator/',
        codeUrl: 'https://github.com/siasl/Creative-Code/tree/main/generator',
        layout: 'stack',
        loadMode: 'auto',
        frame: {
            kind: 'responsive',
            height: 600,
            bg: '#FFFFFF',
        },
    },
    {
        id: 'loop-project',
        title: 'SILAS Loop',
        shortTitle: 'SILAS Loop',
        tools: 'p5.js',
        summary:
            'A continuous typographic loop: letterforms drop in with circular easing, shake against a triangle-wave background, and burst outward from sampled font contours before resetting.',
        interactionHint: 'Loops automatically. Use Reload above to replay from the start.',
        liveUrl: 'https://siasl.github.io/Creative-Code/loop-project/',
        codeUrl: 'https://github.com/siasl/Creative-Code/tree/main/loop-project',
        layout: 'stack',
        loadMode: 'auto',
        frame: {
            kind: 'responsive',
            height: 540,
            minWidth: 960,
            bg: '#000000',
        },
    },
    {
        id: 'point-cloud',
        title: '3D Point Cloud',
        shortTitle: '3D Point Cloud',
        tools: 'p5.js · WebGL · GLSL',
        summary:
            'A Gaussian-splat point cloud converted from a photo using Apple’s SHARP model, packed into a binary float buffer, and rendered in p5.js WebGL with a custom GLSL stroke shader.',
        details:
            'Each point twinkles, catches a depth-sweeping wave, and scales by distance from the camera as it flies into the scene.',
        interactionHint: 'Screen recording. Open it full screen to orbit and zoom.',
        liveUrl: 'https://siasl.github.io/Creative-Code/3D/',
        codeUrl: 'https://github.com/siasl/Creative-Code/tree/main/3D',
        layout: 'stack',
        loadMode: 'click',
        preview: { video: '/assets/previews/point-cloud.mp4', poster: '/assets/previews/point-cloud.jpg', aspect: 1220 / 940 },
        frame: {
            kind: 'responsive',
            height: 560,
            bg: '#FFFFFF',
        },
    },
    {
        id: 'data-visualizer',
        title: 'Spotify Liked Songs',
        shortTitle: 'Data Visualizer',
        tools: 'D3.js · n8n',
        summary:
            'Eight interactive D3 visualizations of my Spotify Liked Songs playlist: songs added per month, title vowels, audio features over time, zoomable genre bubbles, a genre network, a Civilization-style hex map, and album cover colors.',
        details:
            'Exported via an n8n Spotify workflow and enriched with metadata from ReccoBeats, MusicBrainz, Deezer, Wikidata, and Wikipedia.',
        interactionHint: 'Scroll inside the frame to browse all eight charts. Tap or click elements to inspect.',
        liveUrl: 'https://siasl.github.io/Creative-Code/Data%20Visualizer/',
        codeUrl: 'https://github.com/siasl/Creative-Code/tree/main/Data%20Visualizer',
        layout: 'stack',
        loadMode: 'click',
        loadNote: 'Loads ~22 MB of enriched Spotify playlist JSON and renders 8 interactive D3 charts.',
        frame: {
            kind: 'responsive',
            height: 760,
            bg: '#F0F0F0',
        },
    },
    {
        id: 'cowbell-detector',
        title: 'Cowbell Detector',
        shortTitle: 'Cowbell Detector',
        tools: 'Neural net · Web Audio',
        summary:
            'A neural network trained on 800 drum-annotated songs, inspired by SNL’s “More Cowbell” and LCD Soundsystem’s “Daft Punk Is Playing at My House.”',
        details:
            'Give Bruce Dickinson a YouTube link or an audio file and he scores how much cowbell is in it. Switch to the studio view to inspect the spectrogram and label hits to help retrain the model.',
        interactionHint: 'Screen recording. Open it full screen to upload audio or paste a YouTube link.',
        liveUrl: 'https://cowbell.silashowe.com/',
        codeUrl: 'https://github.com/siasl/Creative-Code/tree/main/cowbell-detector',
        layout: 'stack',
        loadMode: 'click',
        preview: { video: '/assets/previews/cowbell.mp4', poster: '/assets/previews/cowbell.jpg', aspect: 1590 / 1542 },
        frame: {
            kind: 'responsive',
            height: 720,
            bg: '#14171C',
        },
    },
    {
        id: 'clock',
        title: 'Physics Clock',
        shortTitle: 'Clock',
        tools: 'p5.js · Matter.js',
        summary:
            'A real-time clock built with Matter.js physics. Every second drops a ball into the seconds cup; at 59 seconds the cup tips open, feeding the minutes cup, which in turn feeds the hours cup below.',
        details:
            'The two buttons in the top-left corner let you tip the seconds and minutes cups on demand without waiting for the minute to roll over.',
        interactionHint: 'Scroll down inside the frame to see the minutes and hours cups.',
        liveUrl: 'https://siasl.github.io/Creative-Code/Clock/',
        codeUrl: 'https://github.com/siasl/Creative-Code/tree/main/Clock',
        layout: 'split',
        loadMode: 'auto',
        frame: {
            kind: 'tall-scroll',
            width: 520,
            viewportHeight: 680,
            maxWidth: 540,
            bg: '#FFFFFF',
        },
    },
    {
        id: 'make-a-poster',
        title: 'Make a Poster',
        shortTitle: 'Make a Poster',
        tools: 'p5.js',
        summary:
            'A generative p5.js poster combining tinted and pixel-inverted fish illustrations with layered lily pads, wobbling water ripples, and flowers.',
        interactionHint: 'Static 1500 × 2000 p5.js composition, scaled cleanly to fit.',
        liveUrl: 'https://siasl.github.io/Creative-Code/Make%20a%20Poster/',
        codeUrl: 'https://github.com/siasl/Creative-Code/tree/main/Make%20a%20Poster',
        layout: 'split',
        reverse: true,
        loadMode: 'auto',
        frame: {
            kind: 'fixed',
            width: 750,
            height: 1000,
            maxWidth: 520,
            bg: '#0C1A32',
        },
    },
    {
        id: 'atlas-a',
        title: 'Atlas A',
        shortTitle: 'Atlas A',
        tools: 'p5.js',
        summary:
            'An early p5.js geometry study recreating two variations of the ATLAS Institute “A” mark with quads and circles.',
        interactionHint: 'Click anywhere on the canvas to toggle between the two forms.',
        liveUrl: 'https://siasl.github.io/Creative-Code/Atlas%20A/',
        codeUrl: 'https://github.com/siasl/Creative-Code/tree/main/Atlas%20A',
        layout: 'split',
        loadMode: 'auto',
        frame: {
            kind: 'fixed',
            width: 600,
            height: 500,
            maxWidth: 600,
            bg: '#FFFFFF',
        },
    },
];
