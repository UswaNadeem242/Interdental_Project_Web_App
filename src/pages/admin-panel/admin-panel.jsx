import { Route, Routes } from "react-router-dom";
import AdminPanelDashboard from "./admin-dashbaord";



const AdminPanel = () => {
    return (
        <div className="">
            <Routes>
                <Route path="/dashboard" element={<AdminPanelDashboard />} />
                {/* // <Route path="/patient" element={<PatientPage />} />
        // <Route path="/claim-request" element={<ClaimRequest />} />
        // <Route path="/orders-details" element={<DoctorOrder />} />
        // <Route path="/profile" element={<DoctorProfile />} />
        // <Route path="/orders" element={<OrderDoctorPage />} />
        // <Route path="/details" element={<DoctorDeailsPage />} />  */}


            </Routes>
        </div>
    );
};

export default AdminPanel;
