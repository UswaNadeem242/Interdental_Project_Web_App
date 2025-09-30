import { DashboardIcon } from "../icon/dashboard";
import { OrderIcon } from "../icon/OrderIcon";
import { PatienIcon } from "../icon/PatienIcon";
import { ClaimIcon } from "../icon/claimIcon";
import { UserIcon } from "../icon/UserIcon";
import { CartIcon } from "../icon/CartIcon";
import ProfileIcon from "../icon/ProfileIcon";
import UserProfileIcon from "../icon/UserProfileIcon";
import { DoctorIcon } from "../icon/DoctorIcon";
import { Crown } from "../icon/Crown";
import { Revenue } from "../icon/Revenue";
export const MATERIAL_OPTIONS = [
  { value: "ivoclar", label: "Ivovlar Prime Cad", price: 95 },
  { value: "argen-ht", label: "Argen HT", price: 45 },
  { value: "argen-st", label: "Argen ST", price: 50 },
  { value: "emax", label: "Emax", price: 95 },
  { value: "aidite", label: "Aidite", price: 85 },
  { value: "multilayer", label: "Multilayer Pro", price: 75 },
  { value: "pmma", label: "PMMA", price: 35 },
];
export const Digital_Option = [
  { value: "quad", label: "Quadrant" },
  { value: "fullarch", label: "Full Arch" },
];
export const LAB_OPTIONS = [
  { value: "in-house", label: "In-House" },
  { value: "partner", label: "Partner Lab" },
  { value: "argen", label: "Argen" },
  { value: "modern", label: "Modern Dental" },
];

// export const DIGITAL_DENTURE = [
//   { value: "crown", label: "Crown" },
//   { value: "bridge", label: "Bridge" },
//   { value: "full_denture", label: "Full Denture" },
//   { value: "partial_denture", label: "Partial Denture" },
// ];

// export const SURGICAL_GUIDE = [
//   { value: "single_implant_guide", label: "Single Implant Guide" },
//   { value: "multiple_implant_guide", label: "Multiple Implant Guide" },
//   { value: "full_arch", label: "Full Arch Surgical Guide" },
//   { value: "tooth-supported", label: "Tooth-Supported Guide" },
//   { value: "partial_denture", label: "Partial Denture" },
// ];

export const PHOTOGRAMMETRY_FILES = [
  { value: "STL", label: "STL" },
  { value: "DICOM", label: "DICOM" },
  { value: "3Shape", label: "3Shape" },
  { value: "Exocad", label: "Exocad" },
  { value: "Blue_Sky_Bio", label: "Blue Sky Bio" },
  { value: "Itero", label: "Itero" },
  { value: "OrthoCAD", label: "OrthoCAD" },
];

// export const SCANNER_TYPE = [
//   { value: "3shap", label: "3Shape" },
//   { value: "dentsply_sirona", label: "Dentsply Sirona" },
//   { value: "itero", label: "Itero" },
//   { value: "other", label: "Other" },
// ];

export const menuItems = [
  {
    name: "Dashboard",
    path: "/doctor-admin/dashboard",
    icon: DashboardIcon,
  },
  { name: "Orders", path: "/doctor-admin/orders", icon: OrderIcon },
  { name: "Patient", path: "/doctor-admin/patient", icon: PatienIcon },
  {
    name: "Claim Requests",
    path: "/doctor-admin/claim-request",
    icon: ClaimIcon,
  },
];

export const menuPatientItem = [
  {
    name: "warranty mGMT",
    path: "/patient-admin/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Claim Requests",
    path: "/patient-admin/claim-requests",
    icon: ClaimIcon,
  },
  {
    name: "Profile settings",
    path: "/patient-admin/profile-settings",
    icon: UserProfileIcon,
  },
];

