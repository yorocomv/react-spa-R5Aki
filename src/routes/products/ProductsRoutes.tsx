import { Route, Routes } from 'react-router';

import EditProductPage from './EditProductPage';
import ProductList from './ProductList';
import RegisterProductPage from './RegisterProductPage';
import RegisterProductQuantityVariantsPage from './RegisterProductQuantityVariantsPage';
import RegisterProductRevisionPage from './RegisterProductRevisionPage';

export default function ProductsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/new" element={<RegisterProductPage />} />
      <Route path="/sku/:id" element={<EditProductPage />} />
      <Route path="/new/quantity-variant" element={<RegisterProductQuantityVariantsPage />} />
      <Route path="/new/revision-same-jan" element={<RegisterProductRevisionPage />} />
    </Routes>
  );
}
