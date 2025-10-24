import * as Yup from "yup";

// ✅ Initial Values
export const DoctorClaimInitialValues = {
  patient : null,
  doctorName: "",
  doctorEmail: "",
  // warrantySelections: [],
  crownTeeth: [],
  implantTeeth: []   // ✅ array
};


// ✅ Validation Schema
export const patientClaimValidationSchema = Yup.object({
  patientName: Yup.string().required("Patient name is required"),
  doctorName: Yup.string().required("Doctor name is required"),
  doctorEmail: Yup.string().email("Invalid doctor email").required("Doctor email is required"),
  crownTeeth: Yup.array()
    .of(Yup.number())
    .min(1, "Please select at least one crown tooth")
    .required("Please select crown teeth"),

  implantTeeth: Yup.array()
    .of(Yup.number())
    .min(1, "Please select at least one implant tooth")
    .required("Please select implant teeth"),
});

