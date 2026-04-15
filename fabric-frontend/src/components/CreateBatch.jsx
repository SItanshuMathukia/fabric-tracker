import { useState } from "react";
import { createBatch } from "../api/api";

export default function CreateBatch({ onCreated }) {
  const [id, setId] = useState(""); 
  const [color, setColor] = useState("");
  const [party, setParty] = useState("");
  const [date, setDate] = useState("");
  const [rate, setRate] = useState("");
  const [meters, setMeters] = useState("");
  const [price, setPrice] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createBatch({ id, color, party, date, rate: Number(rate), price: Number(price), meters: Number(meters) });
    onCreated(res.data);

    setId("");
    setColor("");
    setParty("");
    setDate("");
    setRate("");
    setMeters("");
    setPrice("");
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-3">Create Batch</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Id"
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
          placeholder="Party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
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
          placeholder="Rate"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          placeholder="Meters"
          type="number"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}