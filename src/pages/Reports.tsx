import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { Download, FileText } from "lucide-react";

export default function Reports() {
  const { reports } = useContent();
  const [category, setCategory] = useState("all");

  const categories = ["all", "annual", "strategic", "project", "audit", "newsletter", "policy"];
  const filtered = category === "all" ? reports : reports.filter((r) => r.category === category);
  const sorted = [...filtered].sort((a, b) => b.year - a.year);

  return (
    <>
      <PageHero title="Reports and Publications" subtitle="Access our annual reports, strategic plans, and other publications." breadcrumb={[{ label: "Home", href: "/" }, { label: "Reports" }]} />
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === c ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"}`}>
                {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          {sorted.length === 0 ? (
            <div className="text-center py-20"><p className="text-muted-foreground">No reports found in this category.</p></div>
          ) : (
            <div className="space-y-4">
              {sorted.map((r) => (
                <div key={r.id} className="bg-card rounded-xl border border-border p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-foreground">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{r.description}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{r.year}</span>
                      <span className="capitalize">{r.category}</span>
                    </div>
                  </div>
                  {r.downloadUrl && (
                    <a href={r.downloadUrl} className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
