import { useEffect, useState } from "react";
import { getDashboard } from "../api/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);


  useEffect(() => {
    fetchDashboard();

    const user = sessionStorage.getItem("user") || localStorage.getItem("user");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
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
        <div className="h-24 rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-24 rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-72 rounded-xl bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>


      <div className="rounded-2xl bg-white p-4 shadow dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome </p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {loggedInUser?.name || "User"}
        </h2>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card title="Total Batches" value={data.total_batches} />
        <Card title="Transactions" value={data.total_transactions} />
        <Card title="Total Meters" value={data.total_meters} />
      </div>

      {/* CHART + TOP PARTIES */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow xl:col-span-2 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-bold">Weekly Analytics</h2>

          {data.weekly_analytics?.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.weekly_analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="meters" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500">No weekly analytics available</p>
          )}
        </div>

        <div className="rounded-2xl bg-white p-4 shadow dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-bold">Top Parties</h2>

          {data.top_parties?.length > 0 ? (
            <div className="space-y-3">
              {data.top_parties.map((party, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800"
                >
                  <p className="font-semibold">{party.party}</p>
                  <p className="text-sm text-gray-500">
                    Batches: {party.batch_count} · Meters: {party.total_meters}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No top party data available</p>
          )}
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="rounded-2xl bg-white p-4 shadow dark:bg-gray-900">
        <h2 className="mb-3 text-xl font-bold">Recent Activity</h2>

        {data.recent_activity?.length > 0 ? (
          <div className="space-y-2">
            {data.recent_activity.map((txn) => (
              <div
                key={txn.id}
                className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800"
              >
                <p>
                  <b>{txn.action}</b> - {txn.meters} meters
                </p>
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
    <div className="rounded-2xl bg-white p-4 shadow dark:bg-gray-900">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}