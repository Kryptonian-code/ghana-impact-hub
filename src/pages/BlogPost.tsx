import { useParams, Link } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { PageHero } from "@/components/shared/PageHero";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const { blogPosts } = useContent();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="section-padding text-center">
        <h2 className="text-2xl font-heading font-bold text-foreground">Post not found</h2>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-2 text-sm text-gold-dark"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <PageHero title={post.title} subtitle={`By ${post.author} on ${new Date(post.publishDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`} breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <span className="text-xs font-medium text-gold-dark">{post.category}</span>
          <div className="mt-6 prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
          <div className="mt-10 pt-6 border-t border-border">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold-dark"><ArrowLeft className="w-4 h-4" /> Back to all posts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
