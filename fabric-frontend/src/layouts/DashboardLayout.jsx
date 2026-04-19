import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  return (
    <div className="min-h-screen bg-[#f6f7fb] text-gray-900 dark:bg-[#0b1020] dark:text-white">
      <Header onMenuClick={() => setSidebarOpen(true)} 
        darkMode={darkMode}
        setDarkMode={setDarkMode} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}