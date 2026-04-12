import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import bgHero from "@/assets/bg-hero-dark.jpg";

export const posts = [
  {
    id: "1",
    title: "How to Choose the Right Water Purifier for Your Home",
    slug: "how-to-choose-water-purifier",
    excerpt: "A comprehensive guide to selecting the perfect water purifier based on your water source, TDS levels, and family size.",
    content: `Choosing the right water purifier can be overwhelming with so many options available. Here's a step-by-step guide to help you make the best decision.\n\n**1. Know Your Water Source**\nThe first step is to understand your water source — municipal supply, borewell, or tanker water. Each source has different impurity levels.\n\n**2. Get Your TDS Level Checked**\nTDS (Total Dissolved Solids) determines which purification technology you need:\n- TDS < 200 ppm: UV purifier is sufficient\n- TDS 200-500 ppm: RO purifier recommended\n- TDS > 500 ppm: RO+UV+UF combination ideal\n\n**3. Consider Your Family Size**\nFor a family of 4-6, a purifier with 7-10 litre storage is ideal. Larger families may need 12-15 litres.\n\n**4. Check for Essential Features**\n- Mineralizer/TDS controller to retain essential minerals\n- UV lamp for additional bacteria protection\n- Auto-flush for membrane maintenance\n- Filter change indicators\n\n**5. Budget & Maintenance Costs**\nConsider both upfront cost and annual maintenance. RO purifiers typically need filter changes every 6-12 months costing ₹2,000-4,000 annually.\n\nNeed help choosing? Contact Aqua Safe for a free water quality assessment!`,
    category: "Buying Guide",
    date: "2024-03-15",
    readTime: "8 min",
  },
  {
    id: "2",
    title: "RO vs UV vs UF: Understanding Water Purification Technologies",
    slug: "ro-vs-uv-vs-uf",
    excerpt: "Learn the differences between RO, UV, and UF purification methods and which one is best for your water quality.",
    content: `Understanding the three main water purification technologies will help you make an informed decision.\n\n**Reverse Osmosis (RO)**\nRO uses a semi-permeable membrane to remove dissolved impurities, heavy metals, and salts. It's the most effective method for hard water with high TDS levels. However, it also removes beneficial minerals, which is why a mineralizer is important.\n\n**Ultraviolet (UV)**\nUV purification uses ultraviolet light to kill bacteria, viruses, and other microorganisms. It doesn't change the taste or remove dissolved solids. UV is ideal for municipal water that's already low in TDS but may have microbial contamination.\n\n**Ultrafiltration (UF)**\nUF uses a hollow fiber membrane to remove bacteria, cysts, and larger particles. It doesn't require electricity and works well as a pre-filter or for water with low contamination levels.\n\n**Which Should You Choose?**\n- Municipal water: UV or UV+UF\n- Borewell water: RO+UV\n- Tanker water: RO+UV+UF\n- Very hard water: RO+UV+UF with mineralizer\n\nMost modern purifiers from Aqua Safe combine all three technologies for complete protection.`,
    category: "Education",
    date: "2024-03-10",
    readTime: "6 min",
  },
  {
    id: "3",
    title: "Top 5 Signs Your Water Purifier Needs Servicing",
    slug: "water-purifier-servicing-signs",
    excerpt: "Don't ignore these warning signs! Know when your water purifier needs maintenance for optimal performance.",
    content: `Regular maintenance is key to keeping your water purifier working efficiently. Watch for these warning signs:\n\n**1. Change in Water Taste or Odor**\nIf your purified water starts tasting different or has an unusual smell, the filters may be saturated and need replacement.\n\n**2. Reduced Water Flow**\nA significant decrease in water flow rate usually indicates clogged filters or a worn-out membrane. This is one of the most common signs.\n\n**3. Unusual Sounds**\nStrange noises from the motor or pump can indicate mechanical issues. Don't ignore grinding or clicking sounds.\n\n**4. Water Leakage**\nAny visible leakage around the purifier needs immediate attention. It could be a loose connection or damaged filter housing.\n\n**5. TDS Levels Rising**\nIf your TDS meter shows increasing levels in purified water, the RO membrane may need replacement.\n\n**Maintenance Schedule**\n- Pre-filter: Every 3-6 months\n- Carbon filter: Every 6-12 months\n- RO membrane: Every 12-24 months\n- UV lamp: Every 12 months\n\nSchedule your service with Aqua Safe today!`,
    category: "Maintenance",
    date: "2024-03-05",
    readTime: "5 min",
  },
  {
    id: "4",
    title: "Benefits of Alkaline Water for Health",
    slug: "benefits-alkaline-water",
    excerpt: "Discover the health benefits of alkaline water and why more families are switching to alkaline water purifiers.",
    content: `Alkaline water has gained popularity for its potential health benefits. Here's what you need to know:\n\n**What is Alkaline Water?**\nAlkaline water has a pH level above 7 (typically 8-9.5). Regular tap water usually has a pH of 7, which is neutral. Alkaline water purifiers use mineral cartridges to raise the pH level.\n\n**Potential Benefits**\n- Better hydration due to smaller water molecule clusters\n- May help neutralize acid in the body\n- Rich in essential minerals like calcium and magnesium\n- Antioxidant properties that fight free radicals\n- May improve bone health and reduce acid reflux\n\n**Who Can Benefit?**\n- People with acid reflux or digestive issues\n- Athletes looking for better hydration\n- Those wanting to improve overall health\n\n**Choosing an Alkaline Purifier**\nLook for purifiers with built-in alkaline enhancers that add minerals post-purification. Aqua Safe offers several models with alkaline technology.\n\nConsult with our experts to find the right alkaline purifier for your family!`,
    category: "Health",
    date: "2024-02-28",
    readTime: "7 min",
  },
  {
    id: "5",
    title: "Water Quality in Visakhapatnam: What You Need to Know",
    slug: "water-quality-visakhapatnam",
    excerpt: "Understand the water quality challenges in Visakhapatnam and how to ensure your family gets safe drinking water.",
    content: `Visakhapatnam's water supply comes from multiple sources, each with unique quality challenges.\n\n**Water Sources in Vizag**\n- Yeleru reservoir\n- Raiwada reservoir\n- Borewell water in suburban areas\n- Tanker water in some localities\n\n**Common Water Quality Issues**\n- High TDS in borewell areas (300-1500 ppm)\n- Chlorine from municipal treatment\n- Seasonal contamination during monsoons\n- Hard water causing scaling\n\n**Area-wise Recommendations**\n- MVP Colony, Dwaraka Nagar: UV purifier sufficient (low TDS)\n- Madhurawada, Gajuwaka: RO recommended (moderate TDS)\n- Pendurthi, Anakapalle: RO+UV essential (high TDS)\n\nAqua Safe offers free water testing across Visakhapatnam. Contact us to get your water tested!`,
    category: "Local Guide",
    date: "2024-02-20",
    readTime: "5 min",
  },
  {
    id: "6",
    title: "Commercial Water Purification: A Complete Guide for Businesses",
    slug: "commercial-water-purification-guide",
    excerpt: "Everything businesses need to know about commercial water purification systems, from restaurants to offices.",
    content: `Commercial establishments have unique water purification needs. Here's your complete guide:\n\n**Who Needs Commercial Purification?**\n- Restaurants and hotels\n- Offices and co-working spaces\n- Schools and hospitals\n- Manufacturing units\n\n**Types of Commercial Systems**\n- 25-50 LPH: Small offices (10-25 people)\n- 50-100 LPH: Medium businesses (25-50 people)\n- 100-500 LPH: Large establishments\n- 500+ LPH: Industrial applications\n\n**Key Considerations**\n- Daily water consumption\n- Source water quality\n- Space availability\n- Budget and running costs\n- Compliance requirements\n\nAqua Safe provides customized commercial solutions with installation, AMC, and 24/7 support.`,
    category: "Business",
    date: "2024-02-15",
    readTime: "6 min",
  },
  {
    id: "7",
    title: "How to Reduce Water Wastage from RO Purifiers",
    slug: "reduce-ro-water-wastage",
    excerpt: "Practical tips to minimize water waste from your RO purifier and use rejected water effectively.",
    content: `RO purifiers typically waste 2-3 litres for every litre of purified water. Here's how to minimize this:\n\n**Understanding RO Waste**\nRO purification works by pushing water through a membrane. The impurities that don't pass through are flushed out as reject water.\n\n**Tips to Reduce Waste**\n1. Choose a purifier with water-saving technology\n2. Maintain your filters regularly for efficiency\n3. Use a TDS controller to reduce rejection ratio\n4. Install a storage tank for reject water\n\n**Uses for RO Reject Water**\n- Mopping floors\n- Watering plants (check TDS first)\n- Washing clothes\n- Flushing toilets\n- Car washing\n\n**Eco-Friendly Models**\nAqua Safe offers models with up to 60% water recovery rate, significantly reducing wastage compared to traditional RO purifiers.`,
    category: "Tips",
    date: "2024-02-10",
    readTime: "4 min",
  },
  {
    id: "8",
    title: "Understanding Water Purifier Certifications: ISI, ISO & More",
    slug: "water-purifier-certifications",
    excerpt: "Why certifications matter when buying a water purifier and what ISI, ISO, and other marks mean.",
    content: `Certifications ensure your water purifier meets safety and quality standards. Here's what to look for:\n\n**ISI Mark (BIS Certification)**\nThe ISI mark from the Bureau of Indian Standards confirms the product meets Indian safety standards. It's mandatory for water purifiers sold in India.\n\n**ISO Certification**\nISO 9001 certification means the manufacturer follows international quality management standards in their production process.\n\n**NSF/ANSI Certification**\nThis international certification tests purifiers for contaminant reduction claims. It's a gold standard for water purification.\n\n**Why Certifications Matter**\n- Ensures product safety and reliability\n- Verified purification performance\n- Legal compliance\n- Consumer protection\n\nAll Aqua Safe products are ISI certified and manufactured in ISO-certified facilities.`,
    category: "Education",
    date: "2024-02-05",
    readTime: "5 min",
  },
  {
    id: "9",
    title: "Monsoon Water Safety: Protecting Your Family During Rainy Season",
    slug: "monsoon-water-safety",
    excerpt: "Essential tips to ensure safe drinking water during the monsoon season when contamination risks are highest.",
    content: `The monsoon season brings increased water contamination risks. Here's how to stay safe:\n\n**Why Monsoon Water is Risky**\n- Floodwater mixes with clean water sources\n- Increased bacteria and virus levels\n- Higher turbidity and sediment\n- Pipe leaks allow contamination\n\n**Safety Precautions**\n1. Always use purified water for drinking and cooking\n2. Service your purifier before monsoon season\n3. Keep an emergency water storage\n4. Boil water if purifier breaks down\n5. Avoid street food with unfiltered water\n\n**Purifier Maintenance During Monsoons**\n- Change pre-filters more frequently\n- Check for water leaks regularly\n- Monitor TDS levels weekly\n- Keep the purifier area dry and clean\n\nSchedule a pre-monsoon service with Aqua Safe to ensure your purifier is ready!`,
    category: "Health",
    date: "2024-01-28",
    readTime: "5 min",
  },
];

export default function Blog() {
  return (
    <Layout>
      <section className="bg-navy text-primary-foreground py-10 md:py-14">
        <div className="container text-center">
          <nav className="text-sm mb-4 opacity-60 font-medium">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <span className="mx-2">/</span>
            <span>Blog</span>
          </nav>
          <h1 className="font-heading font-bold text-2xl md:text-4xl">Knowledge Hub</h1>
          <p className="mt-3 opacity-70 text-sm md:text-base max-w-xl mx-auto">Learn about water purification, health tips, and product guides</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id}>
                <article className="bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/20 hover:shadow-card-hover transition-all duration-300 group h-full flex flex-col">
                  <div className="aspect-video bg-secondary relative overflow-hidden">
                    <div className="absolute inset-0 bg-navy/5 group-hover:bg-navy/10 transition-colors" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="bg-accent/10 text-accent font-heading font-semibold px-2.5 py-1 rounded-full">{post.category}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    </div>
                    <h2 className="font-heading font-bold text-base text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-sm font-heading font-semibold text-accent group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
