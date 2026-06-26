"use client";
import { useState } from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { Logo } from "./logo";

const links = [
  { label: "Providers", href: "/providers" },
  { label: "Collections", href: "/collections" },
  { label: "Guides", href: "/guides" },
  { label: "Alternatives", href: "/alternatives" },
  { label: "Status", href: "/status" },
  { label: "API", href: "/api-docs" },
  { label: "$API", href: "/token" },
];

const GITHUB_URL = "https://github.com/apivault-directory";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg-0/70 backdrop-blur-xl">
      <div className="max-w-[1280px] mx-auto px-6 h-[60px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6 list-none">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-fg-1 text-sm font-medium hover:text-fg-0 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-1 hidden sm:flex items-center gap-1.5 hover:text-fg-0 transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <Link
            href="/providers"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 h-9 rounded-md bg-accent text-bg-0 text-sm font-medium hover:bg-accent-dim transition-all hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,255,136,0.3)]"
          >
            Browse APIs →
          </Link>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-line bg-bg-1 hover:border-line-2 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-line bg-bg-0/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium text-fg-1 hover:text-fg-0 border-b border-line last:border-0 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 flex items-center gap-3">
            <Link
              href="/providers"
              onClick={() => setOpen(false)}
              className="flex-1 inline-flex items-center justify-center h-10 rounded-md bg-accent text-bg-0 text-sm font-medium"
            >
              Browse APIs →
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-md border border-line bg-bg-1 text-fg-1 hover:text-fg-0 transition-colors"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
