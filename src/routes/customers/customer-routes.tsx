import { Route, Routes } from 'react-router-dom';
import SearchCustomer from './SearchCustomer';
import ExamineCustomer from './ExamineCustomer';

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchCustomer />} />
      <Route path="/:id" element={<ExamineCustomer />} />
    </Routes>
  );
}
