import { useEffect, useState } from 'react';
import { useMockupPaused } from '../components/previews/MockupControls';

/**
 * Steps through a timeline (ms per step) while `active` and not paused, looping at the end.
 * It opens on `startStep` (a finished-looking frame) so the idea reads immediately.
 * With reduced motion it parks on `restStep` and never animates.
 */
export function useStepLoop(durations: number[], active: boolean, reduced: boolean, restStep = durations.length - 1, startStep = restStep) {
    const paused = useMockupPaused();
    const [step, setStep] = useState(reduced ? restStep : startStep);

    useEffect(() => {
        if (reduced) { setStep(restStep); return; }
        if (!active || paused) return;
        const id = window.setTimeout(
            () => setStep(s => (s >= durations.length - 1 ? 0 : s + 1)),
            step === startStep ? Math.max(durations[step], 2200) : durations[step],
        );
        return () => window.clearTimeout(id);
    }, [step, active, reduced, paused, durations, restStep, startStep]);

    return step;
}
