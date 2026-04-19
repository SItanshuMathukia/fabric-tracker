import { useState } from "react";
import { addTransaction } from "../api/api";

export default function AddTransaction() {
  const [batchId, setBatchId] = useState("");
  const [meters, setMeters] = useState("");
  const [action, setAction] = useState("add");
  const [action_type, setAction_Type] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addTransaction({
      batch_id: batchId,
      action,
      action_type,
      date,
      meters: Number(meters),
    });

    alert("Transaction successful");
  };

  return (
    <section className="rounded-3xl bg-white p-4 shadow-lg sm:p-6">
      <h2 className="mb-4 text-3xl font-bold text-gray-900">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3"
        />

        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3"
        >
          <option value="add">Add</option>
          <option value="remove">Remove</option>
        </select>

        <input
          placeholder="Action Type"
          value={action_type}
          onChange={(e) => setAction_Type(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3"
        />

        <input
          placeholder="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3"
        />

        <input
          placeholder="Meters"
          type="number"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3"
        />

        <button className="w-full rounded-xl bg-green-500 px-4 py-3 font-medium text-white hover:bg-green-600">
          Submit
        </button>
      </form>
    </section>
  );
}