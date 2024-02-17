import { Route, Routes } from 'react-router-dom';
import SearchCustomer from './SearchCustomer';
import ExamineCustomer from './ExamineCustomer';
import FoundCustomers from './components/FoundCustomers';
import RegisterCustomer from './RegisterCustomer';

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchCustomer />}>
        <Route index element={<FoundCustomers />} />
        <Route path="/:id" element={<ExamineCustomer />} />
      </Route>
      <Route path="/new" element={<RegisterCustomer />} />
    </Routes>
  );
}
