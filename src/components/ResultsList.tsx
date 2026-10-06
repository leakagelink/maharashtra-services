import { useMemo, useState } from "react";
import { BusinessCard } from "./BusinessCard";
import type { Business } from "@/lib/data";

const sorts = { relevance: "Relevance", rating: "Rating", distance: "Distance" } as const;
const filters = { verified: "Verified", openNow: "Open now", whatsapp: "WhatsApp", homeVisit: "Home visit" } as const;

export function ResultsList({ items }: { items: Business[] }) {
  const [sort, setSort] = useState<keyof typeof sorts>("relevance");
  const [on, setOn] = useState<Record<string, boolean>>({});
  const list = useMemo(() => {
    let r = items.filter((b) => Object.entries(on).every(([k, v]) => !v || b[k as keyof typeof filters]));
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    else if (sort === "distance") r = [...r].sort((a, b) => a.distanceKm - b.distanceKm);
    else r = [...r].sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    return r;
  }, [items, on, sort]);
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {Object.entries(filters).map(([k, l]) => (
          <button key={k} onClick={() => setOn({ ...on, [k]: !on[k] })}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${on[k] ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>{l}</button>
        ))}
        <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} className="ml-auto h-9 rounded-full border bg-card px-3 text-sm font-semibold">
          {Object.entries(sorts).map(([k, l]) => <option key={k} value={k}>Sort: {l}</option>)}
        </select>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{list.length} results</p>
      <div className="space-y-3">{list.map((b) => <BusinessCard key={b.slug} b={b} />)}</div>
      {list.length === 0 && <p className="rounded-2xl border bg-card p-8 text-center text-muted-foreground">No businesses match. Try removing a filter or a different search.</p>}
    </div>
  );
}
