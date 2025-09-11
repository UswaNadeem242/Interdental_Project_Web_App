// hooks/usePageTitle.js
import { useLocation } from "react-router-dom";

export default function usePageTitle() {
    const location = useLocation();

    const titles = {
        "/place-order": "Place Order",
        "/in-progress": "In Progress",
        "/shipped": "Shipped",
        "/delivered": "Delivered",
    };

    // get only the last segment of the path
    const lastSegment = location.pathname.split("/").filter(Boolean).pop();

    // format string → handle camelCase + kebab-case
    const formatPath = (segment) =>
        segment
            .replace(/([a-z])([A-Z])/g, "$1 $2") // split camelCase (patientDoctor → patient Doctor)
            .replace(/-/g, " ")                  // replace dashes
            .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize

    return titles[location.pathname] || formatPath(lastSegment || "Page");
}
