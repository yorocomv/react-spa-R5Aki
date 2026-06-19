import { Route, Routes } from 'react-router';

import EditProductPage from './EditProductPage';
import ProductList from './ProductList';
import RegisterProductPage from './RegisterProductPage';
import RegisterProductQuantityVariantsPage from './RegisterProductQuantityVariantsPage';

export default function ProductsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/new" element={<RegisterProductPage />} />
      <Route path="/sku/:id" element={<EditProductPage />} />
      <Route path="/new/quantity-variant" element={<RegisterProductQuantityVariantsPage />} />
    </Routes>
  );
}
