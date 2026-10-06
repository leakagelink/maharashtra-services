import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, countFor } from "@/lib/data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "All Services in Ahilyanagar — QuickDial" },
      { name: "description", content: "Browse 23 local service categories in Ahilyanagar, from electricians to photographers." },
      { property: "og:title", content: "All Services in Ahilyanagar — QuickDial" },
      { property: "og:description", content: "Browse every local service category on QuickDial." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">All services</h1>
      <p className="mt-1 text-muted-foreground">Pick a category to see local providers in Ahilyanagar.</p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.slug} to="/services/$slug" params={{ slug: c.slug }} className="flex items-center gap-3 rounded-2xl border bg-card p-4 hover:border-primary hover:shadow-card">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><c.icon className="h-5 w-5" /></span>
            <span><span className="block text-sm font-bold">{c.name}</span><span className="text-xs text-muted-foreground">{countFor(c.slug)} businesses</span></span>
          </Link>
        ))}
      </div>
    </div>
  ),
});
