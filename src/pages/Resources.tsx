import { useEffect, useState } from "react";
import { ArrowUpRight, Code2, Laptop2 } from "lucide-react";
import redGhost from "../assets/red.png";
import blueGhost from "../assets/blue.png";
import yellowGhost from "../assets/yellow.png";
import nilavra from "../assets/members/Nilavra-Sinha.jpeg";
import dinda from "../assets/members/Arnab-Dinda.jpeg";
import aritra from "../assets/members/Aritra-Paul.jpeg";
import bhunia from "../assets/members/Arnav-Bhunia.jpeg";

const RING_GRADIENT =
    "conic-gradient(from 180deg, #8052ff, #ff5f87, #ffb829, #8052ff)";

interface WingLink {
    label: string;
    url: string;
}

interface WingPerson {
    role: string;
    name: string;
    subtitle: string;
    photo: string;
    links: WingLink[];
}

const competitiveLeads: WingPerson[] = [
    {
        role: "Wing Lead",
        name: "Nilavra Sinha",
        subtitle: "Competitive Programming",
        photo: nilavra,
        links: [
            { label: "Codeforces", url: "https://codeforces.com/profile/example" },
        ],
    },
    {
        role: "Co-Lead",
        name: "Arnab Dinda",
        subtitle: "Competitive Programming",
        photo: dinda,
        links: [
            { label: "Codeforces", url: "https://codeforces.com/profile/example" },
        ],
    },
];

const softwareLeads: WingPerson[] = [
    {
        role: "Wing Lead",
        name: "Aritra Paul",
        subtitle: "Software Development",
        photo: aritra,
        links: [
            { label: "GitHub", url: "https://github.com/example" },
        ],
    },
    {
        role: "Co-Lead",
        name: "Arnav Bhunia",
        subtitle: "Software Development",
        photo: bhunia,
        links: [
            { label: "GitHub", url: "https://github.com/example" },
        ],
    },
];

const competitive = [
    {
        title: "CSES Problem Set",
        subtitle: "Beginner → Advanced",
        href: "https://cses.fi/problemset/",
    },
    {
        title: "Codeforces",
        subtitle: "Contests & Practice",
        href: "https://codeforces.com/problemset",
    },
    {
        title: "LeetCode",
        subtitle: "Interview Preparation",
        href: "https://leetcode.com/problemset/?page=1",
    },
];

const software = [
    {
        title: "Web Development",
        subtitle: "Coming Soon...",
    },
    {
        title: "AI / Machine Learning",
        subtitle: "Coming Soon...",
    },
    {
        title: "Open Source",
        subtitle: "Coming Soon...",
    },
];

interface ResourcesProps {
    number: number;
}

function RingAvatar({ photo, name }: { photo: string; name: string }) {
    return (
        <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full p-[2.5px] sm:h-25 sm:w-25"
            style={{ background: RING_GRADIENT }}
        >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0e14] p-[2.5px]">
                <img
                    src={photo}
                    alt={name}
                    className="h-full w-full rounded-full object-cover"
                />
            </span>
        </span>
    );
}

