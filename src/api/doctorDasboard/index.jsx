import api from "../intercepter";
import { ENDPOINTS } from "../config";
import { handleApiSuccess, handleApiError } from "../utils/errorHandler";

export const getDoctorStats = async () => {
  try {
    const response = await api.get(ENDPOINTS.DOCTOR.STATS);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getDoctorOrders = async (id) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR?.ORDERS}/${id}`;
    const response = await api.get(endpoint);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getGrapgStats = async (timePeriod = "month") => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.GRAPH_STATS}?opr=${timePeriod}`;
    const response = await api.get(endpoint);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getDoctorPatients = async ({status = "ALL", page = 0, limit = 10, search = ""}) => {
  try {
    const response = await api.get(`${ENDPOINTS.DOCTOR.PATIENTS}?status=${status}&page=${page}&limit=${limit}&search=${search}`);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getDoctorProfile = async (id) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.DOCTOR_PROFILE}/${id}`;
    const response = await api.get(endpoint);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateDoctorProfile = async (bodyData) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.UPDATE_PROFILE}`;
    // const response = await api.post(endpoint, bodyData);
    const response = await api.post(endpoint, bodyData, {
      headers: { "Content-Type": undefined },
    });
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getOrderByID = async (id) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.ORDER_BY_ID}/${id}`;
    const response = await api.get(endpoint);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getOrderTranckingByID = async (id) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.TRACKING_BY_ID}/${id}`;
    const response = await api.get(endpoint);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const changePassword = async (bodyData) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.CHANGE_PASSWORD}`;
    const response = await api.post(endpoint, bodyData);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateUserProfileImage = async (formData) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.UPDATE_USER_PROFILE_IMAGE}`;
    const response = await api.post(endpoint, formData);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const addPatient = async (formData) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.ADD_PATIENT}`;
    const response = await api.post(endpoint, formData);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};


export const updateUserPatient = async (bodyData) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.UPDATE_PATIENT}`;
    const response = await api.post(endpoint, bodyData);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};


export const deletePatientUser = async (id) => {
  try {
    const endpoint = `${ENDPOINTS.DOCTOR.DELETE_PATIENT}/${id}/remove`;
    const response = await api.post(endpoint);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};