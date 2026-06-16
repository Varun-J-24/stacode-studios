import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPolicyPage() {
  return (
    <section className="container py-16">
      <div className="glass mx-auto max-w-4xl rounded-card p-8">
        <h1 className="font-heading text-4xl font-bold text-white">Privacy Policy</h1>
        <div className="mt-6 grid gap-5 text-sm leading-7 text-muted">
          <p>
            Stacode Studios collects contact and project information only to respond to inquiries, prepare proposals and
            deliver website services.
          </p>
          <p>
            We do not sell personal information. Lead details are stored securely in Supabase and may be used for
            project communication, support and service updates.
          </p>
          <p>
            You can request correction or deletion of your information by emailing contact.stacodestudios@gmail.com.
          </p>
        </div>
      </div>
    </section>
  );
}
