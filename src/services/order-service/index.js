// import api from "./lib/api";

import api from "../lib/index";

export const orderService = {
  getDropDown: () => api.get("/api/dropdown/getAll"),
  getTooth: () => api.get('/api/tooth/getAll'),
  createOrder: (formData) =>
    api.post("/api/doctororder", formData, {
      headers: { 
        "Content-Type": "multipart/form-data" 
      },
    }),
};



