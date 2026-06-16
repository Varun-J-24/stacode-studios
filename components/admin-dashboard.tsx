"use client";

import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import {
  Download,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { leadStatusLabels, leadStatuses } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/button";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  business_name: string;
  phone: string;
  email: string;
  project_type: string;
  project_description: string;
  status: keyof typeof leadStatusLabels;
};

type CmsItem = Record<string, unknown> & { id: string; created_at?: string };

const cmsCollections = [
  { key: "portfolio", label: "Portfolio" },
  { key: "services", label: "Services" },
  { key: "pricing", label: "Pricing" },
  { key: "faqs", label: "FAQ" }
] as const;

export function AdminDashboard() {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function boot() {
      const config = await fetch("/api/admin/config").then((response) => response.json());

      if (!config.supabaseUrl || !config.supabaseAnonKey) {
        setMessage("Supabase public config is missing. Add SUPABASE_URL and SUPABASE_ANON_KEY.");
        setAuthLoading(false);
        return;
      }

      const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
      setClient(supabase);
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setAuthLoading(false);
      supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
    }

    boot();
  }, []);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!client) {
      return;
    }

    const { error } = await client.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
      return;
    }

    const { data } = await client.auth.getUser();
    setUser(data.user);
  }

  async function signOut() {
    await client?.auth.signOut();
    setUser(null);
  }

  if (authLoading) {
    return (
      <section className="container flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="container flex min-h-[80vh] items-center justify-center py-16">
        <form onSubmit={signIn} className="glass w-full max-w-md rounded-card p-8">
          <h1 className="font-heading text-3xl font-bold text-white">Admin Login</h1>
          <p className="mt-3 text-sm text-muted">Sign in with your Supabase admin account.</p>
          <div className="mt-7 grid gap-4">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="rounded-input border border-white/15 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="rounded-input border border-white/15 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-primary"
              required
            />
          </div>
          {message ? <p className="mt-4 text-sm text-pink-300">{message}</p> : null}
          <button type="submit" className={buttonClassName({ className: "mt-6 w-full" })}>
            Sign In
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="container py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-primary">Stacode Studios</p>
          <h1 className="font-heading text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-muted">{user.email}</p>
        </div>
        <button type="button" onClick={signOut} className={buttonClassName({ variant: "secondary" })}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      <div className="grid gap-8">
        <LeadsPanel client={client} />
        <CmsPanel client={client} />
      </div>
    </section>
  );
}

