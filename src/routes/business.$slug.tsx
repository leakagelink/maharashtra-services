import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Clock, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { waLink } from "@/components/BusinessCard";
import { getBusiness, getCategory } from "@/lib/data";

export const Route = createFileRoute("/business/$slug")({
  loader: ({ params }) => {
    const b = getBusiness(params.slug);
    if (!b) throw notFound();
    return { slug: b.slug, name: b.name, area: b.area };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.name}, ${loaderData.area} — QuickDial`;
    const d = `Contact ${loaderData.name} in ${loaderData.area}, Ahilyanagar. Call, WhatsApp, get a quote or book.`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: BusinessPage,
});

function BusinessPage() {
  const b = getBusiness(Route.useLoaderData().slug)!;
  const c = getCategory(b.category)!;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/services/$slug" params={{ slug: c.slug }} className="text-sm font-semibold text-primary">← {c.name} in Ahilyanagar</Link>
      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="flex gap-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-hero text-primary-foreground"><c.icon className="h-10 w-10" /></div>
              <div>
                <h1 className="text-2xl font-extrabold md:text-3xl">{b.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-md bg-success px-1.5 py-0.5 text-xs font-bold text-success-foreground">{b.rating}<Star className="h-3 w-3 fill-current" /></span>
                  <span>{b.reviews} reviews</span>
                  {b.verified && <span className="inline-flex items-center gap-1 font-bold text-primary"><BadgeCheck className="h-4 w-4" />Verified</span>}
                </div>
                <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{b.area}, Ahilyanagar · {b.distanceKm} km</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{b.hours} · <span className={b.openNow ? "font-semibold text-success" : "font-semibold text-brand-red"}>{b.openNow ? "Open now" : "Closed"}</span></p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <a href={`tel:+91${b.phone}`} className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-primary-foreground"><Phone className="h-5 w-5" />Call now</a>
              <a href={waLink(b)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-success py-3 font-bold text-success-foreground"><MessageCircle className="h-5 w-5" />WhatsApp</a>
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-bold">About</h2>
            <p className="mt-2 text-muted-foreground">{b.about}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {[["Experience", `${b.years} years`], ["Starting at", `₹${b.priceFrom}`], ["Home visit", b.homeVisit ? "Yes" : "No"], ["Category", c.name]].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted p-3"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-bold">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-bold">Services offered</h2>
            <div className="mt-3 flex flex-wrap gap-2">{b.services.map((s) => <span key={s} className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">{s}</span>)}</div>
          </div>
        </div>
        <aside id="enquire" className="h-fit rounded-2xl border bg-card p-6 shadow-card lg:sticky lg:top-20">
          <h2 className="mb-4 text-lg font-bold">Send a request</h2>
          <EnquiryForm b={b} />
        </aside>
      </div>
    </div>
  );
}
