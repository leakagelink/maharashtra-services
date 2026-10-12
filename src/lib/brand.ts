import logoAsset from "@/assets/quickdial-brand-logo.jpg.asset.json";
import shareAsset from "@/assets/quickdial-share.jpg.asset.json";

export const brandLogoUrl = logoAsset.url;

export const customerCare = {
  display: "+91 97557 27474",
  tel: "+919755727474",
  whatsapp: "https://wa.me/919755727474",
} as const;

const shareImageUrl = `https://id-preview--d3806124-682c-4cdc-9c3c-859bb3d7960a.lovable.app${shareAsset.url}`;

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