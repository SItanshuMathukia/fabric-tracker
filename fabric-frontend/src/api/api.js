import axios from "axios";

const API = axios.create({
  baseURL: "https://fabric-backend-td8i.onrender.com",
});

export const createBatch = (data) => API.post("/batches", data);
export const addTransaction = (data) => API.post("/transactions", data);
export const getLedger = (batchId) => API.get(`/ledger/${batchId}`);