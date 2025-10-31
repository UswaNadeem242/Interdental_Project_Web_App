import * as Yup from "yup";

export const OrderValidationSchema = Yup.object().shape({
  officeReg: Yup.string().required("Office registration number is required"),
  dueDate: Yup.date().nullable().required("Select the Due Date first"),
  patientFirstName: Yup.string()
    .required("Select a patient first")
    .min(1, "Select a patient first"),
  scannerType: Yup.string()
    .required("Scanner Type is required")
    .min(1, "Scanner Type is required"),
  Model_type: Yup.string()
    .required("Digital Model Type is required")
    .min(1, "Digital Model Type is required"),
  material: Yup.string()
    .required("Material is required")
    .min(1, "Material is required"),
  lab: Yup.string()
    .required("Laboratory is required")
    .min(1, "Laboratory is required"),
  // Optional fields
  digitalOptions: Yup.string().nullable(),
  photogrammetryfiles: Yup.string().nullable(),
  crown: Yup.string().nullable(),
  surgical_guide: Yup.string().nullable(),
  note: Yup.string().nullable(),
});

export const CheckoutvalidationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  phone: Yup.string().required("Contact Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  street: Yup.string().required("Street is required"),
  recipientName: Yup.string().required("Recipient's Name is required"),
  paypalUsername: Yup.string().required("Paypal Username is required"),
  paypalEmailPhone: Yup.string().required("Paypal Email/Phone is requiredx"),
});
