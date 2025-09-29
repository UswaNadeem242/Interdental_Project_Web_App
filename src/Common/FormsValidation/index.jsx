import * as Yup from "yup";

export const PatientvalidationSchema = Yup.object().shape({
  photo: Yup.mixed().required("Photo is required"),
  username: Yup.string().required("First Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  password: Yup.string().required("Password is required"),
});
