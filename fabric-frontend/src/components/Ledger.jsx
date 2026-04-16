import { useEffect, useState } from "react";
import { getLedger } from "../api/api";

export default function Ledger() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  const [batchId, setBatchId] = useState("");

  const fetchData = async () => {
    try {
      const res = await getLedger(batchId || "all");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Ledger</h1>

      {/* FILTERS */}
      <div style={{ marginBottom: "20px" }}>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>

        <input
          placeholder="Ledger ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button onClick={fetchData} style={{ marginLeft: "10px" }}>
          Apply
        </button>
      </div>

      {/* TABLE */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Color</th>
            <th>Meters</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.color}</td>
              <td>{item.meters}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}