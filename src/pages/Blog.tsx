import { useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 9;

export default function Blog() {
  const { blogPosts } = useContent();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));
  const sorted = [...blogPosts].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  const filtered = sorted.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category === category;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <PageHero title="Blog and News" subtitle="Updates, stories, and insights from our work across Ghana." breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search posts..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="px-4 py-2.5 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="all">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {paginated.length === 0 ? (
            <div className="text-center py-20"><p className="text-muted-foreground">No posts found.</p></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <span className="text-xs font-medium text-gold-dark">{post.category}</span>
                    <h3 className="mt-2 text-lg font-heading font-semibold text-foreground group-hover:text-gold-dark transition-colors line-clamp-2">{post.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{new Date(post.publishDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"}`}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
