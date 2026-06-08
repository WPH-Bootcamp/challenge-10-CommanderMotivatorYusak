import { AxiosError } from 'axios';

// Format price from integer (IDR cents) to display string
// e.g. 50000 → "Rp50.000"
export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);

// Extract a human-readable message from Axios or generic errors
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Prefer server's error message if available
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message
    );
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
};

// Debounce: delays fn execution until after `delay` ms of inactivity
export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

