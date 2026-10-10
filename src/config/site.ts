import { env } from "~/env";

export const siteConfig = {
  name: "Lachlan Campbell",
  // Placeholder – replace with the real tagline.
  tagline: "Software developer · Full-stack tinkerer",
  url: "https://folio.doxxus.ca",
  githubUser: "Doxxus",
  links: {
    github: "https://github.com/Doxxus",
    linkedin: "https://www.linkedin.com/in/lachlan-campbell-doxxus/",
    // Set NEXT_PUBLIC_RESUME_URL to the Cloudflare R2 public URL.
    resume: env.NEXT_PUBLIC_RESUME_URL,
  },
} as const;

export const sections = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "links", label: "Links" },
] as const;
