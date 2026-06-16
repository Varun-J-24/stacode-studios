import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions"
};

export default function TermsPage() {
  return (
    <section className="container py-16">
      <div className="glass mx-auto max-w-4xl rounded-card p-8">
        <h1 className="font-heading text-4xl font-bold text-white">Terms & Conditions</h1>
        <div className="mt-6 grid gap-5 text-sm leading-7 text-muted">
          <p>
            Project scope, delivery timelines and pricing are confirmed in writing before work begins. Timeline estimates
            depend on content readiness, feedback speed and third-party integrations.
          </p>
          <p>
            Hosting, domain, paid plugins, payment gateway charges and third-party subscriptions are billed separately
            unless included in the approved proposal.
          </p>
          <p>
            Maintenance plans cover agreed monthly updates, monitoring and support. Emergency fixes or new feature work
            may require a separate quote.
          </p>
        </div>
      </div>
    </section>
  );
}
