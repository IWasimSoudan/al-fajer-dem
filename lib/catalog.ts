export const productTree = [
  {
    id: "metalwork",
    image: "/images/ornate-doors.jpg",
    children: [
      { id: "pivot", image: "/images/black-door.jpg" },
      { id: "laser", image: "/images/hex-panels.jpg" },
      { id: "artSteel", image: "/images/hex-panels.jpg" },
      { id: "handRail", image: "/images/stair-rail.jpg" },
      { id: "canopies", image: "/images/canopy.jpg" },
    ],
  },
  {
    id: "rolling",
    image: "/images/warehouse-doors.jpg",
    children: [
      { id: "fireRated", image: "/images/warehouse-doors.jpg" },
      { id: "perforated", image: "/images/warehouse-doors.jpg" },
      { id: "aluminum", image: "/images/black-door.jpg" },
      { id: "polycarbonate", image: "/images/warehouse-doors.jpg" },
      { id: "castIron", image: "/images/ornate-doors.jpg" },
    ],
  },
  {
    id: "steel",
    image: "/images/canopy.jpg",
    children: [
      { id: "hangars", image: "/images/warehouse-doors.jpg" },
      { id: "metalStairs", image: "/images/stair-rail.jpg" },
      { id: "metalBuildings", image: "/images/canopy.jpg" },
      { id: "awnings", image: "/images/canopy.jpg" },
    ],
  },
  {
    id: "facades",
    image: "/images/hex-panels.jpg",
    children: [
      { id: "buildingFacades", image: "/images/hex-panels.jpg" },
      { id: "hplGates", image: "/images/iron-fence.jpg" },
      { id: "dividers", image: "/images/hex-panels.jpg" },
    ],
  },
  {
    id: "wpc",
    image: "/images/iron-fence.jpg",
    children: [{ id: "deckingFencing", image: "/images/iron-fence.jpg" }],
  },
  {
    id: "tanks",
    image: "/images/tanks.jpg",
    children: [
      { id: "tanksOnly", image: "/images/tanks.jpg" },
      { id: "silos", image: "/images/tanks.jpg" },
    ],
  },
  {
    id: "home",
    image: "/images/bar-stools.jpg",
    children: [
      { id: "tables", image: "/images/bar-stools.jpg" },
      { id: "decorations", image: "/images/hex-panels.jpg" },
      { id: "chairs", image: "/images/bar-stools.jpg" },
      { id: "shelves", image: "/images/hex-panels.jpg" },
    ],
  },
  {
    id: "prefab",
    image: "/images/warehouse-doors.jpg",
    children: [
      { id: "prefabUnit", image: "/images/warehouse-doors.jpg" },
      { id: "sandwich", image: "/images/warehouse-doors.jpg" },
      { id: "caravan", image: "/images/canopy.jpg" },
    ],
  },
  {
    id: "gates",
    image: "/images/iron-fence.jpg",
    children: [
      { id: "rollMotor", image: "/images/warehouse-doors.jpg" },
      { id: "slidingMotor", image: "/images/iron-fence.jpg" },
      { id: "swingMotor", image: "/images/iron-fence.jpg" },
      { id: "barriers", image: "/images/iron-fence.jpg" },
      { id: "chainDrive", image: "/images/ornate-doors.jpg" },
      { id: "accessories", image: "/images/black-door.jpg" },
    ],
  },
  {
    id: "others",
    image: "/images/bronze-doors.jpg",
    children: [] as const,
  },
] as const;

export type CategoryId = (typeof productTree)[number]["id"];
export type SubtypeId = (typeof productTree)[number]["children"][number]["id"];

export const categories = productTree.map(({ id, image }) => ({ id, image }));

export const founded = 1969;

export const families = ["rolling", "motors", "doors"] as const;

export type FamilyId = (typeof families)[number];

