import { createHashRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/global.css';

import Page from '../ui/Page/Page';

const router = createHashRouter([
  {
    path: '/',
    element: <Page />,
  },
]);

const queryClient = new QueryClient();

async function start() {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}

start();
