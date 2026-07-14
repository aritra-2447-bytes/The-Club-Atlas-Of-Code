export default function Footer() {
    return (
        <footer className="relative px-6 py-6 sm:px-10 lg:px-16">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:grid sm:grid-cols-3 sm:gap-0">

                {/* Left (kept empty for balance on desktop) */}
                <div className="hidden sm:block" />

                {/* Center */}
                <div className="flex justify-center text-center">
                    <a
                        href="https://drive.google.com/drive/folders/1tgB5Cb-UAJyJLWL8DLNYq9M-H2dYycly?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400 transition hover:text-[#ffb829] sm:text-sm"
                    >
                        * Code of Conduct
                    </a>
                </div>

                {/* Right */}
                <div className="flex items-center justify-center gap-5 text-white transition sm:justify-end">
                    <a
                        href="https://github.com/aritra-2447-bytes/The-Club-Atlas-Of-Code"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition hover:scale-110 hover:text-[#ffb829]"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://rkmrc.in/pg-departments/computer-science-2/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition hover:scale-110 hover:text-[#ffb829]"
                    >
                        Facebook
                    </a>
                </div>

            </div>
        </footer>
    );
}