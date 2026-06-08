import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as orderApi from '@/lib/api/order.api';
import { useCartStore } from '@/store/cartStore';
import { getErrorMessage } from '@/lib/utils';
import type { CheckoutPayload } from '@/types/order.types';

export const useCheckout = () => {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: (payload: CheckoutPayload) => orderApi.createOrder(payload),

    onSuccess: (data) => {
      // Clear client cart state after successful server order
      clearCart();
      toast.success('Order placed successfully!');
      // Pass orderId to success page via URL param
      router.push(`/checkout/success?orderId=${data.id}`);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};