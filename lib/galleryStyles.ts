export const GALLERY_STYLES = ["lattice", "reel", "stage"] as const;
export type GalleryStyleId = (typeof GALLERY_STYLES)[number];

export function isGalleryStyle(value: string | undefined): value is GalleryStyleId {
  return GALLERY_STYLES.includes(value as GalleryStyleId);
}

export function resolveGalleryStyle(value: string | undefined): GalleryStyleId {
  if (isGalleryStyle(value)) return value;
  return "lattice";
}