export const products = [
  {
    id: "foam",
    price: 130,
    category: "rolling" as const,
    family: "rolling" as const,
    dimensions: null,
    rating: null,
    image: "/images/warehouse-doors.jpg",
    images: ["/images/warehouse-doors.jpg", "/images/black-door.jpg", "/images/canopy.jpg"],
  },
  {
    id: "antiwind",
    price: 250,
    category: "rolling" as const,
    family: "rolling" as const,
    dimensions: "width12" as const,
    rating: "class4" as const,
    image: "/images/warehouse-doors.jpg",
    images: ["/images/warehouse-doors.jpg", "/images/tanks.jpg"],
  },
  {
    id: "twisted",
    price: 85,
    category: "rolling" as const,
    family: "rolling" as const,
    dimensions: null,
    rating: null,
    image: "/images/black-door.jpg",
    images: ["/images/black-door.jpg", "/images/bronze-doors.jpg", "/images/ornate-doors.jpg"],
  },
  {
    id: "accordion",
    price: 100,
    category: "metalwork" as const,
    family: "doors" as const,
    dimensions: null,
    rating: null,
    image: "/images/bronze-doors.jpg",
    images: ["/images/bronze-doors.jpg", "/images/ornate-doors.jpg"],
  },
  {
    id: "sap",
    price: 125,
    category: "gates" as const,
    family: "motors" as const,
    dimensions: null,
    rating: null,
    image: "/images/iron-fence.jpg",
    images: ["/images/iron-fence.jpg", "/images/stair-rail.jpg"],
  },
  {
    id: "norton",
    price: 195,
    category: "gates" as const,
    family: "motors" as const,
    dimensions: null,
    rating: null,
    image: "/images/ornate-doors.jpg",
    images: ["/images/ornate-doors.jpg", "/images/bronze-doors.jpg", "/images/iron-fence.jpg"],
  },
  {
    id: "levante",
    price: 1850,
    category: "gates" as const,
    family: "motors" as const,
    dimensions: null,
    rating: "leaf120" as const,
    image: "/images/iron-fence.jpg",
    images: ["/images/iron-fence.jpg", "/images/canopy.jpg"],
  },
  {
    id: "selector",
    price: 60,
    category: "gates" as const,
    family: "motors" as const,
    dimensions: null,
    rating: null,
    image: "/images/black-door.jpg",
    images: ["/images/black-door.jpg", "/images/ornate-doors.jpg", "/images/iron-fence.jpg", "/images/bronze-doors.jpg"],
  },
] as const;

export type ProductId = (typeof products)[number]["id"];

export const projects = [
  { id: "hangar", code: "P1", image: "/images/warehouse-doors.jpg" },
  { id: "warehouse", code: "P2", image: "/images/tanks.jpg" },
  { id: "civil", code: "P3", image: "/images/bronze-doors.jpg" },
  { id: "airport", code: "P4", image: "/images/canopy.jpg" },
  { id: "art", code: "P5", image: "/images/hex-panels.jpg" },
  { id: "gates", code: "P6", image: "/images/iron-fence.jpg" },
] as const;

export const gallery = [
  { id: "g1", image: "/images/tanks.jpg", filter: "nfw" as const },
  { id: "g2", image: "/images/canopy.jpg", filter: "nfw" as const },
  { id: "g3", image: "/images/warehouse-doors.jpg", filter: "nfw" as const },
  { id: "g4", image: "/images/black-door.jpg", filter: "nfw" as const },
  { id: "g5", image: "/images/hex-panels.jpg", filter: "events" as const },
  { id: "g6", image: "/images/ornate-doors.jpg", filter: "events" as const },
  { id: "g7", image: "/images/iron-fence.jpg", filter: "exhibitions" as const },
  { id: "g8", image: "/images/bronze-doors.jpg", filter: "exhibitions" as const },
  { id: "g9", image: "/images/stair-rail.jpg", filter: "nfw" as const },
  { id: "g10", image: "/images/bar-stools.jpg", filter: "events" as const },
] as const;

export const galleryFilters = ["all", "events", "exhibitions", "nfw"] as const;

export type GalleryFilter = (typeof galleryFilters)[number];

export const featuredBrands = ["Norton", "KEY Automation", "GfA"] as const;

export const brands = [
  "Norton",
  "KEY Automation",
  "GfA",
  "GfA Elektromaten",
  "ISEA",
  "SAP Italy",
  "Ascot Doors",
  "Gamma Doors",
  "Masinara",
  "Gerolimatos",
  "Italo",
  "ACM",
] as const;

export const certificates = [
  { id: "ul1", image: "/images/stair-rail.jpg" },
  { id: "ul2", image: "/images/canopy.jpg" },
  { id: "iso9001", image: "/images/warehouse-doors.jpg" },
] as const;

export type CertificateId = (typeof certificates)[number]["id"];

export const clients = [
  { id: "c1", image: "/images/warehouse-doors.jpg" },
  { id: "c2", image: "/images/tanks.jpg" },
  { id: "c3", image: "/images/canopy.jpg" },
  { id: "c4", image: "/images/iron-fence.jpg" },
  { id: "c5", image: "/images/bronze-doors.jpg" },
] as const;

export type ClientId = (typeof clients)[number]["id"];

export const expertise = [
  "steel",
  "shutters",
  "art",
  "warehouse",
  "gates",
  "military",
  "airport",
  "antiwind",
] as const;

export function productById(id: string) {
  return products.find((item) => item.id === id);
}
