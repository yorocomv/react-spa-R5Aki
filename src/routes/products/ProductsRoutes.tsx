import { Route, Routes } from 'react-router';

import ProductList from './ProductList';

export default function ProductsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
    </Routes>
  );
}
