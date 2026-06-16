insert into public.services (slug, title, short, description, featured)
values
  ('website-development', 'Website Development', 'Custom websites that are fast, responsive and built to convert.', 'Premium business websites with conversion-focused design, clean content structure and production-grade performance.', true),
  ('e-commerce-solutions', 'E-Commerce Solutions', 'Powerful online stores with secure payments and easy management.', 'Online stores with product management, checkout flow, order tracking, customer accounts and admin controls.', true),
  ('seo-optimization', 'SEO Optimization', 'Improve your visibility and get found by the right customers.', 'Technical SEO, metadata, structured content, performance tuning and local business optimization.', true),
  ('website-maintenance', 'Website Maintenance', 'Keep your website secure, updated and running smoothly.', 'Security monitoring, content updates, backups, SEO monitoring, uptime checks and support.', true)
on conflict (slug) do update set
  title = excluded.title,
  short = excluded.short,
  description = excluded.description,
  featured = excluded.featured;

insert into public.pricing_packages (name, price, delivery, label, badge, features, best_for)
values
  ('Starter', '₹7,999', '3 - 5 Days', 'Perfect for Small Businesses', null, array['1 - 3 Pages Website','Mobile Responsive Design','WhatsApp Integration','Contact Form','Google Maps Integration','Basic SEO Setup'], array['Local Shops','Salons','Home Tutors','Freelancers']),
  ('Business', '₹14,999', '5 - 7 Days', 'Most Recommended', 'Most Popular', array['Up to 7 Pages Website','Premium UI Design','Mobile Responsive','WhatsApp Integration','Contact Forms','Basic SEO','Speed Optimization','Social Media Integration'], array['Restaurants','Gyms','Clinics','Coaching Institutes','Hotels']),
  ('Professional', '₹24,999', '7 - 10 Days', 'For Growing Businesses', null, array['Up to 15 Pages Website','Custom Design','Blog Section','Advanced SEO Setup','Lead Generation Forms','Analytics Integration','Performance Optimization','Priority Support'], array['Real Estate','Educational Institutes','Growing Brands','Service-Based Businesses']),
  ('E-Commerce', '₹34,999+', '10 - 15 Days', 'For Online Stores', null, array['Online Store','Product Management','Payment Gateway Integration','Order Tracking','Customer Accounts','Admin Dashboard','Mobile Optimized'], array['Clothing Brands','Gift Stores','Cosmetic Businesses','Online Retailers']);

insert into public.portfolio_projects (industry, category, name, description, technologies, href, accent, featured)
values
  ('Health & Nutrition', 'Healthcare', 'NutriScan - AI Food Label Scanner', 'AI-powered food label scanner that analyzes ingredients, nutritional value and helps users make healthier choices.', array['Next.js','AI Vision','Supabase','PWA'], 'https://stacodestudios.com/portfolio/nutriscan-ai-food-label-scanner', 'from-lime-300 via-cyan-300 to-blue-500', true),
  ('Healthcare', 'Healthcare', 'Healing Hands Clinic', 'A professional website for a multi-speciality clinic with appointment booking and service management.', array['Next.js','Booking','SEO','Analytics'], 'https://stacodestudios.com/portfolio/healing-hands-clinic', 'from-sky-200 via-white to-blue-400', false),
  ('Education', 'Education', 'EduRise Coaching', 'Modern website for an educational institute with course details, student portal and enquiry system.', array['Next.js','CMS','Forms','SEO'], 'https://stacodestudios.com/portfolio/edurise-coaching', 'from-emerald-200 via-white to-green-500', false),
  ('E-Commerce', 'E-Commerce', 'Vestio - Fashion Store', 'Fully functional e-commerce website with product filters, secure checkout and order tracking.', array['Next.js','Payments','Storefront','Admin'], 'https://stacodestudios.com/portfolio/vestio-fashion-store', 'from-orange-200 via-stone-100 to-amber-500', false),
  ('Corporate', 'Corporate', 'Nexora Solutions', 'Corporate website for a digital agency showcasing services, case studies and client success.', array['Next.js','Framer Motion','CMS','SEO'], 'https://stacodestudios.com/portfolio/nexora-solutions', 'from-indigo-400 via-violet-500 to-purple-700', false),
  ('Business', 'Business', 'Innerva Interiors', 'Elegant website for an interior design studio to showcase projects and convert premium enquiries.', array['Next.js','Portfolio CMS','SEO','Forms'], 'https://stacodestudios.com/portfolio/innerva-interiors', 'from-amber-200 via-stone-500 to-slate-900', false);

insert into public.faqs (question, answer, category)
values
  ('How long does it take to build a website?', 'Most websites are delivered within 3 to 10 days depending on page count, content readiness and functionality.', 'General'),
  ('Can I update the website myself?', 'Yes. We can add an admin dashboard or CMS so your team can update content, portfolio items, blogs and services.', 'General'),
  ('Do you provide domain and hosting?', 'Yes. We help with domain setup, hosting configuration, DNS, SSL and launch readiness.', 'General'),
  ('Do you provide SEO services?', 'Yes. Every website includes basic SEO setup, and advanced monthly SEO packages are available.', 'SEO'),
  ('Will my website be mobile friendly?', 'Yes. Every Stacode Studios website is designed mobile first and tested across phones, tablets and desktops.', 'Design'),
  ('Can you redesign my existing website?', 'Yes. We can redesign your current site with improved UI, speed, SEO, lead capture and conversion structure.', 'Design');
