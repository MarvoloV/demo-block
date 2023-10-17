import axios from "axios";

export const apiPayment = axios.create({
  baseURL: `${import.meta.env.VITE_API}/api/`,
});
