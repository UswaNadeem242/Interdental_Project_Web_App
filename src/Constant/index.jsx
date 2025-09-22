import { DashboardIcon } from "../icon/dashboard";
import { OrderIcon } from "../icon/OrderIcon";
import { PatienIcon } from "../icon/PatienIcon";
import { ClaimIcon } from "../icon/claimIcon";
import { UserIcon } from "../icon/UserIcon";
import { CartIcon } from "../icon/CartIcon";
import ProfileIcon from "../icon/ProfileIcon";
import UserProfileIcon from "../icon/UserProfileIcon";
 

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/patient", label: "Patient" },
  { to: "/doctor", label: "Doctor" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
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

 

export const PHOTOGRAMMETRY_FILES = [
  { value: "STL", label: "STL" },
  { value: "DICOM", label: "DICOM" },
  { value: "3Shape", label: "3Shape" },
  { value: "Exocad", label: "Exocad" },
  { value: "Blue_Sky_Bio", label: "Blue Sky Bio" },
  { value: "Itero", label: "Itero" },
  { value: "OrthoCAD", label: "OrthoCAD" },
];

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
  { month: "Jan", total: 0, completed: 0, inProgress: 0, pending: 0 },
  { month: "Feb", total: 5, completed: 3, inProgress: 1, pending: 1 },
  { month: "Mar", total: 10, completed: 6, inProgress: 2, pending: 2 },
  { month: "Apr", total: 15, completed: 9, inProgress: 3, pending: 3 },
  { month: "May", total: 20, completed: 12, inProgress: 4, pending: 4 },
  { month: "Jun", total: 25, completed: 15, inProgress: 5, pending: 5 },
  { month: "Jul", total: 30, completed: 18, inProgress: 6, pending: 6 },
  { month: "Aug", total: 35, completed: 21, inProgress: 7, pending: 7 },
  { month: "Sep", total: 40, completed: 24, inProgress: 8, pending: 8 },
  { month: "Oct", total: 45, completed: 27, inProgress: 9, pending: 9 },
  { month: "Nov", total: 50, completed: 30, inProgress: 10, pending: 10 },
  { month: "Dec", total: 55, completed: 33, inProgress: 11, pending: 11 },
];

export const ChartStatusLines = [
  { dataKey: "pending", stroke: "#3B82F6", name: "Pending" },
  { dataKey: "inProgress", stroke: "#E13434", name: "In Progress" },
  { dataKey: "completed", stroke: "#4FAD2E", name: "Completed" },
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
