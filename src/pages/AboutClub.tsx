import { useEffect, useState } from "react";
import redGhost from "../assets/red.png";
import blueGhost from "../assets/blue.png";
import yellowGhost from "../assets/yellow.png";
import sir from "../assets/members/sir.jpeg";
import ankush from "../assets/members/Ankush-Das.jpeg";
import swarnava from "../assets/members/Swarnava-Bag.jpeg";
import sam from "../assets/members/Sam-Ghosh.jpeg";
import arijit from "../assets/members/Arijit-Laskar.jpeg";

interface AboutClubProps {
    number: number;
}

interface TeamLink {
    label: string;
    url: string;
}

interface TeamMember {
    role: string;
    name: string;
    subtitle: string;
    photo: string;
    links: TeamLink[];
}

const RING_GRADIENT =
    "conic-gradient(from 180deg, #8052ff, #ff5f87, #ffb829, #8052ff)";

const chairperson: TeamMember = {
    role: "Chairperson",
    name: "Dr. Siddhartha Banerjee",
    subtitle: "Head of Department (CS)",
    photo: sir,
    links: [],
};

const secretary: TeamMember = {
    role: "Secretary",
    name: "Ankush Das",
    subtitle: "2nd Year",
    photo: ankush,
    links: [
        { label: "GitHub", url: "https://github.com/heaven-1310" },
        { label: "LinkedIn", url: "https://linkedin.com/in/example" },
    ],
};

