import { createFileRoute } from "@tanstack/react-router";
import { ResultsList } from "@/components/ResultsList";
import { businesses } from "@/lib/data";

export const Route = createFileRoute("/businesses")({
  head: () => ({
    meta: [
      { title: "Local Businesses in Ahilyanagar — QuickDial" },
      { name: "description", content: "Browse every listed business in Ahilyanagar with ratings, reviews and direct contact." },
      { property: "og:title", content: "Local Businesses in Ahilyanagar — QuickDial" },
      { property: "og:description", content: "Browse every listed business in Ahilyanagar." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold">Businesses in Ahilyanagar</h1>
      <ResultsList items={businesses} />
    </div>
  ),
});
