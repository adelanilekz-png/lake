import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Phone, Clock, Star, Shield, Droplet, Wrench, Flame, Menu, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/ContactForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-primary text-primary-foreground shadow-lg py-3" : "bg-transparent text-white py-5"}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <Droplet className="h-8 w-8 text-secondary" />
            <span className="font-serif font-bold text-xl md:text-2xl tracking-tight">Andrea Plumbing</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("services")} className="font-medium hover:text-secondary transition-colors">Services</button>
            <button onClick={() => scrollTo("testimonials")} className="font-medium hover:text-secondary transition-colors">Reviews</button>
            <button onClick={() => scrollTo("work")} className="font-medium hover:text-secondary transition-colors">Our Work</button>
            <button onClick={() => scrollTo("faq")} className="font-medium hover:text-secondary transition-colors">FAQ</button>
            <a href="tel:5875850023" className="flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-5 py-2.5 rounded-md font-bold transition-transform hover:scale-105">
              <Phone className="h-5 w-5" />
              (587) 585-0023
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary pt-20 px-6 flex flex-col gap-6 items-start text-primary-foreground md:hidden animate-in slide-in-from-top">
          <button onClick={() => scrollTo("services")} className="text-2xl font-bold">Services</button>
          <button onClick={() => scrollTo("testimonials")} className="text-2xl font-bold">Reviews</button>
          <button onClick={() => scrollTo("work")} className="text-2xl font-bold">Our Work</button>
          <button onClick={() => scrollTo("faq")} className="text-2xl font-bold">FAQ</button>
          <a href="tel:5875850023" className="mt-4 flex items-center gap-2 bg-secondary text-secondary-foreground w-full justify-center py-4 rounded-md font-bold text-xl">
            <Phone className="h-6 w-6" />
            (587) 585-0023
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center">
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
                <a href="tel:5875850023" className="flex items-center justify-center gap-3 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-4 rounded-md font-bold text-xl transition-all hover:scale-105 shadow-xl shadow-secondary/20">
                  <Phone className="h-6 w-6" />
                  (587) 585-0023
                </a>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:ml-auto bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl animate-fade-in-up" style={{animationDelay: "0.2s"}}>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Request Service Now</h3>
              <p className="text-slate-300 mb-6 text-sm">Fill out the form below or call us directly. We respond immediately.</p>
              <div className="text-primary-foreground">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Our Services</h2>
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
              { title: "Backflow Prevention", icon: <Shield className="h-8 w-8" />, desc: "Testing and devices to keep your drinking water safe." }
            ].map((service, i) => (
              <Card key={i} className="group hover:border-secondary hover:shadow-xl transition-all duration-300 bg-slate-50 border-slate-200">
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
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Customer Reviews</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Don't just take our word for it.</h3>
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <span className="text-white ml-2 font-bold text-xl">5.0 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Michael T.", quote: "Called at 11 PM for a massive basement leak. They arrived in 30 minutes, stopped the water, and had everything fixed before I could even process what happened. Lifesavers." },
              { name: "Sarah L.", quote: "Finally, a contractor who actually shows up on time! The communication was excellent, the pricing was transparent, and the new water heater works perfectly. Highly recommend." },
              { name: "David R.", quote: "Very professional and respectful of our home. They put down drop cloths, wore shoe covers, and left the bathroom cleaner than it was when they started." }
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
      <section id="work" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Our Work</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Craftsmanship You Can See.</h3>
            </div>
            <p className="text-muted-foreground mt-4 md:mt-0 text-lg">Clean lines, perfect joints, reliable flow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img src="/work-heater.png" alt="Water Heater Installation" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h4 className="text-white font-bold text-xl">Water Heater Installation</h4>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img src="/work-faucet.png" alt="Kitchen Faucet" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h4 className="text-white font-bold text-xl">Kitchen Fixture Upgrade</h4>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img src="/work-pipes.png" alt="Pipe Repair" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h4 className="text-white font-bold text-xl">Copper Pipe Repair</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">FAQ</h2>
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
              { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit, e-transfers, and cash. Payment is only required once the job is completed to your satisfaction." }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-slate-50">
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-secondary text-left py-6">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-serif font-black mb-8 leading-tight">
            Plumbing Problem? <br className="hidden md:block" /> Don't Wait.
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-12 opacity-90 max-w-2xl mx-auto">
            Water damage happens fast. Call us right now and we'll dispatch an expert immediately.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a href="tel:5875850023" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-5 rounded-md font-black text-2xl transition-transform hover:scale-105 shadow-2xl">
              <Phone className="h-8 w-8" />
              (587) 585-0023
            </a>
            <span className="text-xl font-bold opacity-80">OR</span>
            <button onClick={() => window.scrollTo(0,0)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-secondary-foreground hover:bg-slate-100 px-8 py-5 rounded-md font-bold text-xl transition-all shadow-xl">
              Book Online
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-slate-400 py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Droplet className="h-6 w-6 text-secondary" />
            <span className="font-serif font-bold text-white text-xl">Andrea Plumbing</span>
          </div>
          <p>© {new Date().getFullYear()} Andrea Plumbing Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span>Licensed & Insured</span>
            <span className="w-1 h-1 rounded-full bg-slate-600"></span>
            <span>24/7 Available</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
