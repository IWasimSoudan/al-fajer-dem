export function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`hv2-skel ${className}`.trim()} aria-hidden="true" />;
}
