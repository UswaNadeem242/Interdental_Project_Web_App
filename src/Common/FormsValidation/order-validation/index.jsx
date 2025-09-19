import * as Yup from "yup";

export const OrderValidationSchema = Yup.object().shape({
    doctorName: Yup.string().required("Doctor's Name / Office Name is required"),
    officeReg: Yup.string().required("Office registration number is required")
        .matches(/^[0-9]{20}$/, "Office registration number must be exactly 20 digits"),
    createDate: Yup.date().required("Create Date is required"),
    dueDate: Yup.date().required("Case expected due date"),
    patientFirstName: Yup.string().required(" name is required"),
    patientLastName: Yup.string().required("Last name is required"),
    subscriptionId: Yup.string().required("Subscription ID is required"),
    scannerType: Yup.string().required("Scanner Type is required"),
    digitalOptions: Yup.string().required("Digital Denture is required"),
    surgical_guide: Yup.string().required("Surgical Guide is required"),
    material: Yup.string().required("Material is required"),
    crown: Yup.string().required("Crown is required"),
    lab: Yup.string().required("Laboratory is required"),
    note: Yup.string().nullable(),
});
