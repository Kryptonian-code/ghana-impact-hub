import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

export default function FAQPage() {
  const { faqs } = useContent();
  const active = faqs.filter((f) => f.active).sort((a, b) => a.sortOrder - b.sortOrder);
  const categories = Array.from(new Set(active.map((f) => f.category)));
  const [selectedCat, setSelectedCat] = useState("all");

  const filtered = selectedCat === "all" ? active : active.filter((f) => f.category === selectedCat);

  return (
    <>
      <PageHero title="Frequently Asked Questions" subtitle="Find answers to common questions about our organization and work." breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="flex flex-wrap gap-3 mb-10">
            <button onClick={() => setSelectedCat("all")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCat === "all" ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"}`}>All</button>
            {categories.map((c) => (
              <button key={c} onClick={() => setSelectedCat(c)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCat === c ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"}`}>{c}</button>
            ))}
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {filtered.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-card rounded-lg border border-border px-6">
                <AccordionTrigger className="text-left font-heading font-medium text-foreground hover:no-underline py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
