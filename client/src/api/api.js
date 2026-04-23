import axios from 'axios';
import toast from 'react-hot-toast';

// Create a centralized Axios instance
const api = axios.create({
  // Use the environment variable for production, fallback to localhost for dev
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
});

// Request Interceptor (Useful for future Auth headers)
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here in the future
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Global Error Handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We handle the UI feedback (Toasts) inside the components 
    // for a more tailored user experience (like updating loading toasts).
    console.error('[API Error]:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    
    return Promise.reject(error);
  }
);

export default api;
