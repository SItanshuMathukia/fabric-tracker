import axios from "axios";

const API = axios.create({
  baseURL: "https://fabric-backend-td8i.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const registerUser = (data) => API.post("/register", data);
export const loginUser = async (data) => {
  const res = await API.post("/login", data);

  // store token
  localStorage.setItem("token", res.data.access_token);

  return res;
};

export const createBatch = (data) => API.post("/batches", data);
export const addTransaction = (data) => API.post("/transactions", data);
export const getLedger = (batchId) => API.get(`/ledger/${batchId}`);
