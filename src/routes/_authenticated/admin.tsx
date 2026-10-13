import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { brandShareMeta } from "@/lib/brand";
import { CategoriesAdmin } from "@/components/admin/CategoriesAdmin";
import { BusinessesAdmin } from "@/components/admin/BusinessesAdmin";
import { AreasAdmin } from "@/components/admin/AreasAdmin";
import { EnquiriesAdmin } from "@/components/admin/EnquiriesAdmin";
import { UsersAdmin } from "@/components/admin/UsersAdmin";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      ...brandShareMeta,
      { title: "Admin Panel — QuickDial" },
      { name: "description", content: "Manage categories, businesses, areas, enquiries and users on QuickDial." },
      { property: "og:title", content: "Admin Panel — QuickDial" },
      { property: "og:description", content: "Manage everything on QuickDial Ahilyanagar." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const tabs = ["Dashboard", "Businesses", "Categories", "Areas", "Enquiries", "Users"] as const;
type Tab = (typeof tabs)[number];

function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Dashboard");
  const onChanged = () => { router.invalidate(); };

  const isAdmin = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user!.id).eq("role", "admin");
      return (data?.length ?? 0) > 0;
    },
  });
  const stats = useQuery({
    queryKey: ["admin-stats", tab],
    enabled: !!isAdmin.data,
    queryFn: async () => {
      const c = (t: "businesses" | "categories" | "areas" | "enquiries") => supabase.from(t).select("*", { count: "exact", head: true }).then((r) => r.count ?? 0);
      const [b, ca, a, e] = await Promise.all([c("businesses"), c("categories"), c("areas"), c("enquiries")]);
      return { Businesses: b, Categories: ca, Areas: a, Enquiries: e };
    },
  });

  if (isAdmin.isLoading) return <p className="p-10 text-center text-muted-foreground">Loading…</p>;
  if (!isAdmin.data) return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-extrabold">Access nahi hai</h1>
      <p className="mt-2 text-muted-foreground">Ye account admin nahi hai.</p>
      <button onClick={() => supabase.auth.signOut()} className="mt-4 rounded-xl border px-4 py-2 font-semibold">Sign out</button>
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold">Admin panel</h1>
        <button onClick={() => supabase.auth.signOut()} className="rounded-xl border px-4 py-2 font-semibold">Sign out</button>
      </div>
      <nav className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold ${tab === t ? "bg-primary text-primary-foreground" : "border bg-card"}`}>{t}</button>
        ))}
      </nav>
      <div className="mt-6">
        {tab === "Dashboard" && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Object.entries(stats.data ?? {}).map(([k, v]) => (
              <button key={k} onClick={() => setTab(k as Tab)} className="rounded-2xl border bg-card p-5 text-left hover:border-primary">
                <p className="text-3xl font-extrabold">{v}</p><p className="text-sm text-muted-foreground">{k}</p>
              </button>
            ))}
          </div>
        )}
        {tab === "Businesses" && <BusinessesAdmin onChanged={onChanged} />}
        {tab === "Categories" && <CategoriesAdmin onChanged={onChanged} />}
        {tab === "Areas" && <AreasAdmin onChanged={onChanged} />}
        {tab === "Enquiries" && <EnquiriesAdmin />}
        {tab === "Users" && <UsersAdmin />}
      </div>
    </div>
  );
}
