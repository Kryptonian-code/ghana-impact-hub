import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { ArrowRight, Heart, Users, MapPin, TrendingUp, Quote, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroImage from "@/assets/hero-community.jpg";
import aboutImage from "@/assets/about-preview.jpg";
import projectWater from "@/assets/project-water.jpg";
import projectWomen from "@/assets/project-women.jpg";
import projectEducation from "@/assets/project-education.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const projectImages: Record<string, string> = {
  "1": projectWater,
  "2": projectWomen,
  "3": projectEducation,
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const step = Math.max(1, Math.floor(value / (duration / 16)));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 1 : 1)}k` : count.toString();

  return (
    <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-accent">
      {count >= 10000 ? `${Math.round(count / 1000)}k` : count.toLocaleString()}{suffix}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    planned: "bg-amber-100 text-amber-800",
    paused: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.active}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function Index() {
  const { hero, impactStats, projects, testimonials, partners, faqs, blogPosts, about, settings } = useContent();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const activeFAQs = faqs.filter((f) => f.active).sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 6);
  const activeTestimonials = testimonials.filter((t) => t.active);
  const activePartners = partners.filter((p) => p.active).sort((a, b) => a.sortOrder - b.sortOrder);
  const recentPosts = [...blogPosts].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Community gathering in Ghana" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
        </div>
        <div className="relative container-wide mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight tracking-tight">
              {hero.headline}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-primary-foreground/80 leading-relaxed max-w-xl">
              {hero.subheadline}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to={hero.primaryCta.link}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-lg gradient-gold text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <Heart className="w-5 h-5" />
                {hero.primaryCta.label}
              </Link>
              <Link
                to={hero.secondaryCta.link}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-lg border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                {hero.secondaryCta.label}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Impact Snapshot */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {impactStats.map((stat) => (
                <div key={stat.id}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-1 text-sm text-primary-foreground/60 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-surface-warm">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">About Us</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-foreground">
                Our Mission and Vision
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {about.mission}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {about.vision}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-foreground hover:text-gold-dark transition-colors"
              >
                Learn more about our story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src={aboutImage}
                alt="Children learning in a classroom"
                className="rounded-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg p-5 border border-border">
                <p className="text-2xl font-heading font-bold text-foreground">15+</p>
                <p className="text-sm text-muted-foreground">Years of Impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">Our Work</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Featured Projects
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Explore some of the programs currently transforming communities across Ghana.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/10] overflow-hidden">
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
                    <StatusBadge status={project.status} />
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-gold-dark transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}, {project.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {project.beneficiaries.toLocaleString()} beneficiaries
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats (Full Section) */}
      <section className="gradient-primary text-primary-foreground section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent/70">Our Reach</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold">
              Impact at a Glance
            </h2>
            <p className="mt-4 text-primary-foreground/70 leading-relaxed">
              Numbers that reflect the real difference our programs are making in communities across Ghana.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.id} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-primary-foreground/60 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Work Matters */}
      <section className="section-padding bg-surface-warm">
        <div className="container-narrow mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">Why It Matters</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Why Our Work Matters
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Across Ghana, millions of people in rural and underserved communities face barriers to clean water, quality education, and economic opportunity. These are not distant problems. They affect real families, real children, and real futures.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our programs are designed to address these challenges at their roots, working directly with communities to build solutions that last. When a mother can access clean water, her children stay healthier. When a young woman receives business training, her entire household benefits. When a school gets better resources, a generation moves closer to its potential.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/impact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              See Our Impact
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">Stories</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Voices from the Communities We Serve
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {activeTestimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="bg-card rounded-xl border border-border p-8 relative">
                <Quote className="w-8 h-8 text-accent/50 mb-4" />
                <p className="text-foreground leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-heading font-semibold text-sm text-foreground">{t.author}</p>
                  {t.role && <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-surface-warm">
        <div className="container-wide mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">Our Partners</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Trusted by Leading Organizations
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {activePartners.map((p) => (
              <div key={p.id} className="bg-card rounded-lg border border-border p-6 flex items-center justify-center min-h-[80px]">
                <span className="text-sm font-medium text-muted-foreground text-center">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/partners"
              className="text-sm font-medium text-foreground hover:text-gold-dark transition-colors"
            >
              View all partners and donors
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">News</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Latest Updates
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <span className="text-xs font-medium text-gold-dark">{post.category}</span>
                  <h3 className="mt-2 text-lg font-heading font-semibold text-foreground group-hover:text-gold-dark transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {new Date(post.publishDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-gold-dark transition-colors"
            >
              Read more updates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface-warm">
        <div className="container-narrow mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">FAQ</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {activeFAQs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-card rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left font-heading font-medium text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="text-sm font-medium text-foreground hover:text-gold-dark transition-colors"
            >
              View all questions
            </Link>
          </div>
        </div>
      </section>

      {/* Donation and Volunteer CTA */}
      <section className="gradient-primary text-primary-foreground section-padding">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70 max-w-xl mx-auto leading-relaxed">
            Whether you choose to give, volunteer, or simply share our work with others, every action brings us closer to a stronger Ghana.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-lg gradient-gold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-lg border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
