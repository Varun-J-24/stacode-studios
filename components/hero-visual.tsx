import { Activity, BarChart3, Code2, Gauge, Smartphone } from "lucide-react";
import { Floating } from "@/components/reveal";

export function HomeHeroVisual() {
  return (
    <Floating className="relative mx-auto max-w-2xl">
      <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative rounded-[2rem] border border-white/15 bg-slate-950/80 p-4 shadow-purple">
        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="h-2 w-20 rounded-full bg-white/15" />
          </div>
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-primary/20 bg-black/25 p-5">
              <p className="text-xs font-bold uppercase text-primary">Live Website</p>
              <h3 className="mt-3 font-heading text-3xl font-bold text-white">
                Elevate Your Brand Presence
              </h3>
              <div className="mt-6 h-28 rounded-2xl bg-brand-gradient p-px">
                <div className="flex h-full items-end gap-2 rounded-2xl bg-slate-950/80 p-4">
                  {[34, 54, 42, 74, 62, 88, 70].map((height) => (
                    <span
                      key={height}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-secondary to-primary"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <Metric icon={Activity} label="Website Visitors" value="+45.6%" />
              <Metric icon={Gauge} label="Performance" value="98" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-8 -right-4 hidden w-36 rounded-[1.6rem] border border-white/15 bg-slate-950 p-3 shadow-card sm:block">
          <div className="mb-3 flex items-center justify-between">
            <Code2 className="h-5 w-5 text-primary" />
            <Smartphone className="h-4 w-4 text-muted" />
          </div>
          <div className="h-32 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-950" />
          <p className="mt-3 text-xs font-semibold text-white">Mobile first</p>
        </div>
      </div>
    </Floating>
  );
}

export function PricingHeroVisual() {
  return (
    <Floating className="relative mx-auto max-w-2xl">
      <div className="absolute inset-0 rounded-full bg-secondary/20 blur-3xl" />
      <div className="relative rounded-[2rem] border border-white/15 bg-slate-950/80 p-5 shadow-purple">
        <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 to-indigo-950/70 p-5 sm:grid-cols-4">
          {["₹7,999", "₹14,999", "₹24,999", "₹34,999+"].map((price, index) => (
            <div
              key={price}
              className={`rounded-2xl border p-4 ${index === 1 ? "border-primary bg-primary/10" : "border-white/10 bg-black/20"}`}
            >
              <p className="text-xs text-muted">{["Starter", "Business", "Professional", "E-Commerce"][index]}</p>
              <p className="mt-3 font-heading text-xl font-bold text-white">{price}</p>
              <div className="mt-5 h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${45 + index * 14}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Floating>
  );
}

export function PortfolioHeroVisual() {
  return (
    <Floating className="relative mx-auto max-w-2xl">
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative rotate-[-4deg] rounded-[1.8rem] border border-white/15 bg-slate-950 p-4 shadow-purple">
        <div className="rounded-[1.3rem] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 p-5">
          <p className="text-xs font-bold text-primary">INNERVA</p>
          <h3 className="mt-12 max-w-sm font-heading text-3xl font-bold text-white">
            Building Better Spaces for Life.
          </h3>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <span className="h-16 rounded-xl bg-white/10" />
            <span className="h-16 rounded-xl bg-primary/20" />
            <span className="h-16 rounded-xl bg-secondary/20" />
          </div>
        </div>
      </div>
    </Floating>
  );
}

export function ContactHeroVisual() {
  return (
    <Floating className="relative mx-auto flex aspect-square max-w-md items-center justify-center">
      <div className="absolute inset-8 rounded-full border border-primary/25 bg-primary/10 blur-xl" />
      <div className="relative flex h-64 w-80 items-center justify-center rounded-[2rem] border border-primary/50 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 shadow-glow">
        <div className="absolute inset-x-8 top-10 h-px rotate-[-22deg] bg-primary" />
        <div className="absolute inset-x-8 top-10 h-px rotate-[22deg] bg-secondary" />
        <Code2 className="h-20 w-20 text-secondary" />
      </div>
    </Floating>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof BarChart3; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-5 text-xs text-muted">{label}</p>
      <p className="font-heading text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
