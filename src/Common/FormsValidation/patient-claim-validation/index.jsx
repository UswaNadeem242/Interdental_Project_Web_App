import * as Yup from "yup";

// ✅ Initial Values
export const PatientClaimInitialValues = {
  // patientName: "",
  // patientPhone: "",
  // patientEmail: "",
  // dateOfBirth: "",
  // patientAddress: "",
  // patientCity: "",
  // patientState: "",
  // patientZip: "",
  patientFirstName: "",

  doctorName: "",
  doctorEmail: "",



  // crownTeeth: [],    // start empty
  // implantTeeth: [],

  // licenseNumber: "",
  // totalUnits: "",
  // typeOfRestoration: "",
  // shade: "",

  // doctorSignature: "",         // ✅ string (signature field)
  // doctorSignatureEmail: "",    // ✅ string (email field)
  // patientSignature: "",        // ✅ string (signature field)

  // creditCardMasked: "",
  // ccExpiry: "",
  // date: "",

  warrantySelections: [],
  crownTeeth: [],
  implantTeeth: []   // ✅ array
};


// ✅ Validation Schema
export const patientClaimValidationSchema = Yup.object({
  patientName: Yup.string().required("Patient name is required"),
  // patientPhone: Yup.string().required("Phone number is required"),
  // patientEmail: Yup.string().email("Invalid email").required("Email is required"),
  // dateOfBirth: Yup.string()
  //   .matches(
  //     /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  //     "Date of birth must be in format YYYY-MM-DD"
  //   )
  //   .required("Date of birth is required"), patientAddress: Yup.string().required("Address is required"),
  // patientCity: Yup.string().required("City is required"),
  // patientState: Yup.string().required("State is required"),
  // patientZip: Yup.string()
  //   .matches(/^\d{5}$/, "Zip code must be exactly 5 digits")
  //   .required("Zip code is required"),

  doctorName: Yup.string().required("Doctor name is required"),
  // doctorPhone: Yup.string().required("Doctor phone is required"),
  doctorEmail: Yup.string().email("Invalid doctor email").required("Doctor email is required"),
  // doctorAddress: Yup.string().required("Doctor address is required"),
  // doctorCity: Yup.string().required("Doctor city is required"),
  // doctorState: Yup.string().required("Doctor state is required"),
  // doctorZip: Yup.string()
  //   .matches(/^\d{5}$/, "Doctor zip must be exactly 5 digits")
  //   .required("Doctor zip is required"),

  // licenseNumber: Yup.string()
  //   .matches(/^([A-Za-z]{3})-(\d{5})$/, "License number must be in format ABC-12345")
  //   .required("License number is required"),
  // totalUnits: Yup.number().typeError("Must be a number").required("Total units is required"),
  // typeOfRestoration: Yup.string().required("Type of restoration is required"),
  // shade: Yup.string()
  //   .matches(/^[A-Za-z0-9]+$/, "Only letters and numbers are allowed")
  //   .required("Shade is required"),

  // doctorSignature: Yup.string().required("Doctor signature is required"),
  // doctorSignatureEmail: Yup.string().email("Invalid email").required("Doctor signature email is required"),
  // patientSignature: Yup.string().required("Patient signature is required"),

  // creditCardMasked: Yup.string()
  //   .matches(
  //     /^(\d{4} \d{4} \d{4} \d{4})$/,
  //     "Credit card number must be in format 1234 5678 9012 3456"
  //   )
  //   .required("Credit card number is required"),
  // ccExpiry: Yup.string()
  //   .matches(
  //     /^(20\d{2})-(0[1-9]|1[0-2])$/,
  //     "Expiry date must be in format YYYY-MM"
  //   )
  //   .required("Expiry date is required"),  // date: Yup.string().required("Date is required"),

  // warrantySelections: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       category: Yup.string().required("Category is required"),
  //       years: Yup.number().required("Years is required"),
  //       monthlyAmount: Yup.number().required("Monthly amount is required"),
  //     })
  //   )
  //   .min(0), // not required but allows validation if filled
});

