import Reveal from './Reveal.jsx';

export default function SectionHeading({ index, label, title, intro, id }) {
  return (
    <header className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
      <Reveal className="md:col-span-3">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {label}
        </p>
      </Reveal>
      <div className="md:col-span-9">
        <Reveal delay={0.05}>
          <h2 id={id} className="display-md max-w-[18ch] text-balance">
            {title}
          </h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-fg-muted">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
