import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
    onClose?.();
  }

  const navItemClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-base font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white shadow"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 transform bg-white p-5 shadow-xl transition-transform duration-300
          md:static md:z-0 md:block md:w-64 md:translate-x-0 md:border-r md:border-gray-200 md:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-6 flex items-center justify-between md:block">
          <h2 className="text-2xl font-semibold text-gray-900">Fabric Tracker</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-lg md:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-2">
          <NavLink to="/" end className={navItemClass} onClick={onClose}>
            📊 Ledger
          </NavLink>

          <NavLink to="/create-batch" className={navItemClass} onClick={onClose}>
            ➕ Create Batch
          </NavLink>

          <NavLink
            to="/add-transaction"
            className={navItemClass}
            onClick={onClose}
          >
            🔁 Add Transaction
          </NavLink>
        </nav>

        <div className="mt-8 border-t pt-4">
          <button
            onClick={logout}
            className="w-full rounded-xl border border-red-200 px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}