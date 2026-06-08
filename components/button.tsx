import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-bg-0 hover:bg-accent-dim hover:shadow-[0_4px_20px_rgba(0,255,136,0.3)] hover:-translate-y-px",
  ghost: "border border-line-2 text-fg-0 hover:bg-bg-2 hover:border-[rgba(0,255,136,0.3)]",
  danger: "bg-status-err text-white hover:bg-red-600",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

function getClassName({ variant = "primary", size = "md", className }: BaseProps) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );
}

type LinkProps = BaseProps & { href: string; external?: boolean } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({ href, external, variant, size, className, children, leftIcon, rightIcon, ...rest }: LinkProps) {
  const cls = getClassName({ variant, size, className, children });
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  );
}

type NativeProps = BaseProps & ComponentProps<"button">;

export function Button({ variant, size, className, children, leftIcon, rightIcon, ...rest }: NativeProps) {
  return (
    <button className={getClassName({ variant, size, className, children })} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
