import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  text?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-normal text-secondary">{eyebrow}</p>
      ) : null}
      <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-muted md:text-lg">{text}</p> : null}
    </div>
  );
}
