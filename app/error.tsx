"use client";
import { useEffect } from "react";
import { ButtonLink } from "@/components/button";
import { Nav } from "@/components/nav";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <>
      <Nav />
      <section className="max-w-[640px] mx-auto px-6 py-32 text-center">
        <div className="font-mono text-xs text-status-err mb-4">// 500 / something broke</div>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] mb-4">Unexpected error</h1>
        <p className="text-lg text-fg-1 mb-8">We&apos;ve been notified. Try again or head back home.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md bg-accent text-bg-0 text-sm font-medium hover:bg-accent-dim transition-colors">
            Try again
          </button>
          <ButtonLink href="/" variant="ghost">Go home</ButtonLink>
        </div>
      </section>
    </>
  );
}
