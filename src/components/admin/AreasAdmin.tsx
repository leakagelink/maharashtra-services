import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Field, Panel, btnOutline, btnPrimary, iconBtn, inputCls } from "./ui";

type Row = { id: string; name: string; sort_order: number };

export function AreasAdmin({ onChanged }: { onChanged: () => void }) {
  const [draft, setDraft] = useState<{ id?: string; name: string; sort_order: number } | null>(null);
  const list = useQuery({
    queryKey: ["admin-areas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("areas").select("*").order("sort_order").order("name");
      if (error) throw error;
      return data as Row[];
    },
  });
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft?.name.trim()) return;
    const payload = { name: draft.name.trim(), sort_order: Number(draft.sort_order) || 100 };
    const { error } = draft.id ? await supabase.from("areas").update(payload).eq("id", draft.id) : await supabase.from("areas").insert(payload);
    if (error) { toast.error(error.code === "23505" ? "Ye area pehle se hai" : error.message); return; }
    toast.success("Area saved"); setDraft(null); list.refetch(); onChanged();
  };
  const remove = async (r: Row) => {
    if (!confirm(`"${r.name}" delete karein?`)) return;
    const { error } = await supabase.from("areas").delete().eq("id", r.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Area deleted"); list.refetch(); onChanged();
  };
  return (
    <div>
      <button onClick={() => setDraft({ name: "", sort_order: 100 })} className={btnPrimary}><Plus className="h-4 w-4" />Add area</button>
      {draft && (
        <form onSubmit={save} className="mt-4 grid gap-3 rounded-2xl border bg-card p-5 md:grid-cols-2">
          <Field label="Area name"><input required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputCls} /></Field>
          <Field label="Order"><input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} className={inputCls} /></Field>
          <div className="flex gap-2 md:col-span-2"><button className={btnPrimary}>Save</button><button type="button" onClick={() => setDraft(null)} className={btnOutline}>Cancel</button></div>
        </form>
      )}
      <Panel>
        {list.data?.map((r) => (
          <div key={r.id} className="flex items-center gap-3 p-3">
            <p className="min-w-0 flex-1 font-bold">{r.name}</p>
            <button aria-label={`Edit ${r.name}`} onClick={() => setDraft(r)} className={iconBtn}><Pencil className="h-4 w-4" /></button>
            <button aria-label={`Delete ${r.name}`} onClick={() => remove(r)} className={`${iconBtn} text-destructive`}><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </Panel>
    </div>
  );
}
