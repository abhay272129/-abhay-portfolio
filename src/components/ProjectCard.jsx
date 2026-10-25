import { ArrowUpRight, Github, FileText } from 'lucide-react';
import Reveal from './Reveal.jsx';

/** Placeholder art used until a real screenshot is supplied. Clearly labelled — never a fake screenshot. */
function ProjectPlaceholder({ title, index }) {
  const num = String(index + 1).padStart(2, '0');
  const corner = 'absolute size-4 border-fg-subtle/60';
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(120%_90%_at_100%_100%,#1b1d20,#121315_60%)]">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id={`p-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="rgb(255 255 255 / 0.045)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${index})`} />
      </svg>

      {/* crop marks — frame reserved for a real screenshot */}
      <div className="absolute inset-5 md:inset-6" aria-hidden="true">
        <span className={`${corner} left-0 top-0 border-l border-t`} />
        <span className={`${corner} right-0 top-0 border-r border-t`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} bottom-0 right-0 border-b border-r`} />
      </div>

      <div className="absolute inset-5 flex flex-col justify-between p-4 md:inset-6 md:p-5">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          PRJ / {num}
        </p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Screenshot coming soon</p>
            <p className="mt-1 text-sm text-fg-muted">{title}</p>
          </div>
          <span
            className="hidden select-none font-mono text-6xl font-medium leading-none tracking-tighter text-white/[0.06] sm:block md:text-7xl"
            aria-hidden="true"
          >
            {num}
          </span>
        </div>
      </div>
    </div>
  );
}

function LinkButton({ href, icon: Icon, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-accent hover:text-accent"
    >
      <Icon size={15} aria-hidden="true" />
      {children}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export default function ProjectCard({ project, index, large = false }) {
  const { title, category, year, description, highlights, stack, image, repoUrl, liveUrl, caseStudyUrl } = project;
  const hasLinks = repoUrl || liveUrl || caseStudyUrl;

  return (
    <Reveal delay={0.06 * (index % 2)} className={large ? 'md:col-span-2' : ''}>
      <article
        className={`group grid h-full overflow-hidden rounded-2xl border border-line bg-ink-850 transition-colors duration-300 hover:border-line-strong ${
          large ? 'md:grid-cols-2' : ''
        }`}
      >
        <div className={`relative overflow-hidden ${large ? 'aspect-[16/11] md:aspect-auto md:min-h-[420px]' : 'aspect-[16/10]'}`}>
          <div className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
            {image ? (
              <img src={image} alt={`Screenshot of ${title}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            ) : (
              <ProjectPlaceholder title={title} index={index} />
            )}
          </div>
        </div>

        <div className="flex flex-col p-6 md:p-8">
          <p className="eyebrow flex gap-3">
            <span>{category}</span>
            {year && <span className="text-fg-subtle">· {year}</span>}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h3>
          <p className="mt-4 leading-relaxed text-fg-muted">{description}</p>

          {large && highlights?.length > 0 && (
            <ul className="mt-6 space-y-2 text-sm text-fg-muted">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
            {stack.map((s) => (
              <li key={s} className="rounded-full bg-ink-700 px-3 py-1 font-mono text-xs text-fg-muted">
                {s}
              </li>
            ))}
          </ul>

          {hasLinks && (
            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              <LinkButton href={liveUrl} icon={ArrowUpRight}>Live demo</LinkButton>
              <LinkButton href={repoUrl} icon={Github}>Source</LinkButton>
              <LinkButton href={caseStudyUrl} icon={FileText}>Case study</LinkButton>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
