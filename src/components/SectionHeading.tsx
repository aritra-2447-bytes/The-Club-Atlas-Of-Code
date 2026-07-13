interface SectionHeadingProps {
    eyebrow: string;
    title: string;
    description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
    return (
        <div className="max-w-2xl">
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#ffb829]">
                {eyebrow}
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                {title}
            </h2>
            {description && (
                <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
                    {description}
                </p>
            )}
        </div>
    );
}