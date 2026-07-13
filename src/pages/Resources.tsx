import { ArrowUpRight, Code2, Laptop2 } from "lucide-react";

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
        subtitle: "Coming Soon",
    },
    {
        title: "AI / Machine Learning",
        subtitle: "Coming Soon",
    },
    {
        title: "Open Source",
        subtitle: "Coming Soon",
    },
];

export default function Resources() {
    return (
        <section id="resources" className="px-6 py-28 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                {/* Header Section */}
                <div className="max-w-3xl">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#ffb829]">
                        01 / RESOURCES
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
                    <div
                        className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-[#111720]/85
              px-8
              py-6
              backdrop-blur-xl
            "
                    >
                        {/* Ambient Background Glow */}
                        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffb829]/10 blur-3xl" />

                        <div className="relative">
                            {/* Card Header */}
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

                            {/* Links List */}
                            <div className="mt-6 space-y-3">
                                {competitive.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                      group
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.02]
                      px-6
                      py-3.5
                      transition-all
                      hover:border-[#ffb829]
                      hover:bg-[#171f2b]
                      hover:-translate-y-0.5
                    "
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
                    <div
                        className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-[#111720]/85
              px-8
              py-6
              backdrop-blur-xl
            "
                    >
                        {/* Ambient Background Glow */}
                        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#8052ff]/10 blur-3xl" />

                        <div className="relative">
                            {/* Card Header */}
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

                            {/* Placeholders List */}
                            <div className="mt-6 space-y-3">
                                {software.map((item) => (
                                    <div
                                        key={item.title}
                                        className="
                      group
                      flex
                      items-center
                      justify-between
                      cursor-default
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.02]
                      px-6
                      py-3.5
                      transition-all
                      hover:border-[#8052ff]
                      hover:bg-[#171f2b]
                      hover:-translate-y-0.5
                    "
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
            </div>
        </section>
    );
}