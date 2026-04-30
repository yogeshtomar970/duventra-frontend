// Central API URL — set VITE_API_BASE_URL in Frontend/.env
// Default: http://localhost:5000 for local dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://10.70.73.171:5173/";
export default API_BASE_URL;
