import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function Events() {
  const { events } = useContent();
  const [filter, setFilter] = useState("all");

  const statuses = ["all", "upcoming", "ongoing", "completed"];
  const filtered = filter === "all" ? events : events.filter((e) => e.status === filter);

  return (
    <>
      <PageHero
        title="Events"
        subtitle="Join us at upcoming events, workshops, and community gatherings."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="flex gap-3 mb-10">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === s ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No events found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filtered.map((event) => (
                <div key={event.id} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      event.status === "upcoming" ? "bg-green-100 text-green-800" :
                      event.status === "ongoing" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">{event.category}</span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">{event.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-gold-dark" />
                      {new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-gold-dark" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-gold-dark" />
                      {event.location}
                    </div>
                  </div>
                  {event.speakers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">Speakers</p>
                      <p className="text-sm text-foreground">{event.speakers.join(", ")}</p>
                    </div>
                  )}
                  {event.registrationOpen && (
                    <button className="mt-4 w-full py-2.5 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                      Register for This Event
                    </button>
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
