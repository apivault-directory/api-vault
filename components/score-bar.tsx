export function ScoreBar({ label, value, weight }: { label: string; value: number; weight: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-fg-0">
          {label} <span className="text-fg-2 font-mono text-xs">({weight})</span>
        </span>
        <span className="font-mono text-sm text-accent">{value}/100</span>
      </div>
      <div className="h-1.5 bg-bg-0 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent-dim to-accent rounded-full transition-all duration-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
