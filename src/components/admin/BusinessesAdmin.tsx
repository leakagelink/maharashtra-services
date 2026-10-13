import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Check, Field, Panel, btnOutline, btnPrimary, iconBtn, inputCls, slugify } from "./ui";

type Row = {
  id: string; slug: string; name: string; category: string; area: string; phone: string; rating: number; reviews: number;
  years: number; verified: boolean; featured: boolean; open_now: boolean; home_visit: boolean; whatsapp: boolean;
  distance_km: number; price_from: number; services: string[]; hours: string; about: string;
};
type Draft = Omit<Row, "id" | "services"> & { id?: string; services: string };
const empty: Draft = {
  slug: "", name: "", category: "", area: "", phone: "", rating: 4.5, reviews: 0, years: 1, verified: false, featured: false,
  open_now: true, home_visit: false, whatsapp: true, distance_km: 1, price_from: 0, services: "", hours: "9:00 AM – 8:00 PM", about: "",
};

export function BusinessesAdmin({ onChanged }: { onChanged: () => void }) {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [q, setQ] = useState("");
  const list = useQuery({
    queryKey: ["admin-businesses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("businesses").select("*").order("name");
      if (error) throw error;
      return data as unknown as Row[];
    },
  });
  const opts = useQuery({
    queryKey: ["admin-opts"],
    queryFn: async () => {
      const [c, a] = await Promise.all([
        supabase.from("categories").select("slug,name").order("name"),
        supabase.from("areas").select("name").order("sort_order").order("name"),
      ]);
      return { cats: c.data ?? [], areas: (a.data ?? []).map((r) => r.name) };
    },
  });
  const rows = useMemo(() => {
    const t = q.toLowerCase();
    return (list.data ?? []).filter((r) => !t || [r.name, r.category, r.area, r.phone].join(" ").toLowerCase().includes(t));
  }, [list.data, q]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => (d ? { ...d, [k]: v } : d));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    const { id, ...rest } = draft;
    const payload = {
      ...rest, name: rest.name.trim(), slug: slugify(rest.slug || `${rest.name}-${rest.area}`),
      services: rest.services.split(",").map((s) => s.trim()).filter(Boolean),
      rating: Number(rest.rating), reviews: Number(rest.reviews), years: Number(rest.years),
      distance_km: Number(rest.distance_km), price_from: Number(rest.price_from),
    };
    if (!payload.name || !payload.category || !payload.area) { toast.error("Name, category aur area zaroori hai"); return; }
    const { error } = id ? await supabase.from("businesses").update(payload).eq("id", id) : await supabase.from("businesses").insert(payload);
    if (error) { toast.error(error.code === "23505" ? "Ye slug pehle se hai" : error.message); return; }
    toast.success(id ? "Business updated" : "Business added");
    setDraft(null); list.refetch(); onChanged();
  };
  const remove = async (r: Row) => {
    if (!confirm(`"${r.name}" delete karein?`)) return;
    const { error } = await supabase.from("businesses").delete().eq("id", r.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Business deleted"); list.refetch(); onChanged();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search businesses…" className="h-10 min-w-0 flex-1 rounded-lg border bg-background px-3" />
        <button onClick={() => setDraft({ ...empty })} className={btnPrimary}><Plus className="h-4 w-4" />Add business</button>
      </div>
      {draft && (
        <form onSubmit={save} className="mt-4 grid gap-3 rounded-2xl border bg-card p-5 shadow-card md:grid-cols-2">
          <Field label="Name"><input required value={draft.name} onChange={(e) => set("name", e.target.value)} className={inputCls} /></Field>
          <Field label="Slug (URL)"><input value={draft.slug} placeholder={slugify(`${draft.name}-${draft.area}`)} onChange={(e) => set("slug", e.target.value)} className={inputCls} /></Field>
          <Field label="Category">
            <select required value={draft.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
              <option value="">Select…</option>{opts.data?.cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Area">
            <select required value={draft.area} onChange={(e) => set("area", e.target.value)} className={inputCls}>
              <option value="">Select…</option>{opts.data?.areas.map((a) => <option key={a}>{a}</option>)}
            </select>
          </Field>
          <Field label="Phone"><input value={draft.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} /></Field>
          <Field label="Hours"><input value={draft.hours} onChange={(e) => set("hours", e.target.value)} className={inputCls} /></Field>
          <Field label="Rating (0-5)"><input type="number" step="0.1" min="0" max="5" value={draft.rating} onChange={(e) => set("rating", Number(e.target.value))} className={inputCls} /></Field>
          <Field label="Reviews"><input type="number" value={draft.reviews} onChange={(e) => set("reviews", Number(e.target.value))} className={inputCls} /></Field>
          <Field label="Years in business"><input type="number" value={draft.years} onChange={(e) => set("years", Number(e.target.value))} className={inputCls} /></Field>
          <Field label="Price from (₹)"><input type="number" value={draft.price_from} onChange={(e) => set("price_from", Number(e.target.value))} className={inputCls} /></Field>
          <Field label="Distance (km)"><input type="number" step="0.1" value={draft.distance_km} onChange={(e) => set("distance_km", Number(e.target.value))} className={inputCls} /></Field>
          <Field label="Services (comma se alag)"><input value={draft.services} onChange={(e) => set("services", e.target.value)} className={inputCls} /></Field>
          <Field label="About" wide><textarea value={draft.about} onChange={(e) => set("about", e.target.value)} rows={3} className="mt-1 w-full rounded-lg border bg-background p-3 font-normal" /></Field>
          <div className="flex flex-wrap gap-4 md:col-span-2">
            <Check label="Verified" checked={draft.verified} onChange={(v) => set("verified", v)} />
            <Check label="Featured" checked={draft.featured} onChange={(v) => set("featured", v)} />
            <Check label="Open now" checked={draft.open_now} onChange={(v) => set("open_now", v)} />
            <Check label="Home visit" checked={draft.home_visit} onChange={(v) => set("home_visit", v)} />
            <Check label="WhatsApp" checked={draft.whatsapp} onChange={(v) => set("whatsapp", v)} />
          </div>
          <div className="flex gap-2 md:col-span-2">
            <button className={btnPrimary}>Save</button>
            <button type="button" onClick={() => setDraft(null)} className={btnOutline}>Cancel</button>
          </div>
        </form>
      )}
      <p className="mt-3 text-sm text-muted-foreground">{rows.length} businesses</p>
      <Panel>
        {list.isLoading && <p className="p-6 text-muted-foreground">Loading…</p>}
        {rows.map((r) => (
          <div key={r.id} className="flex items-center gap-3 p-3">
            <div className="min-w-0 flex-1">
              <p className="font-bold">{r.name} {r.verified && <span className="text-xs text-success">✓ verified</span>}</p>
              <p className="truncate text-xs text-muted-foreground">{r.category} · {r.area} · {r.phone}</p>
            </div>
            <button aria-label={`Edit ${r.name}`} onClick={() => setDraft({ ...r, services: r.services.join(", ") })} className={iconBtn}><Pencil className="h-4 w-4" /></button>
            <button aria-label={`Delete ${r.name}`} onClick={() => remove(r)} className={`${iconBtn} text-destructive`}><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </Panel>
    </div>
  );
}
