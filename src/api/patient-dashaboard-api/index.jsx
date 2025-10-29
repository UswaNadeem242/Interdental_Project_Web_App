import api from "../intercepter";
import { ENDPOINTS } from "../config";
import { handleApiSuccess, handleApiError } from "../utils/errorHandler";



//WARRANTIES

// export const getWarrtieByID = async (id) => {
//     try {
//         const endpoint = `${ENDPOINTS.PATIENTS.ORDER_BY_PATIENT_ID}/${id}`;
//         const response = await api.get(endpoint);
//         return handleApiSuccess(response);
//     } catch (error) {
//         return handleApiError(error);
//     }
// };


// export const getWarrantiesPatients = async () => {
//     try {
//         const response = await api.get(ENDPOINTS.PATIENTS?.WARRANTIES_BY_PATIENT);
//         return handleApiSuccess(response);
//     } catch (error) {
//         return handleApiError(error);
//     }
// };

export const getWarrantiesPatients = async (id) => {
    try {
        const endpoint = `${ENDPOINTS.PATIENTS?.WARRANTIES_BY_PATIENT}/${id}`;
        const response = await api.get(endpoint);
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
};



// CLAIMS  
export const getClaims = async (params = {}) => {
    try {
        const { status = "ALL", page = 0, size = 10, search = "" } = params;
        console.log(params);
        const response = await api.get(`${ENDPOINTS.PATIENTS.CLAIMS_BY_PATIENT_BYUSER}?status=${status}&page=${page}&size=${size}&search=${search}`);
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
};

export const getClaimsByUser = async (data) => {
    try {
        const response = await api.post(ENDPOINTS.PATIENTS.CLAIMS_BY_PATIENT, data);
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
};



// GET PROFILE 
export const getPatientProfile = async (id) => {
    try {
        const endpoint = `${ENDPOINTS.PATIENTS.PATIENTS_PROFILE}/${id}`;
        const response = await api.get(endpoint);
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
};

// UPDATE PROFILE
export const updatePatientProfile = async (bodyData) => {
    try {
        const endpoint = `${ENDPOINTS.PATIENTS.UPDATE_PROFILE}`;
        const response = await api.post(endpoint, bodyData, {
            headers: { "Content-Type": undefined },
        });
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
};


export const updateUserPatientProfileImage = async (formData) => {
    try {
        const endpoint = `${ENDPOINTS.PATIENTS?.UPDATE_USER_PROFILE_IMAGE}`;
        const response = await api.post(endpoint, formData);
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
};



// CHANGE PASSWORD

export const patientChangePassword = async (bodyData) => {
    try {
        const endpoint = `${ENDPOINTS.PATIENTS.CHANGE_PASSWORD}`;
        const response = await api.post(endpoint, bodyData);
        return handleApiSuccess(response);
    } catch (error) {
        return handleApiError(error);
    }
};