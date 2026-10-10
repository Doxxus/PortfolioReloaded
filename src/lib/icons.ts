const slugs: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  css: "css3",
  html: "html5",
  sql: "microsoftsqlserver",
  "t-sql": "microsoftsqlserver",
  "azure sql": "azure",
  "c#": "csharp",
  "c++": "cplusplus",
  c: "c",
  python: "python",
  r: "r",
  java: "java",
  php: "php",
  tex: "latex",
  latex: "latex",
  "node.js": "nodejs",
  "express.js": "express",
  jquery: "jquery",
  svelte: "svelte",
  react: "react",
  vite: "vitejs",
  vercel: "vercel",
  "three.js": "threejs",
  "es lint": "eslint",
  tailwind: "tailwindcss",
  sass: "sass",
  postcss: "postcss",
  bootstrap: "bootstrap",
  ".net framework": "dotnetcore",
  ".net core": "dotnetcore",
  qt: "qt",
  numpy: "numpy",
  tensorflow: "tensorflow",
  pandas: "pandas",
  spring: "spring",
  "android studio": "androidstudio",
  plotly: "plotly",
};

export function iconUrl(name: string): string | null {
  const slug = slugs[name.toLowerCase()];
  return slug
    ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`
    : null;
}
