// Content types for the NGO website system
// All public-facing content is managed through these types

export interface SiteSettings {
  orgName: string;
  tagline: string;
  description: string;
  logo?: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  city: string;
  region: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  metaTitle: string;
  metaDescription: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCta: { label: string; link: string };
  secondaryCta: { label: string; link: string };
  image: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  location: string;
  region: string;
  district: string;
  startDate: string;
  endDate?: string;
  status: "planned" | "active" | "completed" | "paused" | "archived";
  targetGroup: string;
  beneficiaries: number;
  outcomes: string[];
  images: string[];
  partners: string[];
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  category: "staff" | "leadership" | "board" | "advisor";
  photo?: string;
  shortBio: string;
  fullBio?: string;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  title: string;
  quote: string;
  story?: string;
  author: string;
  role?: string;
  image?: string;
  category?: string;
  projectId?: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  author: string;
  publishDate: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  registrationOpen: boolean;
  speakers: string[];
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  category: string;
  website?: string;
  description?: string;
  active: boolean;
  sortOrder: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  active: boolean;
}

export interface DonationCampaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  purpose: string;
  goalAmount: number;
  raisedAmount: number;
  image?: string;
  active: boolean;
  momoInstructions: string;
  bankInstructions: string;
}

export interface Report {
  id: string;
  title: string;
  category: "annual" | "project" | "strategic" | "audit" | "newsletter" | "policy" | "brochure";
  year: number;
  description: string;
  downloadUrl?: string;
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  causeArea: string;
  skillsRequired: string[];
  active: boolean;
}

