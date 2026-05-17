import { Route, Routes } from 'react-router';

import ProductList from './ProductList';
import RegisterProduct from './RegisterProduct';
import RegisterProductPage from './RegisterProductPage';

export default function ProductsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/new" element={<RegisterProductPage />} />
      <Route path="/sku/:id" element={<RegisterProduct />} />
    </Routes>
  );
}
