export const PROJECT_STYLES = ["rise", "chapters", "rail"] as const;
export type ProjectStyleId = (typeof PROJECT_STYLES)[number];

export function isProjectStyle(value: string | undefined): value is ProjectStyleId {
  return PROJECT_STYLES.includes(value as ProjectStyleId);
}

export function resolveProjectStyle(value: string | undefined): ProjectStyleId {
  if (isProjectStyle(value)) return value;
  return "rise";
}
