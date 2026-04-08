import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { ExternalLink } from "lucide-react";

export default function Partners() {
  const { partners } = useContent();
  const active = partners.filter((p) => p.active).sort((a, b) => a.sortOrder - b.sortOrder);
  const categories = Array.from(new Set(active.map((p) => p.category)));

  return (
    <>
      <PageHero title="Our Partners and Donors" subtitle="We are grateful for the organizations and individuals who make our work possible." breadcrumb={[{ label: "Home", href: "/" }, { label: "Partners" }]} />
      <section className="section-padding">
        <div className="container-wide mx-auto">
          {categories.map((cat) => (
            <div key={cat} className="mb-12">
              <h2 className="text-xl font-heading font-bold text-foreground mb-6">{cat} Partners</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {active.filter((p) => p.category === cat).map((p) => (
                  <div key={p.id} className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-heading font-semibold text-foreground">{p.name}</h3>
                    {p.description && <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>}
                    {p.website && (
                      <a href={p.website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs text-gold-dark hover:text-foreground">
                        Visit website <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