export interface Office {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface AboutContent {
  mission: string;
  vision: string;
  history: string;
  coreValues: { title: string; description: string }[];
  founderMessage: { name: string; title: string; message: string; photo?: string };
  registrationInfo?: string;
}

// Default content for initial setup
export const defaultSiteSettings: SiteSettings = {
  orgName: "Ghana Community Foundation",
  tagline: "Building Stronger Communities Across Ghana",
  description: "We work alongside communities in Ghana to create lasting change through education, health, and economic empowerment programs that put people first.",
  phone: "+233 30 277 1234",
  email: "info@ghanacommunityfoundation.org",
  whatsapp: "+233 24 123 4567",
  address: "14 Independence Avenue",
  city: "Accra",
  region: "Greater Accra",
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  metaTitle: "Ghana Community Foundation | Building Stronger Communities",
  metaDescription: "We work alongside communities in Ghana to create lasting change through education, health, and economic empowerment programs.",
};

export const defaultHero: HeroContent = {
  headline: "Building Stronger Communities Across Ghana",
  subheadline: "We work alongside communities to create lasting change through education, health, and economic empowerment programs that put people first.",
  primaryCta: { label: "Support Our Work", link: "/donate" },
  secondaryCta: { label: "Explore Our Projects", link: "/projects" },
  image: "",
};

export const defaultImpactStats: ImpactStat[] = [
  { id: "1", label: "Communities Reached", value: 248, suffix: "+" },
  { id: "2", label: "Beneficiaries Served", value: 45600, suffix: "+" },
  { id: "3", label: "Active Projects", value: 32 },
  { id: "4", label: "Volunteers Mobilized", value: 1200, suffix: "+" },
];

export const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Clean Water for Northern Communities",
    slug: "clean-water-northern-communities",
    summary: "Providing safe drinking water through borehole construction and water treatment systems in underserved communities across the Northern Region.",
    description: "This project addresses the critical need for clean, safe drinking water in rural communities across the Northern Region of Ghana. Through the construction of boreholes, installation of water treatment systems, and community education on water hygiene, we are working to reduce waterborne diseases and improve quality of life for thousands of families.",
    category: "Health",
    location: "Tamale",
    region: "Northern Region",
    district: "Sagnarigu",
    startDate: "2023-03-01",
    endDate: "2025-12-31",
    status: "active",
    targetGroup: "Rural communities without access to clean water",
    beneficiaries: 12500,
    outcomes: ["45 boreholes constructed", "Water-borne diseases reduced by 60%", "15 communities now have clean water access"],
    images: [],
    partners: ["WaterAid Ghana", "District Assembly"],
    featured: true,
  },
  {
    id: "2",
    title: "Women in Enterprise Development",
    slug: "women-enterprise-development",
    summary: "Equipping women with business skills, seed capital, and mentorship to build sustainable livelihoods across the Ashanti and Eastern Regions.",
    description: "The Women in Enterprise Development program provides comprehensive support to women entrepreneurs in rural and peri-urban communities. Through training in financial literacy, business planning, and product development, combined with access to seed capital and ongoing mentorship, we are helping women build sustainable businesses that support their families and strengthen local economies.",
    category: "Women Empowerment",
    location: "Kumasi",
    region: "Ashanti Region",
    district: "Kumasi Metropolitan",
    startDate: "2022-06-01",
    status: "active",
    targetGroup: "Women aged 18-55 in rural and peri-urban areas",
    beneficiaries: 3200,
    outcomes: ["850 women trained in business skills", "420 micro-enterprises established", "Average household income increased by 35%"],
    images: [],
    partners: ["UN Women", "Mastercard Foundation"],
    featured: true,
  },
  {
    id: "3",
    title: "Rural Education Support Program",
    slug: "rural-education-support",
    summary: "Improving learning outcomes in underserved schools through teacher training, learning materials, and infrastructure upgrades in the Volta Region.",
    description: "The Rural Education Support Program works to bridge the education gap in underserved communities across the Volta Region. By training teachers in modern pedagogical methods, supplying schools with learning materials, and upgrading classroom infrastructure, we are creating better learning environments that help children thrive academically and personally.",
    category: "Education",
    location: "Ho",
    region: "Volta Region",
    district: "Ho Municipal",
    startDate: "2021-09-01",
    status: "active",
    targetGroup: "Primary and junior high school students",
    beneficiaries: 8400,
    outcomes: ["120 teachers trained", "35 schools supported", "Pass rates improved by 28%"],
    images: [],
    partners: ["UNICEF Ghana", "Ghana Education Service"],
    featured: true,
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    title: "A New Beginning",
    quote: "The training I received changed everything for my family. I now run a small shop that supports my three children through school.",
    author: "Adwoa Mensah",
    role: "Program Participant, Women in Enterprise",
    active: true,
  },
  {
    id: "2",
    title: "Clean Water, Healthier Lives",
    quote: "Before the borehole was built, my children were often sick. Now they are healthy and attending school regularly.",
    author: "Kwame Osei",
    role: "Community Leader, Sagnarigu",
    active: true,
  },
  {
    id: "3",
    title: "Education Opens Doors",
    quote: "With the new learning materials and trained teachers, our children are performing better than ever. We see hope for their future.",
    author: "Ama Darko",
    role: "Parent, Volta Region",
    active: true,
  },
];

export const defaultAbout: AboutContent = {
  mission: "To empower communities across Ghana through sustainable development programs in education, health, and economic opportunity, working alongside the people we serve to create lasting, meaningful change.",
  vision: "A Ghana where every community has the resources, knowledge, and opportunity to thrive, and where no one is left behind.",
  history: "Ghana Community Foundation was established in 2010 by a group of development professionals and community leaders who saw the need for a locally-led organization that could bridge the gap between international development resources and community-level needs. Starting with a single education project in the Volta Region, we have since grown to serve over 200 communities across all regions of Ghana. Our approach has always been rooted in partnership, listening to communities first and designing programs that reflect their priorities and strengths.",
  coreValues: [
    { title: "Community Ownership", description: "We believe lasting change happens when communities lead their own development. Every program we run is designed with and for the people it serves." },
    { title: "Transparency", description: "We are committed to open and honest stewardship of the resources entrusted to us, sharing our results, challenges, and lessons learned." },
    { title: "Sustainability", description: "Our programs are designed to create self-sustaining impact that continues long after direct support ends." },
    { title: "Dignity", description: "We approach every interaction with respect for the intelligence, agency, and worth of every individual and community." },
  ],
  founderMessage: {
    name: "Dr. Nana Agyeman",
    title: "Founder and Executive Director",
    message: "When we started this work over a decade ago, we were driven by a simple conviction: that Ghanaian communities hold the knowledge and strength to solve their own challenges when given the right support. That conviction remains at the heart of everything we do today. We are grateful for every partner, donor, and volunteer who makes this work possible.",
  },
};

