import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorBoundaryProvider from './components/providers/ErrorBoundaryProvider';
import AxiosErrorHandleProvider from './components/providers/AxiosErrorHandleProvider';
import Home from './Home';

const CustomerRoutes = lazy(() => import('./routes/customers/customer-routes'));
const ShippingInstructionPrintoutsRoutes = lazy(
  () => import('./routes/shipping-instruction-printouts/shipping-instruction-printouts-routes'),
);

const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: 'customers/*', element: <CustomerRoutes /> },
    { path: 'shipping-instruction-printouts/*', element: <ShippingInstructionPrintoutsRoutes /> },
  ],
  {
    basename: '/spa',
  },
);

export default function App() {
  return (
    <ErrorBoundaryProvider>
      <AxiosErrorHandleProvider>
        <Suspense fallback={<div>読み込み中</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AxiosErrorHandleProvider>
    </ErrorBoundaryProvider>
  );
}
