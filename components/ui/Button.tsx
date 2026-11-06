import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  /** Trailing arrow that shifts on hover. Default: true */
  arrow?: boolean;
};

type ButtonProps =
  | (CommonProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
        href?: undefined;
      })
  | (CommonProps & {
      href: string;
      onClick?: ButtonHTMLAttributes<HTMLAnchorElement>["onClick"];
    });

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] shadow-sm hover:bg-[var(--btn-primary-hover)] focus-visible:ring-brand-500",
  secondary:
    "border bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-fg)] shadow-sm border-[var(--btn-secondary-border)] hover:bg-[var(--btn-secondary-hover)] focus-visible:ring-brand-500",
  ghost:
    "bg-transparent text-ink hover:bg-[var(--btn-secondary-hover)] focus-visible:ring-brand-500",
};

const sizeClass: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-12 px-6 text-base",
};

function ButtonInner({
  children,
  arrow,
}: {
  children: ReactNode;
  arrow: boolean;
}) {
  return (
    <>
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
        {arrow ? (
          <ArrowRight
            aria-hidden
            className="size-4 shrink-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
          />
        ) : null}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
      >
        <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 motion-safe:group-hover:animate-shine motion-safe:group-hover:opacity-100" />
      </span>
    </>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  arrow = true,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--section-bg,#fff)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "motion-safe:active:scale-[0.98]",
    variantClass[variant],
    sizeClass[size],
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, onClick } = rest;
    if (disabled) {
      return (
        <span className={cn(classes, "opacity-50")} aria-disabled="true">
          <ButtonInner arrow={arrow}>{children}</ButtonInner>
        </span>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        <ButtonInner arrow={arrow}>{children}</ButtonInner>
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      disabled={disabled}
      {...buttonProps}
    >
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </button>
  );
}
