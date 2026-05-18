export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  sellerId: string;
  sellerName?: string;
  image?: string;
  rating?: number;
  soldCount?: number;
}