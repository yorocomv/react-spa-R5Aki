import { Route, Routes } from 'react-router';

import ChooseCustomer from './ChooseCustomer';
import FoundCustomers from './components/FoundCustomers';
import ExamineCustomer from './ExamineCustomer';
import PossiblyOverlapCustomers from './PossiblyOverlapCustomers';
import RegisterCustomer from './RegisterCustomer';
import SearchCustomer from './SearchCustomer';
import TakeANoteAboutCustomer from './TakeANoteAboutCustomer';

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
