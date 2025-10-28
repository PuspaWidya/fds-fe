/* eslint-disable no-useless-catch */
import axios from "axios";

// Buat instance Axios
const api = axios.create({
  // baseURL: "/api",
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);

// Tambah token otomatis (optional)
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle error global (optional)
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     console.error("API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// Wrapper function modular
export const get = async (url, params = {}) => {
  try {
    return await api.get(url, { params });
  } catch (error) {
    throw error;
  }
};

export const post = async (url, data = {}) => {
  try {
    return await api.post(url, data);
  } catch (error) {
    throw error;
  }
};

export const put = async (url, data = {}) => {
  try {
    return await api.put(url, data);
  } catch (error) {
    throw error;
  }
};

export const del = async (url, data = {}) => {
  try {
    // Beberapa API DELETE bisa pakai body
    return await api.delete(url, { data });
  } catch (error) {
    throw error;
  }
};

export const useApi = () => {
  return { get, post, put, del };
};

export default api;
