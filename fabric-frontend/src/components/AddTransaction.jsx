import { useState } from "react";
import { addTransaction } from "../api/api";

export default function AddTransaction() {
  const [batchId, setBatchId] = useState("");
  const [meters, setMeters] = useState("");
  const [action, setAction] = useState("add");
  const [action_type, setAction_Type] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addTransaction({
        batch_id: batchId,
        action,
        action_type,
        date,
        meters: Number(meters),
      });

      alert("Transaction successful");
      setBatchId("");
      setMeters("");
      setAction("add");
      setAction_Type("");
      setDate("");
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-lg sm:p-6 dark:bg-gray-900">
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="add">Add</option>
          <option value="remove">Remove</option>
        </select>

        <input
          placeholder="Action Type"
          value={action_type}
          onChange={(e) => setAction_Type(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        <input
          placeholder="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        <input
          placeholder="Meters"
          type="number"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        <button
          disabled={loading}
          className={`w-full rounded-xl px-4 py-3 font-medium text-white transition ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600 active:scale-[0.98]"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}