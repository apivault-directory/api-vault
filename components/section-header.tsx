interface SectionHeaderProps {
  title: string;
  comment?: string;
  action?: { label: string; href: string };
}

export function SectionHeader({ title, comment, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-tight leading-none">{title}</h2>
        {comment && <div className="font-mono text-xs text-fg-2 mt-2">— {comment}</div>}
      </div>
      {action && (
        <a href={action.href} className="font-mono text-xs text-fg-1 hover:text-accent transition-colors">
          {action.label} →
        </a>
      )}
    </div>
  );
}
