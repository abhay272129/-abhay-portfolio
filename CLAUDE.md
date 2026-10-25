# CLAUDE.md — Abhay Gupta Portfolio

Guidance for Claude (Claude Code or any AI assistant) working in this repository.
The full original brief lives in `docs/PROJECT_BRIEF.md`. This file is the condensed, enforceable version.

## What this is

A static, single-page personal portfolio for **Abhay Gupta — Software Engineer** (Java Developer at
Programmers.io India Pvt. Ltd.). It is a **professional showcase, not a job-seeking or freelance page**.

## Stack (do not change without a clear reason)

- React 18 + Vite 6, plain JavaScript (JSX)
- Tailwind CSS v4 via `@tailwindcss/vite` — tokens are defined in `src/styles/index.css` under `@theme`
- `motion` (Motion for React, import from `motion/react`) for animation
- `lucide-react` for icons
- CSS + SVG for the hero visual (no Three.js unless it clearly earns its weight)
- Web3Forms for the contact form (no backend)

**Never add:** a backend, database, auth, CMS, admin panel, server APIs, or a state-management library.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint       # eslint
```

Always run `npm run build` after changes and fix any errors before finishing.

## Project structure

```
src/
  data/          ← ALL content lives here. Edit text here, not in components.
    site.js        name, title, intro, email/GitHub/LinkedIn, photo path, nav links
    experience.js  job, role progression, contribution areas
    skills.js      grouped skills with honest levels (core / working / learning)
    projects.js    project cards (empty URL = button hidden; empty list = Projects section hidden)
    education.js   degrees + ongoing learning
  components/    reusable UI (Navbar, Footer, SectionHeading, Reveal, ProjectCard, SkillGroup,
                 ExperienceTimeline, AbstractHeroVisual)
  sections/      page sections in order: Hero, About, Experience, Expertise, Projects, Education, Contact
                 (section numbers come from `sectionNumber()` in site.js, so they stay continuous)
  hooks/         useActiveSection (nav highlighting)
  styles/        index.css — design tokens + custom utilities
public/          favicon, OG image, 404.html, robots.txt, images/
```

## Design system

| Token | Value | Use |
|---|---|---|
| `ink-900` | `#0b0c0d` | page background |
| `ink-850 / 800 / 700` | layered surfaces | cards, chips |
| `line` / `line-strong` | white @ 8% / 16% | borders, separators |
| `fg` / `fg-muted` / `fg-subtle` | text hierarchy | |
| `accent` | `#c6f432` electric lime | **sparingly**: one CTA, dots, active states, key lines |

- Fonts: **Manrope** (sans, headings + body), **JetBrains Mono** (eyebrows, metadata, labels).
- Custom utilities: `container-x`, `section-y`, `eyebrow`, `display-xl`, `display-md`, `grain`.
- Cards: `rounded-2xl border border-line bg-ink-850`, hover → `border-line-strong`.
- Motion: ease `[0.16, 1, 0.3, 1]`, 0.6–0.9s, entrance-only via `<Reveal>`. No looping backgrounds,
  no cursor effects, no scroll-jacking, no intro loader.
- `MotionConfig reducedMotion="user"` in `main.jsx` + CSS media query handle reduced motion. Keep both.
- Avoid: neon glow everywhere, cyberpunk styling, giant badge walls, skill percentage bars.

## Content & authenticity rules (strict)

1. **Never invent** URLs, repos, testimonials, certifications, metrics, user counts, awards,
   screenshots, or photos. Use clearly-labelled placeholders instead.
2. No "Open to Work", "Hire Me", "Available for Freelance", or sales language anywhere.
3. Work descriptions say **"contributed to" / "worked on"** for team systems; "built" only for solo work.
4. Keep client details generic ("an enterprise insurance client"). Do not name the client on the site or
   expose architecture, code, data, or screenshots from work.
5. AWS is **learning in progress** — no certification badge or claim. Do not list Azure.
6. React and cloud are presented as growing capabilities; Java/Spring backend is the core strength.
7. If a fact is uncertain, write around it rather than guessing.

### Verified facts (source of truth)

- Programmers.io, Jaipur, since Feb 2024: Java Intern → Java Trainee on live client project (Sep 2024)
  → Junior Java Developer (Sep 2025) → Java Developer (Oct 2026). ~2 years professional experience.
- Domain: enterprise insurance (prescreening, claims, e-policy delivery, eSignature, document indexing).
  Monolithic Spring Boot + JSP. No professional microservices experience — do not claim it.
- MCA, Data Science, Lovely Professional University (2023–2025, completed Aug 2025).
- BCA, Dr. Rammanohar Lohia Avadh University, Ayodhya (2020–2023); first rank in 3rd and 5th semesters.

## Placeholders still open

- `projects.js` is intentionally empty (college projects removed by the owner). Projects section, nav
  link and hero CTA are hidden until an entry is added. Candidate: Home Car Wash Service (internship /
  MCA project) — add only once the owner supplies its stack and features.
- `og:url` and Sitemap URL — set after deployment
- `VITE_WEB3FORMS_ACCESS_KEY` — empty → form hidden, setup notice shown

## Contact form contract

- Reads `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`. Missing key → render `SetupNotice`, never the form.
- Show success **only** when Web3Forms responds `res.ok && data.success`. Never simulate success.
- Keep validation, honeypot, loading, success and error states.

## Accessibility & quality checklist (before finishing any task)

- [ ] `npm run build` passes with no errors or warnings that matter
- [ ] No horizontal scroll at 360px width; layouts intentional at 360 / 768 / 1024 / 1440
- [ ] Every interactive element is keyboard reachable with a visible focus ring
- [ ] One `<h1>` (hero); each section uses `<h2>` with `aria-labelledby`
- [ ] Images have meaningful `alt`; decorative SVGs have `aria-hidden="true"`
- [ ] Touch targets ≥ 44px; text contrast passes WCAG AA
- [ ] No new heavy dependency added for decoration

## Deployment

Target: **Cloudflare Pages** (free). Build command `npm run build`, output directory `dist`, add the
env var in the dashboard. `public/404.html` is used for unknown paths. Netlify works too (`netlify.toml`).
See README for custom domain steps. Never buy a domain or create paid infrastructure.
