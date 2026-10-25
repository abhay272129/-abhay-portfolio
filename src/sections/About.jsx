import { useState } from 'react';
import { site, sectionNumber } from '../data/site.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';

function Portrait() {
  const [failed, setFailed] = useState(false);
  const showImage = site.photo && !failed;

  return (
    <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-ink-850">
      {showImage ? (
        <img
          src={site.photo}
          alt={site.photoAlt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover grayscale-[20%]"
        />
      ) : (
        // Fallback until the real photograph is added (see src/data/site.js → photo)
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_35%,#1f2124,#0b0c0d_70%)]">
          <span className="grid size-28 place-items-center rounded-full border border-line-strong font-mono text-3xl tracking-tight">
            AG
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Photo placeholder</span>
        </div>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink-950/90 to-transparent p-5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
        <span>{site.name}</span>
        <span>{site.location}</span>
      </figcaption>
    </figure>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="about-title"
          index={sectionNumber('about')}
          label="About"
          title="From computer applications to enterprise Java."
        />

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5 lg:col-span-4">
            <Portrait />
          </Reveal>

          <div className="space-y-6 text-lg leading-relaxed text-fg-muted md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="text-2xl leading-snug text-fg md:text-[1.75rem]">
                I'm a Software Engineer with two years of professional Java development, most of it spent on the
                backend of enterprise insurance applications.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                My foundation is in computer applications — a BCA from Dr. Rammanohar Lohia Avadh University, followed
                by an MCA in Data Science from Lovely Professional University. I joined Programmers.io as a Java intern
                in 2024 and have since grown into a developer role on a live client project.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Day to day, I work with Spring Boot, REST APIs, relational and document databases, and messaging — the
                parts of a system that need to be dependable long after release. I've contributed to framework upgrades,
                document and signature workflows, and third-party integrations within a team.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Outside of work I'm expanding toward the frontend with React and toward the cloud with AWS, while
                continuing to sharpen fundamentals — data structures, algorithms and software design.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
