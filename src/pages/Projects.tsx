import { useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { MapPin, Users, Search } from "lucide-react";
import projectWater from "@/assets/project-water.jpg";
import projectWomen from "@/assets/project-women.jpg";
import projectEducation from "@/assets/project-education.jpg";

const projectImages: Record<string, string> = {
  "1": projectWater,
  "2": projectWomen,
  "3": projectEducation,
};

const ITEMS_PER_PAGE = 9;

export default function Projects() {
  const { projects } = useContent();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const statuses = ["all", "active", "completed", "planned", "paused"];

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.summary.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchStatus && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="Browse the programs and initiatives that are creating real change across Ghana."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <section className="section-padding">
        <div className="container-wide mx-auto">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects match your current filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={projectImages[project.id] || projectWater}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={800}
                      height={500}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === "active" ? "bg-green-100 text-green-800" :
                        project.status === "completed" ? "bg-blue-100 text-blue-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">{project.category}</span>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-gold-dark transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.summary}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{project.region}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{project.beneficiaries.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    page === i + 1
                      ? "gradient-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
