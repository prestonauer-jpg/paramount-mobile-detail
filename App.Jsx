import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";

// ================= CONFIG =================
const BRAND = {
  name: "Paramount Mobile Detail",
  tagline: "Professional mobile detailing — clean, protected, and turning heads.",
  subtag: "We come to you. Fast booking. Transparent pricing.",
  serviceArea: "Tempe • Scottsdale • Phoenix • Mesa",
};

const CONTACT = {
  phoneDisplay: "(480) 479-6100",
  phoneHref: "+14804796100",
  email: "paramountmobiledetail@gmail.com",
  hours: "Mon–Sun • 8am–6pm",
  instagram: "https://instagram.com/yourhandle", // change when ready
};

const BOOKING = {
  // Paste Square / Calendly / Acuity embed URL here if you have one
  embedUrl: "",
  submitEndpoint: "", // optional (Formspree or your API)
};

const PACKAGES = [
  {
    name: "Basic",
    from: 59,
    badge: "Great for maintenance",
    icon: Sparkles,
    bullets: [
      "Foam Wash & Wax",
      "Wheels & Tire Shine",
      "Interior Vacuum",
      "Wipe Down Console, Dash & Door Panels",
    ],
  },
  {
    name: "Standard",
    from: 129,
    badge: "Most popular",
    highlight: true,
    icon: Shield,
    bullets: [
      "Hand Wash & Wax",
      "Wheels & Tire Shine",
      "Interior Vacuum",
      "Wipe Down Console, Dash & Door Panels",
      "Shampoo Floor Mats",
      "Interior Wipe & Dust",
    ],
  },
  {
    name: "Full Detail",
    from: 199,
    badge: "Deep clean + decon",
    icon: Car,
    bullets: [
      "Full Interior Shampoo (Seats, Carpet, Floor Mats, Door Panels)",
      "Steam Clean & Deep Interior Clean",
      "Full Exterior Clay Bar Treatment",
    ],
  },
];

const REVIEWS = [
  { name: "Alex", text: "Booked in 2 minutes. Looked brand new.", meta: "5‑star service" },
  { name: "Maya", text: "Interior is spotless. Super professional.", meta: "On‑site detail" },
  { name: "Jordan", text: "Standard package is perfect every time.", meta: "Repeat customer" },
];

const FAQ = [
  { q: "Do you need water or power?", a: "If you have access, great — otherwise we can be fully mobile for many services." },
  { q: "What does the + mean in prices?", a: "Prices start at the listed amount. Larger or dirtier vehicles may cost more." },
  { q: "How do I know my booking is confirmed?", a: "If you use the calendar, it’s instant. If you request, we confirm by text." },
];

// ================= HELPERS =================
function cn(...c) { return c.filter(Boolean).join(" "); }

