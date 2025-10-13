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

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Our Products" },
  { to: "/shop", label: "Shop" },
  { to: "/patient", label: "Patient" },
  { to: "/doctor", label: "Doctor" },
  { to: "/blog", label: "Blogs" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
];

export const menuPatientItem = [
  {
    name: "warranty mGMT",
    path: "/patient-admin/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Claim Requests",
    path: "/patient-admin/claim-request",
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
  {
    name: "Products",
    path: "/admin-panel/products",
    icon: DashboardIcon,
  },
  {
    name: "List Product",
    path: "/admin-panel/list-product",
    icon: DashboardIcon,
  },
  {
    name: "product Details",
    path: "/admin-panel/product-details",
    icon: DashboardIcon,
  },
  {
    name: "Subscriptions",
    path: "/admin-panel/subscriptions",
    icon: DashboardIcon,
  },
  {
    name: "Claim Requests",
    path: "/admin-panel/claim-requests",
    icon: DashboardIcon,
  },
  {
    name: "Blogs & Articles",
    path: "/admin-panel/blogs-and-articles",
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
  { dataKey: "pending", stroke: "#00A5FF", name: "Pending" },
  { dataKey: "inProgress", stroke: "#000000", name: "In Progress" },
  { dataKey: "completed", stroke: "#00AF10", name: "Completed" },
];
export const ChartStatusLines2 = [
  { dataKey: "pending", stroke: "#001D58", name: "Doctor" },
  { dataKey: "inProgress", stroke: "#94D3DD", name: "Patient" },
];

export const headingsPatientDashboardTable = [
  { label: "Product ID", key: "id" },
  { label: "Doctoe Name", key: "dName" },
  { label: "Patient Name", key: "pName" },
  { label: "totalAmount", key: "tAmount" },
  { label: "Shopping Date", key: "ShoppingDate" },
  // { label: "Quantity", key: "quantity" },
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
  { label: "Patient Name", key: "pName" },
  { label: "patient Email", key: "pEmail" },
  { label: "Doctor Name", key: "dName" },
  { label: "Doctor Email", key: "dEmail" },
  // { label: "Date Submitted", key: "date" },
  // { label: "Status", key: "status" },

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

export const planss = [
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
    status: "in progress",
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
    status: "pending",
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
    status: "completed",
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
    status: "completed",
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
    status: "completed",
    scanDate: "17/22/2026",
    action: "View Detail",
    dName: "Miles, Esther",
    shoppingDate: "16/22/2026",
    detailUrl: "/admin-panel/order-detail",
  },
];

// Admin Panel Produts

export const headingsProducts = [
  { label: "Name", key: "pName" },
  { label: "Product ID", key: "pId" },
  { label: "Category", key: "category" },
  { label: "Stock", key: "stock" },
  { label: "Price", key: "price" },
];

export const dataProducts = [
  {
    pName: "Mgr Financial Plan",
    pId: "PRID233214",
    category: "Contact Lenses",
    stock: "543",
    price: "$23",
    image: "/assets/brush.png",
  },
  {
    pName: "Mgr Financial Plan",
    pId: "PRID233214",
    category: "Contact Lenses",
    stock: "0",
    price: "$23",
    image: "/assets/brush.png",
  },
  {
    pName: "Mgr Financial Plan",
    pId: "PRID233214",
    category: "Contact Lenses",
    stock: "0",
    price: "$23",
    image: "/assets/brush.png",
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

//

export const compositionData = [
  { name: "ZlO₂+HfO₂+Y₂O₃", value: "> 99 Wt%", bold: true },
  { name: "Y₂O₃", value: "6.1–8.2 Wt%", bold: true },
  { name: "HfO₂", value: "< 5 Wt%" },
  { name: "Al₂O₃", value: "< 0.2 Wt%", bold: true },
];

export const shadesProductLanding = [
  { label: "A1", color: "#EFEAD4" },
  { label: "A2", color: "#ECE8D0" },
  { label: "A3.5", color: "#E4DBC2" },
  { label: "A4", color: "#E4DDC3" },
  { label: "B1", color: "#D2C89B" },
  { label: "B2", color: "#EFEAD4" },

  { label: "B3", color: "#EAE3C6" },
  { label: "B4", color: "#E0D7B3" },
  { label: "C1", color: "#E0D7B5" },
  { label: "C2", color: "#E4DDC3" },
  { label: "C3", color: "#E0D7B5" },
  { label: "C4", color: "#E4DBC2" },

  { label: "D2", color: "#DDD4B5" },
  { label: "D3", color: "#D0C2A2" },
  { label: "D4", color: "#D0C2A2" },

  { label: "OM1", color: "#FFFFFF", border: true },
  { label: "OM2", color: "#FFFFFF", border: true },
  { label: "OM3", color: "#FFFFFF", border: true },
  { label: "White", color: "#FFFFFF", border: true },
];

export const shadesproduct = [
  { label: "A1", color: "#EFEAD4" },
  { label: "A2", color: "#ECE8D0" },
  { label: "A3", color: "#E4DBC2" },
  { label: "A3.5", color: "#E4DDC3" },

  { label: "B1", color: "#D2C89B" },
  { label: "B2", color: "#EFEAD4" },
  { label: "B3", color: "#E0D7B3" },
  { label: "B4", color: "#E0D7B5" },

  { label: "C1", color: "#E4DDC3" },
  { label: "C2", color: "#E0D7B5" },
  { label: "C3", color: "#E4DBC2" },
  { label: "C4", color: "#D2C89B" },

  { label: "D2", color: "#DDD4B5" },
  { label: "D3", color: "#D0C2A2" },
  { label: "D4", color: "#D0C2A2" },
  { label: "Bleach", color: "#FFFFFF" },
];

export const diameters = ["95mm", "98mm"];
export const thicknesses = [
  "10mm",
  "12mm",
  "14mm",
  "16mm",
  "20mm",
  "22mm",
  "25mm",
  "30mm",
];

export const newDiameters = ["98mm"];
export const newThicknesses = ["12mm", "14mm", "16mm", "20mm", "25mm", "30mm"];

export const shadesproductargenzst = [
  { label: "A1", color: "#EFEAD4" },
  { label: "A2", color: "#ECE8D0" },
  { label: "A3", color: "#D2C89B" },
  { label: "A3.5", color: "#E4DDC3" },
  { label: "B1", color: "#EFEAD4" },
  { label: "B2", color: "#EAE3C6" },
  { label: "B3", color: "#E0D7B3" },
  { label: "B4", color: "#E0D7B5" },

  { label: "C1", color: "#E4DDC3" },
  { label: "C2", color: "#E0D7B5" },
  { label: "C3", color: "#E4DBC2" },
  { label: "C4", color: "#D2C89B" },

  { label: "D2", color: "#D2C89B" },
  { label: "D3", color: "#D0C2A2" },
  { label: "D4", color: "#D0C2A2" },
  { label: "D4", color: "#D0C2A2" },

  { label: "OM1", color: "#FFFFFF" },
  { label: "OM2", color: "#FFFFFF" },
  { label: "OM3", color: "#FFFFFF" },
];

export const newDiametersargenzst = ["95mm", "98mm"];
export const newThicknessesargenzst = ["12mm", "14mm", "16mm", "18mm", "20mm"];

export const CardZidcard = [
  {
    title: "Class of material",
    label1: "Incisal",
    value1: "5Y-TZP",
    label2: "Dentin",
    value2: " 3Y-TZP",
  },
  {
    title: "Flexural strength",
    label1: "650 MPa",
    value1: "(incisal)",
    label2: "1200 MPa ",
    value2: " (dentin)",
  },
  {
    title: "Fracture toughness",
    label1: "5.0 MPa ",
    value1: "• M¹/² (dentin)",
  },
];
export const cardsecondZidCard = [
  {
    title: "Minimum wall thickness (crown)",
    label1: "Anterior tooth monolithic: ",
    value1: "0.8 mm",
    label2: "Posterior tooth monolithic: ",
    value2: " 1.0 mm",
  },
  { title: "Disc thickness (Ø 98.5 mm)", value1: "14mm, 16mm, 20mm, 25mm" },
];

export const shadesproductzidCard = [
  { label: "A1", color: "#EFEAD4" },
  { label: "A2", color: "#ECE8D0" },
  { label: "A3", color: "#D2C89B" },
  { label: "A3.5", color: "#E4DDC3" },
  { label: "B1", color: "#EFEAD4" },
  { label: "B2", color: "#EAE3C6" },
  { label: "B3", color: "#E0D7B3" },
  { label: "B4", color: "#E0D7B5" },

  { label: "C1", color: "#E4DDC3" },
  { label: "C2", color: "#E0D7B5" },
  { label: "C3", color: "#E4DBC2" },
  { label: "C4", color: "#D2C89B" },

  { label: "D2", color: "#D2C89B" },
  { label: "D3", color: "#D0C2A2" },
  { label: "D4", color: "#D0C2A2" },
  { label: "D4", color: "#D0C2A2" },

  { label: "BL1", color: "#EFEAD4" },
  { label: "BL2", color: "#ECE8D0" },
  { label: "BL3", color: "#E4DBC2" },
  { label: "BL4", color: "#E4DDC3" },
];

export const newDiameterszidCard = ["95mm", "98mm"];
export const newThicknesseszidCard = ["12mm", "14mm", "16mm", "18mm", "20mm"];

export const zidCardComponent = [
  {
    title: "Applications",
    items: [
      "Crowns and crown copings",
      "3-unit bridges and bridge frameworks",
      "4-unit and multi-unit bridges and bridge frameworks with max. 2 pontics",
      "Crowns and bridges on natural teeth and on implant systems",
    ],
  },
  {
    title: "Recommended fabrication techniques",
    items: [
      "Staining and glazing",
      "Brush infiltration with LT Colouring and Effect liquids",
      "Cut-back",
      "Layering",
    ],
  },
];

export const teethOptionMutiple = [
  { id: 1, title: "Inlay/Onlay", img: "/assets/landing-page/1.png" },
  { id: 2, title: "Veneer", img: "/assets/landing-page/2.png" },
  { id: 3, title: "Anterior full crown", img: "/assets/landing-page/3.png" },
  {
    id: 4,
    title: "Anterior full crown bridge",
    img: "/assets/landing-page/4.png",
  },
  {
    id: 5,
    title: "Anterior coping Anterior reduced crowne",
    img: "/assets/landing-page/8.png",
  },
  {
    id: 6,
    title: "Anterior coping bridge Anteriorreduced crown bridge",
    img: "/assets/landing-page/11.png",
  },
  {
    id: 7,
    title: "Posterior full crown",
    img: "/assets/landing-page/7.png",
  },
  {
    id: 8,
    title: "Posterior full crown bridge",
    img: "/assets/landing-page/6.png",
  },
  {
    id: 9,
    title: "Posterior coping Posterior reduced crown",
    img: "/assets/landing-page/9.png",
  },
  {
    id: 10,
    title: "Posterior coping bridge Posterior reduced crown bridge",
    img: "/assets/landing-page/10.png",
  },
  {
    id: 11,
    title: "Screw-retained bridge",
    img: "/assets/landing-page/11.png",
  },
];

export const prescriptionCards = [
  {
    title: "Prescription Wizard RX",
    subtitle: "The only dynamic prescription system of its kind:",
    points: [
      "- Smart AI assistant walks you through every submission",
      "- Visual tooth selector + dropdown materials",
      "- Compatible with STL, PLY, DICOM, and PDF uploads",
      "- Auto-fills lab instructions + FedEx shipping labels",
    ],
  },
  {
    title: "Implant Interface",
    subtitle: "Connect directly to doctors at the time of treatment planning:",
    points: [
      "- Doctors select components using your part SKUs",
      "- System matches compatible parts by platform, diameter, and angulation",
      "- Seamless ordering and shipping of implant kits",
      "- Monthly subscription per state for visibility and usage",
      "- Warranties aligned with manufacturer specifications",
    ],
  },
  {
    title: "Dentallaballiance",
    subtitle: "Real-time searchable lab directory:",
    points: [
      "- Labs list pricing, turnaround times, specialties",
      "- Dentists browse and select based on fit",
      "- Exclusive InterOral.ai discounts only available via platform",
      "- Revenue sharing and quality control supported",
    ],
  },
  {
    title: "ChatGPT Smart Assistant (Doctor-Facing)",
    subtitle: "Fills out the forms with you:",
    points: [
      "- Explains steps, suggests missing data, corrects formatting",
      "- Prevents common submission errors",
      "- Voice-assisted and visual input–ready",
    ],
  },
  {
    title: "Auto Routing + Payment Tracking",
    subtitle: "Routing AI — Built-In Continuity",
    points: [
      "Disruptions happen — hurricanes, fires, shipping delays, even power outages. Traditionally, that meant frustrated patients and costly remakes. With Routing AI, your cases are never stuck.",
      "If one lab is disrupted, your case is automatically rerouted to another qualified lab in your tier.",
      "Patients see on-time results, not excuses.",
      "Dentists gain peace of mind knowing that every case has a backup plan.",
      "Your patients don’t care what storm hit — they care that their crown or guide is ready. Routing AI makes sure it is.",
    ],
  },
  {
    title: "Make Me Smile™ Warranty Module",
    subtitle:
      "Patient enrollments are included directly from your case submission:",
    points: [
      "- 3, 6, or 9-year coverage available",
      "- Covers crowns, implants, and bridges",
      "- Provides peace of mind to patients and builds long-term practice revenue",
      "- Claim certificates and tracking integrated",
    ],
  },
];

export const warrantyCards = [
  {
    title: "WARRANTY DASHBOARD",
    subtitle: "PATIENT",
    img: "/assets/landing-page/card 2.png",
    points: [
      "Easy online activation",
      "Downloadable warranty certificate",
      "Direct access to our support team",
    ],
  },
  {
    title: "WARRANTY DASHBOARD",
    subtitle: "DOCTOR",
    img: "/assets/landing-page/card 1.png",
    points: [
      "Streamlined doctor registration",
      "Track patient warranty status",
      "Exclusive warranty benefits",
    ],
  },
];

export const implantCards = [
  {
    img: "/assets/landing-page/card 3.png",
    title: "Dentures",
    subtitle: "What Are Implant-Retained Dentures?",
    button: "Read More",
    href: "/blogs",
  },
  {
    img: "/assets/landing-page/card 5.png",
    title: "Dentures",
    subtitle: "What Are Implant-Retained Dentures?",
    button: "Read More",
    href: "/blogs",
  },
  {
    img: "/assets/landing-page/card 4.png",
    title: "Dentures",
    subtitle: "What Are Implant-Retained Dentures?",
    button: "Read More",
    href: "/blogs",
  },
];

export const steps = [
  {
    id: 1,
    title: "Register Your Warranty",
    description: [
      " Fill out your details and select your plan",
      "Add your dentist info (or we’ll help you find one)",
      "Secure payment activates your coverage",
    ],
  },
  {
    id: 2,
    title: "Submit a Claim if Needed",
    description: [
      "Download your form from the portal",
      "Work with your dentist to finalize details",
      "We’ll guide you step-by-step",
    ],
  },
  {
    id: 3,
    title: "You’re All Set!",
    description: [
      "Save your reference number",
      "Track your coverage through your dashboard",
    ],
  },
];

export const Doctorsteps = [
  {
    id: 1,
    title: "Choose a Plan",
    parag: "Select a subscription plan based on your needs:",
    description: [
      "Growth Plan – 3-month trial, allows up to 10 patients per month.",
      "Gold Plan – Treat up to 20 patients per month.",
      "platinum Plan – Manage unlimited patients per month.",
    ],
  },
  {
    id: 2,
    title: " Get Exclusive Benefits",
    description: [
      "Get Exclusive benefits and access to our AI modules.some availble now some still under construction.Temporize.ai MasterCrown.ai, S - Guide.ai, Bite.ai",
    ],
  },
  {
    id: 3,
    title: "Start Your Subscription",
    description: [
      "First register your office, one dr per subscription",
      "Begin managing your patients efficiently.",
      "Upgrade anytime as your practice grows.",
    ],
  },
];

export const concerns = [
  {
    title: "Chipped Crowns",
    subtitle: "Full remake included",
    description:
      "Crowns made of all porcelain can occasionally chip. If the chipping is extensive the crown may need to be replaced. We will re-make it at no charge.",
  },
  {
    title: "Loose Crowns",
    subtitle: "We'll adjust itc",
    description:
      "The crown naturally may become loose through wear and tear, when this open bacteria can seep in, causing decay and infection. If your crown feels loose, contact your dental office. We can replace it for free.",
  },
  {
    title: "Crown Displacement",
    subtitle: "Recement or remake",
    description:
      "If your crown or bridge is displaced, this may be due to an improper fit or lack of cement. If this happens, contact your doctor's office immediately. The restoration may need to be recemented or replaced.",
  },
  {
    title: "Allergic Reaction",
    subtitle: "Case by case support",
    description:
      "In the case of porcelain fused to metal crown or bridge, on rare occasions patients have had allergic reactions due to the fact that crown restorations are made using a mixture of metals reactions may occur, but extremely rare.",
  },
];

export const plans = [
  {
    id: 1,
    title: "3 year plan",

    price: "$99 ",
    description: [
      "Covers up to 10 Crowns, Bridges, or Veneers",
      "One-time enrollment",
      "Ideal for minor restorative work",
    ],
    buttonStyle:
      "border-blue-500 secondaryBrand hover:bg-blue-800 hover:text-white",
  },
  {
    id: 2,
    title: "6 year plan",

    price: "$199 ",
    description: [
      " Covers up to 20 Crowns, Bridges, or Veneers ",
      "One-time enrollment",
      "Great for full-arch or cosmetic work",
    ],
    buttonStyle: "bg-blue-900 text-white hover:bg-blue-700",
  },
  {
    id: 3,
    title: "9 year plan",

    price: "$299 ",
    description: [
      "we cover the crown over the implant, not the implant abutment or implant",
      "One-time enrollment",
      "Most comprehensive protection",
    ],
    buttonStyle:
      "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  },
];

export const plansmodel = [
  {
    id: 1,
    title: "Starter Plan",

    price: "$125 ",
    description: [
      " Covers up to 10 Crowns, Bridges, or Veneers",
      "One-time enrollment",
      "Ideal for minor restorative work",
    ],
    buttonStyle:
      "border-blue-500 secondaryBrand hover:bg-blue-800 hover:text-white",
  },
  {
    id: 2,
    title: "6 YEAR PLAN",

    price: "$199 ",
    description: [
      " Covers up to 20 Crowns, Bridges, or Veneers ",
      "One-time enrollment",
      "Great for full-arch or cosmetic work",
    ],
    buttonStyle: "bg-blue-900 text-white hover:bg-blue-700",
  },
  {
    id: 3,
    title: "6 YEAR PLAN",

    price: "$299 ",
    description: [
      "we cover the crown over the implant, not the implant abutment or implant",
      "One-time enrollment",
      "Most comprehensive protection",
    ],
    buttonStyle:
      "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  },
];
export const tabs = [
  {
    id: "all",
    label: "All Topics",
    cards: [
      {
        img: "/assets/landing-page/card 3.png",
        title: "Dentures",
        subtitle: "What Are Implant-Retained Dentures?",
        button: "Read More",
      },
      {
        img: "/assets/landing-page/card 5.png",
        title: "Implants",
        subtitle: "Benefits of Dental Implants",
        button: "Read More",
      },
      {
        img: "/assets/landing-page/card 4.png",
        title: "Surgery",
        subtitle: "What to Expect During Oral Surgery",
        button: "Read More",
      },
      {
        img: "/assets/landing-page/card 6.png",
        title: "Surgery",
        subtitle: "What to Expect During Oral Surgery",
        button: "Read More",
      },
      {
        img: "/assets/landing-page/card 7.png",
        title: "Surgery",
        subtitle: "What to Expect During Oral Surgery",
        button: "Read More",
      },
      {
        img: "/assets/landing-page/card 8.png",
        title: "Surgery",
        subtitle: "What to Expect During Oral Surgery",
        button: "Read More",
      },
      {
        img: "/assets/landing-page/card 6.png",
        title: "Surgery",
        subtitle: "What to Expect During Oral Surgery",
        button: "Read More",
      },
      {
        img: "/assets/landing-page/card 7.png",
        title: "Surgery",
        subtitle: "What to Expect During Oral Surgery",
        button: "Read More",
      },
      {
        img: "/assets/landing-page/card 8.png",
        title: "Surgery",
        subtitle: "What to Expect During Oral Surgery",
        button: "Read More",
      },
    ],
  },
  {
    id: "questions",
    label: "Questions",
    cards: [
      {
        img: "/assets/landing-page/card 3.png",

        title: "FAQs",
        subtitle: "Common Questions About Implants",
        button: "Read More",
      },
    ],
  },
  {
    id: "dental",
    label: "Dental Health",
    cards: [
      {
        img: "/assets/landing-page/card 5.png",
        title: "Dental Health",
        subtitle: "Tips for Better Oral Care",
        button: "Read More",
      },
    ],
  },
  {
    id: "surgery",
    label: "Surgery Instructions",
    cards: [
      {
        img: "/assets/landing-page/card 4.png",
        title: "Oral Surgery",
        subtitle: "Post-Operation Care",
        button: "Read More",
      },
    ],
  },
  {
    id: "Oral Surgery",
    label: "Oral Surgery",
    cards: [
      {
        img: "/assets/landing-page/card 3.png",

        title: "FAQs",
        subtitle: "Common Questions About Implants",
        button: "Read More",
      },
    ],
  },
];

export const insideContent = [
  {
    id: 1,
    title: "Bionic",
    description: `3D Pro Zir Is Developed By Aidite Technology And Peking  University School Of Stomatology. The Material Comes Closer To
                  Natural Teeth. Not Only From The Esthetic Point Of View, Also
                  Its Abrasion Characteristics Makes It To A Dental Material
                  With Biomimetic Properties.`,
  },
  {
    id: 2,
    title: " High Strength",
    description: `  The Flexural Strength Of 3D Pro Zir Is Up To 1100 MPa Which Is
                  Greatly Improved. Long Span Bridges Are Stable And Fully Meet
                  The Strength Requirements Of Laboratories For A Broad Range Of
                  Indications.`,
  },
  {
    id: 3,
    title: " Layerless Natural Transition",
    description: `  Matching The Color Transition Of Natural Teeth From Cervical
                  To Incisal, 3D Pro Zir Has A Smooth Color Gradient Without
                  Visible Layer.`,
  },
];

export const shadesProductMultiPro = [
  { label: "A1", color: "#EFEAD4" },
  { label: "A2", color: "#ECE8D0" },
  { label: "A3", color: "#D2C89B" },
  { label: "A3.5", color: "#E4DDC3" },
  { label: "A4", color: "#E0D7B5" },
  { label: "B1", color: "#EFEAD4" },
  { label: "B2", color: "#EAE3C6" },
  { label: "B3", color: "#E0D7B3" },
  { label: "B4", color: "#E0D7B5" },

  { label: "C1", color: "#E4DDC3" },
  { label: "C2", color: "#E0D7B5" },
  { label: "C3", color: "#E4DBC2" },
  { label: "C4", color: "#D2C89B" },

  { label: "D2", color: "#D2C89B" },
  { label: "D3", color: "#D0C2A2" },
  { label: "D4", color: "#D0C2A2" },
  { label: "BL1", color: "#EFEAD4" },
  { label: "BL2", color: "#ECE8D0" },

  { label: "OM1", color: "#FFFFFF" },
  { label: "OM2", color: "#FFFFFF" },
  { label: "OM3", color: "#FFFFFF" },
  { label: "Hollywood White", color: "#F1EBE4" },
];

export const accordionData = [
  {
    title: "How do you generate $5 leads?",
    description:
      "Files must be submitted by 3:00 p.m. PST. Units will be received within 2 business days.",
  },
  {
    title: "How quickly can I see results?",
    description: [
      "Wall Thickness: <b>0.80 mm minimum</b>",
      "Margin Thickness: <b>0.10 mm</b>",
      "Margin Angle: <b>90° degrees</b>",
      "Note: If walls/margins are too thin, failures may occur during the build process (i.e. cracks, holes).",
    ],
  },
  {
    title: "What’s included in your service?",
    description: [
      "Wall Thickness: <b>0.80 mm minimum</b>",
      "Margin Thickness: <b>0.10 mm</b>",
      "Margin Angle: <b>90° degrees</b>",
      "Note: If walls/margins are too thin, failures may occur during the build process (i.e. cracks, holes).",
    ],
  },
  {
    title: "How do you ensure the leads are qualified?",
    description: [
      "Wall Thickness: <b>0.80 mm minimum</b>",
      "Margin Thickness: <b>0.10 mm</b>",
      "Margin Angle: <b>90° degrees</b>",
      "Note: If walls/margins are too thin, failures may occur during the build process (i.e. cracks, holes).",
    ],
  },
  {
    title: "Can this system work for my specific market?",
    description: [
      "Wall Thickness: <b>0.80 mm minimum</b>",
      "Margin Thickness: <b>0.10 mm</b>",
      "Margin Angle: <b>90° degrees</b>",
      "Note: If walls/margins are too thin, failures may occur during the build process (i.e. cracks, holes).",
    ],
  },
];

export const teethOption = [
  { id: 1, title: "Inlay/Onlay", img: "/assets/landing-page/1.png" },
  { id: 2, title: "Veneer", img: "/assets/landing-page/2.png" },
  { id: 3, title: "Anterior full crown", img: "/assets/landing-page/3.png" },
  {
    id: 4,
    title: "Anterior full crown bridge",
    img: "/assets/landing-page/4.png",
  },
  { id: 5, title: "Screw-retained bridge", img: "/assets/landing-page/5.png" },
  { id: 6, title: "Posterior full crown", img: "/assets/landing-page/6.png" },
  {
    id: 7,
    title: "Posterior full crown bridge",
    img: "/assets/landing-page/7.png",
  },
];

export const settingsOption = [
  {
    title: "CUT-OFF TIME",
    description: `Files must be submitted by 3:00 P.M. PST (6:00 P.M. EST).
       Milled PMMA units will be received within 2 business days`,
  },
  {
    title: "DESIGN",
    description: [
      "Wall Thickness: ......................... 0.80 mm minimum",
      "Margin Thickness: .................. 0.10 mm",
      "Margin Angle: ......................... 90° degrees",
      "Note: If Walls/Margins Are Too Thin, Failures May Occur During The Build Process (i.e. Cracks, Holes).",
    ],
  },
  {
    title: "FIT SETTINGS",
    description: [
      'Drill Compensation should be checked "ON"',
      "Drill Compensation Offset: ....... 0.6 mm",
      "Drill Radius: .................................... 0.5 mm",
      "Cement Gap: ................................. 0.05 mm (near margin)",
      "Extra Cement Gap: .................................  0.06 mm (die spacer)",
      "Distance to Margin: .................................  1.0 mm",
      "Note: Cement Gap Settings Are Adjustable. Increase Values To Give a Looser Fit, Decrease Values To Get a Tighter Fit.",
    ],
  },
  {
    title: "Digital Product",
    description: ["Milled PMMA"],
  },
  {
    title: "# of Units",
    description: ["Single up to 14 units"],
  },
];

export const productsOption = [
  {
    id: 1,
    title: "ARGEN PMMA",
    description:
      "Argen PMMA offers high quality, life-like temporary material in a wide selection of monochromatic and multilayer discs.",
    image: "/assets/landing-page/product1.png",
    nav: "/product/argen-pmma",
  },
  {
    id: 2,
    title: "ARGEN Z HT+",
    description:
      "ArgenZ HT+ Zirconia offers extremely accurate, life-like restorations with 4-5% more translucency and 100-150 MPa higher strength over traditional HT zirconia. Available for milling in high definition by Argen. TRANSLUCENCY STRENGTH.",
    image: "/assets/landing-page/product2.png",
    nav: "/product/argen-zh",
  },
  {
    id: 3,
    title: "ARGEN Z ST MULTILAYER",
    description:
      "ArgenZ ST Multilayer Zirconia features proprietary layer blending technology for natural shade transition. Suitable for single units anywhere in the mouth and up to three unit anterior bridges.",
    image: "/assets/landing-page/product3.png",
    nav: "/product/argenz-st",
  },
  {
    id: 4,
    title: "ZirCad Ivoclar",

    description:
      "IPS e.max ZirCAD provides a versatile range of zirconium oxide materials for labside CAD/CAM applications. It is used for the fabrication of frameworks and full-contour crowns and bridges. High strength, thin wall thickness and high esthetics are among its hallmarks. IPS e.max ZirCAD Prime is redefining all-ceramics. This revolutionary material is characterized by exceptional quality and ",
    readMoreLink: "/zircad-details",
    image: "/assets/landing-page/product4.png",
    nav: "/product/zidcard-ivoclar",
  },
  {
    id: 5,
    title: "Multilayer 4D pro",
    description: `
Our advanced 4D Pro Zirconia disc features an unparalleled four - dimensional gradient that seamlessly integrates color, translucency, strength, and hardness, making it an optimal choice for any dental laboratory.
4D Pro Zirconia not only elevates the quality of all - ceramic dentures but also ensures a streamlined, efficient, and precise workflow for dental professionals.
`,

    image: "/assets/landing-page/product5.png",
    nav: "/product/multilayer-pro",
  },
  {
    id: 6,
    title: "LayZir",
    description: `LayZir All Indication Zirconia Disc by SMART DENTISTRY SOLUTIONS – FDA Cleared, Aesthetic Like Lithium Disilicate, Minimal Sintering Distortion, Excellent Millability, and Advanced 3Y / 5Y Blending Technology.`,

    image: "/assets/landing-page/product6.png",
    nav: "/product/lay-zir",
  },
  {
    id: 7,
    title: "Aidite zirconia",
    description: `3D Pro zir is fabricated with the most advanced production processes at Aidite, producing a layerless, natural shade gradient, with optimal strengthand translucency, transitioning from Cervical to Incisal areas of the restoration. 

With a maximum flexural strength of 1100 MPa, 3D Pro zirensures aesthetic results while being suitable for all indications from single crowns to 14 - unitbridge structures.`,

    image: "/assets/landing-page/product7.png",
    multiline: true,
    nav: "/product/aidite-zirconia",
  },
];

// Admin Panel Subscriptions

export const headingsSubscriptions = [
  { label: "Sub ID", key: "subId" },
  { label: "Customer Name", key: "name" },
  { label: "Date", key: "date" },
  { label: "Subscription Plan", key: "subscriptionPlan" },
  { label: "Total price", key: "totalPrice" },
  { label: "Status", key: "status" },
  { label: "", key: "action" },
];

export const dataSubscriptions = [
  {
    subId: "1235",
    name: "John Doe",
    date: "Jan 15,2025",
    subscriptionPlan: "silver",
    totalPrice: "$100",
    status: "active",
    detailUrl: "/admin-panel/order-detail",
    action: "View Detail",
  },
  {
    subId: "1235",
    name: "John Doe",
    date: "Jan 15,2025",
    subscriptionPlan: "gold",
    totalPrice: "$100",
    status: "active",
    detailUrl: "/admin-panel/order-detail",
    action: "View Detail",
  },
  {
    subId: "1235",
    name: "John Doe",
    date: "Jan 15,2025",
    subscriptionPlan: "platinum",
    totalPrice: "free trial",
    status: "active",
    detailUrl: "/admin-panel/order-detail",
    action: "View Detail",
  },
];

export const pamentDetailList = [
  { title: "account holder name", name: "Kindie Jhancy" },
  { title: "bank name", name: "allied bank" },
  { title: "swipe code", name: "qe0ssp3" },
  { title: "IBAN", name: "8476529761391" },
];

//
export const dropDownOpts = ["FILA", "Transi", "Dentyalo", "Dine"];

//Admin-Panel Claim Req

export const headingsAdminPanelClaimReq = [
  { label: "Claim ID", key: "id" },
  { label: "Patient Name", key: "patientName" },
  { label: "Doctor Name", key: "doctorName" },
  { label: "Status", key: "status" },
  { label: "Submission Date", key: "submissionDate" },

  { label: "Action", key: "action" },
];

export const dataClaimreqAdminPanel = [
  {
    id: "#1235",
    patientName: "Mani Jhon",
    doctorName: "John Doe",
    status: "accepted",
    submissionDate: "17/22/2026",
    action: "View Detail",

    // detailUrl: "/admin-panel/claim-detail-form",
  },
  {
    id: "#1235",
    patientName: "Mani Jhon",
    doctorName: "John Doe",
    status: "pending",
    submissionDate: "17/22/2026",
    action: "View Detail",

    // detailUrl: "/admin-panel/order-detail",
  },
];

export const doctorClaimReqData = [
  { key: "Patient name", data: "vagra Dora" },
  { key: "Patient Email Address", data: "VargaDóra123@gmail.com" },

  { key: "Product name", data: "Dental Crown" },
  { key: "Quantity", data: "2" },
  { key: "Purchase Date", data: "10 March,2025" },
  { key: "Claim Submitted On", data: "12 Mar 2025" },
  { key: "Claim Reason", data: "Defective product" },
];

export const dentalDropDownOpts = ["1", "2", "3", "Dine"];
