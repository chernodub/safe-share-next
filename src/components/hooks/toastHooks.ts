import type { UseToastOptions } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

export function useLoadingToast() {
  return useToast({
    status: 'loading',
    position: 'bottom',
    duration: null,
  });
}

export const SUCCESS_TOAST_TIMEOUT = 3000;
export function useSuccessToast(options: UseToastOptions = {}) {
  return useToast({
    status: 'success',
    position: 'bottom',
    duration: SUCCESS_TOAST_TIMEOUT,
    ...options,
  });
}
