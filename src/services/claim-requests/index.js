import axios from "axios";
import { BASE_URL } from "../../config";
import { storage } from "../utils/storage";
const token = storage.getToken();
const getClaimRequests = (query) =>
  axios.get(`${BASE_URL}/api/claims${query}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const putClaimRequests = (payload) =>
  axios.put(`${BASE_URL}/api/claims`, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const getClaimRequestsById = (id) =>
  axios.get(`${BASE_URL}/api/claims/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
export { getClaimRequests, getClaimRequestsById, putClaimRequests };
