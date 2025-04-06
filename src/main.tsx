import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';

import env from '@/env';

import App from './App';
import './index.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root')!);
const isMsw = env.DEV && env.MODE === 'msw4dev';

async function enableMocking(): Promise<ServiceWorkerRegistration | undefined> {
  if (isMsw) {
    const worker = await import('./mocks/browser');
    return worker.default.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        // 追加: vite v5 マイグレーション
        url: '/spa/mockServiceWorker.js',
        options: { scope: '/spa/' },
      },
    });
  }
  return undefined;
}

if (isMsw) {
  (async () => {
    await enableMocking().catch((err: string) => {
      throw new Error(`💥💥💥 [MSW?] Mocking disabled. ${err} 💀💀💀`);
    });
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
      </React.StrictMode>,
    );
  })().catch((err: string) => {
    throw new Error(err);
  });
}
else {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
