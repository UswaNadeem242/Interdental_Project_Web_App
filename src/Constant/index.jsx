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
  { name: "Dashboard", path: "/doctorAdmin/doctordashboard", icon: DashboardIcon },
  { name: "Orders", path: "/doctorAdmin/Orders", icon: OrderIcon },
  { name: "Patient", path: "/doctorAdmin/Patient", icon: PatienIcon },
  { name: "Claim Requests", path: "/doctorAdmin/Claim-Request", icon: ClaimIcon },
  // { name: "Order", path: "/doctorAdmin/Orders-Details", icon: ClaimIcon },
  // { name: "details", path: "/doctorAdmin/Details", icon: ClaimIcon },
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

export const options = [
  { label: "Subtotal:", value: "$350.00" },
  { label: "Shipping:", value: "Free" },
];
export const Paymentoptions = [
  { label: "Credit or debit card" },
];

export const ShippingDetail = [
  { label: "Shipping Address" },
  { label: "1901 Thornridge Cir. Shiloh, Hawaii 81063" },
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


export const data = [
  { id: '#1235', name: "Varga Dóra", product: 'Argen HT', status: "active", submission: '16/22/2026', action: 'View Detail' },
  { id: '#1235', name: "John Doe", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail' },
  { id: '#1235', name: "Jane Smith", product: 'Argen HT', status: "inactive", submission: '16/22/2026', action: 'View Detail' },
  { id: '#1235', name: "Alice Brown", product: 'Argen HT', status: "active", submission: '16/22/2026', action: 'View Detail' },
  { id: '#1235', name: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail' },
  { id: '#1235', name: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail' },
  { id: '#1235', name: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail' },
  { id: '#1235', name: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail' },
  { id: '#1235', name: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail' },
];

export const headings = [
  { label: "Claim ID", key: "id" },
  { label: "Patient Name", key: "name" },
  { label: "Product Name", key: "product" },
  { label: "Status", key: "status" },
  { label: "Submission Date", key: "submission" },
  { label: "Action", key: "action" },
];


export const headingsPateint = [
  // { label: "Claim ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Phone Number", key: "phone" },
  { label: "Address", key: "address" },
  { label: "Account Status", key: "status" },
  // { label: "Action", key: "action" },
];


export const dataPatient = [
  { name: "Varga Dóra", email: "varga@example.com", status: "active", phone: '123456789', address: 'abc....' },
  { name: "John Doe", email: "john@example.com", status: "pending", phone: '123456789', address: 'abc....' },
  { name: "Jane Smith", email: "jane@example.com", status: "inactive", phone: '123456789', address: 'abc....' },
  { name: "Alice Brown", email: "alice@example.com", status: "active", phone: '123456789', address: 'abc....' },
  { name: "Bob Johnson", email: "bob@example.com", status: "pending", phone: '123456789', address: 'abc....' },
  // ...more rows
];


export const headingsOrder = [
  { label: "order ID", key: "id" },
  { label: "Scan Date", key: "submission" },
  { label: "Doctor Name", key: "dName" },
  { label: "Patient Name", key: "pName" },
  { label: "Shopping Date", key: "shipping" },
  { label: "Account Status", key: "status" },
  { label: "Action", key: "action" },
];

export const dataOrder = [
  { id: '#1235', pName: "Varga Dóra", product: 'Argen HT', status: "active", submission: '16/22/2026', action: 'View Detail', dName: 'Miles, Esther', shipping: '16/22/2026' },
  { id: '#1235', pName: "John Doe", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail', dName: 'Miles, Esther', shipping: '16/22/2026' },
  { id: '#1235', pName: "Jane Smith", product: 'Argen HT', status: "inactive", submission: '16/22/2026', action: 'View Detail', dName: 'Miles, Esther', shipping: '16/22/2026' },
  { id: '#1235', pName: "Alice Brown", product: 'Argen HT', status: "active", submission: '16/22/2026', action: 'View Detail', dName: 'Miles, Esther', shipping: '16/22/2026' },
  { id: '#1235', pName: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail', dName: 'Miles, Esther', dName: 'Miles, Esther', shipping: '16/22/2026' },
  { id: '#1235', pName: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail', dName: 'Miles, Esther', shipping: '16/22/2026' },
  { id: '#1235', pName: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail', dName: 'Miles, Esther', shipping: '16/22/2026' },
  { id: '#1235', pName: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail', dName: 'Miles, Esther', shipping: '16/22/2026' },
  { id: '#1235', pName: "Bob Johnson", product: 'Argen HT', status: "pending", submission: '16/22/2026', action: 'View Detail', dName: 'Miles, Esther', shipping: '16/22/2026' },
];