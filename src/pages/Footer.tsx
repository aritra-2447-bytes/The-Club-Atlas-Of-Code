export default function Footer() {
    /*const [open, setOpen] = useState(false);*/

    return (
        <>
            <footer className="relative px-6 py-4 sm:px-10 lg:px-16">
                <div className="mx-auto grid max-w-7xl grid-cols-3 items-center">

                    {/* Left */}
                    <div />

                    {/* Center */}
                    <div className="flex justify-center">
                        <a
                            href="https://drive.google.com/drive/folders/1tgB5Cb-UAJyJLWL8DLNYq9M-H2dYycly?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400 transition hover:text-[#ffb829]"
                        >
                            * Code of Conduct
                        </a>
                    </div>

                    {/* Right */}
                    <div className="flex justify-end items-center gap-5 text-white transition">
                        <a
                            href="https://github.com/aritra-2447-bytes/The-Club-Atlas-Of-Code"
                            className="transition hover:scale-110  hover:text-[#ffb829]"
                        >
                            {"GitHub"}
                        </a>

                        <a
                            href="https://rkmrc.in/pg-departments/computer-science-2/"
                            className="transition hover:scale-110  hover:text-[#ffb829]"
                        >
                            {"Facebook"}
                        </a>
                    </div>

                </div>
            </footer>

        </>
    );
}