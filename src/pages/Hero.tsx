import ScrambledText from "../components/ScrambledText.tsx";

function Hero() {
    return (
        // Changed to transparent and relative so text aligns to this screen height section
        <div className="relative h-screen w-full">
            <ScrambledText
                className="absolute bottom-8 left-8 z-50 text-[#ffb829] font-bold text-8xl max-w-xl"
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
            >
                <span className="text-[#8052ff]">{'{'}</span> Atlas of <br/>Code <span className="text-[#8052ff]">{'}'}</span>
            </ScrambledText>
        </div>
    );
}

export default Hero;