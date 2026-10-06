import {
  Zap, Wrench, Sparkles, Snowflake, Truck, PaintRoller, Hammer, Bug, Refrigerator, Droplets,
  Cctv, Umbrella, HardHat, Scissors, Sofa, Sun, Monitor, Smartphone, Car, PartyPopper, Camera,
  GraduationCap, Shirt, type LucideIcon,
} from "lucide-react";

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

const prefixes = ["Shri Swami Samarth", "Sai", "Om", "Ganesh", "Jai Malhar", "Royal", "Shivam", "Prime", "Siddhi", "Nagar"];
const suffixes: Record<string, string> = {
  electrician: "Electricals", plumber: "Plumbing Works", "home-cleaning": "Cleaning Services", "ac-service": "Cooling Solutions",
  "packers-movers": "Packers & Movers", painter: "Painting Contractors", carpenter: "Furniture Works", "pest-control": "Pest Control",
  "appliance-repair": "Appliance Care", "ro-service": "Aqua RO Care", "cctv-security": "Security Systems", waterproofing: "Waterproofing",
  "home-renovation": "Constructions", "beauty-at-home": "Beauty Studio", "interior-design": "Interiors", "solar-services": "Solar Energy",
  "computer-repair": "Computers", "mobile-repair": "Mobile Point", "car-bike-services": "Auto Garage", "event-wedding": "Decorators",
  photography: "Studio", "tuition-classes": "Academy", laundry: "Dry Cleaners",
};

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export const businesses: Business[] = categories.flatMap((c, ci) =>
  [0, 1, 2, 3].map((k) => {
    const s = ci * 10 + k + 1;
    const name = `${prefixes[(ci + k * 3) % prefixes.length]} ${suffixes[c.slug]}`;
    const area = areas[(ci * 3 + k * 5) % areas.length];
    return {
      slug: `${name}-${area}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name, category: c.slug, area,
      rating: Math.round((3.8 + rand(s) * 1.2) * 10) / 10,
      reviews: Math.floor(12 + rand(s + 1) * 480),
      years: Math.floor(2 + rand(s + 2) * 18),
      verified: rand(s + 3) > 0.3,
      featured: k === 0,
      openNow: rand(s + 4) > 0.25,
      homeVisit: rand(s + 5) > 0.3,
      whatsapp: rand(s + 6) > 0.15,
      phone: `98${String(Math.floor(10000000 + rand(s + 7) * 89999999))}`,
      distanceKm: Math.round((0.5 + rand(s + 8) * 9) * 10) / 10,
      priceFrom: [149, 199, 249, 299, 399, 499][Math.floor(rand(s + 9) * 6)],
      services: [c.name, ...c.keywords.map((w) => w[0].toUpperCase() + w.slice(1))],
      hours: "9:00 AM – 8:00 PM",
      about: `${name} is a trusted ${c.name.toLowerCase()} provider based in ${area}, Ahilyanagar, serving homes and businesses across the city.`,
    };
  }),
);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getBusiness = (slug: string) => businesses.find((b) => b.slug === slug);
export const countFor = (slug: string) => businesses.filter((b) => b.category === slug).length;

export function searchBusinesses(q: string, area?: string) {
  let query = q.toLowerCase().trim();
  let inArea = area;
  const m = query.match(/(.*)\s+in\s+(.+)$/);
  if (m) {
    const found = areas.find((a) => a.toLowerCase() === m[2].trim());
    if (found) { query = m[1].trim(); inArea = found; }
  }
  query = query.replace(/near me/, "").trim();
  return businesses.filter((b) => {
    if (inArea && b.area !== inArea) return false;
    if (!query) return true;
    const c = getCategory(b.category)!;
    const hay = [b.name, c.name, b.area, ...c.keywords, ...b.services].join(" ").toLowerCase();
    return query.split(/\s+/).every((w) => hay.includes(w));
  });
}

export function suggestions(q: string) {
  const t = q.toLowerCase().trim();
  if (!t) return [];
  const out = new Set<string>();
  categories.forEach((c) => {
    [c.name, ...c.keywords].forEach((w) => w.toLowerCase().includes(t) && out.add(w[0].toUpperCase() + w.slice(1)));
  });
  businesses.forEach((b) => b.name.toLowerCase().includes(t) && out.add(b.name));
  const first = [...out][0];
  if (first) areas.slice(0, 2).forEach((a) => out.add(`${first} in ${a}`));
  return [...out].slice(0, 7);
}
