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
                <Route path="/dashboard" element={<PatientDashboardPage />} />
                <Route path="/claim-request" element={<PatientClaimrequests />} />
                <Route path="/claim-request/:name" element={<PatientForm />} />

                <Route path="/profile-settings" element={<ProfileSettings />} />
                <Route path="/claim-request/:slug" element={<PatientForm />} />
                <Route path="/term-condition" element={<PatientTermCondition />} />
            </Routes>
        </div>
    );
};

export default PatientAdmin;
