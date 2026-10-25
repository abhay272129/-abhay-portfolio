import { levelLabels } from '../data/skills.js';
import Reveal from './Reveal.jsx';

const dot = {
  core: 'bg-accent',
  working: 'bg-fg-muted',
  learning: 'border border-fg-subtle bg-transparent',
};

export default function SkillGroup({ group, delay = 0 }) {
  const wide = group.featured || group.wide;

  return (
    <Reveal
      delay={delay}
      className={`group flex h-full flex-col rounded-2xl border border-line bg-ink-850 p-6 transition-colors duration-300 hover:border-line-strong md:p-8 ${
        wide ? 'md:col-span-2' : ''
      }`}
    >
      <p className="font-mono text-xs text-accent">{group.index}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">{group.title}</h3>
      <p className="mt-2 max-w-[44ch] text-sm text-fg-subtle">{group.note}</p>

      <ul className={`mt-8 grid gap-x-8 ${wide ? 'sm:grid-cols-2' : ''}`}>
        {group.skills.map((s) => (
          <li key={s.name} className="flex min-h-12 items-center justify-between gap-4 border-t border-line py-3">
            <span className={group.featured ? 'text-lg' : ''}>{s.name}</span>
            <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-fg-subtle">
              <span className={`size-1.5 rounded-full ${dot[s.level]}`} aria-hidden="true" />
              {levelLabels[s.level]}
            </span>
          </li>
        ))}
      </ul>

      {group.footnote && (
        <div className="mt-auto pt-8">
          <p className="border-t border-line pt-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-fg-subtle">
            {group.footnote}
          </p>
        </div>
      )}
    </Reveal>
  );
}
