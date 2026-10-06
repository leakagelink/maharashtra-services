import { createFileRoute, notFound } from "@tanstack/react-router";
import { ResultsList } from "@/components/ResultsList";
import { SearchBar } from "@/components/SearchBar";
import { businesses, getCategory } from "@/lib/data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const c = getCategory(params.slug);
    if (!c) throw notFound();
    return { name: c.name, slug: c.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.name} in Ahilyanagar — QuickDial`;
    const d = `Compare verified ${loaderData.name.toLowerCase()} providers in Ahilyanagar. Ratings, reviews, call and WhatsApp.`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { name, slug } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">{name} in Ahilyanagar</h1>
      <div className="my-6"><SearchBar initialQ={name} /></div>
      <ResultsList items={businesses.filter((b) => b.category === slug)} />
    </div>
  );
}
