import { useState, useEffect } from "react";
import Hero from "@/pages/Hero.tsx";
import ClickSpark from "@/components/ClickSpark.tsx";
import Header from "@/pages/Header.tsx";
import DotGrid from "@/components/DotGrid.tsx";
import Resources from "@/pages/Resources.tsx";
import { ContactCTA } from "@/pages/ContactCTA.tsx";
// 1. Import the TextType component (adjust the path based on where you saved it)
import TextType from "@/components/TextType.tsx";
import AboutClub from "@/pages/AboutClub.tsx";
import Footer from "@/pages/Footer.tsx";

function App() {
    const [isFading, setIsFading] = useState(false);
    const [showMain, setShowMain] = useState(false);

    useEffect(() => {
        // 1. Run the loader background for 3 seconds
        const loadTimer = setTimeout(() => {
            setIsFading(true);
        }, 3000);

        // 2. Softly let the fade transition complete (e.g., 800ms) before swapping full view visibility
        const transitionTimer = setTimeout(() => {
            setShowMain(true);
        }, 3800);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(transitionTimer);
        };
    }, []);

    const handleMenuStateChange = (isOpen: boolean) => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    return (
        <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#0D1117]">
            {/* Global Custom Cursor Injection */}
            <style>{`
                html, body, *, button, a {
                    cursor: url('src/assets/pointinghand.svg') 16 16, auto !important;
                }
            `}</style>

            {/* Loading Mask Layer */}
            {!showMain && (
                <div
                    className={`fixed inset-0 z-50 w-screen h-screen bg-[#0D1117] flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                >
                    {/* 2. Place the TextType component here centered on the screen */}
                    <TextType
                        text={["Spawning Ghosts...", "Hero is Here."]}
                        as="h1"
                        className="text-2xl md:text-4xl font-press-start font-semibold"
                        typingSpeed={40}
                        deletingSpeed={25}
                        pauseDuration={600}
                        loop={true}
                        cursorClassName="text-[#8052ff]" // Brand Purple cursor
                        /* Pass the color order for the phrases:
                           Sentence 1 alternates through Pac-man colors, Sentence 2 handles Brand Gold */
                        textColors={["#FF0000", "#00D8FF", "#FFB800", "#ffb829"]}
                    />
                </div>
            )}

            {/* Main Application Interface */}
            <div className={`transition-opacity duration-1000 ${isFading ? "opacity-100" : "opacity-0"}`}>
                <ClickSpark
                    sparkColor="#3b82f6"
                    sparkCount={10}
                    sparkSize={12}
                >
                    <Header onMenuToggle={handleMenuStateChange} />

                    <div className="fixed inset-0 z-0 pointer-events-auto">
                        <DotGrid
                            dotSize={6}
                            gap={38}
                            baseColor="#354040"
                            activeColor="#EAB308"
                            proximity={200}
                            speedTrigger={230}
                            shockRadius={250}
                            shockStrength={8.5}
                            maxSpeed={5000}
                            resistance={450}
                            returnDuration={1.5}
                        />
                    </div>

                    <main className="relative z-10 w-full">
                        <Hero />
                        <Resources />
                        <AboutClub />
                        <ContactCTA />
                        <Footer/>
                    </main>
                </ClickSpark>
            </div>
        </div>
    );
}

export default App;