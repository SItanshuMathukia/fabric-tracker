import { useState } from "react";
import { getLedger } from "../api/api";

export default function Ledger() {
  const [batchId, setBatchId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

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
      setShowTransactions(false);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
          "Failed to fetch ledger. Please check Batch ID."
      );
      setData(null);
      setShowTransactions(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBatchId("");
    setData(null);
    setShowTransactions(false);
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-lg sm:p-6 dark:bg-gray-900">
      <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white">
        Ledger
      </h2>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row">
        <input
          placeholder="Enter Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        <div className="flex gap-3 lg:flex-shrink-0">
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
            className="rounded-xl bg-gray-200 px-5 py-3 font-medium text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {loading && (
        <div className="space-y-3">
          <div className="h-12 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-24 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
      )}

      {data && !loading && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
          {/* Summary Row */}
          <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-800/60 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4 lg:flex lg:flex-wrap lg:items-center lg:gap-8">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Color
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {data.batch?.color}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Meters
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {data.batch?.meters}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Party
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {data.batch?.party}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Rate
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {data.batch?.rate ?? "-"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTransactions((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              {showTransactions ? "Hide ▲" : "Show ▼"}
            </button>
          </div>

          {/* Transactions Table */}
          {showTransactions && (
            <div className="overflow-x-auto">
              {data.transactions?.length > 0 ? (
                <table className="min-w-full text-left">
                  <thead className="bg-white dark:bg-gray-900">
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Action
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Meters
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Date
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Type
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Rate
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white dark:bg-gray-900">
                    {data.transactions.map((txn, index) => (
                      <tr
                        key={txn.id}
                        className={`border-b border-gray-100 dark:border-gray-800 ${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-50/70 dark:bg-gray-800/30"
                        }`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                          {txn.action}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                          {txn.meters}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                          {txn.date}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                          {txn.action_type || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                          {txn.rate ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                  No transactions found.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}