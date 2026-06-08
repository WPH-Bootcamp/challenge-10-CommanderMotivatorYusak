import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as orderApi from '@/lib/api/order.api';
import { getErrorMessage } from '@/lib/utils';
import type { OrderStatus } from '@/types/order.types';

export const orderKeys = {
  all: ['orders'] as const,
  list: (status: OrderStatus | 'all') => [...orderKeys.all, status] as const,
};

export const useOrders = (status: OrderStatus | 'all' = 'all') => {
  return useQuery({
    queryKey: orderKeys.list(status),
    queryFn: () => orderApi.getOrders(status === 'all' ? undefined : status),
  });
};

// Submit a review for a completed order
export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      rating,
      comment,
    }: {
      orderId: string;
      rating: number;
      comment: string;
    }) => orderApi.submitReview(orderId, { rating, comment }),

    onSuccess: () => {
      // Invalidate orders cache so the "Reviewed" badge appears
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      toast.success('Review submitted. Thank you!');
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};