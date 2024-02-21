'use client';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
const toastCustoms = {
  error: {
    style: {
      border: '1px solid #ef4444',
      padding: '16px',
      color: '#ef4444',
    },
  },
  success: {
    style: {
      border: '1px solid #22c55e',
      padding: '16px',
      color: '#22c55e',
    },
  },
}
const Providers = ({ children }) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        }
      }
    })
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' toastOptions={toastCustoms} />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers;