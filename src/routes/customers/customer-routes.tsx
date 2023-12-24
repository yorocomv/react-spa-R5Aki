import { Route, Routes } from 'react-router-dom';
import SearchCustomer from './SearchCustomer';

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchCustomer />} />
    </Routes>
  );
}
