import { Route, Routes } from 'react-router';

import PrintHistoryList from './PrintHistoryList';

export default function ShippingInstructionPrintoutsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrintHistoryList />} />
    </Routes>
  );
}
