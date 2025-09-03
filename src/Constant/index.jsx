import { DashboardIcon } from "../icon/dashboard";
import { OrderIcon } from "../icon/OrderIcon";
import { PatienIcon } from "../icon/PatienIcon";
import { ClaimIcon } from "../icon/claimIcon";
import { UserIcon } from "../icon/UserIcon";
import { CartIcon } from "../icon/CartIcon";
export const MATERIAL_OPTIONS = [
  { value: "ivoclar", label: "Ivovlar Prime Cad", price: 95 },
  { value: "argen-ht", label: "Argen HT", price: 45 },
  { value: "argen-st", label: "Argen ST", price: 50 },
  { value: "emax", label: "Emax", price: 95 },
  { value: "aidite", label: "Aidite", price: 85 },
  { value: "pmma", label: "PMMA", price: 35 },
  { value: "multilayer", label: "Multilayer Pro", price: 75 },
];

export const LAB_OPTIONS = [
  { value: "in-house", label: "In-House" },
  { value: "partner", label: "Partner Lab" },
  { value: "argen", label: "Argen" },
  { value: "modern", label: "Modern Dental" },
];

export const DIGITAL_DENTURE = [
  { value: "crown", label: "Crown" },
  { value: "bridge", label: "Bridge" },
  { value: "full_denture", label: "Full Denture" },
  { value: "partial_denture", label: "Partial Denture" },
];

export const SURGICAL_GUIDE = [
  { value: "single_implant_guide", label: "Single Implant Guide" },
  { value: "multiple_implant_guide", label: "Multiple Implant Guide" },
  { value: "full_arch", label: "Full Arch Surgical Guide" },
  { value: "partial_denture", label: "Partial Denture" },
];

export const PHOTOGRAMMETRY_FILES = [
  { value: "STL", label: "STL" },
  { value: "DICOM", label: "DICOM" },
  { value: "3Shape", label: "3Shape" },
  { value: "Exocad", label: "Exocad" },
  { value: "Blue_Sky_Bio", label: "Blue Sky Bio" },
  { value: "Itero", label: "Itero" },
  { value: "OrthoCAD", label: "OrthoCAD" },
];

export const SCANNER_TYPE = [
  { value: "3shap", label: "3Shape" },
  { value: "dentsply_sirona", label: "Dentsply Sirona" },
  { value: "itero", label: "Itero" },
  { value: "other", label: "Other" },
];

export const menuItems = [
  { name: "Dashboard", path: "/doctorAdmin/dashboard", icon: DashboardIcon },
  { name: "Orders", path: "/doctorAdmin/orders", icon: OrderIcon },
  { name: "Patient", path: "/doctorAdmin/patientDoctor", icon: PatienIcon },
  { name: "Doctor", path: "/doctorAdmin/doctor", icon: ClaimIcon },
];
export const CardDashboard = [
  {
    title: "Total Patients",
    count: "300",
    date: "Jan 01, 2024",
    path: "/doctorAdmin/dashboard",
    duedate: "Mar 30, 2024",
    icon: <UserIcon />,
  },
  {
    title: "Orders In Progress",
    count: "36",
    date: "Jan 01, 2024",
    path: "/doctorAdmin/dashboard",
    duedate: "Mar 30, 2024",
    icon: <CartIcon />,
  },
  {
    title: "Orders Completed",
    count: "30",
    date: "Jan 01, 2024",
    path: "/doctorAdmin/dashboard",
    duedate: "Mar 30, 2024",
    icon: <UserIcon />,
  },
];

export const PatientDashboard = [
  {
    name: "Kathryn",
    email: "smallpaul@me.com",
    linkName: "View Detail",
    icon: <UserIcon />,
  },
  {
    name: "Kathryn",
    email: "smallpaul@me.com",
    linkName: "View Detail",
    icon: <UserIcon />,
  },
];

export const Orders = [
  {
    id: "#1235",
    scanDate: "16/22/2026",
    doctor: "Miles, Esther",
    patient: "6tedtfy6",
    shoppingDate: "16/22/2026",
    status: "In Progress",
  },
  {
    id: "#1235",
    scanDate: "16/22/2026",
    doctor: "Miles, Esther",
    patient: "6tedtfy6",
    shoppingDate: "16/22/2026",
    status: "Pending",
  },
  {
    id: "#1235",
    scanDate: "16/22/2026",
    doctor: "Miles, Esther",
    patient: "6tedtfy6",
    shoppingDate: "16/22/2026",
    status: "Pending",
  },
  {
    id: "#1235",
    scanDate: "16/22/2026",
    doctor: "Miles, Esther",
    patient: "6tedtfy6",
    shoppingDate: "16/22/2026",
    status: "In Progress",
  },
];
