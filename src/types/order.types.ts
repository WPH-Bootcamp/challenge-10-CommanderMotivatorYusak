export type OrderStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export interface CartItem {
  id: string;                // menuItem.id
  restaurantId: string;
  restaurantName: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  address: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CheckoutPayload {
  restaurantId: string;
  items: { menuItemId: string; quantity: number }[];
  address: string;
  paymentMethod: string;
}