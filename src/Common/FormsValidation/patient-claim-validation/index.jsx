import * as Yup from "yup";

// ✅ Initial Values
export const DoctorClaimInitialValues = {
  patientFirstName: "",
  doctorName: "",
  doctorEmail: "", 
  warrantySelections: [],
  crownTeeth: [],
  implantTeeth: []   // ✅ array
};


// ✅ Validation Schema
export const patientClaimValidationSchema = Yup.object({
  patientName: Yup.string().required("Patient name is required"),
  doctorName: Yup.string().required("Doctor name is required"), 
  doctorEmail: Yup.string().email("Invalid doctor email").required("Doctor email is required"),
});

