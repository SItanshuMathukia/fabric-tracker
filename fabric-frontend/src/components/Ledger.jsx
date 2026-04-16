import { useState } from "react";
import { getLedger } from "../api/api";
import Header from "./Header";

export default function Ledger() {
  const [batchId, setBatchId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLedger = async (e) => {
    if (e) e.preventDefault(); // 🔥 prevents accidental form reload

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
    <div>
    <Header />

    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto">
      
      <h2 className="text-2xl font-bold mb-4">Ledger</h2>

      {/* INPUT SECTION */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Enter Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <button
          onClick={fetchLedger}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {loading ? "Loading..." : "Fetch"}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Reset
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <p className="text-gray-500">Fetching ledger data...</p>
      )}

      {/* DATA SECTION */}
      {data && (
        <div className="border rounded p-4">
          
          {/* BATCH INFO */}
          <div className="mb-4">
            <p><b>Color:</b> {data.batch?.color}</p>
            <p><b>Meters:</b> {data.batch?.meters}</p>
            <p><b>Party:</b> {data.batch?.party}</p>
          </div>

          {/* TRANSACTIONS */}
          <h3 className="font-bold mb-2">Transactions</h3>

          {data.transactions?.length > 0 ? (
            <ul className="space-y-2">
              {data.transactions.map((txn) => (
                <li
                  key={txn.id}
                  className="border p-2 rounded bg-gray-50"
                >
                  <p><b>Action:</b> {txn.action}</p>
                  <p><b>Meters:</b> {txn.meters}</p>
                  <p><b>Date:</b> {txn.date}</p>
                  <p><b>Type:</b> {txn.action_type}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No transactions found</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
}