import { Route, Routes } from 'react-router';

import RegisterCustomer from '@/routes/customers/editor/RegisterCustomer';
import TakeANoteAboutCustomer from '@/routes/customers/editor/TakeANoteAboutCustomer';
import ChooseCustomer from '@/routes/customers/finder/ChooseCustomer';
import ExamineCustomer from '@/routes/customers/finder/ExamineCustomer';
import FoundCustomers from '@/routes/customers/finder/FoundCustomers';
import SearchCustomer from '@/routes/customers/finder/Layout';
import PossiblyOverlapCustomers from '@/routes/customers/finder/PossiblyOverlapCustomers';

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchCustomer />}>
        <Route index element={<FoundCustomers />} />
        <Route path=":id" element={<ExamineCustomer />} />
        <Route path=":id/checking-overlap" element={<PossiblyOverlapCustomers />} />
        <Route path=":id/decide" element={<ChooseCustomer />} />
      </Route>
      <Route path="/register" element={<RegisterCustomer />} />
      <Route path="/:id/edit" element={<RegisterCustomer />} />
      <Route path="/:id/take-a-note" element={<TakeANoteAboutCustomer />} />
    </Routes>
  );
}
