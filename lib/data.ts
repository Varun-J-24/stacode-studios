import {
  BadgeCheck,
  Bolt,
  BriefcaseBusiness,
  Code2,
  Gem,
  Headphones,
  HeartHandshake,
  LayoutDashboard,
  LockKeyhole,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Paintbrush,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Timer,
  TrendingUp,
  Wrench
} from "lucide-react";

export const trustIndicators = [
  { title: "Fast Delivery", text: "Delivered on time, every time", icon: Bolt },
  { title: "SEO Ready", text: "Built to rank higher on Google", icon: Search },
  { title: "Mobile First", text: "Perfect experience on every device", icon: Smartphone },
  { title: "Affordable Pricing", text: "High quality websites within your budget", icon: BadgeCheck }
];

export const services = [
  {
    slug: "website-development",
    title: "Website Development",
    short: "Custom websites that are fast, responsive and built to convert.",
    description:
      "Premium business websites with conversion-focused design, clean content structure, and production-grade performance.",
    icon: Code2,
    featured: true
  },
  {
    slug: "e-commerce-solutions",
    title: "E-Commerce Solutions",
    short: "Powerful online stores with secure payments and easy management.",
    description:
      "Online stores with product management, checkout flow, order tracking, customer accounts, and admin controls.",
    icon: ShoppingCart,
    featured: true
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    short: "Improve your visibility and get found by the right customers.",
    description:
      "Technical SEO, metadata, structured content, performance tuning, and local business optimization.",
    icon: TrendingUp,
    featured: true
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance",
    short: "Keep your website secure, updated and running smoothly.",
    description:
      "Security monitoring, content updates, backups, SEO monitoring, uptime checks, and support.",
    icon: ShieldCheck,
    featured: true
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    short: "Visual identity assets that make your brand feel premium.",
    description:
      "Logo design, social media kits, brand UI direction, landing page visuals, and digital design systems.",
    icon: Paintbrush,
    featured: false
  }
];

export const whyChooseUs = [
  { title: "Client Focused", text: "We listen, understand and deliver.", icon: HeartHandshake },
  { title: "Modern Design", text: "Clean, professional and conversion focused.", icon: PenTool },
  { title: "Secure & Reliable", text: "Best practices keep your site safe.", icon: LockKeyhole },
  { title: "Transparent Process", text: "Clear communication at every step.", icon: MessageCircle },
  { title: "On-Time Delivery", text: "We value your time as much as you do.", icon: Timer },
  { title: "Ongoing Support", text: "We are here even after launch.", icon: Headphones }
];

export const pricingPackages = [
  {
    slug: "starter",
    name: "Starter",
    label: "Perfect for Small Businesses",
    price: "₹7,999",
    delivery: "3 - 5 Days",
    features: [
      "1 - 3 Pages Website",
      "Mobile Responsive Design",
      "WhatsApp Integration",
      "Contact Form",
      "Google Maps Integration",
      "Basic SEO Setup"
    ],
    bestFor: ["Local Shops", "Salons", "Home Tutors", "Freelancers"]
  },
  {
    slug: "business",
    name: "Business",
    label: "Most Recommended",
    price: "₹14,999",
    delivery: "5 - 7 Days",
    badge: "Most Popular",
    features: [
      "Up to 7 Pages Website",
      "Premium UI Design",
      "Mobile Responsive",
      "WhatsApp Integration",
      "Contact Forms",
      "Basic SEO",
      "Speed Optimization",
      "Social Media Integration"
    ],
    bestFor: ["Restaurants", "Gyms", "Clinics", "Coaching Institutes", "Hotels"]
  },
  {
    slug: "professional",
    name: "Professional",
    label: "For Growing Businesses",
    price: "₹24,999",
    delivery: "7 - 10 Days",
    features: [
      "Up to 15 Pages Website",
      "Custom Design",
      "Blog Section",
      "Advanced SEO Setup",
      "Lead Generation Forms",
      "Analytics Integration",
      "Performance Optimization",
      "Priority Support"
    ],
    bestFor: ["Real Estate", "Educational Institutes", "Growing Brands", "Service-Based Businesses"]
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    label: "For Online Stores",
    price: "₹34,999+",
    delivery: "10 - 15 Days",
    features: [
      "Online Store",
      "Product Management",
      "Payment Gateway Integration",
      "Order Tracking",
      "Customer Accounts",
      "Admin Dashboard",
      "Mobile Optimized"
    ],
    bestFor: ["Clothing Brands", "Gift Stores", "Cosmetic Businesses", "Online Retailers"]
  }
];

