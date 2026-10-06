import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Phone, ShieldCheck, Zap } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { BusinessCard } from "@/components/BusinessCard";
import { businesses, categories, countFor } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuickDial — Find Trusted Local Services in Ahilyanagar" },
      { name: "description", content: "Electricians, plumbers, AC technicians, cleaners, packers & movers and more in Ahilyanagar. Call, WhatsApp or enquire in seconds." },
      { property: "og:title", content: "QuickDial — Find Trusted Local Services in Ahilyanagar" },
      { property: "og:description", content: "Search, compare and contact local professionals across Ahilyanagar." },
    ],
  }),
  component: Index,
});

const popular = ["Electrician", "Plumber", "AC Service", "Home Cleaning", "Packers & Movers", "Painter", "Carpenter", "Pest Control"];

function Index() {
  const featured = businesses.filter((b) => b.featured && b.verified).slice(0, 6);
  return (
    <>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 md:pb-24 md:pt-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />Ahilyanagar · Maharashtra
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Find trusted local services in <span className="text-brand-orange">Ahilyanagar</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Electricians, plumbers, AC technicians, cleaners, packers & movers and more — find local professionals near you.
          </p>
          <div className="mt-8 max-w-4xl text-foreground"><SearchBar /></div>
          <div className="mt-5 flex flex-wrap gap-2">
            {popular.map((p) => (
              <Link key={p} to="/search" search={{ q: p }} className="rounded-full border border-primary-foreground/25 px-3 py-1.5 text-sm font-semibold hover:bg-primary-foreground/10">{p}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 grid max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-3">
        {[{ i: BadgeCheck, t: "Verified businesses", d: "Profiles checked by our team" }, { i: Phone, t: "Direct contact", d: "Call or WhatsApp — no middlemen" }, { i: ShieldCheck, t: "Real reviews", d: "From customers in your city" }].map((x) => (
          <div key={x.t} className="flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-card">
            <x.i className="h-8 w-8 text-brand-red" /><div><p className="font-bold">{x.t}</p><p className="text-sm text-muted-foreground">{x.d}</p></div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold md:text-3xl">Popular service categories</h2>
          <Link to="/services" className="text-sm font-bold text-primary">View all →</Link>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {categories.slice(0, 12).map((c) => (
            <Link key={c.slug} to="/services/$slug" params={{ slug: c.slug }} className="group flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 text-center transition hover:-translate-y-0.5 hover:border-primary hover:shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground"><c.icon className="h-6 w-6" /></span>
              <span className="text-sm font-bold leading-tight">{c.name}</span>
              <span className="text-xs text-muted-foreground">{countFor(c.slug)} businesses</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14">
        <h2 className="mb-6 text-2xl font-extrabold md:text-3xl">Popular in Ahilyanagar</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["electrician", "plumber", "ac-service", "home-cleaning", "packers-movers", "carpenter"].map((s) => {
            const c = categories.find((x) => x.slug === s)!;
            return (
              <Link key={s} to="/services/$slug" params={{ slug: s }} className="flex items-center justify-between rounded-2xl border bg-card p-5 hover:border-primary">
                <div><p className="font-bold">{c.name} in Ahilyanagar</p><p className="text-sm text-muted-foreground">{countFor(s)} trusted providers</p></div>
                <c.icon className="h-8 w-8 text-brand-orange" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14">
        <h2 className="mb-6 text-2xl font-extrabold md:text-3xl">Featured businesses</h2>
        <div className="grid gap-3 lg:grid-cols-2">{featured.map((b) => <BusinessCard key={b.slug} b={b} />)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-accent-gradient p-8 text-primary-foreground md:flex-row md:items-center">
          <div><p className="flex items-center gap-2 text-2xl font-extrabold"><Zap className="h-6 w-6" />Own a business in Ahilyanagar?</p>
            <p className="mt-1 text-primary-foreground/90">Get listed free and start receiving customer calls and enquiries.</p></div>
          <Link to="/list-your-business" className="rounded-xl bg-card px-6 py-3 font-bold text-primary">List your business</Link>
        </div>
      </section>
    </>
  );
}
