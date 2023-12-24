import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home';

const CustomerRoutes = lazy(() => import('./routes/customers/customer-routes'));

const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: 'customers/*', element: <CustomerRoutes /> },
  ],
  {
    basename: '/spa',
  },
);

export default function App() {
  return (
    <Suspense fallback={<div>読み込み中</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
