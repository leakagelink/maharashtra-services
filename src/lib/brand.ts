import logoAsset from "@/assets/quickdial-brand-logo.jpg.asset.json";
import shareAsset from "@/assets/quickdial-share.jpg.asset.json";

export const brandLogoUrl = logoAsset.url;

export const customerCare = {
  display: "+91 97557 27474",
  tel: "+919755727474",
  whatsapp: "https://wa.me/919755727474",
};

export const siteSettings: Record<string, string> = {
  hero_title: "Find trusted local services in Ahilyanagar",
  hero_subtitle: "Electricians, plumbers, AC technicians, cleaners, packers & movers and more — find local professionals near you.",
  announcement: "",
  popular_searches: "Electrician, Plumber, AC Service, Home Cleaning, Packers & Movers, Painter, Carpenter, Pest Control",
};

const digits = (v: string) => { const d = v.replace(/\D/g, ""); return d.length === 10 ? `91${d}` : d; };
const pretty = (d: string) => d.length === 12 ? `+${d.slice(0, 2)} ${d.slice(2, 7)} ${d.slice(7)}` : `+${d}`;

/** Apply DB settings in place so existing imports stay live. */
export function setSiteSettings(rows: { key: string; value: string }[] | null | undefined) {
  if (!rows) return;
  for (const r of rows) if (r.value.trim() || r.key === "announcement") siteSettings[r.key] = r.value;
  const care = siteSettings["care_phone"]; const wa = siteSettings["whatsapp_phone"] || care;
  if (care && digits(care).length >= 11) { const d = digits(care); customerCare.tel = `+${d}`; customerCare.display = pretty(d); }
  if (wa && digits(wa).length >= 11) customerCare.whatsapp = `https://wa.me/${digits(wa)}`;
}

const siteOrigin = "https://quickdialan.com";
const shareImageUrl = `${siteOrigin}${shareAsset.url}`;

export const brandShareMeta = [
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "QuickDial Ahilyanagar" },
  { property: "og:image", content: shareImageUrl },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "QuickDial Ahilyanagar logo" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: shareImageUrl },
  { name: "twitter:image:alt", content: "QuickDial Ahilyanagar logo" },
];