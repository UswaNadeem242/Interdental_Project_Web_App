import { Route, Routes } from "react-router-dom";
import PatientDashboardPage from "../PatientAdmin/PatientDashboard";
import PatientClaimrequests from "../PatientAdmin/ClaimRequest";
import ProfileSettings from "../PatientAdmin/ProfileSettings";
 
const PatientAdmin = () => {
    return (
        <div>
            <Routes>
                <Route path="/Patient-dashboard" element={<PatientDashboardPage />} />
                <Route path="/PatientClaim-Requests" element={<PatientClaimrequests />} />
                <Route path="/Profile-Settings" element={<ProfileSettings />} />

            </Routes>
        </div>
    );
};

export default PatientAdmin;
