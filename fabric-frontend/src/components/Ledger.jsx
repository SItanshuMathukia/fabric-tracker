import { useState } from "react";
import { getLedger } from "../api/api";

export default function Ledger() {
  const [batchId, setBatchId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLedger = async (e) => {
    if (e) e.preventDefault();

    if (!batchId.trim()) {
      alert("Please enter a Batch ID");
      return;
    }

    try {
      setLoading(true);
      const res = await getLedger(batchId.trim());
      setData(res.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
          "Failed to fetch ledger. Please check Batch ID."
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBatchId("");
    setData(null);
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-lg sm:p-6">
      <h2 className="mb-5 text-3xl font-bold text-gray-900">Ledger</h2>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row">
        <input
          placeholder="Enter Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none focus:border-indigo-500"
        />

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
          <button
            onClick={fetchLedger}
            disabled={loading}
            className={`rounded-xl px-5 py-3 font-medium text-white transition ${
              loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {loading ? "Loading..." : "Fetch"}
          </button>

          <button
            onClick={handleReset}
            className="rounded-xl bg-gray-200 px-5 py-3 font-medium text-gray-800 transition hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </div>

      {loading && (
        <p className="mb-4 text-sm text-gray-500">Fetching ledger data...</p>
      )}

      {data && (
        <div className="space-y-5 rounded-2xl border border-gray-200 p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Color</p>
              <p className="mt-1 text-lg font-semibold">{data.batch?.color}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Meters</p>
              <p className="mt-1 text-lg font-semibold">{data.batch?.meters}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Party</p>
              <p className="mt-1 text-lg font-semibold">{data.batch?.party}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">Transactions</h3>

            {data.transactions?.length > 0 ? (
              <div className="space-y-3">
                {data.transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-sm text-gray-500">Action</p>
                        <p className="font-medium">{txn.action}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Meters</p>
                        <p className="font-medium">{txn.meters}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{txn.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium">{txn.action_type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No transactions found</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}