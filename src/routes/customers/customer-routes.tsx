import { Route, Routes } from 'react-router';
import SearchCustomer from './SearchCustomer';
import ExamineCustomer from './ExamineCustomer';
import FoundCustomers from './components/FoundCustomers';
import RegisterCustomer from './RegisterCustomer';
import PossiblyOverlapCustomers from './PossiblyOverlapCustomers';
import ChooseCustomer from './ChooseCustomer';
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
