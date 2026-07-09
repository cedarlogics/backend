import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import router from '@/routes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#151021',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
          },
        }}
      />
    </QueryClientProvider>
  );
}
