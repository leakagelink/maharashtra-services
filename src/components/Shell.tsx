import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, MessageSquare, Phone, Search, Store } from "lucide-react";
import type { ReactNode } from "react";
import { brandLogoUrl, customerCare, siteSettings } from "@/lib/brand";


export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label="QuickDial Ahilyanagar home">
      <img src={brandLogoUrl} alt="QuickDial Ahilyanagar" width={1065} height={630} className="h-12 w-auto object-contain" />
    </Link>
  );
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/businesses", label: "Businesses" },
  { to: "/areas", label: "Areas" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell min-h-dvh">
      <header className="app-header sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
        {siteSettings["announcement"]?.trim() && (
          <p className="bg-primary px-4 py-1.5 text-center text-xs font-bold text-primary-foreground">{siteSettings["announcement"]}</p>
        )}
        <div className="border-b bg-secondary/60">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-1.5 text-xs font-semibold">
            <p className="min-w-0 text-muted-foreground">Need help finding the right professional?</p>
            <div className="flex min-w-0 items-center gap-4">
              <a href={`tel:${customerCare.tel}`} className="inline-flex min-h-8 items-center gap-1.5 font-bold text-primary"><Phone className="h-3.5 w-3.5 shrink-0" />Customer care {customerCare.display}</a>
              <a href={customerCare.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 font-bold text-success">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 md:flex md:justify-between md:gap-4">

          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-primary" }}>{n.label}</Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link to="/search" className="hidden rounded-lg p-2 text-muted-foreground hover:bg-muted md:block" aria-label="Search"><Search className="h-5 w-5" /></Link>
            <Link to="/list-your-business" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent-gradient px-3 py-2 text-xs font-bold text-primary-foreground sm:px-4 sm:text-sm"><Store className="h-4 w-4 shrink-0" /><span>List Your Business</span></Link>
          </div>
        </div>
      </header>
      <main className="min-w-0">{children}</main>
      <footer className="mt-16 border-t bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
          <div className="space-y-3"><Logo /><p className="text-sm text-muted-foreground">Find Local Services. Call. Connect. Trusted professionals across Ahilyanagar (Ahmednagar), Maharashtra.</p>
            <p className="text-sm font-semibold">Customer care</p>
            <div className="flex flex-wrap gap-2">
              <a href={`tel:${customerCare.tel}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-bold text-primary"><Phone className="h-4 w-4 shrink-0" />{customerCare.display}</a>
              <a href={customerCare.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-success px-3 py-2 text-sm font-bold text-success">WhatsApp</a>
            </div>
          </div>

          <div><h4 className="mb-3 font-bold">Explore</h4><ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services">All services</Link></li><li><Link to="/businesses">Businesses</Link></li><li><Link to="/areas">Areas</Link></li></ul></div>
          <div><h4 className="mb-3 font-bold">For businesses</h4><ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/list-your-business">List your business — free</Link></li><li><Link to="/admin">Admin panel</Link></li></ul></div>
          <div><h4 className="mb-3 font-bold">Popular</h4><ul className="space-y-2 text-sm text-muted-foreground">
            {["electrician", "plumber", "ac-service", "packers-movers"].map((s) => (
              <li key={s}><Link to="/services/$slug" params={{ slug: s }} className="capitalize">{s.replace("-", " ")} in Ahilyanagar</Link></li>))}</ul></div>
        </div>
        <p className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} QuickDial · Ahilyanagar · Customer care <a href={`tel:${customerCare.tel}`} className="font-bold text-primary">{customerCare.display}</a></p>
      </footer>
      <nav aria-label="Mobile navigation" className="app-bottom-nav fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-card md:hidden">
        {[
          { to: "/", icon: Home, label: "Home" },
          { to: "/services", icon: LayoutGrid, label: "Categories" },
          { to: "/search", icon: Search, label: "Search" },
          { to: "/businesses", icon: MessageSquare, label: "Browse" },
          { to: "/list-your-business", icon: Store, label: "List" },
        ].map((n) => (
          <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
            className="flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 py-2 text-[11px] font-semibold text-muted-foreground"
            activeProps={{ className: "text-primary" }}>
            <n.icon className="h-5 w-5" />{n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
