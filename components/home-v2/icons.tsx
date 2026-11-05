import { ArrowRight } from "lucide-react";

export function IconArrow() {
  return <ArrowRight size={20} strokeWidth={1.6} aria-hidden="true" />;
}

export function IconSteel() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M10 34V16l14-8 14 8v18l-14 8-14-8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M10 16l14 8 14-8M24 24v18" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconShutters() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="10" y="8" width="28" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M14 14h20M14 20h20M14 26h20M14 32h20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconCoil() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="24" rx="14" ry="16" fill="none" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="7" ry="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M24 8v32" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

export function IconArt() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M12 36l8-20 8 12 4-8 4 16H12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="14" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconGates() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 40V12h10v28M30 40V12h10v28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 18h12M18 26h12M18 34h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="26" r="1.8" fill="currentColor" />
    </svg>
  );
}

export const categoryIcons = {
  steel: IconSteel,
  shutters: IconShutters,
  pipes: IconCoil,
  art: IconArt,
  gates: IconGates,
} as const;
