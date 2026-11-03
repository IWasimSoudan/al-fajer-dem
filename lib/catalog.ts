export const categories = [
  { id: "rolling", image: "/images/warehouse-doors.jpg" },
  { id: "gates", image: "/images/iron-fence.jpg" },
  { id: "steel", image: "/images/canopy.jpg" },
  { id: "tanks", image: "/images/tanks.jpg" },
  { id: "canopies", image: "/images/canopy.jpg" },
  { id: "doors", image: "/images/black-door.jpg" },
  { id: "facades", image: "/images/hex-panels.jpg" },
  { id: "prefab", image: "/images/warehouse-doors.jpg" },
  { id: "rails", image: "/images/stair-rail.jpg" },
  { id: "furniture", image: "/images/bar-stools.jpg" },
  { id: "home", image: "/images/hex-panels.jpg" },
  { id: "wpc", image: "/images/iron-fence.jpg" },
  { id: "metalwork", image: "/images/ornate-doors.jpg" },
  { id: "wood", image: "/images/bronze-doors.jpg" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const founded = 1969;

export const families = ["rolling", "motors", "doors"] as const;

export type FamilyId = (typeof families)[number];

export const products = [
  { id: "foam", price: 130, category: "rolling", family: "rolling", dimensions: null, rating: null, image: "/images/warehouse-doors.jpg" },
  { id: "antiwind", price: 250, category: "rolling", family: "rolling", dimensions: "width12", rating: "class4", image: "/images/warehouse-doors.jpg" },
  { id: "twisted", price: 85, category: "rolling", family: "rolling", dimensions: null, rating: null, image: "/images/black-door.jpg" },
  { id: "accordion", price: 100, category: "doors", family: "doors", dimensions: null, rating: null, image: "/images/bronze-doors.jpg" },
  { id: "sap", price: 125, category: "gates", family: "motors", dimensions: null, rating: null, image: "/images/iron-fence.jpg" },
  { id: "norton", price: 195, category: "gates", family: "motors", dimensions: null, rating: null, image: "/images/ornate-doors.jpg" },
  { id: "levante", price: 1850, category: "gates", family: "motors", dimensions: null, rating: "leaf120", image: "/images/iron-fence.jpg" },
  { id: "selector", price: 60, category: "gates", family: "motors", dimensions: null, rating: null, image: "/images/black-door.jpg" },
] as const;

export type ProductId = (typeof products)[number]["id"];

export const projects = [
  { id: "hangar", image: "/images/warehouse-doors.jpg" },
  { id: "warehouse", image: "/images/tanks.jpg" },
  { id: "civil", image: "/images/bronze-doors.jpg" },
  { id: "airport", image: "/images/canopy.jpg" },
  { id: "art", image: "/images/hex-panels.jpg" },
  { id: "gates", image: "/images/iron-fence.jpg" },
] as const;

export const gallery = [
  { id: "g1", image: "/images/tanks.jpg", filter: "warehouse" },
  { id: "g2", image: "/images/canopy.jpg", filter: "steel" },
  { id: "g3", image: "/images/warehouse-doors.jpg", filter: "shutters" },
  { id: "g4", image: "/images/black-door.jpg", filter: "shutters" },
  { id: "g5", image: "/images/hex-panels.jpg", filter: "art" },
  { id: "g6", image: "/images/ornate-doors.jpg", filter: "art" },
  { id: "g7", image: "/images/iron-fence.jpg", filter: "gates" },
  { id: "g8", image: "/images/bronze-doors.jpg", filter: "gates" },
  { id: "g9", image: "/images/stair-rail.jpg", filter: "steel" },
  { id: "g10", image: "/images/bar-stools.jpg", filter: "art" },
] as const;

export const brands = [
  "ISEA",
  "KEY Automation",
  "GfA",
  "GfA Elektromaten",
  "SAP Italy",
  "Ascot Doors",
  "Gamma Doors",
  "Masinara",
  "Gerolimatos",
  "Italo",
  "ACM",
] as const;

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
