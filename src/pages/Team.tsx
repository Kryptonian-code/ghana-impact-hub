import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";

export default function Team() {
  const { team } = useContent();
  const sorted = [...team].sort((a, b) => a.sortOrder - b.sortOrder);
  const leadership = sorted.filter((m) => m.category === "leadership");
  const staff = sorted.filter((m) => m.category === "staff");
  const board = sorted.filter((m) => m.category === "board");
  const advisors = sorted.filter((m) => m.category === "advisor");

  const renderGroup = (title: string, members: typeof team) => {
    if (members.length === 0) return null;
    return (
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-8">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((m) => (
            <div key={m.id} className="bg-card rounded-xl border border-border p-6">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-xl font-heading font-bold text-muted-foreground">{m.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <h3 className="font-heading font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm text-gold-dark">{m.title}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.shortBio}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <PageHero title="Our Team" subtitle="Meet the people behind our mission." breadcrumb={[{ label: "Home", href: "/" }, { label: "Team" }]} />
      <section className="section-padding">
        <div className="container-wide mx-auto">
          {renderGroup("Leadership", leadership)}
          {renderGroup("Staff", staff)}
          {renderGroup("Board of Directors", board)}
          {renderGroup("Advisors", advisors)}
        </div>
      </section>
    </>
  );
}
