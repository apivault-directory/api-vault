"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CodeSnippet } from "@/lib/types";

function highlight(code: string, language: string): string {
  let highlighted = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (language === "python") {
    highlighted = highlighted
      .replace(/\b(from|import|def|class|return|if|else|elif|for|while|with|as|in|not|and|or|None|True|False|async|await|try|except|raise|finally|pass|break|continue|lambda|yield|global|nonlocal)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/("[^"]*"|'[^']*')/g, '<span class="text-green-300">$1</span>')
      .replace(/(#.*$)/gm, '<span class="text-fg-3 italic">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-amber-400">$1</span>');
  } else if (language === "javascript" || language === "typescript") {
    highlighted = highlighted
      .replace(/\b(import|export|from|const|let|var|function|return|if|else|for|while|async|await|new|class|extends|this|typeof|instanceof|null|undefined|true|false)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/("[^"]*"|'[^']*'|`[^`]*`)/g, '<span class="text-green-300">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-fg-3 italic">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-amber-400">$1</span>');
  } else if (language === "curl") {
    highlighted = highlighted
      .replace(/(curl)(\s)/g, '<span class="text-purple-400">$1</span>$2')
      .replace(/(-[A-Za-z]|--[a-z-]+)/g, '<span class="text-amber-400">$1</span>')
      .replace(/("[^"]*"|'[^']*')/g, '<span class="text-green-300">$1</span>')
      .replace(/(\$[A-Z_]+)/g, '<span class="text-cyan-300">$1</span>');
  } else if (language === "go") {
    highlighted = highlighted
      .replace(/\b(package|import|func|var|const|return|if|else|for|range|type|struct|interface|map|chan|go|defer|select)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/("[^"]*"|`[^`]*`)/g, '<span class="text-green-300">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-fg-3 italic">$1</span>');
  }

  return highlighted;
}

export function CodeBlock({ snippets }: { snippets: CodeSnippet[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(snippets[active].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (snippets.length === 0) return null;

  return (
    <div className="rounded-lg overflow-hidden border border-line bg-bg-0">
      <div className="flex items-center justify-between border-b border-line bg-bg-2">
        <div className="flex overflow-x-auto">
          {snippets.map((s, i) => (
            <button
              key={s.language}
              onClick={() => setActive(i)}
              className={cn(
                "px-4 py-2.5 text-xs font-medium transition-colors whitespace-nowrap",
                i === active ? "text-fg-0 border-b-2 border-accent" : "text-fg-2 hover:text-fg-1"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="mr-2 px-3 py-1.5 text-xs text-fg-1 hover:text-fg-0 rounded hover:bg-bg-1 transition-colors flex items-center gap-1.5 shrink-0"
          aria-label="Copy code"
        >
          {copied ? (<><Check size={12} />Copied</>) : (<><Copy size={12} />Copy</>)}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-[13.5px] font-mono leading-[1.7] bg-bg-0">
        <code className="text-[#E0E0E0] whitespace-pre" dangerouslySetInnerHTML={{ __html: highlight(snippets[active].code, snippets[active].language) }} />
      </pre>
    </div>
  );
}