const restOfTeam: TeamMember[] = [
    {
        role: "Event Co-ordinator",
        name: "Swarnava Bag",
        subtitle: "2nd Year",
        photo: swarnava,
        links: [
            { label: "GitHub", url: "https://github.com/swarnavabag" },
            { label: "LinkedIn", url: "www.linkedin.com/in/swarnava-bag-24285435b" }
        ],
    },
    {
        role: "Club Co-ordinator",
        name: "Sam Ghosh",
        subtitle: "2nd Year",
        photo: sam,
        links: [
            { label: "GitHub", url: "https://github.com/dodo-is-hacked" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/sam-ghosh-2443a33a5/" }
        ],
    },
    {
        role: "Media Co-ordinator",
        name: "Arijit Laskar",
        subtitle: "2nd Year",
        photo: arijit,
        links: [
            { label: "GitHub", url: "https://github.com/itzareo2910" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/arijit-laskar-789686375?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
        ],
    },
];

function RingAvatar({ photo, name, size }: { photo: string; name: string; size: string }) {
    return (
        <span
            className={`relative flex shrink-0 items-center justify-center rounded-full p-[3px] transition-transform duration-300 ${size}`}
            style={{ background: RING_GRADIENT }}
        >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0e14] p-[3px]">
                <img
                    src={photo}
                    alt={name}
                    className="h-full w-full rounded-full object-cover"
                />
            </span>
        </span>
    );
}

function PersonRow({
    member,
    avatarSize,
    nameClass,
    roleColor,
    onOpen,
}: {
    member: TeamMember;
    avatarSize: string;
    nameClass: string;
    roleColor: string;
    onOpen?: () => void;
}) {
    const content = (
        <div className="flex items-center gap-4 sm:gap-5">
            <span className="transition-transform duration-300 group-hover:scale-105">
                <RingAvatar photo={member.photo} name={member.name} size={avatarSize} />
            </span>
            <div className="text-left">
                <p
                    className="font-mono text-[10px] uppercase tracking-[0.25em] sm:text-xs"
                    style={{ color: roleColor }}
                >
                    {member.role}
                </p>
                <h4 className={`mt-1 font-semibold text-white ${nameClass}`}>
                    {member.name}
                </h4>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    {member.subtitle}
                </p>
            </div>
        </div>
    );

    if (!onOpen) return content;

    return (
        <button
            onClick={onOpen}
            className="group w-full outline-none"
            aria-label={`View ${member.name}'s links`}
        >
            {content}
        </button>
    );
}

function StoryAvatar({ member, onOpen }: { member: TeamMember; onOpen: () => void }) {
    return (
        <button
            onClick={onOpen}
            className="group flex flex-col items-center gap-3 outline-none"
            aria-label={`View ${member.name}'s links`}
        >
            <span className="transition-all duration-300 group-hover:scale-[1.04] group-hover:drop-shadow-[0_0_16px_rgba(128,82,255,0.35)]">
                <RingAvatar
                    photo={member.photo}
                    name={member.name}
                    size="h-16 w-16 sm:h-25 sm:w-25"
                />
            </span>
            <span className="text-center">
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#ffb829] md:text-[10px]">
                    {member.role}
                </span>
                <span className="mt-1 block max-w-[7rem] text-xs font-medium leading-tight text-white md:max-w-none md:text-sm">
                    {member.name}
                </span>
            </span>
        </button>
    );
}

function RetroLinkModal({
    member,
    onClose,
}: {
    member: TeamMember | null;
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

// Added Pacman UI for Desktop About Section
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

export default function AboutClub({ number }: AboutClubProps) {
    const [selected, setSelected] = useState<TeamMember | null>(null);

    return (
        <section id="about" className="min-h-[100dvh] px-6 py-20 snap-always sm:px-10 sm:py-24 lg:px-16 lg:py-28">
            <div className="mx-auto max-w-7xl">
                
                {/* Header Section with Pacman flex hand-off */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#ffb829]">
                            {String(number).padStart(2, "0")} / ABOUT
                        </p>

                        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                            Built by students.
                            <br />
                            Guided by mentors.
                        </h2>

                        <p className="mt-6 mb-12 max-w-2xl leading-7 text-[#ffb829]/80 sm:mb-16">
                            Atlas of Code is the official coding club of the
                            Department of Computer Science at Ramakrishna Mission
                            Residential College, fostering competitive programming,
                            software development, collaborative learning and innovation.
                        </p>
                    </div>

                    {/* Desktop-only Pacman UI (hidden on smaller screens) */}
                    <PacmanDecoration className="hidden lg:flex" />
                </div>

                {/* Card */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111720]/85 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
                    {/* Background glow */}
                    <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-[#ffb829]/10 blur-3xl" />
                    <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#8052ff]/10 blur-3xl" />

                    {/* Decorative Ghosts */}
                    <img
                        src={redGhost}
                        alt=""
                        className="pointer-events-none absolute left-4 bottom-4 hidden h-12 w-12 select-none opacity-15 sm:left-8 sm:bottom-8 md:block"
                    />
                    <img
                        src={yellowGhost}
                        alt=""
                        className="pointer-events-none absolute bottom-6 left-1/2 hidden h-10 w-10 -translate-x-1/2 select-none opacity-10 sm:bottom-10 md:block"
                    />
                    <img
                        src={blueGhost}
                        alt=""
                        className="pointer-events-none absolute right-4 top-4 hidden h-12 w-12 select-none opacity-15 sm:right-8 sm:top-8 md:block"
                    />

                    <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-12">
                        {/* LEFT — institution + department, linked */}
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#ffb829]">
                                Institution
                            </p>

                            <a
                                href="https://rkmrc.in/"
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-block"
                            >
                                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#ffb829] sm:text-4xl">
                                    Ramakrishna Mission
                                    <br />
                                    Residential College
                                </h3>
                            </a>

                            <a
                                href="https://rkmrc.in/pg-departments/computer-science-2/"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-6 inline-flex rounded-full border border-[#8052ff]/40 bg-[#8052ff]/10 px-5 py-2 text-sm font-medium text-[#BDA5FF] transition-colors duration-300 hover:border-[#8052ff]/70 hover:bg-[#8052ff]/20"
                            >
                                Department of Computer Science
                            </a>
                        </div>

                        {/* RIGHT — chairperson (larger, not clickable) + secretary (smaller, clickable) */}
                        <div className="space-y-8">
                            <PersonRow
                                member={chairperson}
                                avatarSize="h-16 w-16 sm:h-30 sm:w-30 hover:scale-[1.04] hover:drop-shadow-[0_0_16px_rgba(128,82,255,0.35)]"
                                nameClass="text-xl sm:text-2xl lg:text-3xl"
                                roleColor="#ffb829"
                            />

                            <div className="h-px bg-gradient-to-r from-[#ffb829]/50 via-white/10 to-[#8052ff]/50" />
                            <PersonRow
                                member={secretary}
                                avatarSize="h-16 w-16 sm:h-30 sm:w-30 hover:drop-shadow-[0_0_16px_rgba(128,82,255,0.35)]"
                                nameClass="text-base sm:text-lg"
                                roleColor="#8052ff"
                                onOpen={() => setSelected(secretary)}
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-10 h-px bg-gradient-to-r from-[#ffb829]/50 via-white/10 to-[#8052ff]/50 sm:my-12" />

                    {/* Rest of the team */}
                    <div className="relative">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#8052ff]">
                            The Team
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-8 sm:gap-x-14 lg:gap-x-16">
                            {restOfTeam.map((member) => (
                                <StoryAvatar
                                    key={member.role}
                                    member={member}
                                    onOpen={() => setSelected(member)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <RetroLinkModal member={selected} onClose={() => setSelected(null)} />
        </section>
    );
}