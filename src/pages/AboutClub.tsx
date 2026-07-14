import redGhost from "../assets/red.png";
import blueGhost from "../assets/blue.png";
import yellowGhost from "../assets/yellow.png";

export default function AboutClub() {
    return (
        <section
            id="about"
            className="px-6 py-28 sm:px-10 lg:px-16"
            >
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="max-w-3xl">

                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#ffb829]">
                        ABOUT
                    </p>

                    <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                        Built by students.
                        <br />
                        Guided by mentors.
                    </h2>

                    <p className="mt-6 max-w-2xl leading-7 text-[#ffb829]/80">
                        Atlas of Code is the official coding club of the
                        Department of Computer Science at Ramakrishna Mission
                        Residential College, fostering competitive programming,
                        software development, collaborative learning and innovation.
                    </p>

                </div>

                {/* Ghost Divider */}
                <div className="my-16 flex flex-col items-center">

                    <div className="flex items-end -space-x-4">

                        <img
                            src={redGhost}
                            alt="Red Ghost"
                            className="h-12 w-12 -rotate-6 drop-shadow-lg"
                        />

                        <img
                            src={yellowGhost}
                            alt="Yellow Ghost"
                            className="h-12 w-12 translate-y-2 drop-shadow-lg z-10"
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

                {/* Card */}
                <div
                    className=" relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111720]/85 p-10 backdrop-blur-xl"
                >

                    {/* Background glow */}

                    <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-[#ffb829]/10 blur-3xl" />

                    <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#8052ff]/10 blur-3xl" />

                    {/* Decorative Ghosts */}
                    <img
                        src={redGhost}
                        alt=""
                        className=" absolute left-8 bottom-8 h-12 w-12 opacity-15 pointer-events-none select-none"
                    />

                    <img
                        src={yellowGhost}
                        alt=""
                        className=" absolute bottom-10 left-1/2 h-10 w-10 -translate-x-1/2 opacity-10 pointer-events-none select-none"
                    />

                    <img
                        src={blueGhost}
                        alt=""
                        className=" absolute top-8 right-8 h-12 w-12 opacity-15 pointer-events-none select-none"
                    />

                    <div className="relative grid gap-12 lg:grid-cols-2">

                        {/* LEFT */}
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#ffb829]">
                                Institution
                            </p>

                            <h3 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                                Ramakrishna Mission
                                <br />
                                Residential College
                            </h3>

                            <div
                                className="mt-6 inline-flex rounded-full border border-[#8052ff]/40 bg-[#8052ff]/10 px-5 py-2 text-sm font-medium text-[#BDA5FF]"
                            >
                                Department of Computer Science
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-10">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#ffb829]">
                                    Chairperson
                                </p>

                                <h4 className="mt-3 text-3xl font-semibold text-white">
                                    Dr. Siddhartha Banerjee
                                </h4>

                                <p className="mt-2 text-slate-400">
                                    Head of Department (CS)
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-[#ffb829]/50 via-white/10 to-[#8052ff]/50" />

                            <div>

                                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#8052ff]">
                                    Secretary
                                </p>

                                <h4 className="mt-3 text-3xl font-semibold text-white">
                                    XXXXX XXXXX
                                </h4>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}