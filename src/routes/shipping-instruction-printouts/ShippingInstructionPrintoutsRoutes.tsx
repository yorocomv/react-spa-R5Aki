import { Route, Routes } from 'react-router';

import PrintHistoryList from '@/routes/shipping-instruction-printouts/PrintHistoryList';

import PrintHistoryCorrection from './PrintHistoryCorrection';

export default function ShippingInstructionPrintoutsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrintHistoryList />} />
      <Route path="/correct" element={<PrintHistoryCorrection />} />
    </Routes>
  );
}
