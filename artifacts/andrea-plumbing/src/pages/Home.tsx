import React, { useEffect, useState } from "react";
import { Phone, Clock, Star, Shield, Droplet, Wrench, Flame, Menu, X, ArrowRight, CheckCircle2, MapPin, Mail, Tag, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/ContactForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const logoSrc = "/logo.png";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", id: "top" },
    { label: "About Us", id: "about" },
    { label: "Services", id: "services" },
    { label: "Promotions", id: "promotions" },
    { label: "Contact", id: "contact" },
    { label: "Service Request", id: "service-request" },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-primary text-primary-foreground shadow-lg py-3" : "bg-transparent text-white py-5"}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("top")} data-testid="link-home-logo">
            <img src={logoSrc} alt="Andrea Plumbing Solutions Logo" className="h-12 w-12 object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-black text-lg tracking-tight">Andrea Plumbing</span>
              <span className="text-xs font-medium opacity-70 tracking-widest uppercase">Solutions</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`font-medium hover:text-secondary transition-colors text-sm ${link.label === "Service Request" ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md font-bold" : ""}`}
                data-testid={`link-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:5875850023"
              className="flex items-center gap-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-md font-bold transition-all text-sm"
              data-testid="link-phone-nav"
            >
              <Phone className="h-4 w-4" />
              (587) 585-0023
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary pt-20 px-6 flex flex-col gap-5 items-start text-primary-foreground lg:hidden animate-in slide-in-from-top overflow-y-auto">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-xl font-bold hover:text-secondary transition-colors w-full text-left border-b border-white/10 pb-4"
              data-testid={`link-mobile-${link.id}`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:5875850023"
            className="mt-2 flex items-center gap-2 bg-secondary text-secondary-foreground w-full justify-center py-4 rounded-md font-bold text-xl"
            data-testid="link-phone-mobile"
          >
            <Phone className="h-6 w-6" />
            (587) 585-0023
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section id="top" className="relative min-h-[90vh] pt-32 pb-20 flex items-center">
        <div className="absolute inset-0 bg-primary z-0">
          <img
            src="/hero-bg.png"
            alt="Professional Plumber"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-fade-in-up">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-secondary/20 text-secondary border border-secondary/50 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-md">
                  <Clock className="h-4 w-4" /> 24/7 Emergency Service
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-md">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> 5.0 Star Rated
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black leading-[1.1] tracking-tight text-white">
                Plumbing Fixed. <span className="text-secondary">Zero Stress.</span>
              </h1>

              <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                Fast, dependable plumbing service when you need it most. We show up on time, do it right, and leave your home spotless.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:5875850023"
                  className="flex items-center justify-center gap-3 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 rounded-md font-bold text-xl transition-all hover:scale-105 shadow-xl shadow-secondary/20"
                  data-testid="link-hero-phone"
                >
                  <Phone className="h-6 w-6" />
                  (587) 585-0023
                </a>
                <button
                  onClick={() => scrollTo("service-request")}
                  className="flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:border-secondary hover:text-secondary px-8 py-4 rounded-md font-bold text-xl transition-all"
                  data-testid="button-hero-service-request"
                >
                  Request Service
                </button>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:ml-auto bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Request Service Now</h3>
              <p className="text-slate-300 mb-6 text-sm">Fill out the form below or call us directly. We respond immediately.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-secondary font-bold tracking-widest uppercase text-sm">About Us</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                "Trust in Every Drop."
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Andrea Plumbing Solutions was founded on one simple belief: every homeowner deserves a plumber they can trust completely. We don't just fix pipes — we fix the stress that comes with plumbing problems.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Available 24 hours a day, 7 days a week, we respond fast, communicate clearly, and always stand behind our work. Whether it's a dripping faucet or a flooded basement, we treat every job with the same professionalism and care.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <p className="text-4xl font-black text-secondary">24/7</p>
                  <p className="text-sm text-muted-foreground font-medium mt-1">Always Available</p>
                </div>
                <div className="text-center border-x border-border">
                  <p className="text-4xl font-black text-secondary">5.0</p>
                  <p className="text-sm text-muted-foreground font-medium mt-1">Star Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-black text-secondary">100%</p>
                  <p className="text-sm text-muted-foreground font-medium mt-1">Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-primary text-primary-foreground border-0 shadow-xl">
                <CardContent className="p-6 flex flex-col gap-3">
                  <Award className="h-8 w-8 text-secondary" />
                  <h4 className="font-bold text-lg">Licensed & Insured</h4>
                  <p className="text-sm text-slate-300">Fully licensed, bonded, and insured for your complete peace of mind.</p>
                </CardContent>
              </Card>
              <Card className="bg-secondary text-secondary-foreground border-0 shadow-xl mt-6">
                <CardContent className="p-6 flex flex-col gap-3">
                  <Clock className="h-8 w-8" />
                  <h4 className="font-bold text-lg">Fast Response</h4>
                  <p className="text-sm opacity-80">Emergencies answered within 60 minutes. No exceptions.</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-100 border-0 shadow-lg -mt-2">
                <CardContent className="p-6 flex flex-col gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <h4 className="font-bold text-lg text-primary">Family Values</h4>
                  <p className="text-sm text-muted-foreground">We treat your home like our own — respectful, clean, careful.</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 text-white border-0 shadow-xl mt-4">
                <CardContent className="p-6 flex flex-col gap-3">
                  <Shield className="h-8 w-8 text-secondary" />
                  <h4 className="font-bold text-lg">Quality Guaranteed</h4>
                  <p className="text-sm text-slate-300">We don't leave until the job is done right. Every single time.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Expert Solutions for Every Pipe.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Emergency Plumbing", icon: <Clock className="h-8 w-8" />, desc: "Burst pipes or overflowing toilets? We're on our way right now." },
              { title: "Drain Cleaning", icon: <Droplet className="h-8 w-8" />, desc: "Tough clogs cleared fast. We restore flow and prevent backups." },
              { title: "Water Heaters", icon: <Flame className="h-8 w-8" />, desc: "Installation, repair, and maintenance for continuous hot water." },
              { title: "Leak Detection", icon: <CheckCircle2 className="h-8 w-8" />, desc: "Pinpointing hidden leaks before they cause structural damage." },
              { title: "Fixture Installation", icon: <Wrench className="h-8 w-8" />, desc: "Professional installation of sinks, toilets, and modern faucets." },
              { title: "Pipe Repair", icon: <ArrowRight className="h-8 w-8" />, desc: "Durable repairs and complete replacements for failing pipes." },
              { title: "Kitchen & Bath", icon: <Droplet className="h-8 w-8" />, desc: "Full plumbing setups for your remodels and renovations." },
              { title: "Backflow Prevention", icon: <Shield className="h-8 w-8" />, desc: "Testing and devices to keep your drinking water safe." },
            ].map((service, i) => (
              <Card key={i} className="group hover:border-secondary hover:shadow-xl transition-all duration-300 bg-white border-slate-200">
                <CardContent className="p-6">
                  <div className="h-14 w-14 rounded-lg bg-primary/5 text-secondary flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-primary">{service.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Customer Reviews</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Don't just take our word for it.</h3>
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-6 w-6 fill-current" />)}
              <span className="text-white ml-2 font-bold text-xl">5.0 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Michael T.", quote: "Called at 11 PM for a massive basement leak. They arrived in 30 minutes, stopped the water, and had everything fixed before I could even process what happened. Lifesavers." },
              { name: "Sarah L.", quote: "Finally, a contractor who actually shows up on time! The communication was excellent, the pricing was transparent, and the new water heater works perfectly. Highly recommend." },
              { name: "David R.", quote: "Very professional and respectful of our home. They put down drop cloths, wore shoe covers, and left the bathroom cleaner than it was when they started." },
            ].map((review, i) => (
              <Card key={i} className="bg-white/10 border-white/20 backdrop-blur-sm shadow-none">
                <CardContent className="p-8">
                  <div className="flex gap-1 text-yellow-400 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-5 w-5 fill-current" />)}
                  </div>
                  <p className="text-lg text-slate-200 mb-6 leading-relaxed italic">"{review.quote}"</p>
                  <p className="font-bold text-white">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section id="work" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Our Work</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Craftsmanship You Can See.</h3>
            </div>
            <p className="text-muted-foreground mt-4 md:mt-0 text-lg">Clean lines, perfect joints, reliable flow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: "/work-heater.png", label: "Water Heater Installation" },
              { src: "/work-faucet.png", label: "Kitchen Fixture Upgrade" },
              { src: "/work-pipes.png", label: "Copper Pipe Repair" },
            ].map((item, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                <img src={item.src} alt={item.label} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h4 className="text-white font-bold text-xl">{item.label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promotions" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #f97316 0, #f97316 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Current Promotions</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold">Special Offers for You.</h3>
            <p className="text-slate-400 mt-4 text-lg">Quality service at even better value. Limited-time deals — don't miss out.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tag: "New Customers",
                title: "$25 Off",
                subtitle: "Your First Service Call",
                desc: "First-time customers get $25 off any service. Just mention this offer when booking.",
                color: "bg-secondary",
              },
              {
                tag: "Most Popular",
                title: "Free Inspection",
                subtitle: "With Any Repair",
                desc: "Book any plumbing repair and receive a complimentary whole-home inspection — valued at $80.",
                color: "bg-primary",
                featured: true,
              },
              {
                tag: "Winter Special",
                title: "10% Off",
                subtitle: "Water Heater Services",
                desc: "Save 10% on water heater installation or repair. Offer valid for a limited time.",
                color: "bg-slate-700",
              },
            ].map((promo, i) => (
              <div key={i} className={`relative rounded-2xl p-8 flex flex-col gap-4 shadow-2xl border ${promo.featured ? "border-secondary scale-105" : "border-white/10"}`} style={{ background: i === 1 ? "linear-gradient(135deg, #0f172a, #1e293b)" : undefined, backgroundColor: i !== 1 ? undefined : undefined }}>
                {promo.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">Best Deal</div>}
                <span className={`inline-flex items-center gap-1.5 ${promo.color} text-white text-xs font-bold px-3 py-1 rounded-full w-fit`}>
                  <Tag className="h-3 w-3" /> {promo.tag}
                </span>
                <div>
                  <p className="text-5xl font-black text-white">{promo.title}</p>
                  <p className="text-secondary font-bold text-lg mt-1">{promo.subtitle}</p>
                </div>
                <p className="text-slate-400 leading-relaxed flex-1">{promo.desc}</p>
                <button
                  onClick={() => scrollTo("service-request")}
                  className="mt-2 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold py-3 rounded-lg transition-all hover:scale-105"
                  data-testid={`button-promo-${i}`}
                >
                  Claim This Offer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">FAQ</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Questions? We've Got Answers.</h3>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Do you offer 24/7 emergency service?", a: "Yes, we are available 24 hours a day, 7 days a week. Plumbing emergencies don't wait for business hours, and neither do we." },
              { q: "How quickly can you come?", a: "For emergencies, we aim to be at your property within 60 minutes. For standard service calls, we can usually accommodate same-day or next-day appointments." },
              { q: "Do you provide free estimates?", a: "Yes! We provide upfront, transparent pricing before any work begins so there are no surprises on your final bill." },
              { q: "Are you licensed and insured?", a: "Absolutely. Andrea Plumbing Solutions is fully licensed, bonded, and insured in Canada. Our work meets all local codes and regulations." },
              { q: "What areas do you serve?", a: "We serve the greater local metropolitan area and surrounding suburbs. Call us to confirm coverage for your specific address." },
              { q: "How do I prevent drain clogs?", a: "Avoid pouring grease, coffee grounds, and stringy food waste down the kitchen sink. In the bathroom, use hair catchers. We recommend an annual professional drain cleaning to prevent major backups." },
              { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit, e-transfers, and cash. Payment is only required once the job is completed to your satisfaction." },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-slate-50">
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-secondary text-left py-6">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Contact Us</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">We're Always Here.</h3>
            <p className="text-slate-300 mt-4 text-lg">Reach out any way that works for you — we're available around the clock.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center gap-4 p-8 bg-white/10 rounded-2xl border border-white/20">
              <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
                <Phone className="h-7 w-7 text-secondary-foreground" />
              </div>
              <h4 className="font-bold text-xl">Call or Text</h4>
              <a href="tel:5875850023" className="text-secondary text-2xl font-black hover:text-secondary/80 transition-colors" data-testid="link-contact-phone">
                (587) 585-0023
              </a>
              <p className="text-slate-400 text-sm">Available 24/7 for emergencies</p>
            </div>

            <div className="flex flex-col items-center text-center gap-4 p-8 bg-white/10 rounded-2xl border border-white/20">
              <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
                <Mail className="h-7 w-7 text-secondary-foreground" />
              </div>
              <h4 className="font-bold text-xl">Email Us</h4>
              <a href="mailto:andrea.plumbing.s@gmail.com" className="text-secondary font-bold hover:text-secondary/80 transition-colors break-all" data-testid="link-contact-email">
                andrea.plumbing.s@gmail.com
              </a>
              <p className="text-slate-400 text-sm">We reply within a few hours</p>
            </div>

            <div className="flex flex-col items-center text-center gap-4 p-8 bg-white/10 rounded-2xl border border-white/20">
              <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
                <MapPin className="h-7 w-7 text-secondary-foreground" />
              </div>
              <h4 className="font-bold text-xl">Service Area</h4>
              <p className="text-slate-200 font-bold">Calgary & Surrounding Area</p>
              <p className="text-slate-400 text-sm">Alberta, Canada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Request Section */}
      <section id="service-request" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Service Request</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Book Your Service.</h3>
            <p className="text-muted-foreground mt-4 text-lg">Fill out the form and we'll get back to you right away. For emergencies, always call directly.</p>
          </div>

          <div className="bg-primary p-8 md:p-10 rounded-2xl shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-serif font-black mb-8 leading-tight">
            Plumbing Problem? <br className="hidden md:block" /> Don't Wait.
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-12 opacity-90 max-w-2xl mx-auto">
            Water damage happens fast. Call us right now and we'll dispatch an expert immediately.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a
              href="tel:5875850023"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-5 rounded-md font-black text-2xl transition-transform hover:scale-105 shadow-2xl"
              data-testid="link-cta-phone"
            >
              <Phone className="h-8 w-8" />
              (587) 585-0023
            </a>
            <span className="text-xl font-bold opacity-80">OR</span>
            <button
              onClick={() => scrollTo("service-request")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-secondary-foreground hover:bg-slate-100 px-8 py-5 rounded-md font-bold text-xl transition-all shadow-xl"
              data-testid="button-cta-request"
            >
              Request Service Online
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-slate-400 py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt="Andrea Plumbing Solutions" className="h-10 w-10 object-contain" />
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-bold text-white text-lg">Andrea Plumbing</span>
                <span className="text-xs text-slate-400 tracking-widest uppercase">Solutions</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="hover:text-secondary transition-colors" data-testid={`link-footer-${link.id}`}>
                  {link.label}
                </button>
              ))}
            </div>
            <a href="tel:5875850023" className="flex items-center gap-2 text-secondary font-bold hover:text-secondary/80 transition-colors">
              <Phone className="h-4 w-4" />
              (587) 585-0023
            </a>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {new Date().getFullYear()} Andrea Plumbing Solutions. All rights reserved.</p>
            <div className="flex items-center gap-4 font-medium">
              <span>Licensed & Insured</span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span>24/7 Available</span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span>"Trust in Every Drop"</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
