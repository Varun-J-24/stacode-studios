import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandProps = {
  compact?: boolean;
  className?: string;
};

export function Brand({ compact = false, className }: BrandProps) {
  const size = compact ? 100 : 140;
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logo-full.png"
        alt="Stacode Studios"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  );
}


