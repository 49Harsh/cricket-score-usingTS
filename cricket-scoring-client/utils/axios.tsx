import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://assignment-5nli.onrender.com";

export const apiClient = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Only attempt to get token if we're in a browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear token on 401 errors
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Create a separate client that doesn't handle tokens
export const apiClient2 = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
});
