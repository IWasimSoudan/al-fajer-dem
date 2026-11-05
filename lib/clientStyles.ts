export const CLIENT_STYLES = ["mosaic", "deck"] as const;
export type ClientStyleId = (typeof CLIENT_STYLES)[number];

export function isClientStyle(value: string | undefined): value is ClientStyleId {
  return CLIENT_STYLES.includes(value as ClientStyleId);
}

export function resolveClientStyle(value: string | undefined): ClientStyleId {
  if (isClientStyle(value)) return value;
  return "mosaic";
}
