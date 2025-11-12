import axios from "axios";
import { BASE_URL } from "../../config";

const getAllOrders = () =>
  axios.get(`${BASE_URL}/api/doctororder/getOrders`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

const getAllOrdersById = () =>
  axios.get(`${BASE_URL}/api/doctororder/getOrdersByDoctor`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

const getOrderTrackingById = (orderId) =>
  axios.get(`${BASE_URL}/api/ordertracking/byOrderId/${orderId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export { getAllOrders, getAllOrdersById, getOrderTrackingById };
