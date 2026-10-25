import { experience } from '../data/experience.js';
import { sectionNumber } from '../data/site.js';
import SectionHeading from '../components/SectionHeading.jsx';
import ExperienceTimeline from '../components/ExperienceTimeline.jsx';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index={sectionNumber('experience')}
          label="Experience"
          title="Building and maintaining enterprise systems."
          intro="Two years in an engineering team serving an enterprise insurance client — from internship to developer."
        />
        <ExperienceTimeline items={experience} />
      </div>
    </section>
  );
}
