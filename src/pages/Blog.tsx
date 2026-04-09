import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const posts = [
  {
    id: "1",
    title: "How to Choose the Right Water Purifier for Your Home",
    slug: "how-to-choose-water-purifier",
    excerpt: "A comprehensive guide to selecting the perfect water purifier based on your water source, TDS levels, and family size.",
    category: "Buying Guide",
    date: "2024-03-15",
    readTime: "8 min",
  },
  {
    id: "2",
    title: "RO vs UV vs UF: Understanding Water Purification Technologies",
    slug: "ro-vs-uv-vs-uf",
    excerpt: "Learn the differences between RO, UV, and UF purification methods and which one is best for your water quality.",
    category: "Education",
    date: "2024-03-10",
    readTime: "6 min",
  },
  {
    id: "3",
    title: "Top 5 Signs Your Water Purifier Needs Servicing",
    slug: "water-purifier-servicing-signs",
    excerpt: "Don't ignore these warning signs! Know when your water purifier needs maintenance for optimal performance.",
    category: "Maintenance",
    date: "2024-03-05",
    readTime: "5 min",
  },
  {
    id: "4",
    title: "Benefits of Alkaline Water for Health",
    slug: "benefits-alkaline-water",
    excerpt: "Discover the health benefits of alkaline water and why more families are switching to alkaline water purifiers.",
    category: "Health",
    date: "2024-02-28",
    readTime: "7 min",
  },
];

export default function Blog() {
  return (
    <Layout>
      <div className="bg-hero-gradient text-primary-foreground py-16 md:py-20">
        <div className="container">
          <nav className="text-sm mb-4 opacity-70">
            <Link to="/" className="hover:opacity-100">Home</Link> / <span>Blog</span>
          </nav>
          <h1 className="font-heading font-bold text-3xl md:text-5xl">Knowledge Hub</h1>
          <p className="mt-4 opacity-80 text-lg">Learn about water purification, health tips, and product guides</p>
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-card rounded-lg border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group">
                <div className="aspect-video bg-secondary" />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded">{post.category}</span>
                    <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h2 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-sm font-medium text-primary">
                    Read More →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
