import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Panel } from "./ui";

export function ActivityAdmin() {
  const list = useQuery({
    queryKey: ["admin-activity"],
    queryFn: async () => {
      const { data, error } = await supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(200);
      if (error) throw error;
      return data;
    },
  });
  return (
    <div>
      <p className="text-sm text-muted-foreground">Admin ne kab kya badla (aakhri 200 badlav).</p>
      <Panel>
        {list.data?.length === 0 && <p className="p-6 text-muted-foreground">Abhi koi activity nahi.</p>}
        {list.data?.map((r) => (
          <div key={r.id} className="p-3 text-sm">
            <p><span className="font-bold capitalize">{r.action}</span> · {r.entity.replace("_", " ")} · <span className="font-semibold">{r.label}</span></p>
            <p className="text-xs text-muted-foreground">{r.user_email ?? "admin"} · {new Date(r.created_at).toLocaleString("en-IN")}</p>
          </div>
        ))}
      </Panel>
    </div>
  );
}