function WingLeads({
    people,
    accent,
    onOpen,
}: {
    people: WingPerson[];
    accent: string;
    onOpen: (person: WingPerson) => void;
}) {
    return (
        <div className="mt-6 flex flex-wrap items-center gap-6">
            {people.map((person) => (
                <button
                    key={person.role}
                    onClick={() => onOpen(person)}
                    className="group flex items-center gap-3 text-left outline-none"
                    aria-label={`View ${person.name}'s links`}
                >
                    <span className="transition-transform duration-300 group-hover:scale-105">
                        <RingAvatar photo={person.photo} name={person.name} />
                    </span>
                    <div>
                        <p
                            className="font-mono text-[9px] uppercase tracking-[0.2em]"
                            style={{ color: accent }}
                        >
                            {person.role}
                        </p>
                        <p className="text-sm font-medium text-white">
                            {person.name}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    );
}

function RetroLinkModal({
    member,
    onClose,
}: {
    member: WingPerson | null;
    onClose: () => void;
}) {
    useEffect(() => {
        if (!member) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [member, onClose]);

    if (!member) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="relative w-full max-w-xs overflow-hidden border-4 border-[#ffb829] bg-[#0a0e14] shadow-[0_0_0_4px_#000,0_0_50px_rgba(255,184,41,0.35)] sm:max-w-sm">
                <div
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        background:
                            "repeating-linear-gradient(to bottom, #fff 0, #fff 1px, transparent 1px, transparent 3px)",
                    }}
                />

                <div className="relative flex items-center justify-between border-b-4 border-[#ffb829] bg-[#ffb829] px-4 py-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-black sm:text-xs">
                        {member.role}.exe
                    </span>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="font-mono text-xs font-bold text-black hover:opacity-60"
                    >
                        [X]
                    </button>
                </div>

                <div className="relative p-6">
                    <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-[#8052ff]">
                        <img
                            src={member.photo}
                            alt={member.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[#8052ff]">
                        Player
                    </p>
                    <h4 className="mt-1 text-center text-xl font-semibold text-white">
                        {member.name}
                    </h4>
                    <p className="text-center text-sm text-slate-400">
                        {member.subtitle}
                    </p>

                    <div className="mt-6 space-y-2">
                        {member.links.map((l) => (
                            <a
                                key={l.label}
                                href={l.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between border-2 border-white/20 bg-white/5 px-4 py-2 font-mono text-xs text-white transition-colors hover:border-[#ffb829] hover:bg-[#ffb829]/10 sm:text-sm"
                            >
                                <span>&gt; {l.label.toUpperCase()}</span>
                                <span className="text-[#ffb829] opacity-0 transition-opacity group-hover:opacity-100">
                                    ➜
                                </span>
                            </a>
                        ))}
                    </div>

                    <p className="mt-6 animate-pulse text-center font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
                        Press [X] to continue
                    </p>
                </div>
            </div>
        </div>
    );
}

// Extracted Pacman UI for easy reuse
function PacmanDecoration({ className = "" }: { className?: string }) {
    return (
        <div className={`flex-col items-center ${className}`}>
            <div className="flex items-end -space-x-4">
                <img
                    src={redGhost}
                    alt="Red Ghost"
                    className="h-12 w-12 -rotate-6 drop-shadow-lg"
                />
                <img
                    src={yellowGhost}
                    alt="Yellow Ghost"
                    className="z-10 h-12 w-12 translate-y-2 drop-shadow-lg"
                />
                <img
                    src={blueGhost}
                    alt="Blue Ghost"
                    className="h-12 w-12 rotate-6 drop-shadow-lg"
                />
            </div>
            <div className="mt-6 flex gap-3">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-2.5 w-2.5 rounded-full ${
                            i % 3 === 0
                                ? "bg-[#ff4d5a]"
                                : i % 3 === 1
                                ? "bg-[#ffb829]"
                                : "bg-[#31d5ff]"
                        } opacity-80`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Resources({ number }: ResourcesProps) {
    const [selected, setSelected] = useState<WingPerson | null>(null);

    return (
        <section
            id="resources"
            className="min-h-[100dvh] snap-start snap-always px-6 py-28 sm:px-10 lg:px-16"
        >
            <div className="mx-auto max-w-7xl">
                {/* Header Section without Desktop Pacman */}
                <div className="max-w-3xl">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#ffb829]">
                        {String(number).padStart(2, "0")} / WINGS & RESOURCES
                    </p>
                    <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                        The right hint, at the right time.
                    </h2>
                    <p className="mt-6 max-w-2xl leading-7 text-slate-400">
                        Skip the tab chaos. Our library is organized around how you actually learn and compete.
                    </p>
                </div>

                {/* Content Cards Grid */}
                <div className="mt-16 grid gap-8 lg:grid-cols-2">
                    {/* ====================================================== */}
                    {/* Competitive Programming Card                           */}
                    {/* ====================================================== */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111720]/85 px-8 py-6 backdrop-blur-xl">
                        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffb829]/10 blur-3xl" />

                        <div className="relative">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffb829]/10 text-[#ffb829]">
                                    <Code2 size={24} />
                                </div>
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#ffb829]">
                                        Competitive Programming
                                    </p>
                                    <h3 className="mt-1 text-2xl font-semibold text-white">
                                        Think faster. Solve smarter.
                                    </h3>
                                </div>
                            </div>

                            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
                                Weekly contests, editorial breakdowns and curated
                                problem sets that scale with you — from your first
                                accepted submission to Div. 1 territory.
                            </p>

                            <WingLeads
                                people={competitiveLeads}
                                accent="#ffb829"
                                onOpen={setSelected}
                            />

                            <div className="mt-6 space-y-3">
                                {competitive.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-3.5 transition-all hover:-translate-y-0.5 hover:border-[#ffb829] hover:bg-[#171f2b]"
                                    >
                                        <div>
                                            <h4 className="text-sm font-semibold text-white">
                                                {item.title}
                                            </h4>
                                            <p className="mt-0.5 text-xs text-slate-400">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                        <ArrowUpRight
                                            className="text-[#ffb829] transition group-hover:-translate-y-1 group-hover:translate-x-1"
                                            size={18}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ====================================================== */}
                    {/* Software Development Card                              */}
                    {/* ====================================================== */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111720]/85 px-8 py-6 backdrop-blur-xl">
                        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#8052ff]/10 blur-3xl" />

                        <div className="relative">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8052ff]/10 text-[#8052ff]">
                                    <Laptop2 size={24} />
                                </div>
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8052ff]">
                                        Software Development
                                    </p>
                                    <h3 className="mt-1 text-2xl font-semibold text-white">
                                        Build today. Ship tomorrow.
                                    </h3>
                                </div>
                            </div>

                            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
                                Hands-on tracks in web, AI/ML and open source,
                                built around real projects instead of tutorials
                                — ship something you can point to.
                            </p>

                            <WingLeads
                                people={softwareLeads}
                                accent="#8052ff"
                                onOpen={setSelected}
                            />

                            <div className="mt-6 space-y-3">
                                {software.map((item) => (
                                    <div
                                        key={item.title}
                                        className="group flex cursor-default items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-3.5 transition-all hover:-translate-y-0.5 hover:border-[#8052ff] hover:bg-[#171f2b]"
                                    >
                                        <div>
                                            <h4 className="text-sm font-semibold text-white">
                                                {item.title}
                                            </h4>
                                            <p className="mt-0.5 text-xs text-slate-400">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                        <ArrowUpRight className="text-[#8052ff]" size={18} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile-only Ghost Divider (hidden on large screens) */}
                <PacmanDecoration className="mt-16 -mb-12 flex lg:hidden" />

            </div>

            <RetroLinkModal member={selected} onClose={() => setSelected(null)} />
        </section>
    );
}