import React from 'react';
import { Wrench, Settings2 } from 'lucide-react';

/** Shared header look of the shipped Pretty Pulses Chrome extension. */
export const PP_GRADIENT = 'linear-gradient(120deg, #2EE6B0 0%, #3CCFD6 55%, #5BC0F8 100%)';

export const PulseMark: React.FC<{ size?: number; className?: string }> = ({ size = 14, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M2 12h4l2.5-6 4 12 3-8 1.5 2H22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const PanelHeader: React.FC<{ compact?: boolean }> = ({ compact }) => (
    <div className={`text-ink ${compact ? 'px-3 pb-2 pt-2.5' : 'px-4 pb-3 pt-4'}`} style={{ background: PP_GRADIENT }}>
        <div className={`flex items-center justify-center gap-1.5 font-display font-bold ${compact ? 'text-[13px]' : 'text-lg'}`}>
            <PulseMark size={compact ? 13 : 18} />
            Pretty Pulses
        </div>
        <div className={`mt-1.5 flex justify-center gap-1 ${compact ? 'text-[9px]' : 'text-xs'} font-medium`}>
            <span className="flex items-center gap-1 rounded-sm bg-white/80 px-2 py-0.5">
                <Settings2 size={compact ? 9 : 12} aria-hidden="true" /> Misc
            </span>
            <span className="flex items-center gap-1 rounded-sm px-2 py-0.5 text-ink/80">
                <Wrench size={compact ? 9 : 12} aria-hidden="true" /> Tooling
            </span>
        </div>
    </div>
);