export const defaultPartners: Partner[] = [
  { id: "1", name: "UNICEF Ghana", category: "International", active: true, sortOrder: 1 },
  { id: "2", name: "WaterAid Ghana", category: "International", active: true, sortOrder: 2 },
  { id: "3", name: "Mastercard Foundation", category: "Foundation", active: true, sortOrder: 3 },
  { id: "4", name: "UN Women", category: "International", active: true, sortOrder: 4 },
  { id: "5", name: "Ghana Education Service", category: "Government", active: true, sortOrder: 5 },
  { id: "6", name: "USAID Ghana", category: "International", active: true, sortOrder: 6 },
];

export const defaultFAQs: FAQ[] = [
  { id: "1", question: "How can I donate to your organization?", answer: "You can donate through mobile money (MoMo), bank transfer, or through our online donation page. Visit our Donate page for detailed instructions and account information.", category: "Donations", sortOrder: 1, active: true },
  { id: "2", question: "How do I volunteer with your organization?", answer: "We welcome volunteers from all backgrounds. Visit our Volunteer page to learn about current opportunities and submit your application. We will match you with a project that fits your skills and availability.", category: "Volunteering", sortOrder: 2, active: true },
  { id: "3", question: "Where does my donation go?", answer: "At least 85% of every donation goes directly to program delivery. The remaining funds support organizational operations that make our programs possible. We publish detailed financial reports annually.", category: "Donations", sortOrder: 3, active: true },
  { id: "4", question: "Can I visit your project sites?", answer: "Yes, we organize periodic field visits for donors and partners. Please contact us to schedule a visit. We believe seeing our work firsthand builds trust and understanding.", category: "General", sortOrder: 4, active: true },
  { id: "5", question: "Do you accept corporate partnerships?", answer: "Absolutely. We work with businesses of all sizes on CSR initiatives, employee volunteer programs, and strategic partnerships. Reach out through our Contact page to start a conversation.", category: "Partnerships", sortOrder: 5, active: true },
];

export const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "New Borehole Project Brings Clean Water to Five Communities",
    slug: "new-borehole-project-clean-water",
    excerpt: "Five communities in the Northern Region now have access to clean drinking water following the completion of our latest borehole construction project.",
    content: "Five communities in the Northern Region now have access to clean drinking water following the completion of our latest borehole construction project in partnership with WaterAid Ghana. The boreholes serve an estimated 3,000 residents who previously relied on untreated surface water sources. Community water committees have been trained to maintain the systems, ensuring long-term sustainability.",
    category: "Projects",
    author: "Communications Team",
    publishDate: "2025-03-15",
    image: "",
  },
  {
    id: "2",
    title: "Annual Report 2024 Now Available",
    slug: "annual-report-2024",
    excerpt: "Our 2024 Annual Report is now available for download, highlighting key achievements across all program areas and financial accountability.",
    content: "We are pleased to share our 2024 Annual Report, which provides a comprehensive overview of our work over the past year. Key highlights include the expansion of our education programs to 15 new communities, the launch of three new health initiatives, and the successful completion of our Women in Enterprise pilot in the Eastern Region.",
    category: "Organization",
    author: "Dr. Nana Agyeman",
    publishDate: "2025-02-28",
    image: "",
  },
  {
    id: "3",
    title: "Volunteer Spotlight: Teaching in the Volta Region",
    slug: "volunteer-spotlight-volta-region",
    excerpt: "Meet Kwabena, a university graduate who spent six months volunteering as a teaching assistant in rural Volta Region schools.",
    content: "Kwabena Asante graduated from the University of Ghana with a degree in Education. Instead of immediately pursuing a career in the city, he chose to spend six months as a volunteer teaching assistant in three rural schools in the Volta Region. His experience not only helped improve student outcomes but also shaped his understanding of the challenges facing rural education in Ghana.",
    category: "Stories",
    author: "Communications Team",
    publishDate: "2025-01-20",
    image: "",
  },
];

