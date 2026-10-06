import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { areas, businesses } from "@/lib/data";

export const Route = createFileRoute("/areas")({
  head: () => ({
    meta: [
      { title: "Areas in Ahilyanagar — QuickDial" },
      { name: "description", content: "Find local services by neighbourhood: Savedi, Bhingar, Kedgaon, Tarakpur and more." },
      { property: "og:title", content: "Areas in Ahilyanagar — QuickDial" },
      { property: "og:description", content: "Find local services by neighbourhood in Ahilyanagar." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Browse by area</h1>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {areas.map((a) => (
          <Link key={a} to="/search" search={{ area: a }} className="flex items-center gap-3 rounded-2xl border bg-card p-4 hover:border-primary">
            <MapPin className="h-5 w-5 text-brand-red" />
            <span><span className="block font-bold">{a}</span><span className="text-xs text-muted-foreground">{businesses.filter((b) => b.area === a).length} businesses</span></span>
          </Link>
        ))}
      </div>
    </div>
  ),
});
