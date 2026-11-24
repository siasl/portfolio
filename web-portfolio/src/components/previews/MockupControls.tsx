import React, { createContext, useContext, useState } from 'react';

/** Shared pause state for animated mockups and looping video previews. */
const PausedContext = createContext(false);
export const useMockupPaused = () => useContext(PausedContext);

/** Allows a section header toggle to pause all animated loops inside that section. */
export const MockupPauseProvider: React.FC<{ paused: boolean; children: React.ReactNode }> = ({ paused, children }) => (
    <PausedContext.Provider value={paused}>{children}</PausedContext.Provider>
);

/** Wraps a reconstruction with accessible 44px Pause/Play and Replay buttons. */
export const MockupControls: React.FC<{ children: React.ReactNode; className?: string; label?: string }> = ({
    children,
    className = '',
    label = 'animation',
}) => {
    const parentPaused = useMockupPaused();
    const [paused, setPaused] = useState(false);
    const [epoch, setEpoch] = useState(0);
    const effectivePaused = parentPaused || paused;

    return (
        <div className={`relative ${className}`}>
            <PausedContext.Provider value={effectivePaused}>
                <React.Fragment key={epoch}>{children}</React.Fragment>
            </PausedContext.Provider>
            <div className="mt-2.5 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => setPaused(p => !p)}
                    aria-pressed={effectivePaused}
                    aria-label={`${effectivePaused ? 'Play' : 'Pause'} ${label}`}
                    className="control-btn"
                >
                    {effectivePaused ? 'Play' : 'Pause'}
                </button>
                <button
                    type="button"
                    onClick={() => { setEpoch(e => e + 1); setPaused(false); }}
                    aria-label={`Replay ${label}`}
                    className="control-btn"
                >
                    Replay
                </button>
            </div>
        </div>
    );
};
