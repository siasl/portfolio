import React from 'react';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-snow-white text-neo-black selection:bg-ski-orange selection:text-neo-white overflow-hidden">
            <main className="relative z-10">
                {children}
            </main>
            <div className="fixed inset-0 pointer-events-none z-50 border-[12px] border-neo-black mix-blend-difference opacity-10" />
        </div>
    );
};

export default Layout;
