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
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-3">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="add">Add</option>
          <option value="remove">Remove</option>
        </select>

        <input
          placeholder="Action Type"
          value={action_type}
          onChange={(e) => setAction_Type(e.target.value)}
          className="w-full p-2 border rounded"
        />

         <input
          placeholder="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          placeholder="Meters"
          type="number"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}