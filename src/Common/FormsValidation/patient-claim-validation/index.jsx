import * as Yup from "yup";

// ✅ Initial Values
export const PatientClaimInitialValues = {
  patientName: "",
  patientPhone: "",
  patientEmail: "",
  dateOfBirth: "",
  patientAddress: "",
  patientCity: "",
  patientState: "",
  patientZip: "",

  doctorName: "",
  doctorPhone: "",
  doctorEmail: "",
  doctorAddress: "",
  doctorCity: "",
  doctorState: "",
  doctorZip: "",

  licenseNumber: "",
  totalUnits: "",
  typeOfRestoration: "",
  shade: "",

  doctorSignature: "",         // ✅ string (signature field)
  doctorSignatureEmail: "",    // ✅ string (email field)
  patientSignature: "",        // ✅ string (signature field)

  creditCardMasked: "",
  ccExpiry: "",
  date: "",

  warrantySelections: [],      // ✅ array
};


// ✅ Validation Schema
export const patientClaimValidationSchema = Yup.object({
  patientName: Yup.string().required("Patient name is required"),
  patientPhone: Yup.string().required("Phone number is required"),
  patientEmail: Yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  patientAddress: Yup.string().required("Address is required"),
  patientCity: Yup.string().required("City is required"),
  patientState: Yup.string().required("State is required"),
  patientZip: Yup.string().required("Zip code is required"),

  doctorName: Yup.string().required("Doctor name is required"),
  doctorPhone: Yup.string().required("Doctor phone is required"),
  doctorEmail: Yup.string().email("Invalid doctor email").required("Doctor email is required"),
  doctorAddress: Yup.string().required("Doctor address is required"),
  doctorCity: Yup.string().required("Doctor city is required"),
  doctorState: Yup.string().required("Doctor state is required"),
  doctorZip: Yup.string().required("Doctor zip is required"),

  licenseNumber: Yup.string().required("License number is required"),
  totalUnits: Yup.number().typeError("Must be a number").required("Total units is required"),
  typeOfRestoration: Yup.string().required("Type of restoration is required"),
  shade: Yup.string().required("Shade is required"),

  doctorSignature: Yup.string().required("Doctor signature is required"),
  doctorSignatureEmail: Yup.string().email("Invalid email").required("Doctor signature email is required"),
  patientSignature: Yup.string().required("Patient signature is required"),

  creditCardMasked: Yup.string().required("Credit card number is required"),
  ccExpiry: Yup.string().required("Expiry date is required"),
  // date: Yup.string().required("Date is required"),

  warrantySelections: Yup.array()
    .of(
      Yup.object().shape({
        category: Yup.string().required("Category is required"),
        years: Yup.number().required("Years is required"),
        monthlyAmount: Yup.number().required("Monthly amount is required"),
      })
    )
    .min(0), // not required but allows validation if filled
});
















































































// export const PatientClaimInitialValues = {
//   patientName: "",
//   patientPhone: "",
//   patientEmail: "",
//   dateOfBirth: "",
//   patientAddress: "",
//   patientCity: "",
//   patientState: "",
//   patientZip: "",
//   doctorName: "",
//   doctorPhone: "",
//   doctorEmail: "",
//   doctorAddress: "",
//   doctorCity: "",
//   doctorState: "",
//   doctorZip: "",
//   licenseNumber: "",
//   totalUnits: "",
//   typeOfRestoration: "",
//   shade: "",
//   doctorSignature: "",
//   doctorSignatureEmail: "",
//   patientSignature: "",
//   // crownTeeth: [],
//   // implantTeeth: [],
//   // dentureTeeth: [],
//   // paymentMethod: "",
//   creditCardMasked: "",
//   date: "",
//   ccExpiry: "",
//   // warrantySelections: [],
// };



// export const patientClaimValidationSchema = Yup.object({
//   patientName: Yup.string().required("Patient name is required"),
//   patientPhone: Yup.string().required("Phone number is required"),
//   patientEmail: Yup.string().email("Invalid email").required("Email is required"),
//   dateOfBirth: Yup.date().required("Date of birth is required"),
//   patientAddress: Yup.string().required("Address is required"),
//   patientCity: Yup.string().required("City is required"),
//   patientState: Yup.string().required("State is required"),
//   patientZip: Yup.string().required("Zip code is required"),

//   doctorName: Yup.string().required("Doctor name is required"),
//   doctorPhone: Yup.string().required("Doctor phone is required"),
//   doctorEmail: Yup.string().email("Invalid email").required("Doctor email is required"),
//   doctorSignatureEmail: Yup.string().email("Invalid email").required("Doctor email is required"),
//   patientSignature: Yup.string().email("Invalid email").required("Doctor email is required"),
//   doctorAddress: Yup.string().required("Doctor address is required"),
//   doctorCity: Yup.string().required("Doctor city is required"),
//   doctorState: Yup.string().required("Doctor state is required"),
//   doctorZip: Yup.string().required("Doctor zip is required"),

//   licenseNumber: Yup.string().required("License number is required"),
//   totalUnits: Yup.number().required("Total units is required"),
//   typeOfRestoration: Yup.string().required("Type of restoration is required"),
//   shade: Yup.string().required("Shade is required"),

//   // paymentMethod: Yup.string().required("Payment method is required"),
//   creditCardMasked: Yup.string().required("Credit card number is required"),
//   ccExpiry: Yup.string().required("Expiry date is required"),
//   date: Yup.string().required("Expiry date is required"),
//   // crownTeeth: Yup.array().of(Yup.number()),
//   // implantTeeth: Yup.array().of(Yup.number()),
//   // dentureTeeth: Yup.string(),
//   // warrantySelections: Yup.array()
//   //   .of(
//   //     Yup.object().shape({
//   //       category: Yup.string().required(),
//   //       years: Yup.number().required(),
//   //       monthlyAmount: Yup.number().required(),
//   //     })
//   //   )
//   //   .min(1, "At least one warranty option must be selected"),
// });