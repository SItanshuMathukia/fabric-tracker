import { useState } from "react";
import { getLedger } from "../api/api";

export default function Ledger() {
  const [batchId, setBatchId] = useState("");
  const [data, setData] = useState(null);

  const fetchLedger = async () => {
    const res = await getLedger(batchId);
    setData(res.data);
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-3">Ledger</h2>

      <div className="flex gap-2 mb-3">
        <input
          placeholder="Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <button
          onClick={fetchLedger}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Fetch
        </button>
      </div>

      {data && (
        <div>
          <p><b>Color:</b> {data.batch.color}</p>
          <p><b>Meters:</b> {data.batch.meters}</p>

          <h3 className="mt-4 font-bold">Transactions</h3>
          <ul className="mt-2 space-y-1">
            {data.transactions.map((txn) => (
              <li key={txn.id} className="border p-2 rounded">
                {txn.action} - {txn.meters}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}