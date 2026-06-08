"use client";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMsg("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (variant === "compact") {
    return (
      <form onSubmit={submit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@dev.com"
          className="flex-1 h-9 px-3 bg-bg-1 border border-line rounded-md text-sm text-fg-0 placeholder:text-fg-3 focus:outline-none focus:border-accent transition-colors font-mono"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-9 px-3 bg-accent text-bg-0 text-sm font-medium rounded-md hover:bg-accent-dim transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          {status === "loading" && <Loader2 size={12} className="animate-spin" />}
          {status === "success" && <Check size={12} />}
          {status === "success" ? "Subscribed!" : status === "loading" ? "" : "Join"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="flex gap-2 max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@dev.com"
          className="flex-1 h-10 px-3 bg-bg-1 border border-line rounded-md text-sm text-fg-0 placeholder:text-fg-3 focus:outline-none focus:border-accent transition-colors font-mono"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-10 px-4 bg-accent text-bg-0 text-sm font-medium rounded-md hover:bg-accent-dim transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          {status === "loading" && <Loader2 size={14} className="animate-spin" />}
          {status === "success" && <Check size={14} />}
          {status === "success" ? "Done!" : status === "loading" ? "" : "Subscribe"}
        </button>
      </div>
      <p className="text-xs text-fg-2">
        {status === "error"
          ? errorMsg
          : status === "success"
          ? "✓ Check your inbox for a welcome email."
          : "Weekly digest. No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}
