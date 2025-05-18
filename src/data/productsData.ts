
export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  description: string;
  minOrder: string;
  price: number;
}

export const productsData: Product[] = [
  {
    id: 1,
    name: "Traditional Silver Murtis",
    image: "https://i.postimg.cc/8cjtjjq8/murti.png",
    category: "Murti",
    description: "Intricately designed traditional necklace featuring handcrafted patterns",
    minOrder: "20 units",
    price: 12000
  },
  {
    id: 2,
    name: "Silver Payal",
    image: "https://i.postimg.cc/G2ZqTcrH/payal.png",
    category: "Payal",
    description: "Elegant ankle bracelet that adds sophistication to any outfit",
    minOrder: "30 units",
    price: 4500
  },
  {
    id: 3,
    name: "Sterling Silver Bracelet",
    image: "https://i.postimg.cc/Ls8yrCN6/IMG-0937.png",
    category: "Bracelets",
    description: "Fine sterling silver bracelet with timeless design",
    minOrder: "15 units",
    price: 3200
  },
  {
    id: 4,
    name: "Silver Statement Ring",
    image: "https://img.freepik.com/premium-photo/silver-ring-black-background-macro-picture_10069-97.jpg",
    category: "Rings",
    description: "Bold statement ring perfect for special occasions",
    minOrder: "25 units",
    price: 1800
  },
  {
    id: 5,
    name: "Delicate Silver Chain",
    image: "https://img.freepik.com/free-photo/close-up-silver-chains-black-background_23-2149846310.jpg",
    category: "Chains",
    description: "Delicate silver chain with elegant clasp design",
    minOrder: "20 units",
    price: 2500
  },
  {
    id: 6,
    name: "Traditional Silver Toe Ring",
    image: "https://i.postimg.cc/G2ZqTcrH/payal.png",
    category: "Rings",
    description: "Hand-crafted traditional silver toe ring with intricate patterns",
    minOrder: "30 units",
    price: 1200
  },
  {
    id: 7,
    name: "Silver Ganesh Murti",
    image: "https://i.postimg.cc/8cjtjjq8/murti.png",
    category: "Murti",
    description: "Beautifully crafted Ganesh murti with detailed work",
    minOrder: "10 units",
    price: 15000
  },
  {
    id: 8,
    name: "Designer Payal",
    image: "https://i.postimg.cc/G2ZqTcrH/payal.png",
    category: "Payal",
    description: "Modern designer payal with bell accents",
    minOrder: "15 units",
    price: 5800
  },
  {
    id: 9,
    name: "Gemstone Silver Bracelet",
    image: "https://i.postimg.cc/Ls8yrCN6/IMG-0937.png",
    category: "Bracelets",
    description: "Silver bracelet with natural gemstone accents",
    minOrder: "10 units",
    price: 4800
  },
  {
    id: 10,
    name: "Silver Pendant Necklace",
    image: "https://img.freepik.com/free-photo/close-up-silver-chains-black-background_23-2149846310.jpg",
    category: "Chains",
    description: "Sterling silver pendant necklace with elegant design",
    minOrder: "20 units",
    price: 3600
  },
  {
    id: 11,
    name: "Silver Lakshmi Murti",
    image: "https://i.postimg.cc/8cjtjjq8/murti.png",
    category: "Murti",
    description: "Traditional silver Lakshmi murti with fine detailing",
    minOrder: "8 units",
    price: 18000
  },
  {
    id: 12,
    name: "Engraved Silver Ring",
    image: "https://img.freepik.com/premium-photo/silver-ring-black-background-macro-picture_10069-97.jpg",
    category: "Rings",
    description: "Custom engraved silver ring with vintage design",
    minOrder: "20 units",
    price: 2200
  }
];
