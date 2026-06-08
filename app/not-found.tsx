import { Nav } from "@/components/nav";
import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <section className="max-w-[640px] mx-auto px-6 py-32 text-center">
        <div className="font-mono text-xs text-fg-2 mb-4">// 404 / page not found</div>
        <h1 className="font-display text-6xl font-semibold tracking-[-0.04em] mb-4">
          <span className="text-accent">$</span> 404
        </h1>
        <p className="text-lg text-fg-1 mb-8">
          The API you&apos;re looking for doesn&apos;t exist — or maybe its free tier was removed.
        </p>
        <div className="flex gap-3 justify-center">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/providers" variant="ghost">Browse APIs</ButtonLink>
        </div>
      </section>
    </>
  );
}
