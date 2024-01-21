import { Route, Routes } from 'react-router-dom';
import SearchCustomer from './SearchCustomer';
import ExamineCustomer from './ExamineCustomer';
import FoundCustomers from './components/FoundCustomers';

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchCustomer />}>
        <Route index element={<FoundCustomers />} />
        <Route path="/:id" element={<ExamineCustomer />} />
      </Route>
    </Routes>
  );
}
