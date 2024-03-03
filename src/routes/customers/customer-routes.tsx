import { Route, Routes } from 'react-router-dom';
import SearchCustomer from './SearchCustomer';
import ExamineCustomer from './ExamineCustomer';
import FoundCustomers from './components/FoundCustomers';
import RegisterCustomer from './RegisterCustomer';
import PossiblyOverlapCustomers from './PossiblyOverlapCustomers';
import ChooseCustomer from './ChooseCustomer';

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchCustomer />}>
        <Route index element={<FoundCustomers />} />
        <Route path=":id" element={<ExamineCustomer />} />
        <Route path=":id/checking-overlap" element={<PossiblyOverlapCustomers />} />
        <Route path=":id/decide" element={<ChooseCustomer />} />
      </Route>
      <Route path="/new" element={<RegisterCustomer />} />
      <Route path="/:id/edit" element={<RegisterCustomer />} />
    </Routes>
  );
}
