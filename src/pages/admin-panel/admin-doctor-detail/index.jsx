import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/toast-slice";
import Stepper from "../../../Common/TabsStepper/Stepper";
import SubscriptionForm from "./subscription-form";
import BasicInfo from "./basic-info";
import AccountDetailForm from "./account-detail-form";
import PatientsTable from "./patients-table";
import AreYouSureModel from "../../../modals/AreYouSureModel";

const AdminPanelDoctorDetail = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);

  // Fetch doctor data - only fetch when id changes
  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchDoctorData = async () => {
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
        if (isMounted) {
          setDoctorData(response.data?.data || response.data);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        if (isMounted) {
          setDoctorData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDoctorData();

    return () => {
      isMounted = false;
    };
  }, [id]); // Only fetch when id changes

  // Fetch patients for this doctor - only fetch when id, page, or sortOrder changes
  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchPatients = async () => {
      setPatientsLoading(true);
      try {
        const sortParam =
          sortOrder === "asc" ? "createdDateAsc" : "createdDateDesc";

        const response = await axios.get(
          `${BASE_URL}/api/users/getPatientByDoctor`,
          {
            params: {
              page: currentPage - 1, // Backend uses 0-based indexing
              size: 10,
              status: "ALL",
              search: "",
              sort: sortParam,
              doctorId: id, // Include doctor ID to filter patients
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (isMounted) {
          const responseData = response?.data?.data || response?.data;
          const content = responseData?.data || [];
          const totalRecord = responseData?.totalRecord || 0;
          const totalPagesCount = responseData?.page || 0;

          setPatients(content);
          setTotalPages(totalPagesCount);
          setTotalPatients(totalRecord);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        if (isMounted) {
          setPatients([]);
          setTotalPages(0);
          setTotalPatients(0);
        }
      } finally {
        if (isMounted) {
          setPatientsLoading(false);
        }
      }
    };

    fetchPatients();

    return () => {
      isMounted = false;
    };
  }, [id, currentPage, sortOrder]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Handle status change button click - open modal
  const handleStatusButtonClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Handle status change (activate/deactivate)
  const handleStatusChange = useCallback(async () => {
    if (!doctorData || !id || statusChanging) return;

    setStatusChanging(true);
    setIsModalOpen(false);

    try {
      // Determine new status: if active, deactivate (false), if inactive/deactivated, activate (true)
      const isActive = doctorData.status?.toLowerCase() === "active";
      const newStatus = !isActive; // true to activate, false to deactivate

      const response = await axios.put(
        `${BASE_URL}/api/admin/users/changeuserstatus`,
        {
          userId: doctorData.id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.data?.success) {
        dispatch(
          showToast({
            message: `Doctor account ${
              newStatus ? "activated" : "deactivated"
            } successfully`,
            type: "success",
          })
        );

        // Refetch doctor data to show updated status
        try {
          const doctorResponse = await axios.get(
            `${BASE_URL}/api/users/getById/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setDoctorData(doctorResponse.data?.data || doctorResponse.data);
        } catch (error) {
          console.error("Error refetching doctor data:", error);
        }
      } else {
        throw new Error("Failed to change status");
      }
    } catch (error) {
      console.error("Error changing user status:", error);
      dispatch(
        showToast({
          message:
            error.response?.data?.message || "Failed to change account status",
          type: "error",
        })
      );
    } finally {
      setStatusChanging(false);
    }
  }, [doctorData, id, statusChanging, dispatch]);

  // Memoize steps to prevent unnecessary re-renders
  const stepss = useMemo(
    () => [
      {
        name: "Basic Info",
        content: <BasicInfo doctorData={doctorData} />,
      },
      {
        name: "Patients",
        content: (
          <PatientsTable
            patients={patients}
            loading={patientsLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalPatients}
            onPageChange={handlePageChange}
          />
        ),
      },
    ],
    [
      doctorData,
      patients,
      patientsLoading,
      currentPage,
      totalPages,
      totalPatients,
      handlePageChange,
    ]
  );

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

  const fullName =
    `${doctorData.firstName || ""} ${doctorData.lastName || ""}`.trim() ||
    "N/A";
  const profileImage = doctorData.profileImage || "/assets/user.png";
  const email = doctorData.email || "N/A";
  const status = doctorData.status?.toLowerCase() || "inactive";
  const buttonText =
    status === "active" ? "Deactivate Account" : "Activate Account";

  // Calculate patient count for subscription using totalPatients from API
  const patientCount = totalPatients || 0;
  const maxPatients = doctorData.maxPatients || 20;
  const patientPercentage =
    maxPatients > 0 ? Math.round((patientCount / maxPatients) * 100) : 0;

  return (
    <div className="p-4">
      <div className="grid md:grid-cols-12 rounded-2xl bg-white p-4 grid-cols-1 gap-4">
        <div className="font-poppins md:col-span-4 col-span-1">
          <AccountDetailForm
            name={fullName}
            icon={profileImage}
            email={email}
            buttonText={buttonText}
            onButtonClick={handleStatusButtonClick}
            isLoading={statusChanging}
            isActive={status === "active"}
            // bg="bg-bgWhite"
          />
        </div>

        <div className="font-poppins md:col-span-8 col-span-1 block">
          <SubscriptionForm
            title="Subscription Plan"
            para={
              doctorData.subscriptionExpiryDate
                ? `Will be expired on ${new Date(
                    doctorData.subscriptionExpiryDate
                  ).toLocaleDateString()}`
                : "No expiration date"
            }
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

      {/* Status Change Confirmation Modal */}
      {isModalOpen && (
        <AreYouSureModel
          isLoading={statusChanging}
          title={
            status === "active" ? "Deactivate Account?" : "Activate Account?"
          }
          desc={
            status === "active"
              ? "Are you sure you want to deactivate this doctor's account? They will not be able to access their account after deactivation."
              : "Are you sure you want to activate this doctor's account? They will be able to access their account after activation."
          }
          handleUpdateStatus={handleStatusChange}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default AdminPanelDoctorDetail;
