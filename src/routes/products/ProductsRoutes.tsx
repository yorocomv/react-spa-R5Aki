import { Route, Routes } from 'react-router';

import ProductList from './ProductList';
import RegisterProduct from './RegisterProduct';

export default function ProductsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/register" element={<RegisterProduct />} />
    </Routes>
  );
}
