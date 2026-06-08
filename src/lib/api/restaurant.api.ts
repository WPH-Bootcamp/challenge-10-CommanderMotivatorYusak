import apiClient from './client';
import type {
  Restaurant,
  MenuItem,
  RestaurantQueryParams,
  PaginatedResponse,
} from '@/types/restaurant.types';

// GET /restaurants — supports search + category filter
export const getRestaurants = async (
  params: RestaurantQueryParams
): Promise<PaginatedResponse<Restaurant>> => {
  const { data } = await apiClient.get('/restaurants', { params });
  return data;
};

// GET /restaurants/:id — single restaurant + its menu
export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const { data } = await apiClient.get(`/restaurants/${id}`);
  return data;
};

// GET /restaurants/:id/menu — menu items for a restaurant
export const getMenuByRestaurantId = async (
  restaurantId: string
): Promise<MenuItem[]> => {
  const { data } = await apiClient.get(`/restaurants/${restaurantId}/menu`);
  return data;
};