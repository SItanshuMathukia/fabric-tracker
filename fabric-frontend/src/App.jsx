import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Ledger from "./components/Ledger";
import CreateBatch from "./components/CreateBatch";
import AddTransaction from "./components/AddTransaction";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="create-batch" element={<CreateBatch />} />
        <Route path="add-transaction" element={<AddTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}