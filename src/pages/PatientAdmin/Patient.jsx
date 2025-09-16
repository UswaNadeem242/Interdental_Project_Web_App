import { Route, Routes } from "react-router-dom";
import PatientDashboardPage from "../PatientAdmin/PatientDashboard";
import PatientClaimrequests from "../PatientAdmin/ClaimRequest";
import ProfileSettings from "../PatientAdmin/ProfileSettings";
import { PatientForm } from "./PatientForm";
import PatientTermCondition from "./TermCondition";

const PatientAdmin = () => {
    return (
        <div>
            <Routes>
                <Route path="/Patient-dashboard" element={<PatientDashboardPage />} />
                <Route path="/PatientClaim-Requests" element={<PatientClaimrequests />} />
                <Route path="/Profile-Settings" element={<ProfileSettings />} />
                <Route path="/Patient-Form" element={<PatientForm />} />
                <Route path="/Term-Condition" element={<PatientTermCondition />} />

            </Routes>
        </div>
    );
};

export default PatientAdmin;
