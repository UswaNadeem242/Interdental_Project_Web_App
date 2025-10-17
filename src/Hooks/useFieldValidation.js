import { useState, useCallback } from "react";

const useFieldValidation = (validationSchema, initialErrors = {}) => {
  const [validationErrors, setValidationErrors] = useState(initialErrors);

  // Validate a specific field
  const validateField = useCallback(
    async (fieldName, value, allFormData) => {
      try {
        // Create a temporary object with all form data for context-aware validation
        const dataToValidate = { ...allFormData, [fieldName]: value };

        // Validate just this field
        await validationSchema.validateAt(fieldName, dataToValidate);

        // If validation passes, clear the error for this field
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });

        return null; // No error
      } catch (error) {
        // If validation fails, set the error for this field
        const errorMessage = error.message;
        setValidationErrors((prev) => ({
          ...prev,
          [fieldName]: errorMessage,
        }));

        return errorMessage;
      }
    },
    [validationSchema],
  );

  // Clear error for a specific field
  const clearFieldError = useCallback((fieldName) => {
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  // Validate all fields at once (for form submission)
  const validateAllFields = useCallback(
    async (formData) => {
      try {
        await validationSchema.validate(formData, { abortEarly: false });
        setValidationErrors({});
        return null; // No errors
      } catch (err) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
        return Object.values(errors)[0]; // Return first error message
      }
    },
    [validationSchema],
  );

  // Set validation errors manually (useful for server-side errors)
  const setErrors = useCallback((errors) => {
    setValidationErrors(errors);
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  return {
    validationErrors,
    validateField,
    clearFieldError,
    validateAllFields,
    setErrors,
    clearAllErrors,
  };
};

export default useFieldValidation;
