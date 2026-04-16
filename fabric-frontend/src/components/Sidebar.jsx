import { NavLink , useNavigate } from "react-router-dom";

const navigate = useNavigate();


export default function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    padding: "12px 15px",
    margin: "8px 0",
    display: "block",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "white" : "#333",
    background: isActive ? "#4f46e5" : "transparent",
    fontWeight: "500",
  });

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Fabric Tracker</h2>

      <NavLink to="/" style={linkStyle}>
        📊 Ledger
      </NavLink>

      <NavLink to="/create-batch" style={linkStyle}>
        ➕ Create Batch
      </NavLink>

      <NavLink to="/add-transaction" style={linkStyle}>
        🔁 Add Transaction
      </NavLink>

      <div className="mt-auto p-4 border-t">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.clear();
            navigate("/login");
          }}
          className="w-full text-left text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}