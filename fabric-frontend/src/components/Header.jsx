export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 mb-4 bg-gray-900 text-white shadow-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex items-center justify-center rounded-md border border-white/20 px-3 py-2 text-sm md:hidden"
        >
          ☰
        </button>

        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold tracking-wide sm:text-xl">
            Shruti Apparels
          </h1>
        </div>

        <div className="w-[42px] md:hidden" />
      </div>
    </header>
  );
}