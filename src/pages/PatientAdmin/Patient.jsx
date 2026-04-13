import { Route, Routes } from "react-router-dom";
import PatientDashboardPage from "../PatientAdmin/PatientDashboard";
import ProfileSettings from "../PatientAdmin/ProfileSettings";

const PatientAdmin = () => {

 


    return (
        <div>
            <Routes>
                <Route path="/dashboard" element={<PatientDashboardPage />} />
                {/* <Route path="/claim-request" element={<PatientClaimrequests />} /> */}
                {/* <Route path="/claim-request/:name" element={<PatientForm />} /> */}
                <Route path="/profile-settings" element={<ProfileSettings />} />
                {/* <Route path="/claim-request/:slug" element={<PatientForm />} /> */}
                {/* <Route path="/term-condition" element={<PatientTermCondition />} /> */}
            </Routes>
        </div>
    );
};

export default PatientAdmin;
