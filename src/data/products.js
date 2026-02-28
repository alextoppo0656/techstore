// Using placeholder images from picsum with consistent seeds
export const products = [
  {
    id: 1,
    name: "AirPods Pro 2nd Gen",
    brand: "Apple",
    category: "Audio",
    price: 24900,
    originalPrice: 29900,
    rating: 4.8,
    reviews: 2341,
    badge: "Best Seller",
    img: "https://images.unsplash.com/photo-1588156979435-379b9d802b0a?w=600&q=80",
    description: "Active noise cancellation, Adaptive Transparency, Personalized Spatial Audio. Up to 6 hours of listening time with ANC enabled.",
    specs: { "Driver": "Custom Apple", "ANC": "Yes", "Battery": "6+30hr", "Connectivity": "Bluetooth 5.3", "Water Resistance": "IPX4" }
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Audio",
    price: 32999,
    originalPrice: 39999,
    rating: 4.9,
    reviews: 5123,
    badge: "Top Rated",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    description: "Industry-leading noise canceling headphones with two processors and eight microphones. Up to 30 hours of battery life.",
    specs: { "Driver": "30mm", "ANC": "Dual Chip", "Battery": "30hr", "Connectivity": "Bluetooth 5.2", "Foldable": "Yes" }
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    brand: "Apple",
    category: "Wearables",
    price: 41900,
    originalPrice: null,
    rating: 4.7,
    reviews: 1892,
    badge: "New",
    img: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80",
    description: "The most powerful Apple Watch ever. Double tap to control your Apple Watch without touching the screen.",
    specs: { "Display": "45mm LTPO OLED", "Chip": "S9 SiP", "Battery": "18hr", "Water": "50m WR", "GPS": "Yes" }
  },
  {
    id: 4,
    name: "iPad Air M2",
    brand: "Apple",
    category: "Tablets",
    price: 59900,
    originalPrice: 64900,
    rating: 4.8,
    reviews: 987,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    description: "M2 chip. 11-inch Liquid Retina display. USB-C with USB 3. Landscape front camera.",
    specs: { "Chip": "Apple M2", "Display": "11\" Liquid Retina", "Storage": "128GB-2TB", "RAM": "8GB", "Camera": "12MP" }
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Phones",
    price: 134999,
    originalPrice: 149999,
    rating: 4.7,
    reviews: 3211,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
    description: "Galaxy AI is here. Built-in S Pen. 200MP camera. Titanium frame for ultimate durability.",
    specs: { "Chip": "Snapdragon 8 Gen 3", "Display": "6.8\" QHD+ AMOLED", "Camera": "200MP", "Battery": "5000mAh", "S Pen": "Built-in" }
  },
  {
    id: 6,
    name: "MacBook Air M3",
    brand: "Apple",
    category: "Laptops",
    price: 114900,
    originalPrice: 119900,
    rating: 4.9,
    reviews: 4502,
    badge: "Best Seller",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    description: "Strikingly thin. Incredibly capable. M3 chip brings more performance and speed than ever.",
    specs: { "Chip": "Apple M3", "RAM": "8GB", "Storage": "256GB SSD", "Display": "13.6\" Liquid Retina", "Battery": "18hr" }
  },
  {
    id: 7,
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "Accessories",
    price: 9995,
    originalPrice: 12995,
    rating: 4.8,
    reviews: 7834,
    badge: "Top Rated",
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    description: "The master of all mice. 8K DPI any-surface tracking, ultra-fast MagSpeed scroll, and 70 days battery.",
    specs: { "DPI": "200-8000", "Battery": "70 days", "Buttons": "7", "Connectivity": "USB-C / Bluetooth", "Silent": "Yes" }
  },
  {
    id: 8,
    name: "DJI Mini 4 Pro",
    brand: "DJI",
    category: "Drones",
    price: 79900,
    originalPrice: null,
    rating: 4.9,
    reviews: 634,
    badge: "New",
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
    description: "Under 249g. Omnidirectional obstacle sensing. 4K/60fps HDR video. Up to 34 minutes of flight.",
    specs: { "Weight": "249g", "Camera": "4K/60fps HDR", "Flight Time": "34 min", "Range": "20km", "Obstacle Sensing": "Omni" }
  },
  {
    id: 9,
    name: "Kindle Paperwhite 2024",
    brand: "Amazon",
    category: "E-Readers",
    price: 13999,
    originalPrice: 16999,
    rating: 4.7,
    reviews: 9201,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    description: "300 ppi glare-free display, adjustable warm light, waterproof, and weeks of battery life.",
    specs: { "Display": "6.8\" 300ppi", "Storage": "16GB", "Waterproof": "IPX8", "Battery": "12 weeks", "Light": "Adjustable Warm" }
  },
  {
    id: 10,
    name: "Samsung 65\" Neo QLED 8K",
    brand: "Samsung",
    category: "TVs",
    price: 299999,
    originalPrice: 349999,
    rating: 4.6,
    reviews: 421,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600&q=80",
    description: "8K AI Upscaling. NeoQuantum Matrix Pro. Object Tracking Sound Pro. Real Depth Enhancer Pro.",
    specs: { "Resolution": "8K UHD", "Size": "65\"", "Panel": "Neo QLED", "HDR": "Quantum HDR 64x", "HDMI": "4x HDMI 2.1" }
  },
  {
    id: 11,
    name: "PlayStation 5 Slim",
    brand: "Sony",
    category: "Gaming",
    price: 49990,
    originalPrice: 54990,
    rating: 4.8,
    reviews: 3892,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80",
    description: "Play has no limits. Ultra-high speed SSD. Haptic feedback. Adaptive triggers. 4K gaming.",
    specs: { "CPU": "AMD Zen 2", "GPU": "AMD RDNA 2", "Storage": "1TB SSD", "Output": "4K 120fps", "Ray Tracing": "Yes" }
  },
  {
    id: 12,
    name: "Anker 200W GaN Charger",
    brand: "Anker",
    category: "Accessories",
    price: 5999,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 2109,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    description: "4-port 200W GaN charger. Charge your MacBook Pro, iPad, iPhone, and AirPods simultaneously.",
    specs: { "Total Power": "200W", "Ports": "4 (2 USB-C, 2 USB-A)", "Protocol": "PD 3.0 / PPS", "Size": "Compact", "LED": "Yes" }
  }
];

export const categories = ["All", "Audio", "Wearables", "Tablets", "Phones", "Laptops", "Accessories", "Drones", "E-Readers", "TVs", "Gaming"];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