function formatMoney(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ================= MAIN =================
export default function ParamountMobileDetailSite() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState(null);

  const nav = useMemo(() => ([
    { label: "Pricing", id: "pricing" },
    { label: "Results", id: "results" },
    { label: "Booking", id: "booking" },
    { label: "FAQ", id: "faq" },
  ]), []);

  const heroStats = [
    { icon: Clock, title: "Fast booking", desc: "Pick a time in minutes" },
    { icon: MapPin, title: "We come to you", desc: BRAND.serviceArea },
    { icon: Shield, title: "Pro‑grade", desc: "Safe tools & chemicals" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Noise />

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button onClick={() => scrollToId("top")} className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5"><Sparkles className="h-5 w-5" /></div>
            <div className="text-left leading-tight">
              <div className="text-sm font-semibold">{BRAND.name}</div>
              <div className="text-xs text-white/60">Mobile Detailing</div>
            </div>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map(n => (
              <button key={n.id} onClick={() => scrollToId(n.id)} className="text-sm text-white/75 hover:text-white">{n.label}</button>
            ))}
            <button onClick={() => scrollToId("booking")} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">Book now</button>
          </nav>

          <button className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 md:hidden" onClick={() => setMobileMenu(v => !v)}>
            <div className="space-y-1"><div className="h-0.5 w-5 bg-white" /><div className="h-0.5 w-5 bg-white/80" /><div className="h-0.5 w-5 bg-white/60" /></div>
          </button>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="border-t border-white/10 md:hidden">
              <div className="mx-auto max-w-6xl px-4 py-3 grid gap-2">
                {nav.map(n => (
                  <button key={n.id} onClick={() => { setMobileMenu(false); scrollToId(n.id); }} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm">{n.label}</button>
                ))}
                <button onClick={() => { setMobileMenu(false); scrollToId("booking"); }} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950">Book now</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <main id="top">
        <section className="relative overflow-hidden">
          <Glow />
          <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-12 md:grid-cols-12 md:pb-24 md:pt-20">
            <div className="md:col-span-7">
              <h1 className="text-4xl font-semibold md:text-6xl">Premium detailing.<span className="block text-white/70">At your place.</span></h1>
              <p className="mt-5 max-w-xl text-white/70">{BRAND.tagline} {BRAND.subtag}</p>
              <div className="mt-7 flex gap-3">
                <button onClick={() => scrollToId("booking")} className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950">Book now</button>
                <a href={`tel:${CONTACT.phoneHref}`} className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm">Call/Text</a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroStats.map(s => (
                  <div key={s.title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2"><s.icon className="h-4 w-4" /><div className="text-sm font-semibold">{s.title}</div></div>
                    <div className="mt-2 text-xs text-white/65">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold md:text-4xl">Simple pricing</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PACKAGES.map(p => <PriceCard key={p.name} pkg={p} onBook={() => scrollToId("booking")} />)}
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-3xl font-semibold md:text-4xl">Results that pop</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-12">
            <GalleryCard className="md:col-span-7" title="Gloss + protection" subtitle="Washed and sealed." img="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80" />
            <GalleryCard className="md:col-span-5" title="Interior reset" subtitle="Deep interior clean." img="https://images.unsplash.com/photo-1515923152115-758a6b16f0d4?auto=format&fit=crop&w=1200&q=80" />
            <GalleryCard className="md:col-span-5" title="Wheels & tires" subtitle="Cleaned and dressed." img="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80" />
            <GalleryCard className="md:col-span-7" title="Full detail" subtitle="Shampoo + steam." img="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80" />
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="mx-auto max-w-6xl px-4 pb-20">
          <h2 className="text-3xl font-semibold md:text-4xl">Book in minutes</h2>
          {BOOKING.embedUrl ? (
            <iframe title="booking" src={BOOKING.embedUrl} className="mt-6 h-[600px] w-full rounded-3xl border border-white/10" />
          ) : (
            <BookingRequestForm onToast={t => setToast(t)} submitEndpoint={BOOKING.submitEndpoint} />
          )}
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 pb-24">
          <h2 className="text-3xl font-semibold md:text-4xl">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {FAQ.map(f => (
              <details key={f.q} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <summary className="cursor-pointer text-sm font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm text-white/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-neutral-950/50">
          <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
            <div>
              <div className="font-semibold">{BRAND.name}</div>
              <div className="mt-2 text-sm text-white/70">{BRAND.tagline}</div>
            </div>
            <div className="text-sm text-white/70">
              <div>📞 {CONTACT.phoneDisplay}</div>
              <div>✉️ {CONTACT.email}</div>
              <div>📍 {BRAND.serviceArea}</div>
            </div>
            <button onClick={() => scrollToId("booking")} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">Book now</button>
          </div>
        </footer>
      </main>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

// ================= COMPONENTS =================

function PriceCard({ pkg, onBook }) {
  const Icon = pkg.icon;
  return (
    <div className={cn("relative rounded-[28px] border p-6", pkg.highlight ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5")}>
      {pkg.highlight && <div className="absolute -top-3 left-6 rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-950">Most popular</div>}
      <div className="flex justify-between">
        <div>
          <div className="text-xl font-semibold">{pkg.name}</div>
          <div className="text-xs text-white/60">{pkg.badge}</div>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5"><Icon className="h-5 w-5" /></div>
      </div>
      <div className="mt-5 text-4xl font-semibold">{formatMoney(pkg.from)}+</div>
      <ul className="mt-5 grid gap-2 text-sm text-white/75">
        {pkg.bullets.map(b => (
          <li key={b} className="flex gap-3"><CheckCircle2 className="h-4 w-4" />{b}</li>
        ))}
      </ul>
      <button onClick={onBook} className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-neutral-950">Book {pkg.name}</button>
    </div>
  );
}

function GalleryCard({ className, title, subtitle, img }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[28px] border border-white/10", className)}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
      <div className="absolute inset-0 bg-neutral-950/60" />
      <div className="relative p-6">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-white/70">{subtitle}</div>
        <div className="mt-6 h-24 rounded-2xl border border-white/10 bg-white/5" />
      </div>
    </div>
  );
}

function BookingRequestForm({ onToast, submitEndpoint }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", date: "", package: "Standard" });
  const [done, setDone] = useState(false);

  const canSubmit = form.name && form.phone && form.address && form.date;

  async function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    if (submitEndpoint) await fetch(submitEndpoint, { method: "POST", body: JSON.stringify(form) });
    setDone(true);
    onToast?.({ title: "Request sent", message: "We’ll text you to confirm." });
  }

  if (done) return <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">Request received — we’ll confirm shortly.</div>;

  return (
    <form onSubmit={submit} className="mt-6 grid gap-3">
      <input className="rounded-2xl bg-white/5 p-3" placeholder="Name" onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <input className="rounded-2xl bg-white/5 p-3" placeholder="Phone" onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
      <input className="rounded-2xl bg-white/5 p-3" placeholder="Address" onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
      <input className="rounded-2xl bg-white/5 p-3" placeholder="Preferred date/time" onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
      <button disabled={!canSubmit} className="rounded-2xl bg-white px-4 py-3 text-neutral-950">Send request</button>
    </form>
  );
}

function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-4 right-4 rounded-2xl bg-neutral-900 p-4 border border-white/10">
      <div className="font-semibold">{toast.title}</div>
      <div className="text-sm text-white/70">{toast.message}</div>
      <button onClick={onClose} className="mt-2 text-xs underline">Close</button>
    </div>
  );
}

function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
    </div>
  );
}

function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 opacity-[0.05]"
      style={{ backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E)" }}
    />
  );
}
