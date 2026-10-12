import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { iconMap, iconNames } from "@/lib/data";
import { brandShareMeta } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      ...brandShareMeta,
      { title: "Admin — Manage Categories — QuickDial" },
      { name: "description", content: "Add, edit and delete service categories on QuickDial." },
      { property: "og:title", content: "Admin — QuickDial" },
      { property: "og:description", content: "Manage QuickDial service categories." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Row = { id: string; slug: string; name: string; icon: string; keywords: string[]; sort_order: number };
type Draft = { id?: string; name: string; slug: string; icon: string; keywords: string; sort_order: number };
const empty: Draft = { name: "", slug: "", icon: "Wrench", keywords: "", sort_order: 100 };
const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function AdminPage() {
  const qc = useQueryClient();
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);

  const isAdmin = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user!.id).eq("role", "admin");
      return (data?.length ?? 0) > 0;
    },
  });
  const list = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("sort_order").order("name");
      if (error) throw error;
      return data as Row[];
    },
  });

  const refresh = async () => { await qc.invalidateQueries({ queryKey: ["admin-categories"] }); await router.invalidate(); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    const payload = {
      name: draft.name.trim(), slug: slugify(draft.slug || draft.name), icon: draft.icon,
      keywords: draft.keywords.split(",").map((k) => k.trim()).filter(Boolean), sort_order: Number(draft.sort_order) || 100,
    };
    if (!payload.name || !payload.slug) { toast.error("Name zaroori hai"); return; }
    const { error } = draft.id
      ? await supabase.from("categories").update(payload).eq("id", draft.id)
      : await supabase.from("categories").insert(payload);
    if (error) { toast.error(error.code === "23505" ? "Ye slug pehle se hai" : error.message); return; }
    toast.success(draft.id ? "Category updated" : "Category added");
    setDraft(null);
    refresh();
  };

  const remove = async (r: Row) => {
    if (!confirm(`"${r.name}" delete karein?`)) return;
    const { error } = await supabase.from("categories").delete().eq("id", r.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Category deleted");
    refresh();
  };

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
        <h1 className="text-3xl font-extrabold">Manage categories</h1>
        <div className="flex gap-2">
          <button onClick={() => setDraft({ ...empty })} className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground"><Plus className="h-4 w-4" />Add category</button>
          <button onClick={() => supabase.auth.signOut()} className="rounded-xl border px-4 py-2 font-semibold">Sign out</button>
        </div>
      </div>

      {draft && (
        <form onSubmit={save} className="mt-6 grid gap-3 rounded-2xl border bg-card p-5 shadow-card md:grid-cols-2">
          <label className="text-sm font-semibold">Name<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 font-normal" required /></label>
          <label className="text-sm font-semibold">Slug (URL)<input value={draft.slug} placeholder={slugify(draft.name)} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 font-normal" /></label>
          <label className="text-sm font-semibold">Icon
            <select value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 font-normal">
              {iconNames.map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">Order<input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 font-normal" /></label>
          <label className="text-sm font-semibold md:col-span-2">Search keywords (comma se alag)<input value={draft.keywords} onChange={(e) => setDraft({ ...draft, keywords: e.target.value })} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 font-normal" /></label>
          <div className="flex gap-2 md:col-span-2">
            <button className="rounded-xl bg-primary px-5 py-2 font-bold text-primary-foreground">Save</button>
            <button type="button" onClick={() => setDraft(null)} className="rounded-xl border px-5 py-2 font-semibold">Cancel</button>
          </div>
        </form>
      )}

      <div className="mt-6 divide-y rounded-2xl border bg-card">
        {list.isLoading && <p className="p-6 text-muted-foreground">Loading…</p>}
        {list.data?.map((r) => {
          const Icon = iconMap[r.icon] ?? iconMap["Store"]!;
          return (
            <div key={r.id} className="flex items-center gap-3 p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
              <div className="min-w-0 flex-1"><p className="font-bold">{r.name}</p><p className="truncate text-xs text-muted-foreground">/{r.slug} · {r.keywords.join(", ")}</p></div>
              <button aria-label={`Edit ${r.name}`} onClick={() => setDraft({ id: r.id, name: r.name, slug: r.slug, icon: r.icon, keywords: r.keywords.join(", "), sort_order: r.sort_order })} className="rounded-lg p-2 hover:bg-muted"><Pencil className="h-4 w-4" /></button>
              <button aria-label={`Delete ${r.name}`} onClick={() => remove(r)} className="rounded-lg p-2 text-destructive hover:bg-muted"><Trash2 className="h-4 w-4" /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
