import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Phone, ShieldCheck, Zap } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { BusinessCard } from "@/components/BusinessCard";
import { businesses, categories, countFor } from "@/lib/data";
import { brandShareMeta, siteSettings } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...brandShareMeta,
      { title: "QuickDial — Find Trusted Local Services in Ahilyanagar" },
      { name: "description", content: "Electricians, plumbers, AC technicians, cleaners, packers & movers and more in Ahilyanagar. Call, WhatsApp or enquire in seconds." },
      { property: "og:title", content: "QuickDial — Find Trusted Local Services in Ahilyanagar" },
      { property: "og:description", content: "Search, compare and contact local professionals across Ahilyanagar." },
    ],
  }),
  component: Index,
});


function Index() {
  const popular = (siteSettings["popular_searches"] ?? "").split(",").map((x) => x.trim()).filter(Boolean);
  const featured = businesses.filter((b) => b.featured && b.verified).slice(0, 6);
  return (
    <>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:pb-16 sm:pt-12 md:pb-24 md:pt-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />Ahilyanagar · Maharashtra
          </p>
          <h1 className="max-w-3xl break-words text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl">
            {siteSettings["hero_title"]}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-primary-foreground/80 sm:mt-4 sm:text-lg">
            {siteSettings["hero_subtitle"]}
          </p>
          <div className="mt-5 max-w-4xl text-foreground sm:mt-8"><SearchBar /></div>
          <div className="mt-5 flex flex-wrap gap-2">
            {popular.map((p) => (
              <Link key={p} to="/search" search={{ q: p }} className="rounded-full border border-primary-foreground/25 px-3 py-1.5 text-sm font-semibold hover:bg-primary-foreground/10">{p}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto mt-4 grid max-w-7xl grid-cols-1 gap-3 px-4 sm:-mt-8 sm:grid-cols-3">
        {[{ i: BadgeCheck, t: "Local businesses", d: "Listed across Ahilyanagar" }, { i: Phone, t: "Direct contact", d: "Call or WhatsApp — no middlemen" }, { i: ShieldCheck, t: "Free to use", d: "No fees for customers" }].map((x) => (
          <div key={x.t} className="flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-card">
            <x.i className="h-8 w-8 shrink-0 text-brand-red" /><div className="min-w-0"><p className="font-bold">{x.t}</p><p className="text-sm text-muted-foreground">{x.d}</p></div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14">
        <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:mb-6">
          <h2 className="min-w-0 text-xl font-extrabold sm:text-2xl md:text-3xl">Popular service categories</h2>
          <Link to="/services" className="shrink-0 py-3 text-sm font-bold text-primary">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {categories.slice(0, 12).map((c) => (
            <Link key={c.slug} to="/services/$slug" params={{ slug: c.slug }} className="group flex min-w-0 flex-col items-center gap-2 rounded-lg border bg-card px-3 py-4 text-center transition hover:-translate-y-0.5 hover:border-primary hover:shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground"><c.icon className="h-6 w-6" /></span>
              <span className="min-h-10 w-full break-words text-sm font-bold leading-5">{c.name}</span>
              <span className="text-xs text-muted-foreground">{countFor(c.slug)} businesses</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14">
        <h2 className="mb-6 text-2xl font-extrabold md:text-3xl">Popular in Ahilyanagar</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["electrician", "plumber", "ac-service", "home-cleaning", "packers-movers", "carpenter"].map((s) => {
            const c = categories.find((x) => x.slug === s);
            if (!c) return null;
            return (
              <Link key={s} to="/services/$slug" params={{ slug: s }} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border bg-card p-4 sm:p-5 hover:border-primary">
                <div className="min-w-0"><p className="font-bold">{c.name} in Ahilyanagar</p><p className="text-sm text-muted-foreground">{countFor(s)} trusted providers</p></div>
                <c.icon className="h-8 w-8 shrink-0 text-brand-orange" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14">
        <h2 className="mb-6 text-2xl font-extrabold md:text-3xl">Featured businesses</h2>
        {featured.length === 0
          ? <p className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">Businesses are being added. Own a business? <a href="/list-your-business" className="font-bold text-primary">List it free</a>.</p>
          : <div className="grid gap-3 lg:grid-cols-2">{featured.map((b) => <BusinessCard key={b.slug} b={b} />)}</div>}
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-accent-gradient p-5 text-primary-foreground sm:p-8 md:flex-row md:items-center">
          <div className="min-w-0"><p className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-xl font-extrabold sm:text-2xl"><Zap className="h-6 w-6 shrink-0" />Own a business in Ahilyanagar?</p>
            <p className="mt-1 text-primary-foreground/90">Get listed free and start receiving customer calls and enquiries.</p></div>
          <Link to="/list-your-business" className="rounded-xl bg-card px-6 py-3 font-bold text-primary">List your business</Link>
        </div>
      </section>
    </>
  );
}
