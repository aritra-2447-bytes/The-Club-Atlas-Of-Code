import { Trophy, ArrowUpRight } from 'lucide-react';
import {SectionHeading} from '../components/SectionHeading.tsx';

export function Events() {
    return (
        <section id="events" className="px-6 py-28 sm:px-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
                <SectionHeading
                    eyebrow="02 / events"
                    title="Find your next arena."
                    description="Build under pressure, learn in public, and leave with a story worth shipping."
                />
                <div className="rounded-3xl border border-[#ffb829]/40 bg-[#ffb829] p-7 text-[#0d1117] sm:p-9">
                    <div className="flex items-center justify-between">
                        <span className="rounded-full border border-[#0d1117]/20 px-3 py-1 font-mono text-xs uppercase">Next up</span>
                        <Trophy size={24} />
                    </div>
                    <p className="mt-14 font-mono text-sm uppercase tracking-widest opacity-70">
                        24–26 October · On campus
                    </p>
                    <h3 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                        Midnight<br />Algorithm Jam
                    </h3>
                    <p className="mt-5 max-w-md leading-6 text-[#27313d]">
                        A 30-hour build sprint for coders who want to turn clever ideas into working software.
                    </p>
                    <a
                        href="mailto:hello@atlasofcode.club?subject=Midnight%20Algorithm%20Jam"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0d1117] px-5 py-3 font-semibold text-white transition hover:bg-[#27313d]"
                    >
                        Register interest <ArrowUpRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
}