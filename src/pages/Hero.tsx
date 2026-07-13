import ScrambledText from "../components/ScrambledText.tsx";

function Hero() {
    return (
        // Changed to transparent and relative so text aligns to this screen height section
        <div className="relative h-screen w-full">
            <ScrambledText
                className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-50 text-[#ffb829] font-bold text-5xl sm:text-7xl md:text-8xl max-w-sm sm:max-w-xl leading-tight md:leading-none"
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
            >
                <span className="text-[#8052ff]">{'{'}</span> Atlas <br className="sm:hidden" /> 0f Code <span className="text-[#8052ff]">{'}'}</span>
            </ScrambledText>
        </div>
    );
}

export default Hero;