import * as Yup from "yup";

export const OrderValidationSchema = Yup.object().shape({
  // doctorName: Yup.string().required("Doctor's Name / Office Name is required"),
  officeReg: Yup.string()
    .required("Office registration number is required")
    .matches(
      /^[0-9]{10}$/,
      "Office registration number must be exactly 10 digits"
    ),
  // createDate: Yup.date().nullable().required("Create Date is required"),
  dueDate: Yup.date().nullable().required("Select the Due Date first"),
  patientFirstName: Yup.string().required(" Select the Name "),
  // patientLastName: Yup.string().required("Last name is required"),
  // subscriptionId: Yup.string()
  //     .matches(/^[A-Za-z0-9@#$%^&*]+$/, "Only letters, numbers, and special characters @#$%^&* are allowed")
  //     .required("Subscription ID is required"),
  scannerType: Yup.string().required("Scanner Type is required"),
  Model_type: Yup.string().required("Digital Model Type  is required"),
  digitalOptions: Yup.string().required("Digital Denture is required"),
  photogrammetryfiles: Yup.string().required(
    "Photogrammetry files is required"
  ),
  surgical_guide: Yup.string().required("Surgical Guide is required"),
  material: Yup.string().required("Material is required"),
  crown: Yup.string().required("Crown is required"),
  lab: Yup.string().required("Laboratory is required"),
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
    paypalEmailPhone: Yup.string().required("Paypal Email/Phone is required"),
});
 
