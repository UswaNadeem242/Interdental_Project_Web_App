// hooks/usePageTitle.js
import { useLocation } from "react-router-dom";

export default function usePageTitle() {
  const location = useLocation();

  const titles = {
    "/place-order": "Place Order",
    "/in-progress": "In Progress",
    "/shipped": "Shipped",
    "/delivered": "Delivered",
    "/doctor-admin/order-details": "Order Details",
  };

  // Check for exact path match first
  if (titles[location.pathname]) {
    return titles[location.pathname];
  }

  // Handle dynamic routes (e.g., /order-details/6)
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Check if path contains order-details with an ID
  if (pathSegments.includes("order-details") && pathSegments.length > 1) {
    return "Order Details";
  }

  // Check for other dynamic routes
  if (pathSegments.includes("patient-doctor")) {
    return "Patient Doctor";
  }

  // get only the last segment of the path for other cases
  const lastSegment = pathSegments.pop();

  // format string → handle camelCase + kebab-case
  const formatPath = (segment) =>
    segment
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  return formatPath(lastSegment || "Page");
}
