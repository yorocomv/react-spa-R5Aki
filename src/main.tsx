import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

if (import.meta.env.DEV && import.meta.env.MODE === 'msw4dev') {
  import('./mocks/browser')
    .then((worker) => worker.default.start())
    .catch((err: string) => {
      console.error(`💥💥💥 [MSW?] Mocking disabled. ${err} 💀💀💀`);
      return Promise.reject(new Error(err));
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  </React.StrictMode>,
);
