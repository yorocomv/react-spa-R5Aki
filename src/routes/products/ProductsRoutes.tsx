import { Route, Routes } from 'react-router';

import EditProductPage from './EditProductPage';
import ProductList from './ProductList';
import RegisterProductPage from './RegisterProductPage';

export default function ProductsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/new" element={<RegisterProductPage />} />
      <Route path="/sku/:id" element={<EditProductPage />} />
    </Routes>
  );
}
