import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { areas, suggestions } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function SearchBar({ initialQ = "", initialArea = "" }: { initialQ?: string; initialArea?: string }) {
  const [q, setQ] = useState(initialQ);
  const [area, setArea] = useState(initialArea);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const go = (query = q) => { setOpen(false); navigate({ to: "/search", search: { q: query, area: area || undefined } }); };
  const sugg = suggestions(q);
  return (
    <form onSubmit={(e) => { e.preventDefault(); go(); }} className="relative grid min-w-0 grid-cols-1 gap-2 rounded-2xl bg-card p-2 shadow-card md:grid-cols-[14rem_minmax(0,1fr)_auto]">
      <label className="flex min-w-0 items-center gap-2 rounded-xl border-b px-3 md:border-b-0 md:border-r">
        <MapPin className="h-5 w-5 shrink-0 text-brand-red" />
        <select aria-label="Area" value={area} onChange={(e) => setArea(e.target.value)} className="h-12 min-w-0 w-full bg-transparent text-base font-semibold text-foreground outline-none md:text-sm">
          <option value="">All Ahilyanagar</option>
          {areas.map((a) => <option key={a}>{a}</option>)}
        </select>
      </label>
      <div className="relative flex min-w-0 items-center gap-2 px-3">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input aria-label="Search services" value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search for a service" className="h-12 min-w-0 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground" />
        {open && sugg.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-card">
            {sugg.map((s) => (
              <li key={s}><Button variant="ghost" type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { setQ(s); go(s); }} className="h-auto min-h-11 w-full justify-start whitespace-normal rounded-none px-4 py-2.5 text-left"><Search className="h-4 w-4 text-muted-foreground" />{s}</Button></li>
            ))}
          </ul>
        )}
      </div>
      <Button type="submit" className="h-12 rounded-xl px-6 font-bold">Search Services</Button>
    </form>
  );
}
