"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, MessageCircle, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { business } from "@/lib/constants";
import { projectTypes } from "@/lib/data";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { buttonClassName } from "@/components/ui/button";

const pendingKey = "stacode_pending_leads";

function getCookie(name: string) {
  if (typeof document === "undefined") {
    return "";
  }

  return (
    document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${name}=`))
      ?.split("=")[1] || ""
  );
}

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const csrfToken = useMemo(() => decodeURIComponent(getCookie("stacode_csrf")), []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      businessName: "",
      phone: "",
      email: "",
      projectType: "Website Development",
      projectDescription: "",
      csrfToken
    }
  });

  async function submitLead(values: ContactInput) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...values, csrfToken: decodeURIComponent(getCookie("stacode_csrf")) })
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.message || "Submission failed");
    }

    return result;
  }

  async function onSubmit(values: ContactInput) {
    setServerMessage("");

    try {
      const result = await submitLead(values);
      setSuccess(true);
      setServerMessage(result.message);
      reset({
        name: "",
        businessName: "",
        phone: "",
        email: "",
        projectType: "Website Development",
        projectDescription: "",
        csrfToken: decodeURIComponent(getCookie("stacode_csrf"))
      });
    } catch (error) {
      const stored = JSON.parse(localStorage.getItem(pendingKey) || "[]") as ContactInput[];
      localStorage.setItem(pendingKey, JSON.stringify([...stored, values]));
      setServerMessage(
        error instanceof Error
          ? `${error.message}. Your inquiry is saved in this browser and will retry automatically.`
          : "Your inquiry is saved in this browser and will retry automatically."
      );
    }
  }

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem(pendingKey) || "[]") as ContactInput[];

    if (!pending.length) {
      return;
    }

    let active = true;

    async function flush() {
      const remaining: ContactInput[] = [];

      for (const lead of pending) {
        try {
          await submitLead({ ...lead, csrfToken: decodeURIComponent(getCookie("stacode_csrf")) });
        } catch {
          remaining.push(lead);
        }
      }

      if (active) {
        localStorage.setItem(pendingKey, JSON.stringify(remaining));
      }
    }

    flush();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-card p-6 md:p-8">
        <div className="mb-7 flex items-center gap-4">
          <MessageCircle className="h-8 w-8 text-secondary" />
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">Send Us a Message</h2>
            <p className="mt-2 text-sm text-muted">Fill out the form below and we&apos;ll get back to you soon.</p>
          </div>
        </div>

        <input type="hidden" {...register("csrfToken")} value={csrfToken} />

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Your Name" error={errors.name?.message}>
            <input {...register("name")} placeholder="Enter your name" />
          </Field>
          <Field label="Business Name" error={errors.businessName?.message}>
            <input {...register("businessName")} placeholder="Enter your business name" />
          </Field>
          <Field label="Phone Number" error={errors.phone?.message}>
            <input {...register("phone")} placeholder="Enter your phone number" />
          </Field>
          <Field label="Email Address" error={errors.email?.message}>
            <input {...register("email")} placeholder="Enter your email address" />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Project Type" error={errors.projectType?.message}>
            <select {...register("projectType")}>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Tell us about your project" error={errors.projectDescription?.message}>
            <textarea
              {...register("projectDescription")}
              rows={5}
              placeholder="Describe your project, goals and requirements..."
            />
          </Field>
        </div>

        {serverMessage ? <p className="mt-5 text-sm text-primary">{serverMessage}</p> : null}

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={isSubmitting} className={buttonClassName()}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Send Message
          </button>
          <p className="flex items-center gap-2 text-sm text-muted">
            <ShieldCheck className="h-4 w-4 text-white/70" />
            We usually reply within a few hours
          </p>
        </div>
      </form>

      {success ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur">
          <div className="glass max-w-md rounded-card p-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
            <h3 className="mt-5 font-heading text-2xl font-bold text-white">Inquiry Received</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
            <div className="mt-7 grid gap-3">
              <a href={business.whatsappPrefill} className={buttonClassName()}>
                Chat On WhatsApp
              </a>
              <button type="button" onClick={() => setSuccess(false)} className={buttonClassName({ variant: "secondary" })}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactElement;
}) {
  return (
    <label className="block text-sm font-semibold text-white">
      {label} <span className="text-pink-400">*</span>
      <div className="mt-2 [&_input]:w-full [&_input]:rounded-input [&_input]:border [&_input]:border-white/15 [&_input]:bg-slate-950/50 [&_input]:px-4 [&_input]:py-3 [&_input]:text-white [&_input]:outline-none [&_input]:transition [&_input]:placeholder:text-muted/60 [&_input:focus]:border-primary [&_select]:w-full [&_select]:rounded-input [&_select]:border [&_select]:border-white/15 [&_select]:bg-slate-950/50 [&_select]:px-4 [&_select]:py-3 [&_select]:text-white [&_select]:outline-none [&_select:focus]:border-primary [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:rounded-input [&_textarea]:border [&_textarea]:border-white/15 [&_textarea]:bg-slate-950/50 [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-white [&_textarea]:outline-none [&_textarea]:transition [&_textarea]:placeholder:text-muted/60 [&_textarea:focus]:border-primary">
        {children}
      </div>
      {error ? <span className="mt-2 block text-xs text-pink-300">{error}</span> : null}
    </label>
  );
}
