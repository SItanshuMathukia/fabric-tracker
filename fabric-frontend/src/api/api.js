import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const createBatch = (data) => API.post("/batches", data);
export const addTransaction = (data) => API.post("/transactions", data);
export const getLedger = (batchId) => API.get(`/ledger/${batchId}`);