// import api from "./lib/api";

import api from "./lib";

export const orderService = {
  getOrders: () => api.get("/api/dropdown/getAll"),
  getTooth: () => api.get('/api/tooth/getAll'),

  // getOrderDetails: (id) => api.get(`/orders/${id}`),
  // createOrder: (payload) => api.post("/orders", payload),
};