function LeadsPanel({ client }: { client: SupabaseClient | null }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [message, setMessage] = useState("");

  const token = useCallback(async () => {
    const session = await client?.auth.getSession();
    return session?.data.session?.access_token || "";
  }, [client]);

  const load = useCallback(async () => {
    if (!client) {
      return;
    }

    setLoading(true);
    setMessage("");
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "all") params.set("status", status);
    const response = await fetch(`/api/admin/leads?${params}`, {
      headers: { Authorization: `Bearer ${await token()}` }
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.message || "Could not load leads");
      return;
    }

    setLeads(result.data || []);
  }, [client, search, status, token]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, nextStatus: string) {
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`
      },
      body: JSON.stringify({ status: nextStatus })
    });

    if (response.ok) {
      await load();
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead?")) {
      return;
    }

    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${await token()}` }
    });

    if (response.ok) {
      await load();
    }
  }

  function exportCsv() {
    const headers = ["Created", "Name", "Business", "Phone", "Email", "Project Type", "Status", "Description"];
    const rows = leads.map((lead) => [
      lead.created_at,
      lead.name,
      lead.business_name,
      lead.phone,
      lead.email,
      lead.project_type,
      leadStatusLabels[lead.status],
      lead.project_description
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value || "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `stacode-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="glass rounded-card p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Leads</h2>
          <p className="text-sm text-muted">Search, filter, update, delete and export inquiries.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={load} className={buttonClassName({ variant: "secondary", size: "sm" })}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button type="button" onClick={exportCsv} className={buttonClassName({ size: "sm" })}>
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px]">
        <label className="flex items-center gap-3 rounded-input border border-white/15 bg-slate-950/50 px-4">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search leads"
            className="w-full bg-transparent py-3 text-white outline-none"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-input border border-white/15 bg-slate-950/50 px-4 py-3 text-white outline-none"
        >
          <option value="all">All Statuses</option>
          {leadStatuses.map((item) => (
            <option key={item} value={item}>
              {leadStatusLabels[item]}
            </option>
          ))}
        </select>
      </div>

      {message ? <p className="mt-4 text-sm text-pink-300">{message}</p> : null}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="text-xs uppercase text-muted">
            <tr className="border-b border-white/10">
              <th className="py-3">Lead</th>
              <th>Contact</th>
              <th>Project</th>
              <th>Status</th>
              <th>Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted">
                  Loading leads...
                </td>
              </tr>
            ) : null}
            {!loading && leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted">
                  No leads found.
                </td>
              </tr>
            ) : null}
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-white/10 align-top">
                <td className="py-4">
                  <strong className="block text-white">{lead.name}</strong>
                  <span className="text-muted">{lead.business_name}</span>
                </td>
                <td>
                  <span className="block text-white">{lead.phone}</span>
                  <span className="text-muted">{lead.email}</span>
                </td>
                <td className="max-w-xs">
                  <span className="block text-white">{lead.project_type}</span>
                  <span className="line-clamp-2 text-muted">{lead.project_description}</span>
                </td>
                <td>
                  <select
                    value={lead.status}
                    onChange={(event) => updateStatus(lead.id, event.target.value)}
                    className="rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-white"
                  >
                    {leadStatuses.map((item) => (
                      <option key={item} value={item}>
                        {leadStatusLabels[item]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="text-muted">{formatDate(lead.created_at)}</td>
                <td className="text-right">
                  <button
                    type="button"
                    onClick={() => deleteLead(lead.id)}
                    className="rounded-xl border border-red-400/30 p-2 text-red-300"
                    aria-label="Delete lead"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CmsPanel({ client }: { client: SupabaseClient | null }) {
  const [active, setActive] = useState<(typeof cmsCollections)[number]["key"]>("portfolio");
  const [items, setItems] = useState<CmsItem[]>([]);
  const [editing, setEditing] = useState<CmsItem | null>(null);
  const [raw, setRaw] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = useCallback(async () => {
    const session = await client?.auth.getSession();
    return session?.data.session?.access_token || "";
  }, [client]);

  const endpoint = active === "portfolio" ? "/api/admin/portfolio" : `/api/admin/cms/${active}`;

  const load = useCallback(async () => {
    if (!client) return;
    setLoading(true);
    setMessage("");
    const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${await token()}` } });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.message || "Could not load collection");
      return;
    }

    setItems(result.data || []);
  }, [client, endpoint, token]);

  useEffect(() => {
    setEditing(null);
    setRaw("");
    load();
  }, [active, load]);

  const template = useMemo(() => {
    if (active === "portfolio") {
      return {
        industry: "Business",
        category: "Business",
        name: "Project Name",
        description: "Describe the client result and website experience.",
        technologies: ["Next.js", "Supabase", "SEO"],
        href: "https://stacodestudios.com",
        thumbnail_url: "",
        featured: false,
        accent: "from-primary via-accent to-secondary"
      };
    }

    if (active === "services") {
      return {
        title: "Website Development",
        slug: "website-development",
        short: "Short service summary.",
        description: "Full service description.",
        featured: true
      };
    }

    if (active === "pricing") {
      return {
        name: "Business",
        price: "₹14,999",
        delivery: "5 - 7 Days",
        label: "Most Recommended",
        badge: "Most Popular",
        features: ["Up to 7 Pages Website", "Premium UI Design"],
        best_for: ["Restaurants", "Clinics"]
      };
    }

    return {
      question: "Can I update the website myself?",
      answer: "Yes. We can add CMS support so your team can update content.",
      category: "General"
    };
  }, [active]);

  function startCreate() {
    setEditing(null);
    setRaw(JSON.stringify(template, null, 2));
  }

  function startEdit(item: CmsItem) {
    setEditing(item);
    const editable = Object.fromEntries(
      Object.entries(item).filter(([key]) => !["id", "created_at", "updated_at"].includes(key))
    );
    setRaw(JSON.stringify(editable, null, 2));
  }

  async function save() {
    setMessage("");
    let payload: unknown;

    try {
      payload = JSON.parse(raw);
    } catch {
      setMessage("JSON is invalid.");
      return;
    }

    const url = editing ? `${endpoint}/${editing.id}` : endpoint;
    const response = await fetch(url, {
      method: editing ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message || "Save failed");
      return;
    }

    setRaw("");
    setEditing(null);
    await load();
  }

  async function remove(item: CmsItem) {
    if (!confirm("Delete this item?")) return;
    const response = await fetch(`${endpoint}/${item.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${await token()}` }
    });

    if (response.ok) {
      await load();
    }
  }

  return (
    <div className="glass rounded-card p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">CMS</h2>
          <p className="text-sm text-muted">Manage portfolio, services, pricing and FAQs from Supabase tables.</p>
        </div>
        <button type="button" onClick={startCreate} className={buttonClassName({ size: "sm" })}>
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {cmsCollections.map((collection) => (
          <button
            key={collection.key}
            type="button"
            onClick={() => setActive(collection.key)}
            className={`rounded-button px-4 py-2 text-sm font-semibold ${
              active === collection.key ? "bg-brand-gradient text-white" : "border border-white/15 text-muted"
            }`}
          >
            {collection.label}
          </button>
        ))}
      </div>

      {raw ? (
        <div className="mt-6 grid gap-4">
          <textarea
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            rows={12}
            className="w-full rounded-input border border-white/15 bg-slate-950/70 p-4 font-mono text-sm text-white outline-none focus:border-primary"
          />
          <div className="flex gap-3">
            <button type="button" onClick={save} className={buttonClassName({ size: "sm" })}>
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setRaw("");
                setEditing(null);
              }}
              className={buttonClassName({ variant: "secondary", size: "sm" })}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {message ? <p className="mt-4 text-sm text-pink-300">{message}</p> : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? <p className="text-muted">Loading...</p> : null}
        {!loading && items.length === 0 ? <p className="text-muted">No items found.</p> : null}
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/45 p-5">
            <h3 className="font-heading text-lg font-bold text-white">
              {String(item.name || item.title || item.question || item.id)}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
              {String(item.description || item.short || item.answer || item.price || "")}
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => startEdit(item)}
                className="rounded-xl border border-white/15 p-2 text-primary"
                aria-label="Edit item"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(item)}
                className="rounded-xl border border-red-400/30 p-2 text-red-300"
                aria-label="Delete item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