export const menuAdminPanelItem = [
  {
    name: "Dashboard",
    path: "/admin-panel/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Doctors",
    path: "/admin-panel/doctors",
    icon: DashboardIcon,
  },
  {
    name: "Doctor Detail",
    path: "/admin-panel/doctor-detail",
    icon: DashboardIcon,
  },
  {
    name: "Orders",
    path: "/admin-panel/orders",
    icon: DashboardIcon,
  },
  // {
  //   name: "Order Detail",
  //   path: "/admin-panel/order-detail",
  //   icon: DashboardIcon,
  // },
];
export const menuItemsUser = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: DashboardIcon,
  },
  { name: "Orders", path: "/admin/orders", icon: OrderIcon },
  { name: "Product", path: "/admin/products", icon: PatienIcon },

  {
    name: "user",
    path: "/admin/users",
    icon: ClaimIcon,
  },
];

export const CardDashboard = [
  {
    title: "Total Patients",
    count: "300",
    date: "Jan 01, 2024",
    path: "/doctor-admin/dashboard",
    duedate: "Mar 30, 2024",
    // From jan 01,2024  March 30,2024
    icon: <UserIcon />,
  },
  {
    title: "Orders In Progress",
    count: "36",
    date: "Jan 01, 2024",
    path: "/doctor-admin/dashboard",
    duedate: "Mar 30, 2024",
    icon: <CartIcon />,
  },
  {
    title: "Orders Completed",
    count: "30",
    date: "Jan 01, 2024",
    path: "/doctor-admin/dashboard",
    duedate: "Mar 30, 2024",
    icon: <ProfileIcon />,
  },
];

