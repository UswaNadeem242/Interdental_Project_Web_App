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
  { to: "/product", label: "Our Products" },
  { to: "/shop", label: "Shop" },
  
  { to: "/patient", label: "Patient" },
  { to: "/doctor", label: "Doctor" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
];

export const productsOption = [
  {
    id: 1,
    title: "ARGEN PMMA",
    description:
      "Argen PMMA offers high quality, life-like temporary material in a wide selection of monochromatic and multilayer discs.",
    image: "/assets/landing-page/product1.png",
    nav: '/product/argen-pmma'
  },
  {
    id: 2,
    title: "ARGEN Z HT+",
    description:
      "ArgenZ HT+ Zirconia offers extremely accurate, life-like restorations with 4-5% more translucency and 100-150 MPa higher strength over traditional HT zirconia. Available for milling in high definition by Argen. TRANSLUCENCY STRENGTH.",
    image: "/assets/landing-page/product2.png",
    nav: '/product/argen-zh'
  },
  {
    id: 3,
    title: "ARGEN Z ST M",
    description:
      "Argen Z ST Multilayer Zirconia features proprietary layer shading technology for natural transitions from dentin to enamel. Available for milling in high definition by Argen to ensure ultra-reliable designs.",
    image: "/assets/landing-page/product3.png",
    nav: '/product'
  },
  {
    id: 4,
    title: "ZirCad Ivoclar",
    description:
      "IPS e.max ZirCAD provides a versatile range of zirconium oxide materials for labside CAD/CAM applications. It is used for the fabrication of frameworks and full-contour crowns and bridges. High strength, thin wall thickness and high esthetics are among its hallmarks. IPS e.max ZirCAD Prime is redefining all-ceramics. This revolutionary material is characterized by exceptional quality and",
    image: "/assets/landing-page/product4.png",
    nav: '/product'
  },
  {
    id: 5,
    title: "Multilayer 4D pro",
    description: `
Our advanced 4D Pro Zirconia disc features an unparalleled four-dimensional gradient that seamlessly integrates color, translucency, strength, and hardness, making it an optimal choice for any dental laboratory.
4D Pro Zirconia not only elevates the quality of all-ceramic dentures but also ensures a streamlined, efficient, and precise workflow for dental professionals.
`,

    image: "/assets/landing-page/product5.png",
    nav: '/product/argen-pmma'
  },
  {
    id: 6,
    title: "LayZir",
    description: `LayZir All Indication Zirconia Disc by SMART DENTISTRY SOLUTIONS – FDA Cleared, Aesthetic Like Lithium Disilicate, Minimal Sintering Distortion, Excellent Millability, and Advanced 3Y/5Y Blending Technology.`,

    image: "/assets/landing-page/product6.png",
    nav: '/product'
  },
  {
    id: 7,
    title: "Aidite zirconia",
    description: `3D Pro zir is fabricated with the most advanced production processes at Aidite, producing a layerless,natural shade gradient, with optimal strengthand translucency, transitioning from Cervical to Incisal areas of the restoration. 

With a maximum flexural strength of 1100 MPa, 3D Pro zirensures aesthetic results while being suitable for all indications from single crowns to 14- unitbridge structures.`,

    image: "/assets/landing-page/product7.png",
    multiline: true,
    nav: '/product'
  },
];






export const teethOption = [
  { id: 1, title: 'Inlay/Onlay', img: '/assets/landing-page/1.png' },
  { id: 2, title: 'Veneer', img: '/assets/landing-page/2.png' },
  { id: 3, title: 'Anterior full crown', img: '/assets/landing-page/3.png' },
  { id: 4, title: 'Anterior full crown bridge', img: '/assets/landing-page/4.png' },
  { id: 5, title: 'Screw-retained bridge', img: '/assets/landing-page/5.png' },
  { id: 6, title: 'Posterior full crown', img: '/assets/landing-page/6.png' },
  {
    id: 7, title: 'Posterior full crown bridge', img: '/assets/landing-page/7.png'
  },
]


export const settingsOption = [
  {
    title: "CUT-OFF TIME",
    description:
      "Files must be submitted by 3:00 p.m. PST (6:00 p.m. EST). Milled PMMA units will be received within 2 business days.",
  },
  {
    title: "DESIGN",
    description: [
      "Wall Thickness: ......................... 0.80 mm minimum",
      "Margin Thickness: .................. 0.10 mm",
      "Margin Angle: ......................... 90° degrees",
      "Note: If walls/margins are too thin, failures may occur during the build process (i.e. cracks, holes).",
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
      'Note: Cement gap settings are adjustable. Increase values to give a looser fit, decrease values to get a tighter fit.'

    ],
  },
  {
    title: "Digital Product",
    description:
      ["Milled PMMA"],
  },
  {
    title: "# of Units",
    description:
      ["Single up to 14 units"],
  },
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

export const shadesproduct = [{ label: "A1", color: "#EFEAD4" },
{ label: "A2", color: "#ECE8D0" },
{ label: "A3.5", color: "#E4DBC2" },
{ label: "A4", color: "#E4DDC3" },
{ label: "B1", color: "#D2C89B" },
{ label: "B2", color: "#EFEAD4" },

{ label: "C1", color: "#E0D7B5" },
{ label: "C2", color: "#E4DDC3" },
{ label: "C3", color: "#E0D7B5" },
{ label: "C4", color: "#E4DBC2" },

{ label: "D2", color: "#DDD4B5" },
{ label: "D3", color: "#D0C2A2" },
{ label: "D4", color: "#D0C2A2" },
]

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



export const newDiameters = ["98mm"]
export const newThicknesses = ["12mm",
  "14mm",
  "16mm",
  "20mm", "25mm",
  "30mm",]