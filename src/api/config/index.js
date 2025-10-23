import { BASE_URL } from "../../config";

export const API_CONFIG = {
  baseURL: BASE_URL,
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  headers: {},
};

export const ENDPOINTS = {
  DOCTOR: {
    STATS: "/api/dashboard/getDoctorStats",
    // ORDERS: "/api/doctororder/getOrders",
    ORDERS: "/api/doctororder/getOrdersByDoctor",
    ORDER_BY_ID: "/api/doctororder/getOrderByID",
    TRACKING_BY_ID: "/api/ordertracking",
    GRAPH_STATS: "/api/dashboard/getDoctorGraph",
    PATIENTS: "/api/users/getPatientByDoctor",
    ADD_PATIENT: "/api/users/addPatient",
    UPDATE_PATIENT: "api/users/update-user",
    DELETE_PATIENT: "api/users",
    DOCTOR_PROFILE: "/api/users/getById",
    UPDATE_PROFILE: "/api/users/update-profile-info",
    CHANGE_PASSWORD: "/api/users/change-password",
    UPDATE_USER_PROFILE_IMAGE: "/api/users/updateUserProfileImage",
  },
  PATIENTS: {
    WARRANTIES_BY_PATIENT: "/api/doctororder/getOrdersByPatient",
    CLAIMS_BY_PATIENT: "/api/claims",
    CLAIMS_BY_PATIENT_BYUSER: "/api/claims/by-user",
    PATIENTS_PROFILE: "/api/users/getById",
    UPDATE_PROFILE: "/api/users/update-profile-info",
    CHANGE_PASSWORD: "/api/users/change-password",
    UPDATE_USER_PROFILE_IMAGE: "/api/users/updateUserProfileImage",
  }
};



