import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";

const causeAreas = ["Education", "Health", "Women Empowerment", "Youth", "Environment", "Community Development", "Other"];
const skillOptions = ["Teaching", "Healthcare", "Administration", "IT/Technology", "Communications", "Finance", "Construction", "Driving", "Other"];

export default function Volunteer() {
  const { settings } = useContent();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", location: "",
    causeArea: "", availability: "", motivation: "",
    skills: [] as string[],
  });

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <PageHero title="Application Received" breadcrumb={[{ label: "Home", href: "/" }, { label: "Volunteer" }]} />
        <section className="section-padding">
          <div className="container-narrow mx-auto text-center">
            <div className="bg-card rounded-xl border border-border p-12">
              <h2 className="text-2xl font-heading font-bold text-foreground">Thank You for Your Interest</h2>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                We have received your volunteer application. Our team will review it and get back to you within 5 working days.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Volunteer With Us"
        subtitle="Join a community of people making a difference across Ghana. Your time and skills can change lives."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Volunteer" }]}
      />

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Volunteer Application</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="City or town" className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Preferred Cause Area</label>
                  <select value={formData.causeArea} onChange={(e) => setFormData({ ...formData, causeArea: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select a cause area</option>
                    {causeAreas.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          formData.skills.includes(skill)
                            ? "gradient-primary text-primary-foreground"
                            : "bg-muted text-foreground hover:bg-accent/30"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Availability</label>
                  <select value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select your availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="flexible">Flexible</option>
                    <option value="fulltime">Full-time (3+ months)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Why do you want to volunteer?</label>
                  <textarea rows={4} value={formData.motivation} onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                </div>

                <button type="submit" className="w-full px-6 py-3.5 text-base font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  Submit Application
                </button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-surface-warm rounded-xl p-6 sticky top-24">
                <h3 className="font-heading font-semibold text-foreground mb-4">Why Volunteer With Us?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Work directly with communities across Ghana</li>
                  <li>Gain hands-on experience in community development</li>
                  <li>Develop new skills and expand your network</li>
                  <li>Make a tangible difference in people's lives</li>
                  <li>Receive a certificate of service and reference letter</li>
                </ul>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Have questions? Contact us at{" "}
                    <a href={`mailto:${settings.email}`} className="text-foreground font-medium hover:text-gold-dark">
                      {settings.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
