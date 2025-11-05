import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config";
import Stepper from "../../../Common/TabsStepper/Stepper";
import SubscriptionForm from "./subscription-form";
import BasicInfo from "./basic-info";
import AccountDetailForm from "./account-detail-form";
import PatientsTable from "./patients-table";

const AdminPanelDoctorDetail = () => {
  const { id } = useParams();
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch doctor data
  const fetchDoctorData = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/getById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDoctorData(response.data?.data || response.data);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDoctorData();
  }, [fetchDoctorData]);

  const stepss = [
    {
      name: "Basic Info",
      content: <BasicInfo doctorData={doctorData} />,
    },
    {
      name: "Patients",
      content: <PatientsTable doctorId={id} />,
    },
  ];

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondaryBrand"></div>
        </div>
      </div>
    );
  }

  if (!doctorData) {
    return (
      <div className="p-4">
        <div className="text-center py-8">Doctor not found</div>
      </div>
    );
  }

  const fullName = `${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim() || "N/A";
  const profileImage = doctorData.profileURL || doctorData.image || "/assets/user.png";
  const email = doctorData.email || "N/A";
  const status = doctorData.status?.toLowerCase() || "inactive";
  const buttonText = status === "active" ? "Deactivate Account" : "Activate Account";

  // Calculate patient count for subscription
  const patientCount = doctorData.patientCount || 0;
  const maxPatients = doctorData.maxPatients || 20;
  const patientPercentage = maxPatients > 0 ? Math.round((patientCount / maxPatients) * 100) : 0;

  return (
    <div className="p-4">
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 bg-bgWhite rounded-2xl">
        <div className="bg-bgWhite px-6 py-5 font-poppins md:col-span-4 col-span-1 rounded-2xl">
          <AccountDetailForm
            name={fullName}
            icon={profileImage}
            email={email}
            buttonText={buttonText}
          />
        </div>

        <div className="bg-bgWhite p-6 font-poppins md:col-span-8 col-span-1 rounded-2xl">
          <SubscriptionForm
            title="Subscription Plan"
            para={doctorData.subscriptionExpiryDate 
              ? `Will be expired on ${new Date(doctorData.subscriptionExpiryDate).toLocaleDateString()}`
              : "No expiration date"}
            text="Number of patients"
            number={`${patientCount}/${maxPatients}`}
            percentage={patientPercentage}
          />
        </div>
      </div>

      <div className="md:col-span-8 col-span-1 bg-bgWhite rounded-2xl mt-5">
        <div className="py-6 px-2">
          <Stepper
            steps={stepss}
            className="md:w-1/3 mb-4 bg-[#F8F8F8] border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelDoctorDetail;
