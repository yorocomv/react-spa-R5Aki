import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import env from '@/env';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

if (env.DEV && env.MODE === 'msw4dev') {
  import('./mocks/browser')
    .then((worker) =>
      worker.default.start({
        serviceWorker: {
          // 追加: vite v5 マイグレーション
          url: `${env.BASE_URL}/mockServiceWorker.js`,
        },
      }),
    )
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
