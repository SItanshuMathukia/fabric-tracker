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
    <section className="rounded-3xl bg-white p-4 shadow-lg transition-all duration-200 sm:p-6 dark:bg-gray-900">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ledger</h2>
      </div>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row">
        <input
          placeholder="Enter Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
          <button
            onClick={fetchLedger}
            disabled={loading}
            className={`rounded-xl px-5 py-3 font-medium text-white transition ${
              loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600 active:scale-[0.98]"
            }`}
          >
            {loading ? "Loading..." : "Fetch"}
          </button>

          <button
            onClick={handleReset}
            className="rounded-xl bg-gray-200 px-5 py-3 font-medium text-gray-800 transition hover:bg-gray-300 active:scale-[0.98] dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {loading && (
        <div className="mb-4 space-y-3">
          <div className="h-12 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-28 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
      )}

      {data && !loading && (
        <div className="space-y-5 rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Color</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {data.batch?.color}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Meters</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {data.batch?.meters}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Party</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {data.batch?.party}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Rate</p>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {data.batch?.rate ?? "N/A"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Transactions
            </h3>


            {showTransactions ? (
              data.transactions?.length > 0 ? (
                <div className="space-y-3">
                  {data.transactions.map((txn) => (
                    <div
                      key={txn.id}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:shadow-sm dark:border-gray-800 dark:bg-gray-800"
                    >
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Action</p>
                          <p className="font-medium text-gray-900 dark:text-white">{txn.action}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Meters</p>
                          <p className="font-medium text-gray-900 dark:text-white">{txn.meters}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                          <p className="font-medium text-gray-900 dark:text-white">{txn.date}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {txn.action_type || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
              )
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click "Show Transactions" to view transaction history.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}