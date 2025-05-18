
export interface Product {
  id: number;
  name: string;
  image: string | string[]; // Updated to support multiple images
  category: string;
  description: string;
  minOrder: string;
  price: number;
  purity?: string;
  stoneType?: string;
  features?: string[];
  availableSizes?: string;
  sku?: string;
  makingCharges?: number;
  wastage?: string;
  weightRange?: string;
  seoDescription?: string;
}

export const productsData: Product[] = [
  {
    id: 1,
    name: "Traditional Silver Murtis",
    image: [
      "https://i.postimg.cc/8cjtjjq8/murti.png",
      "https://i.postimg.cc/8cjtjjq8/murti.png",
      "https://i.postimg.cc/Ls8yrCN6/IMG-0937.png"
    ],
    category: "Murti",
    description: "Intricately designed traditional necklace featuring handcrafted patterns",
    minOrder: "20 units",
    price: 12000,
    purity: "92.5% Sterling Silver",
    stoneType: "N/A",
    features: ["Handcrafted", "Temple Design", "Traditional Finish", "Anti-Tarnish Coating"],
    availableSizes: "4 inches, 6 inches, 8 inches",
    sku: "MS-TM-001",
    makingCharges: 1800,
    wastage: "8-10%",
    weightRange: "250-500g",
    seoDescription: "Exquisite handcrafted traditional silver murti for your puja room. Our temple-style silver murtis are intricately designed by master artisans using age-old techniques, featuring stunning details and a pristine silver finish that enhances the spiritual ambiance of your sacred space."
  },
  {
    id: 2,
    name: "Silver Payal",
    image: [
      "https://i.postimg.cc/G2ZqTcrH/payal.png",
      "https://i.postimg.cc/8cjtjjq8/murti.png"
    ],
    category: "Payal",
    description: "Elegant ankle bracelet that adds sophistication to any outfit",
    minOrder: "30 units",
    price: 4500,
    purity: "92.5% Sterling Silver",
    stoneType: "N/A",
    features: ["Adjustable Size", "Antique Finish", "Ghungroo Bells", "Comfortable Fit"],
    availableSizes: "Standard (Adjustable)",
    sku: "PY-SL-002",
    makingCharges: 650,
    wastage: "5-7%",
    weightRange: "40-45g per pair",
    seoDescription: "Beautiful traditional silver payal anklets with delicate chiming bells. Our handcrafted silver payals combine timeless elegance with intricate craftsmanship, featuring adjustable sizing for perfect comfort. The antique finish adds a touch of vintage charm to these authentic Indian anklets."
  },
  {
    id: 3,
    name: "Sterling Silver Bracelet",
    image: "https://i.postimg.cc/Ls8yrCN6/IMG-0937.png",
    category: "Bracelets",
    description: "Fine sterling silver bracelet with timeless design",
    minOrder: "15 units",
    price: 3200,
    purity: "92.5% Sterling Silver",
    stoneType: "N/A",
    features: ["Chain Link Design", "Secure Clasp", "Polished Finish", "Premium Weight"],
    availableSizes: "7 inches, 7.5 inches, 8 inches",
    sku: "BR-SS-003",
    makingCharges: 480,
    wastage: "4-6%",
    weightRange: "12-15g",
    seoDescription: "Elegant sterling silver bracelet with classic chain link design. Crafted with premium 925 silver, this timeless bracelet features a secure clasp mechanism and brilliant polished finish that complements both casual and formal attire for all occasions."
  },
  {
    id: 4,
    name: "Silver Statement Ring",
    image: "https://img.freepik.com/premium-photo/silver-ring-black-background-macro-picture_10069-97.jpg",
    category: "Rings",
    description: "Bold statement ring perfect for special occasions",
    minOrder: "25 units",
    price: 1800,
    purity: "92.5% Sterling Silver",
    stoneType: "Cubic Zirconia",
    features: ["Statement Design", "Comfort Band", "Rhodium Plated", "Tarnish Resistant"],
    availableSizes: "US 5-9",
    sku: "RG-ST-004",
    makingCharges: 350,
    wastage: "3-5%",
    weightRange: "6-8g",
    seoDescription: "Bold and elegant sterling silver statement ring featuring premium cubic zirconia stones. This eye-catching ring combines contemporary design with traditional craftsmanship, featuring rhodium plating for enhanced durability and brilliance that makes it perfect for special occasions."
  },
  {
    id: 5,
    name: "Delicate Silver Chain",
    image: "https://img.freepik.com/free-photo/close-up-silver-chains-black-background_23-2149846310.jpg",
    category: "Chains",
    description: "Delicate silver chain with elegant clasp design",
    minOrder: "20 units",
    price: 2500,
    purity: "92.5% Sterling Silver",
    stoneType: "N/A",
    features: ["Box Chain Pattern", "Secure Lobster Clasp", "High Polish", "Lightweight"],
    availableSizes: "16 inches, 18 inches, 20 inches",
    sku: "CH-DL-005",
    makingCharges: 375,
    wastage: "3-4%",
    weightRange: "5-7g",
    seoDescription: "Exquisite delicate sterling silver chain with premium craftsmanship. This versatile silver chain features a secure lobster clasp and high-polish finish, making it perfect for pendants or as a standalone piece that adds a subtle touch of elegance to any outfit."
  },
  {
    id: 6,
    name: "Traditional Silver Toe Ring",
    image: "https://i.postimg.cc/G2ZqTcrH/payal.png",
    category: "Rings",
    description: "Hand-crafted traditional silver toe ring with intricate patterns",
    minOrder: "30 units",
    price: 1200,
    purity: "92.5% Sterling Silver",
    stoneType: "N/A",
    features: ["Adjustable", "Traditional Design", "Oxidized Finish", "Comfortable Fit"],
    availableSizes: "One size fits all (Adjustable)",
    sku: "TR-TD-006",
    makingCharges: 180,
    wastage: "2-3%",
    weightRange: "1.5-2g per piece",
    seoDescription: "Traditional handcrafted silver toe rings with intricate patterns and adjustable fit. These authentic Indian bichhiyas feature beautiful oxidized detailing that highlights the traditional craftsmanship while providing comfortable everyday wear for cultural occasions."
  },
  {
    id: 7,
    name: "Silver Ganesh Murti",
    image: "https://i.postimg.cc/8cjtjjq8/murti.png",
    category: "Murti",
    description: "Beautifully crafted Ganesh murti with detailed work",
    minOrder: "10 units",
    price: 15000,
    purity: "92.5% Sterling Silver",
    stoneType: "N/A",
    features: ["Detailed Craftsmanship", "Temple Design", "Antique Finish", "Stable Base"],
    availableSizes: "5 inches, 7 inches, 9 inches",
    sku: "MU-GM-007",
    makingCharges: 2250,
    wastage: "8-10%",
    weightRange: "350-600g",
    seoDescription: "Sacred silver Ganesh murti with exquisite detailing by master artisans. This divine representation of Lord Ganesha features intricate temple-inspired design elements with an antique finish that enhances the spiritual presence and brings auspiciousness to your home or temple."
  },
  {
    id: 8,
    name: "Designer Payal",
    image: "https://i.postimg.cc/G2ZqTcrH/payal.png",
    category: "Payal",
    description: "Modern designer payal with bell accents",
    minOrder: "15 units",
    price: 5800,
    purity: "92.5% Sterling Silver",
    stoneType: "Semi-precious stones",
    features: ["Contemporary Design", "Gemstone Accents", "Traditional Bells", "Secure Clasp"],
    availableSizes: "Standard (Adjustable)",
    sku: "PY-DS-008",
    makingCharges: 870,
    wastage: "6-8%",
    weightRange: "50-55g per pair",
    seoDescription: "Contemporary designer silver payal ankle bracelets with semi-precious stone accents. These modern interpretations of traditional anklets blend innovation with heritage, featuring melodious bells and a secure clasp mechanism for comfortable, all-day wear."
  },
  {
    id: 9,
    name: "Gemstone Silver Bracelet",
    image: "https://i.postimg.cc/Ls8yrCN6/IMG-0937.png",
    category: "Bracelets",
    description: "Silver bracelet with natural gemstone accents",
    minOrder: "10 units",
    price: 4800,
    purity: "92.5% Sterling Silver",
    stoneType: "Amethyst, Garnet, Turquoise",
    features: ["Multi-gemstone Design", "Artisan Crafted", "Toggle Clasp", "Engraved Pattern"],
    availableSizes: "6.5 inches, 7 inches, 7.5 inches",
    sku: "BR-GM-009",
    makingCharges: 720,
    wastage: "5-7%",
    weightRange: "18-22g",
    seoDescription: "Luxurious silver bracelet featuring genuine natural gemstones including amethyst, garnet, and turquoise. This artisan-crafted piece showcases intricate engraved patterns and a secure toggle clasp, creating a perfect balance of elegance and natural beauty."
  },
  {
    id: 10,
    name: "Silver Pendant Necklace",
    image: "https://img.freepik.com/free-photo/close-up-silver-chains-black-background_23-2149846310.jpg",
    category: "Chains",
    description: "Sterling silver pendant necklace with elegant design",
    minOrder: "20 units",
    price: 3600,
    purity: "92.5% Sterling Silver",
    stoneType: "Cubic Zirconia",
    features: ["Pendant and Chain Set", "Rhodium Plated", "Spring Ring Clasp", "Gift Box Included"],
    availableSizes: "18 inches",
    sku: "NK-PD-010",
    makingCharges: 540,
    wastage: "4-6%",
    weightRange: "8-10g",
    seoDescription: "Elegant sterling silver pendant necklace with brilliant cubic zirconia accent. This versatile jewelry piece features a rhodium-plated finish for enhanced brilliance and tarnish resistance, presented in a premium gift box perfect for special occasions."
  },
  {
    id: 11,
    name: "Silver Lakshmi Murti",
    image: "https://i.postimg.cc/8cjtjjq8/murti.png",
    category: "Murti",
    description: "Traditional silver Lakshmi murti with fine detailing",
    minOrder: "8 units",
    price: 18000,
    purity: "92.5% Sterling Silver",
    stoneType: "N/A",
    features: ["Traditional Iconography", "Hand Finished", "Temple Design", "Lotus Base"],
    availableSizes: "6 inches, 8 inches, 10 inches",
    sku: "MU-LK-011",
    makingCharges: 2700,
    wastage: "8-10%",
    weightRange: "400-700g",
    seoDescription: "Sacred silver Goddess Lakshmi murti with traditional temple design and exquisite detailing. This divine representation features authentic iconography on a beautiful lotus base, crafted by skilled artisans to bring prosperity and auspiciousness to your home or temple."
  },
  {
    id: 12,
    name: "Engraved Silver Ring",
    image: "https://img.freepik.com/premium-photo/silver-ring-black-background-macro-picture_10069-97.jpg",
    category: "Rings",
    description: "Custom engraved silver ring with vintage design",
    minOrder: "20 units",
    price: 2200,
    purity: "92.5% Sterling Silver",
    stoneType: "N/A",
    features: ["Vintage Pattern", "Customizable Engraving", "Comfort Fit", "Oxidized Finish"],
    availableSizes: "US 6-12",
    sku: "RG-EN-012",
    makingCharges: 330,
    wastage: "3-5%",
    weightRange: "7-9g",
    seoDescription: "Custom engraved silver ring featuring intricate vintage patterns with oxidized finish. This personalized sterling silver ring offers elegant customization options with a comfortable fit band, perfect for expressing individual style or commemorating special moments."
  }
];
