import axios from "axios";

const api = axios.create({
  baseURL: "https://green-mentor-assignment-production.up.railway.app"
});
export default api; 