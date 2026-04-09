export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  price: {
    selling: number;
    original: number;
    discount: number;
  };
  images: string[];
  stock: "in_stock" | "low_stock" | "out_of_stock";
  warranty: string;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Aqua Safe RO + UV + UF Water Purifier",
    slug: "aqua-safe-ro-uv-uf-purifier",
    sku: "ASW-RO-001",
    category: "ro-purifiers",
    description: "Advanced 7-stage water purification system with RO, UV, and UF technology. Removes 99.9% of contaminants including bacteria, viruses, heavy metals, and dissolved impurities. Perfect for homes with TDS levels up to 2000 ppm.",
    features: [
      "7-Stage Purification Process",
      "12 Litre Storage Capacity",
      "Smart LED Indicators",
      "Auto Shut-off & Alert System",
      "TDS Controller for Taste",
      "Food-grade ABS Plastic Body",
    ],
    specifications: {
      "Purification Technology": "RO + UV + UF + TDS Controller",
      "Storage Capacity": "12 Litres",
      "Purification Rate": "15 L/hr",
      "Input TDS Range": "Up to 2000 ppm",
      "Power Consumption": "36W",
      "Dimensions": "380 x 260 x 500 mm",
      "Weight": "8.5 kg",
    },
    price: { selling: 12999, original: 18999, discount: 32 },
    images: ["/placeholder.svg"],
    stock: "in_stock",
    warranty: "1 Year Comprehensive",
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "2",
    name: "Aqua Safe Ultra UV Water Purifier",
    slug: "aqua-safe-ultra-uv-purifier",
    sku: "ASW-UV-002",
    category: "uv-purifiers",
    description: "High-performance UV water purifier ideal for municipal water supply. Eliminates 99.99% of bacteria and viruses while retaining essential minerals.",
    features: [
      "UV + UF Purification",
      "8 Litre Storage Tank",
      "Stainless Steel UV Chamber",
      "Low Maintenance Design",
      "Wall-mountable",
      "Energy Efficient",
    ],
    specifications: {
      "Purification Technology": "UV + UF",
      "Storage Capacity": "8 Litres",
      "Purification Rate": "60 L/hr",
      "Input TDS Range": "Up to 200 ppm",
      "Power Consumption": "11W",
      "Dimensions": "340 x 220 x 450 mm",
    },
    price: { selling: 7999, original: 11999, discount: 33 },
    images: ["/placeholder.svg"],
    stock: "in_stock",
    warranty: "1 Year Comprehensive",
    rating: 4.3,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Aqua Safe Alkaline RO Water Purifier",
    slug: "aqua-safe-alkaline-ro-purifier",
    sku: "ASW-ALK-003",
    category: "ro-purifiers",
    description: "Premium alkaline RO water purifier with mineral enhancement technology. Provides clean, healthy, alkaline water with balanced pH for better health.",
    features: [
      "Alkaline Water Technology",
      "9-Stage Purification",
      "15 Litre Large Storage",
      "Mineral Enhancement",
      "Digital Display",
      "Filter Change Alert",
    ],
    specifications: {
      "Purification Technology": "RO + UV + UF + Alkaline",
      "Storage Capacity": "15 Litres",
      "Purification Rate": "20 L/hr",
      "Input TDS Range": "Up to 2500 ppm",
      "pH Level": "8.5 - 9.5",
      "Power Consumption": "40W",
    },
    price: { selling: 16999, original: 24999, discount: 32 },
    images: ["/placeholder.svg"],
    stock: "in_stock",
    warranty: "2 Years Comprehensive",
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: "4",
    name: "Aqua Safe Gravity Water Purifier",
    slug: "aqua-safe-gravity-purifier",
    sku: "ASW-GRV-004",
    category: "gravity-purifiers",
    description: "Non-electric gravity-based water purifier perfect for areas with intermittent electricity. Uses advanced carbon block technology for clean water.",
    features: [
      "No Electricity Required",
      "24 Litre Total Capacity",
      "Activated Carbon Filter",
      "Portable Design",
      "Easy Maintenance",
      "BPA-Free Material",
    ],
    specifications: {
      "Purification Technology": "Gravity + Activated Carbon",
      "Total Capacity": "24 Litres",
      "Upper Tank": "12 Litres",
      "Lower Tank": "12 Litres",
      "Filter Life": "3000 Litres",
    },
    price: { selling: 2499, original: 3999, discount: 38 },
    images: ["/placeholder.svg"],
    stock: "in_stock",
    warranty: "6 Months",
    rating: 4.1,
    reviewCount: 56,
  },
  {
    id: "5",
    name: "Sediment Filter Cartridge (Pack of 3)",
    slug: "sediment-filter-cartridge-3pack",
    sku: "ASW-FLT-005",
    category: "filters-cartridges",
    description: "High-quality 10-inch sediment filter cartridges. Removes sand, silt, rust, and other large particles. Compatible with most standard water purifiers.",
    features: [
      "10-inch Standard Size",
      "5 Micron Filtration",
      "Pack of 3 Cartridges",
      "6-Month Filter Life Each",
      "Universal Compatibility",
    ],
    specifications: {
      "Size": "10 inch",
      "Micron Rating": "5 micron",
      "Material": "Polypropylene",
      "Filter Life": "6 months each",
      "Pack Quantity": "3",
    },
    price: { selling: 499, original: 799, discount: 38 },
    images: ["/placeholder.svg"],
    stock: "in_stock",
    warranty: "No Warranty",
    rating: 4.4,
    reviewCount: 312,
  },
  {
    id: "6",
    name: "RO Membrane 80 GPD",
    slug: "ro-membrane-80gpd",
    sku: "ASW-MEM-006",
    category: "filters-cartridges",
    description: "Premium quality 80 GPD RO membrane for efficient water purification. Compatible with all standard RO water purifiers.",
    features: [
      "80 GPD Output",
      "High Rejection Rate",
      "Long Service Life",
      "Easy Installation",
      "Universal Compatibility",
    ],
    specifications: {
      "GPD": "80",
      "Rejection Rate": "95-98%",
      "Operating Pressure": "40-100 PSI",
      "Service Life": "12-18 months",
      "Material": "Thin Film Composite",
    },
    price: { selling: 1299, original: 1999, discount: 35 },
    images: ["/placeholder.svg"],
    stock: "in_stock",
    warranty: "6 Months",
    rating: 4.6,
    reviewCount: 178,
  },
  {
    id: "7",
    name: "Aqua Safe Commercial RO Plant 25 LPH",
    slug: "commercial-ro-plant-25lph",
    sku: "ASW-COM-007",
    category: "commercial",
    description: "Industrial-grade commercial RO water plant with 25 litres per hour capacity. Ideal for offices, restaurants, and small businesses.",
    features: [
      "25 LPH Capacity",
      "Industrial FRP Vessel",
      "Automatic Operation",
      "Pre-filter System",
      "Pressure Gauge",
      "SS Frame Construction",
    ],
    specifications: {
      "Capacity": "25 LPH",
      "Input TDS": "Up to 3000 ppm",
      "Power": "220V AC",
      "Membrane": "4021 Industrial",
      "Frame": "Stainless Steel",
    },
    price: { selling: 28999, original: 39999, discount: 28 },
    images: ["/placeholder.svg"],
    stock: "in_stock",
    warranty: "1 Year",
    rating: 4.8,
    reviewCount: 34,
  },
  {
    id: "8",
    name: "Annual Maintenance Kit (RO+UV)",
    slug: "annual-maintenance-kit-ro-uv",
    sku: "ASW-KIT-008",
    category: "accessories",
    description: "Complete annual maintenance kit for RO+UV water purifiers. Includes all essential filters and components for a full year of pure water.",
    features: [
      "Complete Kit for 1 Year",
      "3x Sediment Filters",
      "2x Carbon Filters",
      "1x RO Membrane",
      "Installation Guide Included",
    ],
    specifications: {
      "Kit Contents": "3 Sediment + 2 Carbon + 1 RO Membrane",
      "Compatibility": "Standard RO+UV Systems",
      "Service Life": "12 months",
    },
    price: { selling: 2999, original: 4999, discount: 40 },
    images: ["/placeholder.svg"],
    stock: "low_stock",
    warranty: "No Warranty",
    rating: 4.5,
    reviewCount: 92,
  },
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (cat: string) => products.filter(p => p.category === cat);
export const getFeaturedProducts = () => products.slice(0, 4);
