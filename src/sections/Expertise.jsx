import { skillGroups, levelLabels } from '../data/skills.js';
import { sectionNumber } from '../data/site.js';
import SectionHeading from '../components/SectionHeading.jsx';
import SkillGroup from '../components/SkillGroup.jsx';

export default function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="expertise-title"
          index={sectionNumber('expertise')}
          label="Expertise"
          title="A backend core, with a growing range."
          intro="Java and Spring are where I work every day. Frontend and cloud are capabilities I'm actively building on."
        />

        <div className="mb-6 flex flex-wrap gap-5 font-mono text-[11px] text-fg-subtle" aria-hidden="true">
          <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-accent" />{levelLabels.core}</span>
          <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-fg-muted" />{levelLabels.working}</span>
          <span className="flex items-center gap-2"><span className="size-1.5 rounded-full border border-fg-subtle" />{levelLabels.learning}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((g, i) => (
            <SkillGroup key={g.id} group={g} delay={0.05 * i} />
          ))}
        </div>
      </div>
    </section>
  );
}
