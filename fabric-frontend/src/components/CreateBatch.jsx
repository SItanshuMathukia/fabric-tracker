import { useState } from "react";
import { createBatch } from "../api/api";

export default function CreateBatch({ onCreated }) {
  const [id, setId] = useState(""); 
  const [color, setColor] = useState("");
  const [meters, setMeters] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createBatch({ id: Number(id), color, meters: Number(meters) });
    onCreated(res.data);

    setId("");
    setColor("");
    setMeters("");
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-3">Create Batch</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Id"
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          placeholder="Meters"
          type="number"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}