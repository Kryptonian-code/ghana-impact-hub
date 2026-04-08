import { Link } from "react-router-dom";
import { type ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: ReactNode;
}

export function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="gradient-primary text-primary-foreground py-16 sm:py-20">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb && (
          <nav className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-primary-foreground/60">
              {breadcrumb.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {item.href ? (
                    <Link to={item.href} className="hover:text-primary-foreground transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-primary-foreground/80">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-primary-foreground/70 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
