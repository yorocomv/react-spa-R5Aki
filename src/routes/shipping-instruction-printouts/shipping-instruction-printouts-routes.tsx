import { Route, Routes } from 'react-router-dom';
import PrintHistoryList from './PrintHistoryList';

export default function ShippingInstructionPrintoutsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrintHistoryList />} />
    </Routes>
  );
}
