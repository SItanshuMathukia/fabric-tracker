import { useEffect, useState } from "react";
import { getDashboard } from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <Card title="Total Batches" value={data.total_batches} />
        <Card title="Transactions" value={data.total_transactions} />
        <Card title="Total Meters" value={data.total_meters} />

      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-3">Recent Activity</h2>

        {data.recent_activity?.length > 0 ? (
          <div className="space-y-2">
            {data.recent_activity.map((txn) => (
              <div
                key={txn.id}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <p><b>{txn.action}</b> - {txn.meters} meters</p>
                <p className="text-sm text-gray-500">{txn.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No activity yet</p>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}