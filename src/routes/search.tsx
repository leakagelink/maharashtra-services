import { createFileRoute } from "@tanstack/react-router";
import { ResultsList } from "@/components/ResultsList";
import { SearchBar } from "@/components/SearchBar";
import { searchBusinesses } from "@/lib/data";
import { brandShareMeta } from "@/lib/brand";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): { q?: string | undefined; area?: string | undefined } => ({
    q: typeof s["q"] === "string" ? s["q"] : undefined,
    area: typeof s["area"] === "string" ? s["area"] : undefined,
  }),
  head: () => ({
    meta: [
      ...brandShareMeta,
      { title: "Search Local Services — QuickDial" },
      { name: "description", content: "Search businesses, services and areas across Ahilyanagar." },
      { property: "og:title", content: "Search Local Services — QuickDial" },
      { property: "og:description", content: "Search businesses, services and areas across Ahilyanagar." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "", area = "" } = Route.useSearch();
  const items = searchBusinesses(q, area || undefined);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <SearchBar key={q + area} initialQ={q} initialArea={area} />
      <h1 className="mb-4 mt-8 text-2xl font-extrabold">{q ? `Results for “${q}”` : "All businesses"}{area && ` in ${area}`}</h1>
      <ResultsList items={items} />
    </div>
  );
}
