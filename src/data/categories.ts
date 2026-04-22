export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "RO Water Purifiers",
    slug: "ro-purifiers",
    description: "Advanced Reverse Osmosis purifiers for comprehensive water purification",
    icon: "💧",
    productCount: 12,
  },
  {
    id: "2",
    name: "Industrial Water Solutions",
    slug: "uv-purifiers",
    description: "Industrial-grade water solutions for high-demand applications",
    icon: "☀️",
    productCount: 8,
  },
  {
    id: "3",
    name: "Gravity Purifiers",
    slug: "gravity-purifiers",
    description: "Non-electric water purifiers for areas with power issues",
    icon: "🏺",
    productCount: 5,
  },
  {
    id: "4",
    name: "Filters & Cartridges",
    slug: "filters-cartridges",
    description: "Replacement filters, membranes, and cartridges",
    icon: "🔧",
    productCount: 20,
  },
  {
    id: "5",
    name: "Commercial Plants",
    slug: "commercial",
    description: "Industrial RO plants for offices, restaurants & businesses",
    icon: "🏭",
    productCount: 6,
  },
  {
    id: "6",
    name: "Accessories",
    slug: "accessories",
    description: "Maintenance kits, spare parts, and water testing tools",
    icon: "🛠️",
    productCount: 15,
  },
];
