import * as Yup from "yup";

export const PatientvalidationSchema = (skipImageValidation = false) =>
  Yup.object().shape({
    // photo: Yup.mixed().required("Photo is required"),
    // username: Yup.string().required("First Name is required"),
    // lastName: Yup.string().required("Last Name is required"),
    // address: Yup.string().required("Patient Location is required"),
    // email: Yup.string().email("Invalid email").required("Email is required"),
    // phone: Yup.string().required("Phone Number is required"),
    // password: Yup.string().required("Password is required"),

    // photo: Yup.mixed().required("Photo is required"),

    // Edited to remove Upload Img Validation
    photo: skipImageValidation
      ? Yup.mixed().notRequired()
      : Yup.mixed().required("Photo is required"),
    //
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
      .min(3, "First Name must be at least 3 characters")
      .required("Last Name is required"),

    address: Yup.string()
      .matches(
        /^(?![\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~-]+$).*$/,
        "Address cannot be only numbers or special characters"
      )
      .required("Patient Location is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
      .required("Phone Number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&^#()_\-+={}[\]|\\:;"'<>,.?/~]).{8,}$/,
        "Password must have: minimum 8 characters, at least 1 uppercase, 1 lowercase, and 1 special character"
      )
      .required("Password is required"),

    // password: Yup.string()
    //   .min(6, "Password must be at least 6 characters")
    //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    //   .matches(/[0-9]/, "Password must contain at least one number")
    //   .matches(/[@$!%*?&^#()_\-+={}[\]|\\:;"'<>,.?/~]/, "Password must contain at least one special character")
    //   .required("Password is required"),
  });
