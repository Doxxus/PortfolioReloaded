import { languages } from "~/data";

import { SectionHeading } from "./section-heading";
import { SkillCard } from "./skill-card";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-5xl px-4 py-24"
    >
      <SectionHeading
        id="skills"
        title="Skills"
        subtitle="Languages I work in, my self-assessed proficiency, and the frameworks I use with them."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[...languages]
          .sort((a, b) => b.proficiency - a.proficiency)
          .map((l, i) => (
            <SkillCard key={l.id} language={l} index={i} />
          ))}
      </div>
    </section>
  );
}
