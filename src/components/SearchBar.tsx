import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { areas, suggestions } from "@/lib/data";

export function SearchBar({ initialQ = "", initialArea = "" }: { initialQ?: string; initialArea?: string }) {
  const [q, setQ] = useState(initialQ);
  const [area, setArea] = useState(initialArea);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const go = (query = q) => { setOpen(false); navigate({ to: "/search", search: { q: query, area: area || undefined } }); };
  const sugg = suggestions(q);
  return (
    <form onSubmit={(e) => { e.preventDefault(); go(); }} className="relative flex flex-col gap-2 rounded-2xl bg-card p-2 shadow-card md:flex-row">
      <label className="flex items-center gap-2 rounded-xl px-3 md:w-56 md:border-r">
        <MapPin className="h-5 w-5 text-brand-red" />
        <select value={area} onChange={(e) => setArea(e.target.value)} className="h-12 w-full bg-transparent text-sm font-semibold text-foreground outline-none">
          <option value="">All Ahilyanagar</option>
          {areas.map((a) => <option key={a}>{a}</option>)}
        </select>
      </label>
      <div className="relative flex flex-1 items-center gap-2 px-3">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="What service are you looking for?" className="h-12 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground" />
        {open && sugg.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-card">
            {sugg.map((s) => (
              <li key={s}><button type="button" onMouseDown={() => { setQ(s); go(s); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-muted"><Search className="h-4 w-4 text-muted-foreground" />{s}</button></li>
            ))}
          </ul>
        )}
      </div>
      <button className="h-12 rounded-xl bg-primary px-6 font-bold text-primary-foreground">Search Services</button>
    </form>
  );
}
