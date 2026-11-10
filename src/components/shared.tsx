import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMaskedLines, useParallax, useReveal } from "@/hooks/use-gsap-reveal";

export function Overline({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-overline text-muted-foreground", className)}>{children}</p>;
}

/** Big serif title with masked line-by-line scroll reveal. */
export function MaskedTitle({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const ref = useMaskedLines<HTMLHeadingElement>();
  return (
    <h2 ref={ref} className={cn("display-title", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span data-reveal-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}

export function ArrowLink({
  to,
  children,
  className,
  light,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-3 text-sm font-medium tracking-wide",
        light ? "text-paper" : "text-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "border-b pb-1 transition-colors duration-300",
          light ? "border-paper/40 group-hover:border-paper" : "border-foreground/40 group-hover:border-foreground",
        )}
      >
        {children}
      </span>
      <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
    </Link>
  );
}

/**
 * Editorial image with clip-path reveal and depth parallax inside its frame.
 */
export function EditorialImage({
  src,
  alt,
  caption,
  aspect = "aspect-[4/3]",
  className,
  parallax = true,
  eager,
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  className?: string;
  parallax?: boolean;
  eager?: boolean;
}) {
  const wrapRef = useReveal<HTMLDivElement>({ kind: "clip" });
  const imgRef = useParallax<HTMLImageElement>(10);

  return (
    <figure className={className}>
      <div ref={wrapRef} className={cn("overflow-hidden bg-sand", aspect)}>
        <img
          ref={parallax ? imgRef : undefined}
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          className="img-editorial scale-[1.14] will-change-transform"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 flex items-baseline gap-2 text-xs text-muted-foreground">
          <span className="inline-block h-px w-6 translate-y-[-3px] bg-border" />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Standard inner-page header: overline, masked title and optional lead. */
export function PageHero({
  overline,
  lines,
  lead,
  className,
}: {
  overline: string;
  lines: string[];
  lead?: string;
  className?: string;
}) {
  return (
    <header className={cn("pt-36 pb-16 md:pt-48 md:pb-24", className)}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Overline className="mb-6">{overline}</Overline>
        <MaskedTitle lines={lines} className="text-[13vw] leading-[0.95] md:text-7xl lg:text-8xl" />
        {lead ? (
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>
        ) : null}
      </div>
    </header>
  );
}

/** Small "external-style" link used in cards and lists. */
export function PeekLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-olive"
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
