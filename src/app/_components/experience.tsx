import { experiences } from "~/data";

import { ExperienceTimeline } from "./experience-timeline";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-5xl px-4 py-24"
    >
      <SectionHeading
        id="experience"
        title="Experience"
        subtitle="My work history, most recent first."
      />
      <ExperienceTimeline items={experiences} />
    </section>
  );
}
