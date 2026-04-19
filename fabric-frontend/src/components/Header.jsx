export default function Header({ onMenuClick, darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-[#0f172a]/90">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm md:hidden dark:border-gray-700"
        >
          ☰
        </button>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-lg font-bold tracking-wide sm:text-xl">
            Shruti Apparels
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <div className="w-[42px] md:hidden" />
      </div>
    </header>
  );
}