type SocialItem = {
  id: string;
  label: string;
  path: string;
};

export function SocialIcons({
  label,
  items,
}: {
  label: string;
  items: SocialItem[];
}) {
  return (
    <div className="foot-social" aria-label={label}>
      {items.map((item) => (
        <span
          key={item.id}
          className="foot-social-btn"
          role="img"
          aria-label={item.label}
          title={item.label}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d={item.path} />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Placeholder marks — replace with real profile URLs later. */
export const SOCIAL_PATHS = {
  facebook: "M15.1 8.2H17V5h-2.2C11.9 5 10 6.9 10 10v2H7.5v3H10v7h3.5v-7H16l.5-3h-3v-1.6c0-.7.4-1.2 1.6-1.2z",
  instagram:
    "M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3zm0 1.7a3.1 3.1 0 0 0-3.1 3.1v8.4a3.1 3.1 0 0 0 3.1 3.1h8.4a3.1 3.1 0 0 0 3.1-3.1V7.8a3.1 3.1 0 0 0-3.1-3.1H7.8zm9.55 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3zM12 7.6A4.4 4.4 0 1 1 7.6 12 4.4 4.4 0 0 1 12 7.6zm0 1.7A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3z",
  linkedin:
    "M6.2 9H3.5v11h2.7V9zM4.85 3.5a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM20.5 20h-2.7v-5.4c0-1.4-.5-2.35-1.75-2.35-.95 0-1.5.65-1.75 1.25-.1.2-.1.5-.1.8V20H11.5s.05-9.1 0-10.4H14.2v1.55c.45-.7 1.35-1.7 3.35-1.7 2.45 0 4 1.55 4 5V20z",
  youtube:
    "M21.5 7.3a2.6 2.6 0 0 0-1.85-1.85C17.95 5 12 5 12 5s-5.95 0-7.65.45A2.6 2.6 0 0 0 2.5 7.3 27 27 0 0 0 2.1 12a27 27 0 0 0 .4 4.7 2.6 2.6 0 0 0 1.85 1.85C6.05 19 12 19 12 19s5.95 0 7.65-.45a2.6 2.6 0 0 0 1.85-1.85A27 27 0 0 0 21.9 12a27 27 0 0 0-.4-4.7zM10.2 15.1V8.9L15.4 12l-5.2 3.1z",
} as const;
