import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  const { settings, offices } = useContent();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero title="Contact Us" subtitle="We would love to hear from you. Reach out with questions, partnership inquiries, or feedback." breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="bg-card rounded-xl border border-border p-8 text-center">
                  <h2 className="text-xl font-heading font-bold text-foreground">Message Sent</h2>
                  <p className="mt-3 text-muted-foreground">Thank you for reaching out. We will respond within 2 working days.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
                      <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                      <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                    </div>
                    <button type="submit" className="w-full px-6 py-3.5 text-base font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-4 mb-10">
                <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><Phone className="w-4 h-4" /></div>
                  <span className="text-sm">{settings.phone}</span>
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><Mail className="w-4 h-4" /></div>
                  <span className="text-sm">{settings.email}</span>
                </a>
                <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><MessageCircle className="w-4 h-4" /></div>
                  <span className="text-sm">WhatsApp: {settings.whatsapp}</span>
                </a>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0"><MapPin className="w-4 h-4" /></div>
                  <span className="text-sm">{settings.address}, {settings.city}, {settings.region}</span>
                </div>
              </div>

              {/* Offices */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">Our Offices</h3>
              <div className="space-y-4">
                {offices.map((office) => (
                  <div key={office.id} className="bg-card rounded-xl border border-border p-4">
                    <h4 className="font-heading font-semibold text-sm text-foreground">{office.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{office.address}</p>
                    <p className="text-xs text-muted-foreground">{office.city}, {office.region}</p>
                    {office.phone && <p className="text-xs text-muted-foreground mt-1">{office.phone}</p>}
                    {office.email && <p className="text-xs text-muted-foreground">{office.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
