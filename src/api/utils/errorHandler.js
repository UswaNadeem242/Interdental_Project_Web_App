export const handleApiError = (error) => {
  console.error("API Error:", error);

  const errorResponse = {
    success: false,
    message: "An unexpected error occurred",
    status: 500,
    data: null,
  };

  if (error.response) {
    // Server responded with error status
    errorResponse.status = error.response.status;
    errorResponse.message = error.response.data?.message || error.message;
    errorResponse.data = error.response.data;
  } else if (error.request) {
    // Request was made but no response received
    errorResponse.message = "Network error - please check your connection";
    errorResponse.status = 0;
  } else {
    // Something else happened
    errorResponse.message = error.message;
  }

  return errorResponse;
};

export const handleApiSuccess = (response) => {
  return {
    success: true,
    data: response.data,
    status: response.status,
    message: response.data?.message || "Request successful",
  };
};
