export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  storeName: string;
  customerName?: string;
  status: 'antrean' | 'diproses' | 'selesai';
  date: string;
  time: string;
  items: OrderItem[];
  totalPayment: number;
  rating?: number;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'NPS-130226004',
    storeName: 'Nasi Goreng Pak Salman',
    customerName: 'Arif Satria',
    status: 'antrean',
    date: '13 Februari 2026',
    time: '08.36 WIB',
    totalPayment: 50000,
    items: [
      {
        id: '1',
        name: 'Nasi Goreng Spesial',
        quantity: 2,
        price: 20000,
        imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        id: '2',
        name: 'Es Teh Manis',
        quantity: 2,
        price: 5000,
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200&h=200'
      }
    ]
  },
  {
    id: 'NPS-130226005',
    storeName: 'Nasi Goreng Pak Salman',
    customerName: 'Arif Satria',
    status: 'diproses',
    date: '13 Februari 2026',
    time: '08.37 WIB',
    totalPayment: 50000,
    items: [
      {
        id: '1',
        name: 'Nasi Goreng Spesial',
        quantity: 2,
        price: 20000,
        imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        id: '2',
        name: 'Es Teh Manis',
        quantity: 2,
        price: 5000,
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200&h=200'
      }
    ]
  },
  {
    id: 'NPS-130226001',
    storeName: 'Nasi Goreng Pak Salman',
    customerName: 'Arif Satria',
    status: 'selesai',
    date: '13 Februari 2026',
    time: '09.09 WIB',
    totalPayment: 50000,
    items: [
      {
        id: '1',
        name: 'Nasi Goreng Spesial',
        quantity: 2,
        price: 20000,
        imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        id: '2',
        name: 'Es Teh Manis',
        quantity: 2,
        price: 5000,
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200&h=200'
      }
    ]
  },
  {
    id: 'NPS-130226002',
    storeName: 'Nasi Goreng Pak Salman',
    customerName: 'Arif Satria',
    status: 'selesai',
    date: '13 Februari 2026',
    time: '09.01 WIB',
    totalPayment: 50000,
    rating: 4,
    items: [
      {
        id: '1',
        name: 'Nasi Goreng Spesial',
        quantity: 2,
        price: 20000,
        imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        id: '2',
        name: 'Es Teh Manis',
        quantity: 2,
        price: 5000,
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200&h=200'
      }
    ]
  }
];

// Helper to get orders from localStorage or use initial data
export const getOrders = (): Order[] => {
  const stored = localStorage.getItem('dummy_orders');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('dummy_orders', JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
};

export const getOrderById = (id: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(o => o.id === id);
};

export const updateOrderRating = (id: string, rating: number) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].rating = rating;
    localStorage.setItem('dummy_orders', JSON.stringify(orders));
  }
};

export const updateOrderStatus = (id: string, status: Order['status']) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].status = status;
    localStorage.setItem('dummy_orders', JSON.stringify(orders));
  }
};
