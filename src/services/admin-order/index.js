import axios from "axios";
import { BASE_URL } from "../../config";

const getAllOrders = (queryParams) =>
  axios.get(`${BASE_URL}/api/doctororder/getOrders${queryParams}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

const getAllOrdersById = (id) =>
  axios.get(`${BASE_URL}/api/doctororder/getOrdersByDoctor/${id}`, {
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

const updateOrderStatus = (payload) =>
  axios.post(`${BASE_URL}/api/ordertracking/update`, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

const getEcomOrderById = (id) =>
  axios.get(`${BASE_URL}/orders/getOrderByID/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export {
  getAllOrders,
  getAllOrdersById,
  getOrderTrackingById,
  updateOrderStatus,
  getEcomOrderById,
};