export const maintenancePlans = [
  {
    name: "Basic",
    price: "₹999",
    period: "/month",
    icon: ShieldCheck,
    features: ["Content Updates", "Security Monitoring", "Monthly Backup"]
  },
  {
    name: "Growth",
    price: "₹2,499",
    period: "/month",
    icon: Rocket,
    features: ["Everything in Basic", "SEO Monitoring", "Speed Optimization", "Priority Support"]
  }
];

export const additionalServices = [
  ["Domain Setup", "₹500"],
  ["Hosting Setup", "₹1,000"],
  ["Google Business Profile Setup", "₹2,000"],
  ["Logo Design", "₹2,500"],
  ["Social Media Kit", "₹3,500"],
  ["Blog Writing", "₹500 /article"],
  ["SEO Package", "₹5,000 /month"],
  ["Website Redesign", "Starting ₹8,000"]
];

export const portfolioProjects = [
  {
    slug: "nutriscan-ai-food-label-scanner",
    industry: "Health & Nutrition",
    category: "Healthcare",
    name: "NutriScan - AI Food Label Scanner",
    description:
      "AI-powered food label scanner that analyzes ingredients, nutritional value and helps users make healthier choices.",
    technologies: ["Next.js", "AI Vision", "Supabase", "PWA"],
    href: "https://stacodestudios.com/portfolio/nutriscan-ai-food-label-scanner",
    accent: "from-lime-300 via-cyan-300 to-blue-500",
    featured: true
  },
  {
    slug: "healing-hands-clinic",
    industry: "Healthcare",
    category: "Healthcare",
    name: "Healing Hands Clinic",
    description:
      "A professional website for a multi-speciality clinic with appointment booking and service management.",
    technologies: ["Next.js", "Booking", "SEO", "Analytics"],
    href: "https://stacodestudios.com/portfolio/healing-hands-clinic",
    accent: "from-sky-200 via-white to-blue-400"
  },
  {
    slug: "edurise-coaching",
    industry: "Education",
    category: "Education",
    name: "EduRise Coaching",
    description:
      "Modern website for an educational institute with course details, student portal and enquiry system.",
    technologies: ["Next.js", "CMS", "Forms", "SEO"],
    href: "https://stacodestudios.com/portfolio/edurise-coaching",
    accent: "from-emerald-200 via-white to-green-500"
  },
  {
    slug: "vestio-fashion-store",
    industry: "E-Commerce",
    category: "E-Commerce",
    name: "Vestio - Fashion Store",
    description:
      "Fully functional e-commerce website with product filters, secure checkout and order tracking.",
    technologies: ["Next.js", "Payments", "Storefront", "Admin"],
    href: "https://stacodestudios.com/portfolio/vestio-fashion-store",
    accent: "from-orange-200 via-stone-100 to-amber-500"
  },
  {
    slug: "nexora-solutions",
    industry: "Corporate",
    category: "Corporate",
    name: "Nexora Solutions",
    description:
      "Corporate website for a digital agency showcasing services, case studies and client success.",
    technologies: ["Next.js", "Framer Motion", "CMS", "SEO"],
    href: "https://stacodestudios.com/portfolio/nexora-solutions",
    accent: "from-indigo-400 via-violet-500 to-purple-700"
  },
  {
    slug: "innerva-interiors",
    industry: "Business",
    category: "Business",
    name: "Innerva Interiors",
    description:
      "Elegant website for an interior design studio to showcase projects and convert premium enquiries.",
    technologies: ["Next.js", "Portfolio CMS", "SEO", "Forms"],
    href: "https://stacodestudios.com/portfolio/innerva-interiors",
    accent: "from-amber-200 via-stone-500 to-slate-900"
  }
];

