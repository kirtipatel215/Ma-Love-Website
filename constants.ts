import { Product, User, Coupon } from './types';
import { Droplets, Sparkles, Sprout, ShieldCheck, Heart, UserCheck, ThermometerSun, Snowflake, UserMinus, Wind, Leaf, Activity, Droplet, Scissors } from 'lucide-react';

export const CONCERNS = [
  { id: 'heat', label: 'Excess Heat & Scalp Health', icon: ThermometerSun },
  { id: 'dandruff', label: 'Dandruff & Scalp Itching', icon: Snowflake },
  { id: 'greying', label: 'Anti-Greying', icon: UserMinus },
  { id: 'frizzy', label: 'Frizzy Hair', icon: Wind },
  { id: 'hairfall', label: 'Hair Fall / Hair Loss', icon: Leaf },
  { id: 'oily', label: 'Oily Hair', icon: Droplet },
  { id: 'growth', label: 'Slow Hair Growth', icon: Activity },
  { id: 'damage', label: 'Dry, Damaged & Split Ends', icon: Scissors },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2574&auto=format&fit=crop",
    title: "Nourish Beyond Care",
    subtitle: "The Priceless Present",
    desc: "Pure oils crafted to protect what matters most.",
    cta: "Shop The Ritual",
    offer: "Free Rose Roller on Orders ₹1999+"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2600&auto=format&fit=crop",
    title: "Ancient Secrets",
    subtitle: "Bhringraj Elixir",
    desc: "Arrest hair fall with the power of 14 rare herbs.",
    cta: "View Elixir",
    offer: "Flat 20% OFF | Code: MALOVE20"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1611080541599-8c6dbde6edb8?q=80&w=2573&auto=format&fit=crop",
    title: "Glass Skin Glow",
    subtitle: "Kumkumadi Tailam",
    desc: "Royal saffron blend for timeless radiance.",
    cta: "Discover Glow",
    offer: "Buy 2 Get 1 Free on Face Oils"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ma Love Bhringraj Elixir',
    tagline: 'Ancient Ayurvedic Secret',
    price: 899,
    mrp: 1299,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop',
    category: 'Hair',
    concern: ['hairfall', 'growth', 'greying', 'heat'],
    rating: 4.9,
    reviews: 1240,
    description: 'A potent blend of Bhringraj and 14 herbs to arrest hair fall and stimulate dormant follicles. The gold standard in ayurvedic hair care.',
    ingredients: 'Bhringraj, Amla, Brahmi, Sesame Oil, Goat Milk',
    howToUse: 'Massage gently into scalp. Leave overnight for best results.',
  },
  {
    id: '2',
    name: 'Ma Love Tea Tree Purifier',
    tagline: 'The Scalp Healer',
    price: 649,
    mrp: 999,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=2670&auto=format&fit=crop',
    category: 'Hair',
    concern: ['dandruff', 'oily', 'heat'],
    rating: 4.7,
    reviews: 850,
    description: 'Clinically proven to reduce flakes by 90% in just 3 washes. Soothes itchy scalp immediately.',
    ingredients: 'Tea Tree Oil, Neem Extract, Salicylic Acid (0.5%), Aloe Vera',
    howToUse: 'Apply to scalp 30 mins before washing. Use twice a week.',
  },
  {
    id: '3',
    name: 'Ma Love Argan Gold',
    tagline: 'Liquid Gold for Frizz',
    price: 1199,
    mrp: 1599,
    image: 'https://images.unsplash.com/photo-1615396899839-a9927db8e46e?q=80&w=2670&auto=format&fit=crop',
    category: 'Hair',
    concern: ['frizzy', 'damage', 'heat'],
    rating: 4.9,
    reviews: 2100,
    description: 'Imported pure Argan oil that transforms straw-like hair into silk instantly. Non-sticky and lightweight.',
    ingredients: 'Pure Argan Oil, Vitamin E, Jojoba Oil',
    howToUse: 'Apply a few drops to damp hair ends. Do not rinse.',
  },
  {
    id: '4',
    name: 'Ma Love Onion Accelerator',
    tagline: 'Boost Hair Density',
    price: 599,
    mrp: 899,
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2680&auto=format&fit=crop',
    category: 'Hair',
    concern: ['hairfall', 'growth', 'greying'],
    rating: 4.6,
    reviews: 3200,
    description: 'Rich in sulfur to minimize breakage and thinning. Increases hair density visually.',
    ingredients: 'Red Onion Seed Oil, Black Seed Oil, Coconut Oil',
    howToUse: 'Massage thoroughly. Wash off with mild shampoo.',
  },
  {
    id: '5',
    name: 'Ma Love Kumkumadi Radiance',
    tagline: 'For Glass Skin',
    price: 1499,
    mrp: 1999,
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1888&auto=format&fit=crop',
    category: 'Skin',
    concern: ['damage', 'heat'],
    rating: 4.9,
    reviews: 540,
    description: 'A luxurious blend for that celebrity glass-skin look.',
    ingredients: 'Kumkumadi Tailam, Saffron, Rose Oil',
    howToUse: 'Apply 2 drops at night.',
  }
];

export const TESTIMONIALS = [
  { id: 1, name: "Sonia R.", text: "I've never felt an oil so light yet so nourishing. It truly feels like a gift to myself.", role: "Verified Buyer" },
  { id: 2, name: "Meera K.", text: "The packaging is stunning, but the results are even better. My hair fall stopped in 2 weeks.", role: "Verified Buyer" },
  { id: 3, name: "Priya S.", text: "Ma Love oils have become my nightly ritual. The scent is incredibly calming.", role: "Verified Buyer" }
];

