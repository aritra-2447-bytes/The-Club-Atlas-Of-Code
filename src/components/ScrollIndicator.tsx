import { useEffect, useState } from "react";

export default function ScrollIndicator() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Trigger on the very first scroll, then never show again
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`absolute bottom-[190px] sm:bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 ${
                visible ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
        >
            <span className="font-press-start text-[8px] sm:text-[9px] tracking-[0.2em] text-slate-400">
                SCROLL
            </span>

            {/* Retro pixelated down-arrow, bouncing */}
            <svg
                className="h-14 w-14 sm:h-16 sm:w-16 motion-safe:animate-bounce"
                viewBox="0 0 40 40"
                shapeRendering="crispEdges"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Pixel arrow: stem (2 blocks) + tapering chevron (5 -> 3 -> 1) */}
                <rect x="18" y="10" width="4" height="4" fill="#8052ff" />
                <rect x="18" y="14" width="4" height="4" fill="#8052ff" />

                <rect x="10" y="18" width="4" height="4" fill="#8052ff" />
                <rect x="14" y="18" width="4" height="4" fill="#8052ff" />
                <rect x="18" y="18" width="4" height="4" fill="#8052ff" />
                <rect x="22" y="18" width="4" height="4" fill="#8052ff" />
                <rect x="26" y="18" width="4" height="4" fill="#8052ff" />

                <rect x="14" y="22" width="4" height="4" fill="#8052ff" />
                <rect x="18" y="22" width="4" height="4" fill="#8052ff" />
                <rect x="22" y="22" width="4" height="4" fill="#8052ff" />

                <rect x="18" y="26" width="4" height="4" fill="#8052ff" />
            </svg>
        </div>
    );
}