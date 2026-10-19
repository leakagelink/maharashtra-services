import {
  Zap, Wrench, Sparkles, Snowflake, Truck, PaintRoller, Hammer, Bug, Refrigerator, Droplets,
  Cctv, Umbrella, HardHat, Scissors, Sofa, Sun, Monitor, Smartphone, Car, PartyPopper, Camera,
  GraduationCap, Shirt, Plane, Hotel, UtensilsCrossed, Cog, Stethoscope, Hospital, Pill, FlaskConical,
  Building2, CarFront, Dumbbell, Scale, Calculator, Ruler, PawPrint, Store, type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Zap, Wrench, Sparkles, Snowflake, Truck, PaintRoller, Hammer, Bug, Refrigerator, Droplets, Cctv, Umbrella,
  HardHat, Scissors, Sofa, Sun, Monitor, Smartphone, Car, PartyPopper, Camera, GraduationCap, Shirt, Plane,
  Hotel, UtensilsCrossed, Cog, Stethoscope, Hospital, Pill, FlaskConical, Building2, CarFront, Dumbbell,
  Scale, Calculator, Ruler, PawPrint, Store,
};
export const iconNames = Object.keys(iconMap);
export type CategoryRow = { slug: string; name: string; icon: string; keywords: string[] };

export type Category = { slug: string; name: string; icon: LucideIcon; keywords: string[] };

export const categories: Category[] = [
  { slug: "electrician", name: "Electrician", icon: Zap, keywords: ["wiring", "switch", "fan", "inverter"] },
  { slug: "plumber", name: "Plumber", icon: Wrench, keywords: ["tap", "leak", "pipe", "bathroom"] },
  { slug: "home-cleaning", name: "Home Cleaning", icon: Sparkles, keywords: ["cleaning", "deep clean", "sofa"] },
  { slug: "ac-service", name: "AC Service & Repair", icon: Snowflake, keywords: ["ac repair", "ac installation", "ac gas filling"] },
  { slug: "packers-movers", name: "Packers & Movers", icon: Truck, keywords: ["shifting", "relocation", "transport"] },
  { slug: "painter", name: "Painter", icon: PaintRoller, keywords: ["painting", "wall", "texture"] },
  { slug: "carpenter", name: "Carpenter", icon: Hammer, keywords: ["furniture", "door", "wood"] },
  { slug: "pest-control", name: "Pest Control", icon: Bug, keywords: ["termite", "cockroach", "mosquito"] },
  { slug: "appliance-repair", name: "Appliance Repair", icon: Refrigerator, keywords: ["fridge", "washing machine", "microwave"] },
  { slug: "ro-service", name: "RO Service", icon: Droplets, keywords: ["water purifier", "ro repair"] },
  { slug: "cctv-security", name: "CCTV & Security", icon: Cctv, keywords: ["camera", "security", "intercom"] },
  { slug: "waterproofing", name: "Waterproofing", icon: Umbrella, keywords: ["leakage", "terrace"] },
  { slug: "home-renovation", name: "Home Renovation", icon: HardHat, keywords: ["construction", "tiles", "civil"] },
  { slug: "beauty-at-home", name: "Beauty at Home", icon: Scissors, keywords: ["salon", "parlour", "makeup"] },
  { slug: "interior-design", name: "Interior Design", icon: Sofa, keywords: ["modular kitchen", "interior"] },
  { slug: "solar-services", name: "Solar Services", icon: Sun, keywords: ["solar panel", "rooftop"] },
  { slug: "computer-repair", name: "Computer Repair", icon: Monitor, keywords: ["laptop", "pc"] },
  { slug: "mobile-repair", name: "Mobile Repair", icon: Smartphone, keywords: ["screen", "battery"] },
  { slug: "car-bike-services", name: "Car/Bike Services", icon: Car, keywords: ["garage", "mechanic", "car wash"] },
  { slug: "event-wedding", name: "Event & Wedding Services", icon: PartyPopper, keywords: ["decorator", "caterer", "mandap"] },
  { slug: "photography", name: "Photography", icon: Camera, keywords: ["photographer", "wedding shoot"] },
  { slug: "tuition-classes", name: "Tuition & Classes", icon: GraduationCap, keywords: ["coaching", "teacher"] },
  { slug: "laundry", name: "Laundry & Dry Cleaning", icon: Shirt, keywords: ["dry clean", "ironing"] },
];

