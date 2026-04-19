import { useState } from "react";
import { createBatch } from "../api/api";

export default function CreateBatch({ onCreated = () => {} }) {
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
    <section className="rounded-3xl border bg-white p-4 shadow-lg sm:p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Create Batch</h2>

      {error && (
        <div className="mb-4 rounded-xl bg-red-100 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input name="id" placeholder="Batch ID" value={form.id} onChange={handleChange} className="rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
        <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className="rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
        <input name="party" placeholder="Party" value={form.party} onChange={handleChange} className="rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
        <input name="rate" type="number" placeholder="Rate" value={form.rate} onChange={handleChange} className="rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
        <input name="meters" type="number" placeholder="Meters" value={form.meters} onChange={handleChange} className="rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="rounded-xl border border-gray-300 p-3 md:col-span-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />

        <button
          type="submit"
          disabled={loading}
          className={`rounded-xl py-3 font-medium text-white transition md:col-span-2 ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
          }`}
        >
          {loading ? "Creating..." : "Create Batch"}
        </button>
      </form>
    </section>
  );
}