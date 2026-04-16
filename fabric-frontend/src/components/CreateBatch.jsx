import Header from "./Header";
import { useState } from "react";
import { createBatch } from "../api/api";


export default function CreateBatch({ onCreated }) {
  const [form, setForm] = useState({
    id: "",
    color: "",
    party: "",
    date: "",
    rate: "",
    meters: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.id || !form.color || !form.party) {
      setError("Id, Color, and Party are required.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        id: form.id,
        color: form.color,
        party: form.party,
        date: form.date,
        rate: Number(form.rate) || 0,
        meters: Number(form.meters) || 0,
        price: Number(form.price) || 0,
      };

      const res = await createBatch(payload);
      onCreated(res.data);

      setForm({
        id: "",
        color: "",
        party: "",
        date: "",
        rate: "",
        meters: "",
        price: "",
      });
    } catch (err) {
      setError("Failed to create batch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Header />
    <div className="p-6 bg-white rounded-2xl shadow-lg border max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Batch</h2>

      {error && (
        <div className="mb-3 p-2 text-sm bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <input
          name="id"
          placeholder="Batch ID"
          value={form.id}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="color"
          placeholder="Color"
          value={form.color}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="party"
          placeholder="Party"
          value={form.party}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="rate"
          type="number"
          placeholder="Rate"
          value={form.rate}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="meters"
          type="number"
          placeholder="Meters"
          value={form.meters}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`md:col-span-2 py-2 rounded text-white transition ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Batch"}
        </button>
      </form>
    </div>
    </div>
  );
}