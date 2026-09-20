"use client";

import { useId } from "react";

export type CatVariant = "tuxedo" | "orange" | "black" | "tabby" | "tortoiseshell";

export const CAT_VARIANTS: CatVariant[] = [
  "tuxedo",
  "orange",
  "black",
  "tabby",
  "tortoiseshell",
];

export function randomCatVariant(): CatVariant {
  return CAT_VARIANTS[Math.floor(Math.random() * CAT_VARIANTS.length)];
}

const EAR_FILL: Record<CatVariant, [string, string]> = {
  tuxedo: ["#1a1a1a", "#1a1a1a"],
  orange: ["#c9711f", "#c9711f"],
  black: ["#1a1a1a", "#1a1a1a"],
  tabby: ["#8a6a3f", "#8a6a3f"],
  tortoiseshell: ["#2b2320", "#c9711f"],
};

export default function CatIcon({
  variant,
  className,
}: {
  variant: CatVariant;
  className?: string;
}) {
  const clipId = `cat-clip-${useId()}`;
  const [earL, earR] = EAR_FILL[variant];

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable="false">
      <defs>
        <clipPath id={clipId}>
          <circle cx="20" cy="23" r="14" />
        </clipPath>
      </defs>

      <path d="M8 14 L4 3 L17 10 Z" fill={earL} />
      <path d="M32 14 L36 3 L23 10 Z" fill={earR} />

      <g clipPath={`url(#${clipId})`}>
        {variant === "tuxedo" && (
          <>
            <rect x="4" y="7" width="32" height="32" fill="#1a1a1a" />
            <path d="M17 27 L23 27 L25.5 37 L14.5 37 Z" fill="#ffffff" />
          </>
        )}
        {variant === "orange" && (
          <>
            <rect x="4" y="7" width="32" height="32" fill="#e2984a" />
            <path d="M13 10 Q16 14 13 18" stroke="#b5651d" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M27 10 Q24 14 27 18" stroke="#b5651d" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </>
        )}
        {variant === "black" && <rect x="4" y="7" width="32" height="32" fill="#262626" />}
        {variant === "tabby" && (
          <>
            <rect x="4" y="7" width="32" height="32" fill="#d9b98a" />
            <path d="M13 9 Q16 14 13 19" stroke="#6b4a2b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M27 9 Q24 14 27 19" stroke="#6b4a2b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M17 6 L20 10 L23 6" stroke="#6b4a2b" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {variant === "tortoiseshell" && (
          <>
            <rect x="4" y="7" width="16" height="32" fill="#2b2320" />
            <rect x="20" y="7" width="16" height="32" fill="#c9711f" />
          </>
        )}
      </g>

      <ellipse cx="15" cy="23" rx="2.4" ry="3" fill={variant === "black" ? "#d5ec8a" : "#1a1a1a"} />
      <ellipse cx="25" cy="23" rx="2.4" ry="3" fill={variant === "black" ? "#d5ec8a" : "#1a1a1a"} />

      <path d="M18 29 L22 29 L20 32 Z" fill="#d98c8c" />
    </svg>
  );
}
