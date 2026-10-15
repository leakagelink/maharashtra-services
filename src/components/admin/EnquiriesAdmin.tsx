import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Phone, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Panel, iconBtn } from "./ui";

export function EnquiriesAdmin() {
  const list = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Status updated"); list.refetch();
  };
  const remove = async (id: string) => {
    if (!confirm("Ye enquiry delete karein?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Enquiry deleted"); list.refetch();
  };
  return (
    <div>
      <p className="text-sm text-muted-foreground">{list.data?.length ?? 0} enquiries</p>
      <Panel>
        {list.isLoading && <p className="p-6 text-muted-foreground">Loading…</p>}
        {list.data?.length === 0 && <p className="p-6 text-muted-foreground">Abhi koi enquiry nahi aayi.</p>}
        {list.data?.map((r) => (
          <div key={r.id} className="flex flex-wrap items-start gap-3 p-3">
            <div className="min-w-0 flex-1">
              <p className="font-bold">{r.name} <span className="rounded bg-secondary px-2 py-0.5 text-xs font-semibold">{r.kind}</span></p>
              <p className="text-sm">{r.business_name}{r.area ? ` · ${r.area}` : ""}</p>
              {r.message && <p className="mt-1 break-words text-sm text-muted-foreground">{r.message}</p>}
              <p className="mt-1 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString("en-IN")}</p>
            </div>
            <select aria-label="Status" value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="h-9 rounded-lg border bg-background px-2 text-sm font-semibold">
              {["new", "contacted", "closed"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <a href={`tel:${r.phone}`} className={`${iconBtn} text-primary`} aria-label={`Call ${r.name}`}><Phone className="h-4 w-4" /></a>
            <button aria-label="Delete enquiry" onClick={() => remove(r.id)} className={`${iconBtn} text-destructive`}><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </Panel>
    </div>
  );
}