export const options = [
  { label: "Subtotal:", value: "$350.00" },
  { label: "Shipping:", value: "Free" },
];
export const Paymentoptions = [{ label: "Credit or debit card" }];

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
  {
    id: "#1235",
    name: "Varga Dóra",
    product: "Argen HT",
    status: "active",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "John Doe",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Jane Smith",
    product: "Argen HT",
    status: "inactive",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Alice Brown",
    product: "Argen HT",
    status: "active",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
  },
  {
    id: "#1235",
    name: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
  },
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
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "12345678910",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "12345678910",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "12345678910",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Varga Dóra",
    email: "varga@example.com",
    status: "active",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    status: "pending",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    status: "inactive",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Alice Brown",
    email: "alice@example.com",
    status: "active",
    phone: "123456789",
    address: "abc....",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "pending",
    phone: "123456789",
    address: "abc....",
  },
  {
    id: "#1235",
    name: "John Doe",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
  {
    id: "#1235",
    name: "Jane Smith",
    product: "Argen HT",
    status: "inactive",
    submission: "16/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
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
  {
    id: "#1235",
    pName: "Varga Dóra",
    product: "Argen HT",
    status: "active",
    submission: "17/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
  {
    id: "#123588",
    pName: "John Doe",
    product: "Argen HT",
    status: "pending",
    submission: "17/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
  {
    id: "#1235",
    pName: "Jane Smith",
    product: "Argen HT",
    status: "inactive",
    submission: "16/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
  {
    id: "#1235",
    pName: "Alice Brown",
    product: "Argen HT",
    status: "active",
    submission: "16/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
  {
    id: "#1235",
    pName: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
  {
    id: "#1235",
    pName: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
  {
    id: "#1235",
    pName: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
  {
    id: "#1235",
    pName: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
  {
    id: "#1235",
    pName: "Bob Johnson",
    product: "Argen HT",
    status: "pending",
    submission: "16/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shipping: "16/22/2026",
    detailUrl: "/doctor-admin/order-details",
  },
];

export const Chartdata = [
  { month: "Feb", total: 5, completed: 3, inProgress: 1, pending: 1 },
  { month: "Jan", total: 0, completed: 0, inProgress: 0, pending: 9 },
  { month: "Mar", total: 10, completed: 6, inProgress: 2, pending: 10 },
  { month: "Apr", total: 15, completed: 9, inProgress: 3, pending: 8 },
  { month: "May", total: 20, completed: 12, inProgress: 4, pending: 4 },
  { month: "Jun", total: 25, completed: 15, inProgress: 5, pending: 5 },
  { month: "Jul", total: 30, completed: 18, inProgress: 6, pending: 6 },
  { month: "Aug", total: 35, completed: 21, inProgress: 7, pending: 7 },
  { month: "Sep", total: 40, completed: 24, inProgress: 8, pending: 2 },
  { month: "Oct", total: 45, completed: 27, inProgress: 9, pending: 1 },
  { month: "Nov", total: 50, completed: 30, inProgress: 10, pending: 1 },
  { month: "Dec", total: 55, completed: 33, inProgress: 11, pending: 11 },
];

export const ChartStatusLines = [
  { dataKey: "pending", stroke: "#3B82F6", name: "Pending" },
  { dataKey: "inProgress", stroke: "#E13434", name: "In Progress" },
  { dataKey: "completed", stroke: "#4FAD2E", name: "Completed" },
];
export const ChartStatusLines2 = [
  { dataKey: "pending", stroke: "#001D58", name: "Doctor" },
  { dataKey: "inProgress", stroke: "#94D3DD", name: "Patient" },
];

export const headingsPatientDashboardTable = [
  { label: "Product ID", key: "id" },
  { label: "Product Name", key: "pName" },
  { label: "Purchase Date", key: "PurchaseDate" },
  { label: "Expiration Date", key: "ExpDate" },
  { label: "Shopping Date", key: "ShoppingDate" },
  { label: "Quantity", key: "quantity" },
  { label: "Status", key: "status" },
  { label: "Actions", key: "action" },
];

export const PatientDashTabledata = [
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "active",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "active",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "active",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "active",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "active",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "active",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "active",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
  {
    id: "#1235",
    pName: "ZirCad Ivoclar",
    PurchaseDate: "2025-01-10",
    ExpDate: "2025-01-10",
    ShoppingDate: "16/22/2026",
    quantity: "134",
    status: "expired",
    action: "View Detail",
  },
];

export const headingsPatientClaimReq = [
  { label: "Claim ID", key: "id" },
  { label: "Product Name", key: "cName" },
  { label: "Status", key: "status" },
  { label: "Date Submitted", key: "DateSubmitted" },

  { label: "Action", key: "action" },
];
export const PatientClaimReqData = [
  {
    id: "#1235",
    cName: "Argen HT",
    DateSubmitted: "2025-01-10",
    status: "accepted",
    action: "View Detail",
  },
  {
    id: "#1235",
    cName: "Argen HT",
    DateSubmitted: "2025-01-10",
    status: "pending",
    action: "View Detail",
  },
  {
    id: "#1235",
    cName: "Argen HT",
    DateSubmitted: "2025-01-10",
    status: "rejected",
    action: "View Detail",
  },
  {
    id: "#1235",
    cName: "Argen HT",
    DateSubmitted: "2025-01-10",
    status: "accepted",
    action: "View Detail",
  },
];

//

export const CardAdminPanelDashboard = [
  {
    title: "Registered Doctors",
    count: "500",
    date: "Jan 01, 2024",
    path: "/admin-panel/dashboard",
    duedate: "Mar 30, 2024",
    icon: <DoctorIcon />,
  },
  {
    title: "Active Subscriptions",
    count: "300",
    date: "Jan 01, 2024",
    path: "/admin-panel/dashboard",
    duedate: "Mar 30, 2024",
    icon: <Crown />,
  },
  {
    title: "Revenue",
    count: "300",
    date: "Jan 01, 2024",
    path: "/admin-panel/dashboard",
    duedate: "Mar 30, 2024",
    icon: <Revenue />,
  },
];

//
// Static datasets for Single Line Chart
export const weeklyData = [
  { day: "Mon", earnings: 200 },
  { day: "Tue", earnings: 300 },
  { day: "Wed", earnings: 250 },
  { day: "Thu", earnings: 400 },
  { day: "Fri", earnings: 350 },
  { day: "Sat", earnings: 500 },
  { day: "Sun", earnings: 450 },
];

export const monthlyData = [
  { day: "Week 1", earnings: 1200 },
  { day: "Week 2", earnings: 1800 },
  { day: "Week 3", earnings: 1500 },
  { day: "Week 4", earnings: 2000 },
];

export const yearlyData = [
  { day: "Jan", earnings: 1200 },
  { day: "Feb", earnings: 1800 },
  { day: "Mar", earnings: 1500 },
  { day: "Apr", earnings: 2200 },
  { day: "May", earnings: 2800 },
  { day: "Jun", earnings: 3200 },
  { day: "Jul", earnings: 4000 },
  { day: "Aug", earnings: 3700 },
  { day: "Sep", earnings: 3100 },
  { day: "Oct", earnings: 4500 },
  { day: "Nov", earnings: 4800 },
  { day: "Dec", earnings: 5200 },
];

//Admin Panel Data

export const plans = [
  {
    id: "01",
    name: "Gold",
    percentage: "75%",
    color: "bg-[#94C522]",
    badge: "text-[#94C522]",
  },
  {
    id: "02",
    name: "Platinum",
    percentage: "75%",
    color: "bg-[#4ECCA3]",
    badge: "text-[#4ECCA3]",
  },
  {
    id: "03",
    name: "Diamond",
    percentage: "75%",
    color: "bg-[#2734C6]",
    badge: "text-[#2734C6]",
  },
];

export const productDataAdminPanel = [
  {
    id: "01",
    name: "GC Gold Label 1 Mini ",
    price: "$70",
    itemsSold: "70 Sold",
    totalPrice: "$1400",
    icon: (
      <img src={"/assets/Avatar.png"} alt="AvatarImg" className="max-w-xs" />
    ),
  },
  {
    id: "02",
    name: "GC Gold Label 1 Mini ",
    price: "$70",
    itemsSold: "70 Sold",
    totalPrice: "$1400",
    icon: (
      <img src={"/assets/Avatar.png"} alt="AvatarImg" className="max-w-xs" />
    ),
  },
  {
    id: "03",
    name: "GC Gold Label 1 Mini ",
    price: "$70",
    itemsSold: "70 Sold",
    totalPrice: "$1400",
    icon: (
      <img src={"/assets/Avatar.png"} alt="AvatarImg" className="max-w-xs" />
    ),
  },
  {
    id: "03",
    name: "GC Gold Label 1 Mini ",
    price: "$70",
    itemsSold: "70 Sold",
    totalPrice: "$1400",
    icon: (
      <img src={"/assets/Avatar.png"} alt="AvatarImg" className="max-w-xs" />
    ),
  },
  {
    id: "03",
    name: "GC Gold Label 1 Mini ",
    price: "$70",
    itemsSold: "70 Sold",
    totalPrice: "$1400",
    icon: (
      <img src={"/assets/Avatar.png"} alt="AvatarImg" className="max-w-xs" />
    ),
  },
  {
    id: "03",
    name: "GC Gold Label 1 Mini ",
    price: "$70",
    itemsSold: "70 Sold",
    totalPrice: "$1400",
    icon: (
      <img src={"/assets/Avatar.png"} alt="AvatarImg" className="max-w-xs" />
    ),
  },
  {
    id: "03",
    name: "GC Gold Label 1 Mini ",
    price: "$70",
    itemsSold: "70 Sold",
    totalPrice: "$1400",
    icon: (
      <img src={"/assets/Avatar.png"} alt="AvatarImg" className="max-w-xs" />
    ),
  },
  {
    id: "03",
    name: "GC Gold Label 1 Mini ",
    price: "$70",
    itemsSold: "70 Sold",
    totalPrice: "$1400",
    icon: (
      <img src={"/assets/Avatar.png"} alt="AvatarImg" className="max-w-xs" />
    ),
  },
  {
    id: "03",
    name: "GC Gold Label 1 Mini ",
    price: "$70",
    itemsSold: "70 Sold",
    totalPrice: "$1400",
    icon: (
      <img src={"/assets/Avatar.png"} alt="AvatarImg" className="max-w-xs" />
    ),
  },
];

export const headingsAdminPanelTable = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Phone Number ", key: "phoneNumber" },
  { label: "Address", key: "address" },
  { label: "License Number", key: "licenseNum" },
  { label: "Account Status", key: "status" },
  { label: "Sub status", key: "subStatus" },
  { label: "", key: "icon" },
];

export const dataDoctors = [
  {
    name: "Jon Doe",
    email: "JonDoe@gmail.com",
    phoneNumber: "0356 7656789",
    address: "207 Stillwater Lane",
    licenseNum: "456 567 43235",
    status: "deactivated",
    subStatus: "expired",
    detailUrl: "/doctor-admin/order-details",
    icon: "✌️",
  },
  {
    name: "Jon Doe",
    email: "JonDoe@gmail.com",
    phoneNumber: "0356 7656789",
    address: "207 Stillwater Lane",
    licenseNum: "456 567 43235",
    status: "active",
    subStatus: "expired",
    detailUrl: "/doctor-admin/order-details",
    icon: "✌️",
  },
];

export const headingsAdminPanelOrders = [
  { label: "order ID", key: "id" },
  { label: "Scan Date", key: "scanDate" },
  { label: "Doctor Name", key: "dName" },
  { label: "Patient ID", key: "pId" },
  { label: "Shopping Date", key: "shoppingDate" },
  { label: "Status", key: "status" },
  { label: "Action", key: "action" },
];

export const dataOrdersAdminPanel = [
  {
    id: "#1235",
    pId: "etedfty6",
    product: "Argen HT",
    status: "active",
    scanDate: "17/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shoppingDate: "16/22/2026",
    detailUrl: "/admin-panel/order-detail",
  },
  {
    id: "#1235",
    pId: "etedfty6",
    product: "Argen HT",
    status: "active",
    scanDate: "17/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shoppingDate: "16/22/2026",
    detailUrl: "/admin-panel/order-detail",
  },
  {
    id: "#1235",
    pId: "etedfty6",
    product: "Argen HT",
    status: "active",
    scanDate: "17/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shoppingDate: "16/22/2026",
    detailUrl: "/admin-panel/order-detail",
  },
  {
    id: "#1235",
    pId: "etedfty6",
    product: "Argen HT",
    status: "active",
    scanDate: "17/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shoppingDate: "16/22/2026",
    detailUrl: "/admin-panel/order-detail",
  },
  {
    id: "#1235",
    pId: "etedfty6",
    product: "Argen HT",
    status: "active",
    scanDate: "17/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shoppingDate: "16/22/2026",
    detailUrl: "/admin-panel/order-detail",
  },
];

// Admin Panel Produts

export const headingsProducts = [
  { label: "Name", key: "name" },
  { label: "Product ID", key: "pId" },
  { label: "Category", key: "category" },
  { label: "Stock", key: "stock" },
  { label: "Price", key: "price" },
];

export const dataProducts = [
  {
    name: "Mgr Financial Plan",
    pId: "PRID233214",
    category: "Contact Lenses",
    stock: "543",
    price: "$23",
  },
];

export const feedbackData = [
  {
    name: "Kristin Watson",
    rating: 5,
    time: "2 Min Ago",
    comment:
      "Himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat.",
  },
  {
    name: "Kristin Watson",
    rating: 5,
    time: "2 Min Ago",
    comment:
      "Iti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum.",
  },
  {
    name: "Kristin Watson",
    rating: 5,
    time: "2 Min Ago",
    comment:
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
];

//
//Admin-panel(Product Details)
export const productDetailsData = {
  title: "Woodpecker Scaling Tip",
  rating: "5.0",
  price: "17.28",
  desc: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  sold: "200",
  inStock: "300",
  category: "Dental Laser",
};
