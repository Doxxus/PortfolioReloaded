import { z } from "zod";

import raw from "./info.json";

const slice = z.object({
  title: z.string().optional(),
  lang: z.string().optional(),
  time_slice: z.number().optional(),
  percent: z.number().optional(),
});

const infoSchema = z.object({
  about_text: z.string(),
  about_interest: z.string(),
  experiences: z.array(
    z.object({
      id: z.number(),
      start_date: z.string(),
      end_date: z.string(),
      company: z.string(),
      position: z.string(),
      current: z.boolean(),
      about: z.string(),
      duties: z.array(slice).default([]),
      technologies: z.array(slice).default([]),
    }),
  ),
  languages: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      proficiency: z.number(),
      about: z.string().optional(),
      frameworks: z.array(
        z.object({ id: z.number(), name: z.string(), url: z.string().optional() }),
      ),
    }),
  ),
  Projects: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      about: z.string(),
      github_link: z.string(),
    }),
  ),
});

const info = infoSchema.parse(raw);

export type Experience = {
  id: number;
  start: string;
  end: string | null;
  company: string;
  position: string;
  about: string;
  duties: { label: string; value: number }[];
  technologies: { label: string; value: number }[];
};

export type Language = {
  id: number;
  name: string;
  proficiency: number;
  frameworks: { id: number; name: string; url?: string }[];
};

export type ProjectOverride = {
  title: string;
  about: string;
  githubLink: string | null;
};

const toSlices = (
  items: z.infer<typeof slice>[],
  key: "time_slice" | "percent",
) =>
  items.map((s) => ({
    label: s.title ?? s.lang ?? "",
    value: s[key] ?? 0,
  }));

export const about = { text: info.about_text, interest: info.about_interest };

export const experiences: Experience[] = info.experiences.map((e) => ({
  id: e.id,
  start: e.start_date,
  end: e.current ? null : e.end_date,
  company: e.company,
  position: e.position,
  about: e.about,
  duties: toSlices(e.duties, "time_slice"),
  technologies: toSlices(e.technologies, "percent"),
}));

export const languages: Language[] = info.languages.map((l) => ({
  id: l.id,
  name: l.name,
  proficiency: l.proficiency,
  frameworks: l.frameworks,
}));

export const projectOverrides: ProjectOverride[] = info.Projects.map((p) => ({
  title: p.title,
  about: p.about,
  githubLink: p.github_link || null,
}));
