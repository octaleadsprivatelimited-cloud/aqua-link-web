export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
}

export const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Choose the Right Water Purifier for Your Home",
    slug: "how-to-choose-water-purifier",
    image: "/placeholder.svg",
    excerpt:
      "A comprehensive guide to selecting the perfect water purifier based on your water source, TDS levels, and family size.",
    content:
      "Choosing the right water purifier can be overwhelming with so many options available. Here's a step-by-step guide to help you make the best decision.\n\n**1. Know Your Water Source**\nThe first step is to understand your water source - municipal supply, borewell, or tanker water. Each source has different impurity levels.\n\n**2. Get Your TDS Level Checked**\nTDS (Total Dissolved Solids) determines which purification technology you need:\n- TDS < 200 ppm: UV purifier is sufficient\n- TDS 200-500 ppm: RO purifier recommended\n- TDS > 500 ppm: RO+UV+UF combination ideal\n\n**3. Consider Your Family Size**\nFor a family of 4-6, a purifier with 7-10 litre storage is ideal. Larger families may need 12-15 litres.\n\nNeed help choosing? Contact Aqua Safe for a free water quality assessment!",
    category: "Buying Guide",
    date: "2024-03-15",
    readTime: "8 min",
  },
  {
    id: "2",
    title: "RO vs UV vs UF: Understanding Water Purification Technologies",
    slug: "ro-vs-uv-vs-uf",
    image: "/placeholder.svg",
    excerpt:
      "Learn the differences between RO, UV, and UF purification methods and which one is best for your water quality.",
    content:
      "Understanding the three main water purification technologies will help you make an informed decision.\n\n**Reverse Osmosis (RO)**\nRO uses a semi-permeable membrane to remove dissolved impurities.\n\n**Ultraviolet (UV)**\nUV purification uses ultraviolet light to kill bacteria, viruses, and other microorganisms.\n\n**Ultrafiltration (UF)**\nUF uses a hollow fiber membrane to remove bacteria, cysts, and larger particles.",
    category: "Education",
    date: "2024-03-10",
    readTime: "6 min",
  },
  {
    id: "3",
    title: "Top 5 Signs Your Water Purifier Needs Servicing",
    slug: "water-purifier-servicing-signs",
    image: "/placeholder.svg",
    excerpt:
      "Don't ignore these warning signs! Know when your water purifier needs maintenance for optimal performance.",
    content:
      "Regular maintenance is key to keeping your water purifier working efficiently. Watch for these warning signs:\n\n**1. Change in Water Taste or Odor**\n**2. Reduced Water Flow**\n**3. Unusual Sounds**\n**4. Water Leakage**\n**5. TDS Levels Rising**",
    category: "Maintenance",
    date: "2024-03-05",
    readTime: "5 min",
  },
];
