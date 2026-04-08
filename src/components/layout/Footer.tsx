import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const { settings } = useContent();

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Impact", href: "/impact" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const getInvolved = [
    { label: "Donate", href: "/donate" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Events", href: "/events" },
    { label: "Partners", href: "/partners" },
  ];

  const resources = [
    { label: "Reports", href: "/reports" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq" },
    { label: "Team", href: "/team" },
  ];

  return (
    <footer className="gradient-primary text-primary-foreground">
      <div className="container-wide mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Org Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-lg">
                  {settings.orgName.charAt(0)}
                </span>
              </div>
              <span className="font-heading font-bold text-lg">{settings.orgName}</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              {settings.description}
            </p>
            <div className="space-y-3">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                {settings.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}, {settings.region}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">Get Involved</h4>
            <ul className="space-y-2.5">
              {getInvolved.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            &copy; {new Date().getFullYear()} {settings.orgName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {settings.socialLinks.facebook && (
              <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground text-xs transition-colors">
                Facebook
              </a>
            )}
            {settings.socialLinks.twitter && (
              <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground text-xs transition-colors">
                Twitter
              </a>
            )}
            {settings.socialLinks.instagram && (
              <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground text-xs transition-colors">
                Instagram
              </a>
            )}
            {settings.socialLinks.linkedin && (
              <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground text-xs transition-colors">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
