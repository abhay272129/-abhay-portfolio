import { motion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { site, hasProjects } from '../data/site.js';
import AbstractHeroVisual from '../components/AbstractHeroVisual.jsx';

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section id="top" className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 md:pt-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            className="eyebrow flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {site.name} — {site.title}
          </motion.p>

          <h1 className="display-xl mt-8">
            {site.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i === 1 ? 'text-fg-muted' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-[52ch] text-lg leading-relaxed text-fg-muted md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            {site.intro}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52, ease }}
          >
            <a
              href={hasProjects ? '#projects' : '#experience'}
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 font-semibold sm:px-6 text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              {hasProjects ? 'Selected projects' : 'View experience'}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-5 font-medium sm:px-6 transition-colors hover:bg-ink-800"
            >
              About me
            </a>
          </motion.div>

          <motion.dl
            className="mt-14 grid max-w-md grid-cols-2 gap-6 border-t border-line pt-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div>
              <dt className="eyebrow">Currently</dt>
              <dd className="mt-2 text-fg">{site.role}, Programmers.io</dd>
            </div>
            <div>
              <dt className="eyebrow">Based in</dt>
              <dd className="mt-2 text-fg">{site.location}</dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          className="flex justify-center lg:col-span-5 lg:justify-end"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
        >
          <div className="w-full max-w-[420px] sm:max-w-[480px] lg:max-w-none">
            <AbstractHeroVisual />
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle transition-colors hover:text-fg md:flex"
      >
        Scroll <ArrowDown size={12} aria-hidden="true" />
      </a>
    </section>
  );
}
