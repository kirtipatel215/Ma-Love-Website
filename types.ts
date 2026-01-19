export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  mrp: number;
  image: string;
  category: 'Hair' | 'Skin' | 'Wax' | 'Body';
  concern: string[]; // e.g., 'dandruff', 'hairfall'
  rating: number;
  reviews: number;
  description: string;
  ingredients: string;
  howToUse: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  total: number;
  items: OrderItem[];
  paymentMethod: string;
  trackingId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[]; // Product IDs
  recentlyViewed: string[]; // Product IDs
}

export type CouponType = 'flat' | 'percentage' | 'free_shipping';

export interface Coupon {
  id: string;
  code: string;
  name: string; // Internal name
  type: CouponType;
  value: number; // Amount for flat, % for percentage, 0 for free shipping
  minCartValue: number;
  maxDiscount?: number; // Cap for percentage discount
  validFrom: string; // ISO Date
  validUntil: string; // ISO Date
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  applicableCategories?: string[]; // If empty, applicable to all
  applicableProducts?: string[]; // If empty, applicable to all
  paymentMethod?: 'all' | 'prepaid' | 'cod';
  userEligibility?: 'all' | 'new_user';
  description?: string; // For display in offers list
}
