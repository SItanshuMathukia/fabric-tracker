import { useMemo } from "react";

export default function Dashboard() {
  const stats = useMemo(
    () => [
      { label: "Total Batches", value: "128" },
      { label: "Transactions", value: "1,284" },
      { label: "Active Parties", value: "24" },
      { label: "Meters In Stock", value: "18,420" },
    ],
    []
  );

  const recentActivity = [
    { id: 1, title: "Batch B101 created", subtitle: "Party: Kumar Textiles" },
    { id: 2, title: "Transaction added", subtitle: "Batch B084 · +240 meters" },
    { id: 3, title: "Batch B067 removed stock", subtitle: "-120 meters" },
    { id: 4, title: "New ledger viewed", subtitle: "Batch B101" },
  ];

  const chartBars = [45, 68, 52, 74, 60, 82, 66];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-500 p-6 text-white shadow-lg">
        <p className="text-sm opacity-90">Welcome back</p>
        <h1 className="mt-1 text-3xl font-bold">Fabric Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/90">
          Monitor batches, transactions, stock flow, and recent operational activity in one place.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Activity</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</span>
          </div>

          <div className="flex h-64 items-end gap-3">
            {chartBars.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-violet-400 transition-all duration-300"
                  style={{ height: `${value * 2}px` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  D{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Recent Activity
          </h2>

          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800"
              >
                <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}