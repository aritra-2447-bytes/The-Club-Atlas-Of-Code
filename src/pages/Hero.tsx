import ScrambledText from "../components/ScrambledText.tsx";
import ScrollIndicator from "../components/ScrollIndicator.tsx";

function Hero() {
    return (
        // Changed to transparent and relative so text aligns to this screen height section
        <div className="mb-20 relative h-screen w-full flex flex-col justify-end pb-10 sm:pb-0">
            {/*
              Title and scroll indicator are now flex siblings in one row,
              anchored to the bottom of the hero, instead of two independently
              absolutely-positioned elements guessing at each other's size.
              `items-end` keeps them baseline-aligned to the bottom, and
              `flex-wrap` lets the indicator drop below the title on
              narrow screens or whenever the title renders tall enough
              that there's no room beside it — so they can never overlap.
            */}
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 px-6 pb-6 sm:px-10 md:px-8 md:pb-8">
                <ScrambledText
                    className="z-50 text-[#ffb829] font-bold text-5xl sm:text-6xl md:text-8xl max-w-sm sm:max-w-xl leading-tight md:leading-none"
                    duration={1.2}
                    speed={0.5}
                    scrambleChars=".:"
                >
                    <span className="text-[#8052ff]">{'{'}</span> Atlas <br className="sm:hidden" /> 0f Code <span className="text-[#8052ff]">{'}'}</span>
                </ScrambledText>

                <ScrollIndicator />
            </div>
        </div>
    );
}

export default Hero;