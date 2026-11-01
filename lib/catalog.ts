export const categories = [
  { id: "rolling", image: "/images/shutter.jpg" },
  { id: "gates", image: "/images/gate.jpg" },
  { id: "steel", image: "/images/steel.jpg" },
  { id: "tanks", image: "/images/hall.jpg" },
  { id: "canopies", image: "/images/airport.jpg" },
  { id: "doors", image: "/images/gate.jpg" },
  { id: "facades", image: "/images/steel.jpg" },
  { id: "prefab", image: "/images/hall.jpg" },
  { id: "rails", image: "/images/warehouse.jpg" },
  { id: "furniture", image: "/images/laser.jpg" },
  { id: "home", image: "/images/laser.jpg" },
  { id: "wpc", image: "/images/warehouse.jpg" },
  { id: "metalwork", image: "/images/hero.jpg" },
  { id: "wood", image: "/images/hall.jpg" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const products = [
  { id: "foam", price: 130, category: "rolling", image: "/images/shutter.jpg" },
  { id: "antiwind", price: 250, category: "rolling", image: "/images/hall.jpg" },
  { id: "twisted", price: 85, category: "rolling", image: "/images/laser.jpg" },
  { id: "accordion", price: 100, category: "doors", image: "/images/gate.jpg" },
  { id: "sap", price: 125, category: "gates", image: "/images/gate.jpg" },
  { id: "norton", price: 195, category: "gates", image: "/images/hero.jpg" },
  { id: "levante", price: 1850, category: "gates", image: "/images/steel.jpg" },
  { id: "selector", price: 60, category: "gates", image: "/images/laser.jpg" },
] as const;

export type ProductId = (typeof products)[number]["id"];

export const projects = [
  { id: "hangar", image: "/images/hall.jpg" },
  { id: "warehouse", image: "/images/warehouse.jpg" },
  { id: "civil", image: "/images/shutter.jpg" },
  { id: "airport", image: "/images/airport.jpg" },
  { id: "art", image: "/images/laser.jpg" },
  { id: "gates", image: "/images/gate.jpg" },
] as const;

export const gallery = [
  { id: "g1", image: "/images/hero.jpg", filter: "steel" },
  { id: "g2", image: "/images/steel.jpg", filter: "steel" },
  { id: "g3", image: "/images/shutter.jpg", filter: "shutters" },
  { id: "g4", image: "/images/hall.jpg", filter: "shutters" },
  { id: "g5", image: "/images/laser.jpg", filter: "art" },
  { id: "g6", image: "/images/warehouse.jpg", filter: "warehouse" },
  { id: "g7", image: "/images/gate.jpg", filter: "gates" },
  { id: "g8", image: "/images/airport.jpg", filter: "steel" },
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
