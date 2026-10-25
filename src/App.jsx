import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Experience from './sections/Experience.jsx';
import Expertise from './sections/Expertise.jsx';
import Projects from './sections/Projects.jsx';
import Education from './sections/Education.jsx';
import Contact from './sections/Contact.jsx';
import { hasProjects } from './data/site.js';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-ink-900"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Expertise />
        {hasProjects && <Projects />}
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
