import { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import redPacman from '../assets/red.png';
import yellowPacman from '../assets/yellow.png';
import bluePacman from '../assets/blue.png';
import {SectionHeading} from "@/components/SectionHeading.tsx";

interface ContactCTAProps {
    number: number;
}

export function ContactCTA({ number }: ContactCTAProps) {
    const [showEmail, setShowEmail] = useState(false);
    const [copied, setCopied] = useState(false);
    const emailAddress = "hello@atlasofcode.club";

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!showEmail) {
            setShowEmail(true);
        } else {
            navigator.clipboard.writeText(emailAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section id="contact" className="px-6 py-28 snap-start snap-always sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow={`${String(number).padStart(2, "0")}/ Wanna chat...`}
                    title={""}
                />
            <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 rounded-[2rem] bg-[#8052ff] p-8 sm:p-12 lg:flex-row lg:items-end overflow-hidden">

                <div className="flex flex-col gap-4">
                    <div>
                        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/65">
                            Ready player one?
                        </p>
                        <h2 className="mt-4 max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-7xl">
                            Come solve something impossible.
                        </h2>
                    </div>
                </div>

                {/* Centered & Color-Boosted Ghost Squad Layout */}
                <div className="absolute left-1/2 bottom-28 -translate-x-1/2 hidden lg:flex items-center -space-x-5 pointer-events-none select-none z-10">
                    <img
                        src={redPacman}
                        alt="Blinky"
                        className="w-20 h-20 object-contain drop-shadow-[0_4px_12px_rgba(255,0,0,0.3)] filter brightness-125 saturate-150 transform -rotate-6 z-30"
                    />
                    <img
                        src={yellowPacman}
                        alt="Inky"
                        className="w-20 h-20 object-contain drop-shadow-[0_4px_12px_rgba(0,192,255,0.3)] filter brightness-125 saturate-150 translate-y-2 z-20"
                    />
                    <img
                        src={bluePacman}
                        alt="Clyde"
                        className="w-20 h-20 object-contain drop-shadow-[0_4px_12px_rgba(255,165,0,0.3)] filter brightness-125 saturate-150 transform rotate-6 z-10"
                    />
                </div>

                <button
                    onClick={handleButtonClick}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-[#322266] transition hover:scale-105 cursor-pointer selection:bg-transparent z-40 lg:ml-auto"
                >
                    {!showEmail ? (
                        <>
                            <Mail size={18} /> Say hello
                        </>
                    ) : (
                        <>
                            <span className="font-mono select-all">{emailAddress}</span>
                            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="opacity-60" />}
                        </>
                    )}
                </button>
            </div>
            </div>
        </section>
    );
}