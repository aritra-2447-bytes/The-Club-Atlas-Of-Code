import { useState, useEffect } from "react";
import Hero from "@/pages/Hero.tsx";
import ClickSpark from "@/components/ClickSpark.tsx";
import Header from "@/pages/Header.tsx";
import DotGrid from "@/components/DotGrid.tsx";
import CircularText from "@/components/CircularText.tsx"; // 1. Import the component

function App() {
    const [isLoading, setIsLoading] = useState(true); // 2. Add loading state

    // 3. Simulate a loading delay (e.g., 3 seconds)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleMenuStateChange = (isOpen: boolean) => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // 4. Conditional Rendering for the Loading Screen
    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-[#0D1117]">
                <CircularText
                    text="Firing Up The Game "
                    spinDuration={8}
                    onHover="goBonkers"
                />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#0D1117]">
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
                </main>
            </ClickSpark>
        </div>
    );
}

export default App;