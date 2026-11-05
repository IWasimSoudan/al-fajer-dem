export const COMPARE_STYLES = ["matrix", "columns"] as const;
export type CompareStyleId = (typeof COMPARE_STYLES)[number];

export function isCompareStyle(value: string | undefined): value is CompareStyleId {
  return COMPARE_STYLES.includes(value as CompareStyleId);
}

export function resolveCompareStyle(value: string | undefined): CompareStyleId {
  if (isCompareStyle(value)) return value;
  return "matrix";
}

/** Max product columns in the face-off layout (empty slots show placeholders). */
export const COMPARE_COLUMN_SLOTS = 3;
