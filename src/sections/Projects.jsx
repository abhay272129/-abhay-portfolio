import { projects } from '../data/projects.js';
import { sectionNumber } from '../data/site.js';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          index={sectionNumber('projects')}
          label="Projects"
          title="Selected work."
          intro="Personal projects that trace my path from Java fundamentals to full-stack and frontend applications."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} large={p.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}
