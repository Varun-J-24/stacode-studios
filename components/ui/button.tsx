import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-3 rounded-button px-6 py-3 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-gradient text-white shadow-glow hover:-translate-y-0.5 hover:shadow-purple",
        secondary:
          "border border-white/18 bg-white/[0.03] text-white hover:border-primary/70 hover:bg-primary/10",
        dark: "bg-black/65 text-white hover:bg-black/85",
        ghost: "text-primary hover:text-white"
      },
      size: {
        default: "min-h-12",
        sm: "min-h-10 px-4 py-2 text-xs",
        lg: "min-h-14 px-7 py-4 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: false;
  showArrow?: boolean;
}

export function Button({ className, variant, size, showArrow = false, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      <span>{children}</span>
      {showArrow ? <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /> : null}
    </button>
  );
}

export function buttonClassName(props?: VariantProps<typeof buttonVariants> & { className?: string }) {
  const { className, ...variantProps } = props || {};
  return cn(buttonVariants(variantProps), className);
}
