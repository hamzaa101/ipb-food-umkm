export interface MenuItem {
  id: string;
  name: string;
  price: number;
  soldCount: number;
  imageUrl: string;
  isAvailable: boolean;
}

const INITIAL_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Nasi Goreng Biasa',
    price: 12000,
    soldCount: 16,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200&h=200',
    isAvailable: true,
  },
  {
    id: 'm2',
    name: 'Es teh Manis',
    price: 5000,
    soldCount: 13,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200&h=200',
    isAvailable: true,
  },
  {
    id: 'm3',
    name: 'Nasi Goreng Sosis',
    price: 15000,
    soldCount: 9,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200&h=200',
    isAvailable: false,
  },
  {
    id: 'm4',
    name: 'Ayam Geprek',
    price: 18000,
    soldCount: 25,
    imageUrl: 'https://images.unsplash.com/photo-1626082895617-2c6b45e2a392?auto=format&fit=crop&q=80&w=200&h=200',
    isAvailable: true,
  },
  {
    id: 'm5',
    name: 'Mie Goreng Spesial',
    price: 15000,
    soldCount: 11,
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=200&h=200',
    isAvailable: true,
  },
  {
    id: 'm6',
    name: 'Kopi Susu Gula Aren',
    price: 12000,
    soldCount: 30,
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=200&h=200',
    isAvailable: true,
  },
  {
    id: 'm7',
    name: 'Telur Dadar',
    price: 5000,
    soldCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1525640788966-69bdb028aa73?auto=format&fit=crop&q=80&w=200&h=200',
    isAvailable: true,
  }
];

export const getMenuItems = (): MenuItem[] => {
  const stored = localStorage.getItem('dummy_seller_menu');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('dummy_seller_menu', JSON.stringify(INITIAL_MENU));
  return INITIAL_MENU;
};

export const toggleMenuAvailability = (id: string, isAvailable: boolean) => {
  const items = getMenuItems();
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index].isAvailable = isAvailable;
    localStorage.setItem('dummy_seller_menu', JSON.stringify(items));
  }
};

export const addMenuItem = (newItem: Omit<MenuItem, 'id' | 'soldCount'>) => {
  const items = getMenuItems();
  const menu: MenuItem = {
    ...newItem,
    id: 'm' + Date.now(),
    soldCount: 0,
  };
  items.push(menu);
  localStorage.setItem('dummy_seller_menu', JSON.stringify(items));
};
