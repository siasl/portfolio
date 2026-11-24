import React from 'react';
import CallLightPreview from './previews/CallLightPreview';
import PrettyPulsesPreview from './previews/PrettyPulsesPreview';
import PreviewVideo from './PreviewVideo';

type Kind = 'call-light' | 'pretty-pulses' | 'do-board';

const BG: Record<Kind, string> = {
    'call-light': 'bg-[#E3E7EB] dark:bg-[#2A2E33]',
    'pretty-pulses': 'bg-[#E1EAE7] dark:bg-[#26302D]',
    'do-board': 'bg-[#E7E2D8] dark:bg-[#2E2A24]',
};

/** The animated visual that leads a project, on its card and its case study. */
// Scale the code-built visuals to the space they're shown in.
const SCALE = {
    card: {
        'call-light': 'scale-[0.78] sm:scale-100 md:scale-[0.85] lg:scale-100',
        'pretty-pulses': 'scale-[0.62] sm:scale-100 md:scale-[0.5] lg:scale-[0.72] xl:scale-[0.8]',
    },
    lead: {
        'call-light': 'scale-[0.78] sm:scale-100 lg:scale-[1.3]',
        'pretty-pulses': 'scale-[0.62] sm:scale-100 lg:scale-[1.2]',
    },
} as const;

const AnimatedLead: React.FC<{ kind: Kind; className?: string; size?: 'card' | 'lead' }> = ({ kind, className = 'aspect-[4/3]', size = 'card' }) => (
    <div className={`theme-light relative overflow-hidden rounded-lg ${BG[kind]} ${className}`}>
        {kind === 'call-light' && <CallLightPreview scale={SCALE[size]['call-light']} />}
        {kind === 'pretty-pulses' && <PrettyPulsesPreview scale={SCALE[size]['pretty-pulses']} />}
        {kind === 'do-board' && (
            <PreviewVideo
                src="/assets/previews/do-board.mp4"
                poster="/assets/previews/do-board.jpg"
                className="absolute inset-0 h-full w-full object-cover"
            />
        )}
    </div>
);

export default AnimatedLead;
