import Sidebar from "../components/Sidebar";
import { Outlet , Link} from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      <div style={{ width: "200px", background: "#eee", padding: "10px" }}>
        <h3>Menu</h3>
        <Link to="/ledger">Ledger</Link><br />
        <Link to="/create-batch">Create Batch</Link><br />
        <Link to="/add-transaction">Add Transaction</Link>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#f6f7fb",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

