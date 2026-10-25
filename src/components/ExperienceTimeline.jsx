import Reveal from './Reveal.jsx';

export default function ExperienceTimeline({ items }) {
  return (
    <ol className="space-y-6">
      {items.map((job) => (
        <li key={job.company} className="grid gap-10 rounded-2xl border border-line bg-ink-850 p-6 md:grid-cols-12 md:p-10">
          {/* left: company + progression */}
          <Reveal className="md:col-span-5">
            <p className="eyebrow">{job.period}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{job.company}</h3>
            <p className="mt-1 text-fg-muted">
              {job.location} · {job.domain}
            </p>

            <ol className="relative mt-8 space-y-5 border-l border-line pl-6" aria-label="Role progression">
              {job.progression.map((step, i) => (
                <li key={step.role} className="relative">
                  <span
                    className={`absolute -left-[29px] top-1.5 size-2.5 rounded-full ${
                      i === 0 ? 'bg-accent' : 'border border-line-strong bg-ink-900'
                    }`}
                    aria-hidden="true"
                  />
                  <p className={i === 0 ? 'font-medium text-fg' : 'text-fg-muted'}>{step.role}</p>
                  <p className="font-mono text-xs text-fg-subtle">{step.date}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* right: summary + areas */}
          <Reveal delay={0.08} className="md:col-span-7">
            <p className="text-lg leading-relaxed text-fg">{job.summary}</p>
            <h4 className="eyebrow mt-8">Areas of contribution</h4>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {job.areas.map((a) => (
                <li key={a} className="flex gap-4 py-3.5 text-fg-muted">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
              {job.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
