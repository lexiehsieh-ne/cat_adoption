import Parallax from "@/components/Parallax";

export function SectionHeading({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="relative flex items-end justify-between gap-4">
      <Parallax
        speed={0.5}
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 font-display text-8xl leading-none text-stone-800/[0.06] sm:text-9xl"
      >
        {index}
      </Parallax>
      <div className="relative flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
          {kicker}
        </span>
        <h2 className="font-display text-3xl text-stone-900 sm:text-4xl">
          {title}
        </h2>
        <span className="h-[2px] w-12 bg-stone-800" />
      </div>
    </div>
  );
}

export function Leader({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-stone-500">
        {label}
      </span>
      <span className="h-px min-w-4 flex-1 -translate-y-1 border-b border-dotted border-stone-400/70" />
      <span className="max-w-[65%] text-right text-sm text-stone-800 sm:max-w-none">
        {value}
      </span>
    </div>
  );
}
