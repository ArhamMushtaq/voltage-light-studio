import bulb1 from "@/assets/led-bulb-1.jpg";
import bulb2 from "@/assets/led-bulb-2.jpg";
import bulb3 from "@/assets/led-bulb-3.jpg";
import bulb4 from "@/assets/led-bulb-4.jpg";
import bulb5 from "@/assets/led-bulb-5.jpg";
import bulb6 from "@/assets/led-bulb-6.jpg";

export type StockStatus = "in-stock" | "out-of-stock" | "coming-soon";

export interface Product {
  slug: string;
  name: string;
  voltage: string;
  wattage: string;
  category: "Low Voltage" | "Standard Voltage" | "High Voltage";
  description: string;
  longDescription: string;
  lumen: string;
  stockStatus: StockStatus;
  images: string[];
}

export const products: Product[] = [
  {
    slug: "mr-5w-low-voltage",
    name: "MR‑5W Low Voltage",
    voltage: "12V – 48V DC",
    wattage: "5W",
    category: "Low Voltage",
    description: "Compact LED ideal for solar & battery systems.",
    longDescription: "The MR‑5W Low Voltage LED bulb is engineered for off-grid and solar-powered systems. Operating between 12V and 48V DC, it delivers reliable illumination while consuming minimal power. Built with high-grade aluminium heat sinks and premium LED chips for extended lifespan.",
    lumen: "450 lm",
    stockStatus: "in-stock",
    images: [bulb3, bulb6, bulb1],
  },
  {
    slug: "mr-7w-low-voltage",
    name: "MR‑7W Low Voltage",
    voltage: "12V – 48V DC",
    wattage: "7W",
    category: "Low Voltage",
    description: "Efficient low-voltage bulb for off-grid use.",
    longDescription: "The MR‑7W delivers brighter output for battery-backed and solar installations. Its wide 12–48V DC input range ensures compatibility with most off-grid setups. Features flicker-free driver technology and durable polycarbonate housing.",
    lumen: "630 lm",
    stockStatus: "in-stock",
    images: [bulb6, bulb3, bulb5],
  },
  {
    slug: "mr-9w-standard",
    name: "MR‑9W Standard",
    voltage: "110V – 220V AC",
    wattage: "9W",
    category: "Standard Voltage",
    description: "Versatile bulb for homes and offices.",
    longDescription: "A versatile everyday LED bulb suitable for residential and commercial spaces. The MR‑9W Standard operates on standard mains voltage (110–220V AC) and replaces traditional 60W incandescent bulbs while using a fraction of the energy.",
    lumen: "810 lm",
    stockStatus: "in-stock",
    images: [bulb1, bulb5, bulb2],
  },
  {
    slug: "mr-12w-standard",
    name: "MR‑12W Standard",
    voltage: "110V – 220V AC",
    wattage: "12W",
    category: "Standard Voltage",
    description: "Bright output with energy savings.",
    longDescription: "The MR‑12W Standard provides brilliant 1080-lumen output perfect for living rooms, offices, and retail spaces. Its advanced thermal management system ensures consistent brightness over 25,000+ hours of operation.",
    lumen: "1080 lm",
    stockStatus: "coming-soon",
    images: [bulb5, bulb1, bulb4],
  },
  {
    slug: "mr-15w-high-voltage",
    name: "MR‑15W High Voltage",
    voltage: "220V – 480V AC",
    wattage: "15W",
    category: "High Voltage",
    description: "Heavy-duty bulb for industrial use.",
    longDescription: "Designed for industrial and commercial environments requiring high-voltage operation. The MR‑15W High Voltage bulb handles 220–480V AC with built-in surge protection, making it ideal for factories, warehouses, and outdoor installations.",
    lumen: "1350 lm",
    stockStatus: "out-of-stock",
    images: [bulb2, bulb4, bulb6],
  },
  {
    slug: "mr-18w-high-voltage",
    name: "MR‑18W High Voltage",
    voltage: "220V – 480V AC",
    wattage: "18W",
    category: "High Voltage",
    description: "Maximum brightness for large spaces.",
    longDescription: "Our most powerful LED bulb, the MR‑18W delivers an impressive 1620 lumens for illuminating large industrial halls, stadiums, and outdoor areas. Features IP65-rated housing and a wide beam angle for uniform light distribution.",
    lumen: "1620 lm",
    stockStatus: "in-stock",
    images: [bulb4, bulb2, bulb3],
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
