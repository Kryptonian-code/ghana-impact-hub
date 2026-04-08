import { PageHero } from "@/components/shared/PageHero";

export default function Gallery() {
  return (
    <>
      <PageHero title="Gallery" subtitle="Photos and visuals from our projects, events, and community engagements." breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />
      <section className="section-padding">
        <div className="container-wide mx-auto text-center">
          <div className="bg-card rounded-xl border border-border p-12">
            <p className="text-muted-foreground">Gallery content is managed through the admin dashboard. Photos will appear here once uploaded.</p>
          </div>
        </div>
      </section>
    </>
  );
}
