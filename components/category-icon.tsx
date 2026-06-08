/**
 * components/category-icon.tsx
 *
 * Maps provider categories to lucide-react icons.
 * Use instead of emoji wherever categories are displayed.
 */

import {
  Zap,
  ImageIcon,
  Mic,
  Network,
  Search,
  Clapperboard,
  Code2,
  Eye,
  type LucideProps,
} from "lucide-react";
import type { Category } from "@/lib/types";

const iconMap: Record<Category, React.ElementType> = {
  LLM:        Zap,
  Image:      ImageIcon,
  Speech:     Mic,
  Embeddings: Network,
  Search:     Search,
  Video:      Clapperboard,
  Code:       Code2,
  Vision:     Eye,
};

interface CategoryIconProps extends LucideProps {
  category: Category | string;
}

export function CategoryIcon({ category, size = 16, ...props }: CategoryIconProps) {
  const Icon = iconMap[category as Category];
  if (!Icon) return null;
  return <Icon size={size} {...props} />;
}
