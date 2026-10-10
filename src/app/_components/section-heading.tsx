import { Reveal } from "./reveal";

export function SectionHeading({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-10">
      <h2 id={`${id}-heading`} className="text-3xl font-bold sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