export const testimonials = [
  {
    quote:
      "Stacode Studios made the whole process smooth and easy. The website looks amazing and we started getting more leads within weeks.",
    name: "Business Owner"
  },
  {
    quote:
      "Professional, responsive and highly skilled. They understood our needs perfectly and delivered beyond expectations.",
    name: "Entrepreneur"
  },
  {
    quote:
      "Great experience! Fast delivery, excellent support and the results speak for themselves.",
    name: "Startup Founder"
  }
];

export const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most websites are delivered within 3 to 10 days depending on page count, content readiness and functionality."
  },
  {
    question: "Can I update the website myself?",
    answer:
      "Yes. We can add an admin dashboard or CMS so your team can update content, portfolio items, blogs and services."
  },
  {
    question: "Do you provide domain and hosting?",
    answer:
      "Yes. We help with domain setup, hosting configuration, DNS, SSL and launch readiness."
  },
  {
    question: "Do you provide SEO services?",
    answer:
      "Yes. Every website includes basic SEO setup, and advanced monthly SEO packages are available."
  },
  {
    question: "Will my website be mobile friendly?",
    answer:
      "Yes. Every Stacode Studios website is designed mobile first and tested across phones, tablets and desktops."
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We can redesign your current site with improved UI, speed, SEO, lead capture and conversion structure."
  }
];

export const processSteps = [
  { title: "Discovery Call", text: "We understand your business, goals and requirements.", icon: MessageCircle },
  { title: "Proposal & Plan", text: "We send a proposal and project plan for your approval.", icon: BriefcaseBusiness },
  { title: "Design & Development", text: "We design, develop and bring your website to life.", icon: Code2 },
  { title: "Testing & Review", text: "We test thoroughly and share for your feedback.", icon: LayoutDashboard },
  { title: "Launch & Support", text: "We launch your website and provide ongoing support.", icon: Gem }
];

export const contactHighlights = [
  { title: "Quick Response", text: "We reply within a few hours", icon: Bolt },
  { title: "100% Confidential", text: "Your information is safe with us", icon: ShieldCheck },
  { title: "Free Consultation", text: "Let's discuss your project idea", icon: Headphones }
];

export const projectTypes = [
  "Website Development",
  "E-Commerce Solutions",
  "SEO Optimization",
  "Website Maintenance",
  "Branding & Design",
  "Website Redesign"
];

export const portfolioCategories = [
  "All",
  "Business",
  "Restaurant",
  "Healthcare",
  "Education",
  "Corporate",
  "E-Commerce"
];

export const serviceTabs = [
  { title: "Web Development", icon: Code2 },
  { title: "E-Commerce", icon: ShoppingCart },
  { title: "SEO Optimization", icon: Search },
  { title: "Maintenance", icon: Wrench },
  { title: "Branding & Design", icon: Paintbrush }
];

export const contactChannels = [
  { title: "WhatsApp", value: "+91 9336864259", text: "Chat with us now", icon: MessageCircle, href: "https://wa.me/919336864259" },
  { title: "Phone", value: "+91 9336864259", text: "Mon - Sat | 10 AM - 7 PM", icon: Smartphone, href: "tel:+919336864259" },
  { title: "Email", value: "contact.stacodestudios@gmail.com", text: "Drop us an email", icon: MapPin, href: "mailto:contact.stacodestudios@gmail.com" },
  { title: "Location", value: "Varanasi, Uttar Pradesh, India", text: "Serving clients across India", icon: MonitorSmartphone, href: "/contact" }
];
