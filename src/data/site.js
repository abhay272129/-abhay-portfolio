import { projects } from './projects.js';

// Single source of truth for personal details and links.
// Set a value to an empty string ('') to hide the related link or element.

export const site = {
  name: 'Abhay Gupta',
  title: 'Software Engineer',
  role: 'Java Developer',
  company: 'Programmers.io India Pvt. Ltd.',
  location: 'Jaipur, India',

  headline: ['Engineering ideas', 'into reliable software.'],
  intro:
    "I'm Abhay Gupta, a Software Engineer focused on building reliable backend systems and thoughtful digital experiences, with interests spanning Java, modern web development, and cloud technologies.",

  // Profile links. Empty string hides the link.
  email: 'abhaygupta82764@gmail.com',
  github: 'https://github.com/abhay272129',
  linkedin: 'https://www.linkedin.com/in/abhay-gupta-ss/',

  // Profile photo in public/images/. Empty string shows the monogram fallback.
  photo: '/images/profile.webp',
  photoAlt: 'Portrait of Abhay Gupta',
};

export const hasProjects = projects.length > 0;

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  hasProjects && { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
].filter(Boolean);

// Page sections in order; drives the "01, 02…" numbering so it stays continuous when Projects is hidden.
const sectionOrder = ['about', 'experience', 'expertise', hasProjects && 'projects', 'education', 'contact'].filter(Boolean);
export const sectionNumber = (id) => String(sectionOrder.indexOf(id) + 1).padStart(2, '0');
