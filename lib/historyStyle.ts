export const HISTORY_STYLES = ["spine", "rail", "chapters"] as const;
export type HistoryStyleId = (typeof HISTORY_STYLES)[number];

export function isHistoryStyle(value: string | undefined): value is HistoryStyleId {
  return HISTORY_STYLES.includes(value as HistoryStyleId);
}

export function resolveHistoryStyle(value: string | undefined): HistoryStyleId {
  if (isHistoryStyle(value)) return value;
  return "spine";
}
