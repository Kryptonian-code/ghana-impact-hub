import { useParams, Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { MapPin, Users, Calendar, CheckCircle, ArrowLeft } from "lucide-react";
import projectWater from "@/assets/project-water.jpg";
import projectWomen from "@/assets/project-women.jpg";
import projectEducation from "@/assets/project-education.jpg";

const projectImages: Record<string, string> = {
  "1": projectWater,
  "2": projectWomen,
  "3": projectEducation,
};

export default function ProjectDetails() {
  const { slug } = useParams();
  const { projects } = useContent();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="section-padding text-center">
        <h2 className="text-2xl font-heading font-bold text-foreground">Project not found</h2>
        <Link to="/projects" className="mt-4 inline-flex items-center gap-2 text-sm text-gold-dark">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHero
        title={project.title}
        subtitle={project.summary}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.title }]}
      />

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <img
                src={projectImages[project.id] || projectWater}
                alt={project.title}
                className="w-full rounded-xl aspect-[16/9] object-cover mb-8"
                width={800}
                height={450}
              />

              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{project.description}</p>

              {project.outcomes.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4">Key Outcomes</h3>
                  <ul className="space-y-3">
                    {project.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.partners.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4">Partners</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.partners.map((p, i) => (
                      <span key={i} className="px-4 py-2 bg-muted rounded-lg text-sm text-foreground">{p}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h3 className="font-heading font-semibold text-foreground mb-6">Project Details</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gold-dark mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{project.location}, {project.district}</p>
                      <p className="text-xs text-muted-foreground">{project.region}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gold-dark mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="text-sm font-medium text-foreground">
                        {formatDate(project.startDate)}
                        {project.endDate && ` to ${formatDate(project.endDate)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-gold-dark mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Beneficiaries</p>
                      <p className="text-sm font-medium text-foreground">{project.beneficiaries.toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "active" ? "bg-green-100 text-green-800" :
                      project.status === "completed" ? "bg-blue-100 text-blue-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Category</p>
                    <p className="text-sm font-medium text-foreground">{project.category}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Target Group</p>
                    <p className="text-sm text-foreground">{project.targetGroup}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    to="/donate"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Support This Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