export const BENEFITS = [
    { icon: Droplets, title: "Deep Nourishment", desc: "Penetrates 3 layers deep" },
    { icon: Sparkles, title: "Non-Sticky", desc: "Absorbs in seconds" },
    { icon: Sprout, title: "100% Natural", desc: "No mineral oils or parabens" },
    { icon: ShieldCheck, title: "Root Strengthening", desc: "Fortifies from within" },
];

export const INGREDIENTS_FEATURE = [
    { name: "Cold Pressed Coconut", origin: "Kerala, India", desc: "Base nourishment" },
    { name: "Moroccan Argan", origin: "Agadir, Morocco", desc: "Frizz control" },
    { name: "Pure Saffron", origin: "Kashmir, India", desc: "Skin radiance" },
];

export const USAGE_STEPS = [
    { step: "01", title: "Apply", desc: "Take a generous amount and apply to scalp or skin." },
    { step: "02", title: "Massage", desc: "Gently massage in circular motions for 5 minutes." },
    { step: "03", title: "Absorb", desc: "Leave on for at least 30 minutes or overnight." },
    { step: "04", title: "Cleanse", desc: "Wash off with a mild, sulphate-free cleanser." },
];

export const FAQS = [
  { q: "How do I track my order?", a: "You can track your order in the Orders tab by entering your Order ID or clicking 'Track Order' on your active order card." },
  { q: "Are the oils natural?", a: "Yes, all our oils are 100% natural, cold-pressed, and free from mineral oils, parabens, and sulphates." },
  { q: "What is the return policy?", a: "We accept returns for damaged or incorrect items within 7 days of delivery. Please contact support to initiate a return." },
];

export const MOCK_USER: User = {
  id: 'usr_12345',
  name: 'Anjali Sharma',
  email: 'anjali.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
  addresses: [
    {
      id: 'addr_1',
      type: 'Home',
      name: 'Anjali Sharma',
      street: '102, Emerald Heights, Linking Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400050',
      phone: '9876543210',
      isDefault: true
    }
  ],
  wishlist: ['3', '5'],
  recentlyViewed: ['2', '4'],
  orders: [
    {
      id: 'ORD-293849',
      date: '24 Oct 2024',
      status: 'Out for Delivery',
      total: 1548,
      paymentMethod: 'UPI',
      trackingId: 'TRK99283',
      items: [
        { productId: '1', name: 'Ma Love Bhringraj Elixir', price: 899, quantity: 1, image: PRODUCTS[0].image },
        { productId: '2', name: 'Ma Love Tea Tree Purifier', price: 649, quantity: 1, image: PRODUCTS[1].image }
      ]
    },
    {
      id: 'ORD-110293',
      date: '10 Sep 2024',
      status: 'Delivered',
      total: 1199,
      paymentMethod: 'Credit Card',
      items: [
        { productId: '3', name: 'Ma Love Argan Gold', price: 1199, quantity: 1, image: PRODUCTS[2].image }
      ]
    }
  ]
};

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'cpn_1',
    code: 'WELCOME500',
    name: 'First Order Discount',
    type: 'flat',
    value: 500,
    minCartValue: 1500,
    validFrom: '2023-01-01',
    validUntil: '2025-12-31',
    usageLimit: 1000,
    usedCount: 150,
    isActive: true,
    userEligibility: 'new_user',
    description: 'Flat ₹500 off on your first order above ₹1500.'
  },
  {
    id: 'cpn_2',
    code: 'MALOVE20',
    name: 'Season Sale',
    type: 'percentage',
    value: 20,
    maxDiscount: 400,
    minCartValue: 1000,
    validFrom: '2023-01-01',
    validUntil: '2025-12-31',
    usageLimit: 5000,
    usedCount: 2340,
    isActive: true,
    description: 'Get 20% off up to ₹400 on orders above ₹1000.'
  },
  {
    id: 'cpn_3',
    code: 'FREESHIP',
    name: 'Free Shipping',
    type: 'free_shipping',
    value: 0,
    minCartValue: 499,
    validFrom: '2023-01-01',
    validUntil: '2025-12-31',
    usageLimit: 10000,
    usedCount: 450,
    isActive: true,
    description: 'Free shipping on all orders above ₹499.'
  },
  {
    id: 'cpn_4',
    code: 'PREPAID100',
    name: 'Prepaid Offer',
    type: 'flat',
    value: 100,
    minCartValue: 999,
    validFrom: '2023-01-01',
    validUntil: '2025-12-31',
    usageLimit: 2000,
    usedCount: 120,
    isActive: true,
    paymentMethod: 'prepaid',
    description: 'Extra ₹100 off on prepaid orders.'
  },
  {
    id: 'cpn_5',
    code: 'HAIRCARE15',
    name: 'Hair Care Special',
    type: 'percentage',
    value: 15,
    minCartValue: 500,
    validFrom: '2023-01-01',
    validUntil: '2025-12-31',
    usageLimit: 500,
    usedCount: 20,
    isActive: true,
    applicableCategories: ['Hair'],
    description: '15% off specifically on all Hair Care products.'
  },
  {
    id: 'cpn_6',
    code: 'HAIRCARE10',
    name: 'Hair Care Promo',
    type: 'percentage',
    value: 10,
    minCartValue: 600,
    validFrom: '2023-01-01',
    validUntil: '2025-12-31',
    usageLimit: 100,
    usedCount: 0,
    isActive: true,
    applicableCategories: ['Hair'],
    description: '10% off on all hair care products.'
  }
];
