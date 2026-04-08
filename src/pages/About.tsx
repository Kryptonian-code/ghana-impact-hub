import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { Heart, Eye, BookOpen, Shield } from "lucide-react";

const valueIcons = [Heart, Eye, BookOpen, Shield];

export default function About() {
  const { about, settings } = useContent();

  return (
    <>
      <PageHero
        title="About Us"
        subtitle={`Learn about the mission, vision, and people behind ${settings.orgName}.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">Our Mission</span>
              <p className="mt-3 text-lg text-foreground leading-relaxed">{about.mission}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">Our Vision</span>
              <p className="mt-3 text-lg text-foreground leading-relaxed">{about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-surface-warm">
        <div className="container-narrow mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">Our History</span>
          <h2 className="mt-3 text-3xl font-heading font-bold text-foreground">How We Started</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg">{about.history}</p>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">What We Stand For</span>
            <h2 className="mt-3 text-3xl font-heading font-bold text-foreground">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.coreValues.map((val, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div key={i} className="bg-card rounded-xl border border-border p-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">{val.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="section-padding bg-surface-warm">
        <div className="container-narrow mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 lg:p-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">A Message from Our Founder</span>
            <p className="mt-6 text-lg text-foreground leading-relaxed italic">
              "{about.founderMessage.message}"
            </p>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="font-heading font-semibold text-foreground">{about.founderMessage.name}</p>
              <p className="text-sm text-muted-foreground">{about.founderMessage.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Info */}
      {about.registrationInfo && (
        <section className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Legal and Registration Information</h2>
            <p className="text-muted-foreground leading-relaxed">{about.registrationInfo}</p>
          </div>
        </section>
      )}
    </>
  );
}
