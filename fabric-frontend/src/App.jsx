import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Header from "./components/Header";

import Ledger from "./components/Ledger";
import CreateBatch from "./components/CreateBatch";
import AddTransaction from "./components/AddTransaction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Ledger />} />
          <Route path="create-batch" element={<CreateBatch />} />
          <Route path="add-transaction" element={<AddTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}