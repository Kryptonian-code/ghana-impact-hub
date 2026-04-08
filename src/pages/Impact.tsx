import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { TrendingUp } from "lucide-react";

export default function Impact() {
  const { impactStats, projects, testimonials } = useContent();
  const completedProjects = projects.filter((p) => p.status === "completed");
  const activeProjects = projects.filter((p) => p.status === "active");
  const activeTestimonials = testimonials.filter((t) => t.active);

  return (
    <>
      <PageHero
        title="Our Impact"
        subtitle="Measurable results, real stories, and lasting change across communities in Ghana."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Impact" }]}
      />

      {/* Stats */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.id} className="bg-card rounded-xl border border-border p-8 text-center">
                <p className="text-4xl font-heading font-bold text-foreground">
                  {stat.value.toLocaleString()}{stat.suffix}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="section-padding bg-surface-warm">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8">Stories Behind the Numbers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTestimonials.map((t) => (
              <div key={t.id} className="bg-card rounded-xl border border-border p-6">
                <p className="text-foreground italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-heading font-semibold text-sm text-foreground">{t.author}</p>
                  {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8">Project Outcomes Summary</h2>
          <div className="space-y-6">
            {projects.filter(p => p.outcomes.length > 0).slice(0, 5).map((p) => (
              <div key={p.id} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-heading font-semibold text-foreground">{p.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.region} | {p.beneficiaries.toLocaleString()} beneficiaries</p>
                <ul className="mt-4 space-y-2">
                  {p.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
