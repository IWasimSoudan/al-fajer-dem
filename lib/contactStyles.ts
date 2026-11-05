export const CONTACT_STYLES = ["desk", "board", "stage"] as const;
export type ContactStyleId = (typeof CONTACT_STYLES)[number];

export function isContactStyle(value: string | undefined): value is ContactStyleId {
  return CONTACT_STYLES.includes(value as ContactStyleId);
}

export function resolveContactStyle(value: string | undefined): ContactStyleId {
  if (isContactStyle(value)) return value;
  return "desk";
}
