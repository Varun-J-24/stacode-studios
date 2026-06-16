"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item, index) => (
        <div key={item.question} className="glass rounded-2xl">
          <button
            type="button"
            onClick={() => setOpen(open === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-white"
          >
            <span>{item.question}</span>
            <Plus className={cn("h-5 w-5 shrink-0 transition", open === index && "rotate-45 text-primary")} />
          </button>
          {open === index ? <p className="px-5 pb-5 text-sm leading-6 text-muted">{item.answer}</p> : null}
        </div>
      ))}
    </div>
  );
}
