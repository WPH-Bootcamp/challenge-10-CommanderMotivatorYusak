export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  images: string[];          // First image = hero, rest = gallery thumbnails
  rating: number;            // e.g. 4.3
  address: string;
  distance: string;          // e.g. "2.4 km"
  categories: string[];      // e.g. ["Fast Food", "Burger"]
  isOpen: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;             // In smallest currency unit (cents/IDR)
  image: string;
  category: 'food' | 'drink'; // Used for menu tab filtering
  description?: string;
}

// Query params shape for the restaurant list endpoint
export interface RestaurantQueryParams {
  search?: string;
  category?: string;         // e.g. "nearby" | "best-seller" | "discount"
  page?: number;
}

// API list response wrapper
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}