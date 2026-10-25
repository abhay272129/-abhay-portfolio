import { GraduationCap, Sparkles } from 'lucide-react';
import { education, learning } from '../data/education.js';
import { sectionNumber } from '../data/site.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading id="education-title" index={sectionNumber('education')} label="Education" title="Foundations, and what's next." />

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Completed */}
          <div className="lg:col-span-7">
            <h3 className="eyebrow mb-6 flex items-center gap-2">
              <GraduationCap size={14} aria-hidden="true" /> Completed
            </h3>
            <ol className="border-t border-line">
              {education.map((e, i) => (
                <Reveal as="li" key={e.degree} delay={0.05 * i} className="grid gap-2 border-b border-line py-8 sm:grid-cols-[1fr_auto] sm:gap-8">
                  <div>
                    <p className="text-xl font-semibold tracking-tight md:text-2xl">
                      {e.degree}
                      {e.specialization && <span className="text-fg-muted"> — {e.specialization}</span>}
                    </p>
                    <p className="mt-2 text-fg-muted">{e.institution}</p>
                    {e.note && (
                      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-sm text-accent">
                        {e.note}
                      </p>
                    )}
                  </div>
                  <div className="font-mono text-xs text-fg-subtle sm:text-right">
                    <p>{e.period}</p>
                    <p className="mt-1">{e.status}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Ongoing */}
          <div className="lg:col-span-5">
            <h3 className="eyebrow mb-6 flex items-center gap-2">
              <Sparkles size={14} aria-hidden="true" /> Currently learning
            </h3>
            <Reveal className="rounded-2xl border border-dashed border-line-strong p-6 md:p-8">
              <ul className="space-y-6">
                {learning.map((l) => (
                  <li key={l.title}>
                    <p className="font-medium">{l.title}</p>
                    <p className="mt-1 text-sm text-fg-subtle">{l.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                In progress — not yet certified
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
