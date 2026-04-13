import * as Yup from "yup";

// Validation schema for adding new patients (includes password)
export const AddPatientValidationSchema = (skipImageValidation = false) =>
  Yup.object().shape({
    username: Yup.string()
      .matches(
        /^(?![\d!@#$%^&*()_+={}[\]:;"'<>,.?\/\\|~-]+$).*/,
        "First Name should only contain letters and spaces"
      )
      .min(3, "First Name must be at least 3 characters")
      .required("First Name is required"),

    lastName: Yup.string()
      .matches(
        /^(?![\d!@#$%^&*()_+={}[\]:;"'<>,.?\/\\|~-]+$).*/,
        "Last Name should only contain letters and spaces"
      )
      .min(3, "Last Name must be at least 3 characters")
      .required("Last Name is required"),

    address: Yup.string()
      .matches(
        /^(?![\d!@#$%^&*()_+={}[\]:;"'<>,.?\/\\|~-]+$).*/,
        "Address cannot be only numbers or special characters"
      )
      .required("Patient Location is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits")
      .required("Phone Number is required"),

    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&^#()_\-+={}[\]|\\:;"'<>,.?/~]).{8,}$/,
        "Password must have: minimum 8 characters, at least 1 uppercase, 1 lowercase, and 1 special character"
      )
      .required("Password is required"),
  });

// Validation schema for editing existing patients (no password required)
export const EditPatientValidationSchema = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^(?![\d!@#$%^&*()_+={}[\]:;"'<>,.?\/\\|~-]+$).*/,
        "First Name should only contain letters and spaces"
      )
      .min(3, "First Name must be at least 3 characters")
      .required("First Name is required"),

    lastName: Yup.string()
      .matches(
        /^(?![\d!@#$%^&*()_+={}[\]:;"'<>,.?\/\\|~-]+$).*/,
        "Last Name should only contain letters and spaces"
      )
      .min(3, "Last Name must be at least 3 characters")
      .required("Last Name is required"),

    address: Yup.string()
      .matches(
        /^(?![\d!@#$%^&*()_+={}[\]:;"'<>,.?\/\\|~-]+$).*/,
        "Address cannot be only numbers or special characters"
      )
      .required("Patient Location is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits")
      .required("Phone Number is required"),
  });

// Legacy function for backward compatibility
export const PatientvalidationSchema = (skipPasswordValidation = false) =>
  Yup.object().shape({
    username: Yup.string()
      .matches(
        /^[A-Za-z ]+$/,
        "First Name should only contain letters and spaces"
      )
      .min(3, "First Name must be at least 3 characters")
      .required("First Name is required"),

    lastName: Yup.string()
      .matches(
        /^[A-Za-z ]+$/,
        "Last Name should only contain letters and spaces"
      )
      .min(3, "Last Name must be at least 3 characters")
      .required("Last Name is required"),

    address: Yup.string()
      .matches(
        /^(?![\d!@#$%^&*()_+={}[\]:;"'<>,.?\/\\|~-]+$).*/,
        "Address cannot be only numbers or special characters"
      )
      .required("Patient Location is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits")
      .required("Phone Number is required"),

    password: skipPasswordValidation
      ? Yup.string().notRequired()
      : Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&^#()_\-+={}[\]|\\:;"'<>,.?/~]).{8,}$/,
            "Password must have: minimum 8 characters, at least 1 uppercase, 1 lowercase, and 1 special character"
          )
          .required("Password is required"),
  });