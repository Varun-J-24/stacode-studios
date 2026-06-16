export const business = {
  name: "Stacode Studios",
  tagline: "We Build Websites That Build Your Business",
  phone: "+91 9336864259",
  phoneCompact: "+919336864259",
  email: "contact.stacodestudios@gmail.com",
  location: "Varanasi, Uttar Pradesh, India",
  country: "India",
  whatsapp: "https://wa.me/919336864259",
  whatsappPrefill:
    "https://wa.me/919336864259?text=Hello%20Stacode%20Studios%2C%20I%20just%20submitted%20a%20website%20inquiry%20and%20would%20like%20to%20discuss%20my%20project."
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services & Pricing", href: "/services-pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" }
];

export const leadStatuses = [
  "new",
  "contacted",
  "proposal_sent",
  "closed_won",
  "closed_lost"
] as const;

export const leadStatusLabels: Record<(typeof leadStatuses)[number], string> = {
  new: "New",
  contacted: "Contacted",
  proposal_sent: "Proposal Sent",
  closed_won: "Closed Won",
  closed_lost: "Closed Lost"
};
