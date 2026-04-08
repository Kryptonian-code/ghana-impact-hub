import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Impact", href: "/impact" },
  {
    label: "Get Involved",
    children: [
      { label: "Donate", href: "/donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Reports", href: "/reports" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { settings } = useContent();
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">
                {settings.orgName.charAt(0)}
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-foreground text-sm lg:text-base leading-tight block">
                {settings.orgName}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md">
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg py-2 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(child.href)
                              ? "text-foreground font-medium bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href!}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href!)
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/donate"
              className="px-5 py-2.5 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <span className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                      {item.label}
                    </span>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-6 py-2 text-sm ${
                          isActive(child.href) ? "text-foreground font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href!}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2 text-sm font-medium ${
                      isActive(item.href!) ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="px-3 pt-4">
                <Link
                  to="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-2.5 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground"
                >
                  Donate Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
