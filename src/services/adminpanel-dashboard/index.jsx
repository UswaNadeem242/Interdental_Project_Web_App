import axios from "axios";
import { BASE_URL } from "../../config";
const getAdminStats = () =>
  axios.get(`${BASE_URL}/api/dashboard/getAdminStats`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });




export { getAdminStats };