export const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Annual Fundraising Gala 2025",
    description: "Join us for an evening celebrating our impact and supporting our work for the year ahead. Featuring keynote speakers, cultural performances, and a silent auction.",
    category: "Fundraising",
    date: "2025-06-15",
    time: "18:00",
    location: "Kempinski Hotel, Accra",
    registrationOpen: true,
    speakers: ["Dr. Nana Agyeman", "Hon. Minister of Gender"],
    status: "upcoming",
  },
  {
    id: "2",
    title: "Community Health Workshop",
    description: "A free health education workshop covering maternal health, nutrition, and disease prevention for community health workers across the Greater Accra Region.",
    category: "Workshop",
    date: "2025-05-10",
    time: "09:00",
    location: "Community Centre, Madina, Accra",
    registrationOpen: true,
    speakers: ["Dr. Ama Serwaa", "Nurse Agnes Boateng"],
    status: "upcoming",
  },
];

export const defaultDonationCampaigns: DonationCampaign[] = [
  {
    id: "1",
    title: "Build a School in Tamale",
    slug: "build-school-tamale",
    description: "Help us construct a six-classroom school block in the Tamale Metropolis to serve over 300 children who currently study under trees.",
    purpose: "Education Infrastructure",
    goalAmount: 150000,
    raisedAmount: 87500,
    active: true,
    momoInstructions: "Send your donation via MTN Mobile Money to 024 123 4567 (Ghana Community Foundation). Include 'School Tamale' as the reference.",
    bankInstructions: "Bank: GCB Bank\nAccount Name: Ghana Community Foundation\nAccount Number: 1234567890\nBranch: Independence Avenue, Accra\nReference: School Tamale",
  },
];

export const defaultOffices: Office[] = [
  { id: "1", name: "Head Office", city: "Accra", region: "Greater Accra", address: "14 Independence Avenue, Accra", phone: "+233 30 277 1234", email: "info@ghanacommunityfoundation.org" },
  { id: "2", name: "Northern Region Office", city: "Tamale", region: "Northern Region", address: "23 Hospital Road, Tamale", phone: "+233 37 202 5678", email: "northern@ghanacommunityfoundation.org" },
  { id: "3", name: "Ashanti Region Office", city: "Kumasi", region: "Ashanti Region", address: "8 Prempeh II Street, Kumasi", phone: "+233 32 202 9012", email: "ashanti@ghanacommunityfoundation.org" },
];

export const defaultTeam: TeamMember[] = [
  { id: "1", name: "Dr. Nana Agyeman", title: "Founder and Executive Director", category: "leadership", shortBio: "With over 20 years in community development, Dr. Agyeman leads the organization's strategic vision and stakeholder engagement.", sortOrder: 1 },
  { id: "2", name: "Abena Ofosu", title: "Director of Programs", category: "leadership", shortBio: "Abena oversees all program design, implementation, and evaluation across the organization's portfolio.", sortOrder: 2 },
  { id: "3", name: "Kofi Mensah", title: "Finance and Administration Director", category: "leadership", shortBio: "Kofi manages financial stewardship, compliance, and operational efficiency across all offices.", sortOrder: 3 },
  { id: "4", name: "Esi Amankwah", title: "Communications Manager", category: "staff", shortBio: "Esi leads all external communications, media relations, and digital engagement strategies.", sortOrder: 4 },
  { id: "5", name: "Prof. Kwaku Darko", title: "Board Chairperson", category: "board", shortBio: "A retired professor of Development Studies at the University of Ghana, Prof. Darko brings decades of academic and practical development experience.", sortOrder: 5 },
  { id: "6", name: "Mrs. Akua Boateng", title: "Board Member", category: "board", shortBio: "A successful entrepreneur and philanthropist, Mrs. Boateng supports the organization's fundraising and sustainability strategies.", sortOrder: 6 },
];

export const defaultReports: Report[] = [
  { id: "1", title: "Annual Report 2024", category: "annual", year: 2024, description: "Comprehensive overview of programs, impact, and financial performance for the year 2024." },
  { id: "2", title: "Strategic Plan 2023-2027", category: "strategic", year: 2023, description: "Our five-year strategic framework outlining goals, priorities, and growth strategies." },
  { id: "3", title: "Annual Report 2023", category: "annual", year: 2023, description: "A detailed account of our achievements, challenges, and lessons from 2023." },
];
