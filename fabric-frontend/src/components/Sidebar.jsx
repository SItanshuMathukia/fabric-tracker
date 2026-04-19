import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    onClose?.();
  }

  const desktopNavClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-base font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white shadow"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `rounded-lg px-2 py-2 text-center text-xs font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-700 dark:text-gray-200"
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 transform bg-white p-5 shadow-xl transition-transform duration-300 dark:bg-[#111827]
          md:static md:z-0 md:block md:w-64 md:translate-x-0 md:border-r md:border-gray-200 md:shadow-none dark:md:border-gray-800
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-6 flex items-center justify-between md:block">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Fabric Tracker
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-lg md:hidden dark:text-white"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-2">
          <NavLink to="/" end className={desktopNavClass} onClick={onClose}>
            🏠 Dashboard
          </NavLink>

          <NavLink to="/ledger" end className={desktopNavClass} onClick={onClose}>
            📊 Ledger
          </NavLink>

          <NavLink
            to="/create-batch"
            end
            className={desktopNavClass}
            onClick={onClose}
          >
            ➕ Create Batch
          </NavLink>

          <NavLink
            to="/add-transaction"
            end
            className={desktopNavClass}
            onClick={onClose}
          >
            🔁 Add Transaction
          </NavLink>
        </nav>

        <div className="mt-8 border-t border-gray-200 pt-4 dark:border-gray-800">
          <button
            onClick={logout}
            className="w-full rounded-xl border border-red-200 px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
          >
            Logout
          </button>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-4 border-t border-gray-200 bg-white px-2 py-2 shadow-lg md:hidden dark:border-gray-800 dark:bg-[#111827]">
        <NavLink to="/" end className={mobileNavClass} onClick={onClose}>
          Dashboard
        </NavLink>
        <NavLink to="/ledger" end className={mobileNavClass} onClick={onClose}>
          Ledger
        </NavLink>
        <NavLink to="/create-batch" end className={mobileNavClass} onClick={onClose}>
          Batch
        </NavLink>
        <NavLink to="/add-transaction" end className={mobileNavClass} onClick={onClose}>
          Add
        </NavLink>
      </nav>
    </>
  );
}