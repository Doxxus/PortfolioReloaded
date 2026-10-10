import { env } from "~/env";
import { projectOverrides } from "~/data";
import { siteConfig } from "~/config/site";

export type Project = {
  title: string;
  about: string;
  url: string | null;
  language: string | null;
  stars: number | null;
};

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

const norm = (url: string) => url.toLowerCase().replace(/\/+$/, "");

async function fetchRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.githubUser}/repos?per_page=100&sort=pushed&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    return (await res.json()) as Repo[];
  } catch {
    return [];
  }
}

/**
 * Hybrid source: curated entries from info.json come first (and override the
 * GitHub description); remaining public repos follow, newest push first.
 */
export async function getProjects(): Promise<Project[]> {
  const repos = (await fetchRepos()).filter((r) => !r.fork && !r.archived);
  const byUrl = new Map(repos.map((r) => [norm(r.html_url), r]));
  const used = new Set<string>();

  const curated: Project[] = projectOverrides.map((o) => {
    const repo = o.githubLink ? byUrl.get(norm(o.githubLink)) : undefined;
    if (repo) used.add(norm(repo.html_url));
    return {
      title: o.title,
      about: o.about,
      url: o.githubLink,
      language: repo?.language ?? null,
      stars: repo?.stargazers_count ?? null,
    };
  });

  const extra: Project[] = repos
    .filter((r) => !used.has(norm(r.html_url)))
    .map((r) => ({
      title: r.name,
      about: r.description ?? "",
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
    }));

  return [...curated, ...extra];
}
