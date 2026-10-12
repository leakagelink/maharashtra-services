import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, countFor } from "@/lib/data";
import { brandShareMeta } from "@/lib/brand";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      ...brandShareMeta,
      { title: "All Services in Ahilyanagar — QuickDial" },
      { name: "description", content: "Browse local service categories in Ahilyanagar, from electricians to photographers." },
      { property: "og:title", content: "All Services in Ahilyanagar — QuickDial" },
      { property: "og:description", content: "Browse every local service category on QuickDial." },
    ],
  }),
  component: () => (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:py-10">
      <h1 className="text-2xl font-extrabold sm:text-3xl">All services</h1>
      <p className="mt-1 text-muted-foreground">Pick a category to see local providers in Ahilyanagar.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.slug} to="/services/$slug" params={{ slug: c.slug }} className="flex min-w-0 flex-col items-center gap-3 rounded-lg border bg-card px-3 py-4 text-center hover:border-primary hover:shadow-card sm:flex-row sm:p-4 sm:text-left">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><c.icon className="h-5 w-5" /></span>
            <span className="min-w-0 w-full sm:w-auto"><span className="block min-h-10 break-words text-sm font-bold leading-5 sm:min-h-0">{c.name}</span><span className="text-xs text-muted-foreground">{countFor(c.slug)} businesses</span></span>
          </Link>
        ))}
      </div>
    </div>
  ),
});
