export function asset(path: string) {
  const base = process.env.__NEXT_BASE_PATH || "";
  if (!path.startsWith("/") || (base && path.startsWith(`${base}/`))) return path;
  return `${base}${path}`;
}
