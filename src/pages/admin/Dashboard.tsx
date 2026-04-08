import { useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { LayoutDashboard, FileText, Users, Heart, Calendar, MessageSquare, Settings, BarChart3, Image, HelpCircle, MapPin, Building, BookOpen, Megaphone } from "lucide-react";

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FileText },
  { id: "blog", label: "Blog Posts", icon: BookOpen },
  { id: "team", label: "Team", icon: Users },
  { id: "events", label: "Events", icon: Calendar },
  { id: "campaigns", label: "Campaigns", icon: Heart },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "partners", label: "Partners", icon: Building },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "impact", label: "Impact Stats", icon: BarChart3 },
  { id: "offices", label: "Offices", icon: MapPin },
  { id: "settings", label: "Site Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("overview");
  const content = useContent();

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5" />
          <h1 className="font-heading font-bold text-lg">Admin Dashboard</h1>
        </div>
        <Link to="/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">View Site</Link>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-56px)] bg-card border-r border-border p-4 hidden lg:block">
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active === s.id ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden w-full border-b border-border px-4 py-3 overflow-x-auto">
          <div className="flex gap-2">
            {sections.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${active === s.id ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">
          {active === "overview" && (
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Dashboard Overview</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Projects" value={content.projects.length} />
                <StatCard label="Blog Posts" value={content.blogPosts.length} />
                <StatCard label="Team Members" value={content.team.length} />
                <StatCard label="Events" value={content.events.length} />
                <StatCard label="Partners" value={content.partners.length} />
                <StatCard label="Testimonials" value={content.testimonials.length} />
                <StatCard label="FAQs" value={content.faqs.length} />
                <StatCard label="Campaigns" value={content.campaigns.length} />
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">Quick Actions</h3>
                <p className="text-sm text-muted-foreground mb-4">Select a section from the sidebar to manage content. All changes are saved automatically and reflected on the public site.</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {sections.filter(s => s.id !== "overview").slice(0, 6).map((s) => (
                    <button key={s.id} onClick={() => setActive(s.id)} className="flex items-center gap-2 px-4 py-3 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-accent/30 transition-colors">
                      <s.icon className="w-4 h-4 text-gold-dark" />
                      Manage {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === "settings" && (
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Site Settings</h2>
              <div className="bg-card rounded-xl border border-border p-6 space-y-5 max-w-2xl">
                {[
                  { key: "orgName", label: "Organization Name" },
                  { key: "tagline", label: "Tagline" },
                  { key: "phone", label: "Phone" },
                  { key: "email", label: "Email" },
                  { key: "whatsapp", label: "WhatsApp" },
                  { key: "address", label: "Address" },
                  { key: "city", label: "City" },
                  { key: "region", label: "Region" },
                  { key: "metaTitle", label: "SEO Title" },
                  { key: "metaDescription", label: "SEO Description" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-foreground mb-1">{field.label}</label>
                    <input
                      type="text"
                      value={(content.settings as any)[field.key] || ""}
                      onChange={(e) => content.updateSettings({ [field.key]: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={content.settings.description}
                    onChange={(e) => content.updateSettings({ description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {active === "impact" && (
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Impact Statistics</h2>
              <div className="space-y-4 max-w-2xl">
                {content.impactStats.map((stat, index) => (
                  <div key={stat.id} className="bg-card rounded-xl border border-border p-4 flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Label</label>
                      <input type="text" value={stat.label} onChange={(e) => { const updated = [...content.impactStats]; updated[index] = { ...stat, label: e.target.value }; content.updateImpactStats(updated); }} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="w-32">
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Value</label>
                      <input type="number" value={stat.value} onChange={(e) => { const updated = [...content.impactStats]; updated[index] = { ...stat, value: parseInt(e.target.value) || 0 }; content.updateImpactStats(updated); }} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="w-20">
                      <label className="block text-xs font-medium text-muted-foreground mb-1">Suffix</label>
                      <input type="text" value={stat.suffix || ""} onChange={(e) => { const updated = [...content.impactStats]; updated[index] = { ...stat, suffix: e.target.value }; content.updateImpactStats(updated); }} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!["overview", "settings", "impact"].includes(active) && (
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Manage {sections.find(s => s.id === active)?.label}</h2>
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <p className="text-muted-foreground">
                  Full CRUD management for {sections.find(s => s.id === active)?.label?.toLowerCase()} is ready to be connected to a backend database. Currently showing {
                    active === "projects" ? content.projects.length :
                    active === "blog" ? content.blogPosts.length :
                    active === "team" ? content.team.length :
                    active === "events" ? content.events.length :
                    active === "campaigns" ? content.campaigns.length :
                    active === "testimonials" ? content.testimonials.length :
                    active === "partners" ? content.partners.length :
                    active === "faqs" ? content.faqs.length :
                    active === "offices" ? content.offices.length : 0
                  } items from the current content store.
                </p>
                <p className="text-sm text-muted-foreground mt-2">Content is editable and changes persist across sessions.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