export const areas = [
  "Savedi", "Bhingar", "Kedgaon", "Burudgaon Road", "Tarakpur", "Maliwada", "Pipeline Road",
  "Nagar-Manmad Road", "MIDC", "Station Road", "Professor Colony", "Gulmohar Road", "Bolhegaon", "Nalegaon",
];

export type Business = {
  slug: string; name: string; category: string; area: string; rating: number; reviews: number;
  years: number; verified: boolean; featured: boolean; openNow: boolean; homeVisit: boolean;
  whatsapp: boolean; phone: string; distanceKm: number; priceFrom: number; services: string[];
  hours: string; about: string;
};

/** Real listings only — loaded from the database (admin panel). Never generate placeholder businesses. */
export const businesses: Business[] = [];

/** Replace the live category list (in place) with rows managed from the admin panel. */
export function setCategoryList(rows: CategoryRow[] | null | undefined) {
  if (!rows || rows.length === 0) return;
  categories.splice(0, categories.length, ...rows.map((r) => ({ slug: r.slug, name: r.name, icon: iconMap[r.icon] ?? Store, keywords: r.keywords ?? [] })));
}

export const getCategory = (slug: string): Category | undefined => categories.find((c) => c.slug === slug);
const fallbackCategory = (slug: string): Category => ({ slug, name: slug.replace(/-/g, " "), icon: Store, keywords: [] });
export const categoryOf = (slug: string): Category => getCategory(slug) ?? fallbackCategory(slug);
export const getBusiness = (slug: string) => businesses.find((b) => b.slug === slug);
export const countFor = (slug: string) => businesses.filter((b) => b.category === slug).length;

export function searchBusinesses(q: string, area?: string) {
  let query = q.toLowerCase().trim();
  let inArea = area;
  const m = query.match(/(.*)\s+in\s+(.+)$/);
  if (m) {
    const found = areas.find((a) => a.toLowerCase() === m[2]!.trim());
    if (found) { query = m[1]!.trim(); inArea = found; }
  }
  query = query.replace(/near me/, "").trim();
  return businesses.filter((b) => {
    if (inArea && b.area !== inArea) return false;
    if (!query) return true;
    const c = categoryOf(b.category);
    const hay = [b.name, c.name, b.area, ...c.keywords, ...b.services].join(" ").toLowerCase();
    return query.split(/\s+/).every((w) => hay.includes(w));
  });
}

export function suggestions(q: string) {
  const t = q.toLowerCase().trim();
  if (!t) return [];
  const out = new Set<string>();
  categories.forEach((c) => {
    [c.name, ...c.keywords].forEach((w) => w.toLowerCase().includes(t) && out.add(w[0]!.toUpperCase() + w.slice(1)));
  });
  businesses.forEach((b) => b.name.toLowerCase().includes(t) && out.add(b.name));
  const first = [...out][0];
  if (first) areas.slice(0, 2).forEach((a) => out.add(`${first} in ${a}`));
  return [...out].slice(0, 7);
}

export type BusinessRow = {
  slug: string; name: string; category: string; area: string; phone: string; rating: number; reviews: number;
  years: number; verified: boolean; featured: boolean; open_now: boolean; home_visit: boolean; whatsapp: boolean;
  distance_km: number; price_from: number; services: string[]; hours: string; about: string;
};
export const rowToBusiness = (r: BusinessRow): Business => ({
  slug: r.slug, name: r.name, category: r.category, area: r.area, phone: r.phone, rating: Number(r.rating),
  reviews: r.reviews, years: r.years, verified: r.verified, featured: r.featured, openNow: r.open_now,
  homeVisit: r.home_visit, whatsapp: r.whatsapp, distanceKm: Number(r.distance_km), priceFrom: r.price_from,
  services: r.services ?? [], hours: r.hours, about: r.about,
});
/** Replace live business list (in place) with rows managed from the admin panel. */
export function setBusinessList(rows: BusinessRow[] | null | undefined) {
  if (!rows) return;
  businesses.splice(0, businesses.length, ...rows.map(rowToBusiness));
}
export function setAreaList(rows: string[] | null | undefined) {
  if (!rows || rows.length === 0) return;
  areas.splice(0, areas.length, ...rows);
}
