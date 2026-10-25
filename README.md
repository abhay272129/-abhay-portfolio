# Abhay Gupta — Portfolio

Personal portfolio of Abhay Gupta, Software Engineer — live at
https://abhay-gupta.abhaygupta82764.workers.dev

Static single-page site built with
React, Vite, Tailwind CSS v4 and Motion. No backend.

## Quick start

Requires Node.js 18+ (20 LTS recommended).

```bash
npm install
cp .env.example .env.local   # optional, for the contact form
npm run dev                  # http://localhost:5173
```

```bash
npm run build     # production build → dist/
npm run preview   # check the production build locally
```

## Architecture

- **`src/data/`** holds all content. Components only render it, so text and links are edited in one place.
- **`src/sections/`** one file per page section, composed in `App.jsx`.
- **`src/components/`** reusable building blocks; `Reveal` wraps all scroll-in animation.
- **`src/styles/index.css`** design tokens (`@theme`) and custom utilities.
- The hero visual (`AbstractHeroVisual.jsx`) is pure SVG + Motion — no 3D library.

## Updating content

| What | Where |
|---|---|
| Name, intro, email, GitHub, LinkedIn | `src/data/site.js` |
| Profile photo | `public/images/profile.webp` (800px wide). To replace: add a new file in `public/images/` and update `photo` in `site.js` |
| Projects | `src/data/projects.js` — empty URL hides its button; an empty list hides the whole section |
| Project screenshots | Put files in `public/images/projects/` and set `image: '/images/projects/name.png'` |
| Skills | `src/data/skills.js` — levels: `core`, `working`, `learning` |
| Experience | `src/data/experience.js` |
| Education & learning | `src/data/education.js` |

Use 1600×1000 (16:10) screenshots, compressed as WebP or JPEG under ~250 KB.

## Contact form (Web3Forms)

1. Get a free access key at [web3forms.com](https://web3forms.com) using the email that should receive messages.
2. Locally: put it in `.env.local` as `VITE_WEB3FORMS_ACCESS_KEY=your-key`.
3. In production: add the same variable in your host's environment settings and redeploy.

Without a key, the form is hidden and a setup notice is shown. The form only reports success when
Web3Forms confirms delivery. Web3Forms access keys are designed to be public in client code, but keep
them out of Git anyway.

## Deploy (Cloudflare Workers, free)

The site is deployed as a Cloudflare Worker that only serves static files. `wrangler.jsonc` points
it at the `dist/` build output and serves `public/404.html` for unknown paths.

1. Cloudflare dashboard → Workers & Pages → Create → Import a repository → pick this repo.
2. Project name: `abhay-gupta` (must match `name` in `wrangler.jsonc`).
3. Deploy command: `npm run build && npx wrangler deploy`
   (if preview builds are enabled, preview command: `npm run build && npx wrangler versions upload`).
4. Advanced settings → add the build variable `VITE_WEB3FORMS_ACCESS_KEY` with your key, then deploy.
   The key is baked in at build time, so redeploy after changing it.
5. Leave "Protect with Cloudflare Access" off, or visitors will be asked to log in.

Every push to `main` redeploys automatically.

**Netlify** also works out of the box — `netlify.toml` is included.

### Custom domain (later)

Buy a domain from any registrar, then in Cloudflare → your Worker → Settings → Domains & Routes → add it
and follow the DNS instructions. After that, update `og:url` in `index.html`, make `og:image` an absolute
URL (`https://your-domain/og-image.png`), and update the Sitemap line in `public/robots.txt`.

The social preview image is `public/og-image.png` (1200×630), rendered from `public/og-image.svg`.
PNG is used because LinkedIn, X and Facebook don't display SVG previews.

## SEO note

This is a client-rendered React app. The title, description, Open Graph tags and a `<noscript>`
summary are in `index.html`, which search engines read directly. Google renders JavaScript, so content
is indexable, but no metadata guarantees rankings. If SEO becomes a priority, consider pre-rendering.

## Remaining placeholders

- Projects (section hidden until `projects.js` has an entry)
- Web3Forms access key
