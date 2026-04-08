import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  type SiteSettings, type HeroContent, type ImpactStat, type Project,
  type TeamMember, type Testimonial, type BlogPost, type Event,
  type Partner, type FAQ, type DonationCampaign, type Report,
  type Office, type AboutContent, type VolunteerOpportunity,
  defaultSiteSettings, defaultHero, defaultImpactStats, defaultProjects,
  defaultTestimonials, defaultAbout, defaultPartners, defaultFAQs,
  defaultBlogPosts, defaultEvents, defaultDonationCampaigns, defaultOffices,
  defaultTeam, defaultReports,
} from "@/lib/content";

interface ContentState {
  settings: SiteSettings;
  hero: HeroContent;
  impactStats: ImpactStat[];
  projects: Project[];
  team: TeamMember[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  events: Event[];
  partners: Partner[];
  faqs: FAQ[];
  campaigns: DonationCampaign[];
  reports: Report[];
  offices: Office[];
  about: AboutContent;
}

interface ContentContextType extends ContentState {
  updateSettings: (s: Partial<SiteSettings>) => void;
  updateHero: (h: Partial<HeroContent>) => void;
  updateImpactStats: (stats: ImpactStat[]) => void;
  updateProjects: (p: Project[]) => void;
  updateTeam: (t: TeamMember[]) => void;
  updateTestimonials: (t: Testimonial[]) => void;
  updateBlogPosts: (b: BlogPost[]) => void;
  updateEvents: (e: Event[]) => void;
  updatePartners: (p: Partner[]) => void;
  updateFAQs: (f: FAQ[]) => void;
  updateCampaigns: (c: DonationCampaign[]) => void;
  updateReports: (r: Report[]) => void;
  updateOffices: (o: Office[]) => void;
  updateAbout: (a: Partial<AboutContent>) => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(`ngo_${key}`);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(`ngo_${key}`, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => loadFromStorage("settings", defaultSiteSettings));
  const [hero, setHero] = useState<HeroContent>(() => loadFromStorage("hero", defaultHero));
  const [impactStats, setImpactStats] = useState<ImpactStat[]>(() => loadFromStorage("impactStats", defaultImpactStats));
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage("projects", defaultProjects));
  const [team, setTeam] = useState<TeamMember[]>(() => loadFromStorage("team", defaultTeam));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadFromStorage("testimonials", defaultTestimonials));
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => loadFromStorage("blogPosts", defaultBlogPosts));
  const [events, setEvents] = useState<Event[]>(() => loadFromStorage("events", defaultEvents));
  const [partners, setPartners] = useState<Partner[]>(() => loadFromStorage("partners", defaultPartners));
  const [faqs, setFAQs] = useState<FAQ[]>(() => loadFromStorage("faqs", defaultFAQs));
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>(() => loadFromStorage("campaigns", defaultDonationCampaigns));
  const [reports, setReports] = useState<Report[]>(() => loadFromStorage("reports", defaultReports));
  const [offices, setOffices] = useState<Office[]>(() => loadFromStorage("offices", defaultOffices));
  const [about, setAbout] = useState<AboutContent>(() => loadFromStorage("about", defaultAbout));

  const createUpdater = <T,>(key: string, setter: React.Dispatch<React.SetStateAction<T>>) => (val: T) => {
    setter(val);
    saveToStorage(key, val);
  };

  const value: ContentContextType = {
    settings, hero, impactStats, projects, team, testimonials, blogPosts,
    events, partners, faqs, campaigns, reports, offices, about,
    updateSettings: (s) => { const n = { ...settings, ...s }; setSettings(n); saveToStorage("settings", n); },
    updateHero: (h) => { const n = { ...hero, ...h }; setHero(n); saveToStorage("hero", n); },
    updateImpactStats: createUpdater("impactStats", setImpactStats),
    updateProjects: createUpdater("projects", setProjects),
    updateTeam: createUpdater("team", setTeam),
    updateTestimonials: createUpdater("testimonials", setTestimonials),
    updateBlogPosts: createUpdater("blogPosts", setBlogPosts),
    updateEvents: createUpdater("events", setEvents),
    updatePartners: createUpdater("partners", setPartners),
    updateFAQs: createUpdater("faqs", setFAQs),
    updateCampaigns: createUpdater("campaigns", setCampaigns),
    updateReports: createUpdater("reports", setReports),
    updateOffices: createUpdater("offices", setOffices),
    updateAbout: (a) => { const n = { ...about, ...a }; setAbout(n); saveToStorage("about", n); },
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
