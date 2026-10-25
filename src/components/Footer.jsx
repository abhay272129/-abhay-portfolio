import { ArrowUp } from 'lucide-react';
import { site } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with React, Tailwind CSS and Motion.
        </p>
        <a href="#top" className="inline-flex min-h-11 items-center gap-2 self-start transition-colors hover:text-fg sm:self-auto">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
