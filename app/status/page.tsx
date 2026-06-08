import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StatusDot } from "@/components/status-dot";
import { providers } from "@/lib/providers";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Status",
  description: "Live status of all tracked AI APIs. Updated every hour.",
  alternates: { canonical: "/status" },
};

export default function StatusPage() {
  const stats = {
    online: providers.filter((p) => p.status === "online").length,
    degraded: providers.filter((p) => p.status === "degraded").length,
    down: providers.filter((p) => p.status === "down").length,
  };
  return (
    <>
      <Nav />
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-3">// Status</h1>
        <p className="text-fg-1 text-lg mb-8">Live status of all tracked APIs.</p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-bg-1 border border-line rounded-lg p-5">
            <div className="flex items-center gap-2 text-xs font-mono text-fg-2 uppercase tracking-wider mb-2"><StatusDot status="online" size="md" />Operational</div>
            <div className="font-display text-3xl font-semibold text-accent">{stats.online}</div>
          </div>
          <div className="bg-bg-1 border border-line rounded-lg p-5">
            <div className="flex items-center gap-2 text-xs font-mono text-fg-2 uppercase tracking-wider mb-2"><StatusDot status="degraded" size="md" />Degraded</div>
            <div className="font-display text-3xl font-semibold text-status-warn">{stats.degraded}</div>
          </div>
          <div className="bg-bg-1 border border-line rounded-lg p-5">
            <div className="flex items-center gap-2 text-xs font-mono text-fg-2 uppercase tracking-wider mb-2"><StatusDot status="down" size="md" />Down</div>
            <div className="font-display text-3xl font-semibold text-status-err">{stats.down}</div>
          </div>
        </div>
        <div className="bg-bg-1 border border-line rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 border-b border-line bg-bg-2 text-xs font-mono uppercase tracking-wider text-fg-2">
            <span>Provider</span><span className="w-24 text-right">Status</span><span className="w-32 text-right">Last checked</span>
          </div>
          {providers.map((p) => (
            <div key={p.slug} className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 border-b border-line last:border-b-0 items-center hover:bg-bg-2 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <StatusDot status={p.status} size="md" />
                <a href={`/providers/${p.slug}`} className="font-mono font-medium text-sm hover:text-accent transition-colors truncate">{p.name}</a>
              </div>
              <span className={`text-sm capitalize w-24 text-right ${p.status === "online" ? "text-accent" : p.status === "degraded" ? "text-status-warn" : p.status === "down" ? "text-status-err" : "text-fg-2"}`}>{p.status}</span>
              <span className="text-sm text-fg-2 w-32 text-right">{timeAgo(p.lastVerified)}</span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
