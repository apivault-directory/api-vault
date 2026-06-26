import Link from "next/link";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";

const cols = [
  {
    title: "Browse",
    links: [
      { label: "All providers", href: "/providers" },
      { label: "Collections", href: "/collections" },
      { label: "Alternatives", href: "/alternatives" },
      { label: "Status page", href: "/status" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Guides", href: "/guides" },
      { label: "Methodology", href: "/methodology" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Contribute",
    links: [
      { label: "Submit an API", href: "/submit" },
      { label: "Methodology", href: "/methodology" },
    ],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line mt-20 py-12 px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-4">
            <Logo />
          </Link>
          <p className="text-fg-2 text-[13px] max-w-[320px] leading-relaxed mb-6">
            The developer directory of free AI APIs. Curated &amp; ranked transparently.
          </p>
          <div className="space-y-2">
            <div className="font-mono text-[11px] text-fg-2 uppercase tracking-wider">
              Get the weekly digest
            </div>
            <NewsletterForm variant="compact" />
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="font-mono text-xs uppercase tracking-wider text-fg-2 mb-4">
              {col.title}
            </h4>
            <ul className="list-none space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-fg-1 text-sm hover:text-accent transition-colors"
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Token / CA */}
      <div className="max-w-[1280px] mx-auto mt-10 pt-6 border-t border-line">
        <a
          href="https://kickstart.easya.io/token/TNvdFyzgXmw1mb2rYhjWuXTxFoZucssDUkn5bEkEASY"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-bg-1 border border-line rounded-lg px-4 py-3 hover:border-[rgba(0,255,136,0.3)] transition-colors"
        >
          <span className="font-mono text-[10px] text-fg-2 uppercase tracking-wider shrink-0">
            $API · Contract
          </span>
          <code className="font-mono text-[11px] sm:text-xs text-fg-1 group-hover:text-accent transition-colors break-all">
            TNvdFyzgXmw1mb2rYhjWuXTxFoZucssDUkn5bEkEASY
          </code>
        </a>
      </div>

      <div className="max-w-[1280px] mx-auto mt-6 pt-6 border-t border-line flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[12px] text-fg-2 font-mono">
        <span>© {currentYear} APIVault — made for developers</span>
        <div className="flex items-center gap-4">
          <a href="https://x.com/apivault" target="_blank" rel="noopener noreferrer" className="hover:text-fg-0 transition-colors">
            Twitter / X
          </a>
          <a href="https://github.com/apivault-directory" target="_blank" rel="noopener noreferrer" className="hover:text-fg-0 transition-colors">
            GitHub
          </a>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_#00FF88] inline-block" />
            curated &amp; ranked · no fake data
          </span>
        </div>
      </div>
    </footer>
  );
}
