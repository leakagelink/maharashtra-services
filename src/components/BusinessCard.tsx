import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { categoryOf, type Business } from "@/lib/data";

export const waLink = (b: Business) =>
  `https://wa.me/91${b.phone}?text=${encodeURIComponent(`Hi ${b.name}, I found you on QuickDial and need ${categoryOf(b.category).name}.`)}`;

export function BusinessCard({ b }: { b: Business }) {
  const c = categoryOf(b.category);
  const Icon = c.icon;
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 shadow-card sm:flex-row">
      <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-9 w-9" /></div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/business/$slug" params={{ slug: b.slug }} className="text-lg font-bold hover:text-primary">{b.name}</Link>
          {b.verified && <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-primary"><BadgeCheck className="h-3.5 w-3.5" />Verified</span>}
          {b.featured && <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">Featured</span>}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {b.reviews > 0 && <><span className="inline-flex items-center gap-1 rounded-md bg-success px-1.5 py-0.5 text-xs font-bold text-success-foreground">{b.rating}<Star className="h-3 w-3 fill-current" /></span><span>{b.reviews} reviews</span></>}
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{b.area} · {b.distanceKm} km</span>
          <span className={b.openNow ? "text-success font-semibold" : "text-brand-red font-semibold"}>{b.openNow ? "Open now" : "Closed"}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{c.name} · {b.years} yrs experience · from ₹{b.priceFrom}{b.homeVisit && " · Home visit"}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:justify-center">
        <a href={`tel:+91${b.phone}`} className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground"><Phone className="h-4 w-4 shrink-0" />Call</a>
        {b.whatsapp && <a href={waLink(b)} target="_blank" rel="noreferrer" className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl border border-success px-3 py-2.5 text-sm font-bold text-success"><MessageCircle className="h-4 w-4 shrink-0" />WhatsApp</a>}
        <Link to="/business/$slug" params={{ slug: b.slug }} hash="enquire" className={`flex min-h-11 items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-bold ${b.whatsapp ? "col-span-2" : ""}`}>Enquire</Link>
      </div>
    </div>
  );
}
