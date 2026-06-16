"use client";

import { useMemo, useState } from "react";
import { PortfolioCard } from "@/components/cards";
import { portfolioCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

type Project = {
  industry: string;
  category: string;
  name: string;
  description: string;
  technologies: string[];
  href: string;
  accent?: string;
  featured?: boolean;
};

export function PortfolioFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.category === active)),
    [active, projects]
  );

  return (
    <>
      <div className="glass mb-8 flex flex-wrap justify-center gap-3 rounded-card p-3">
        {portfolioCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "min-w-32 rounded-button px-5 py-2 text-sm font-semibold text-white/80 transition",
              active === category && "bg-brand-gradient text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, index) => (
          <PortfolioCard key={project.name} project={project} large={index === 0} />
        ))}
      </div>
    </>
  );
}
