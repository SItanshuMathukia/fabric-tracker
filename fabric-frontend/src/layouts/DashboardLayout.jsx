import Sidebar from "../components/Sidebar";
import { Outlet , Link} from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

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

