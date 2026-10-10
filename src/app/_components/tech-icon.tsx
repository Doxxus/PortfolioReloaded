"use client";

import { useState } from "react";

import { iconUrl } from "~/lib/icons";

export function TechIcon({ name, size = 24 }: { name: string; size?: number }) {
  const url = iconUrl(name);
  const [failed, setFailed] = useState(!url);

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
      style={{ width: size + 12, height: size + 12 }}
    >
      {failed || !url ? (
        <span className="text-xs font-bold text-gray-500">
          {name.charAt(0).toUpperCase()}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
