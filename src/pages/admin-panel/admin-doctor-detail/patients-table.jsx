import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../../config";
import MainTable from "../../../Common/MainTable";

function PatientsTable({ doctorId }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch patients for this doctor
  const fetchPatients = useCallback(async (page = 1, sort = "desc") => {
    if (!doctorId) return;

    setLoading(true);
    try {
      const sortParam = sort === "asc" ? "createdDateAsc" : "createdDateDesc";
      
      const response = await axios.get(
        `${BASE_URL}/api/users/getPatientByDoctor`,
        {
          params: {
            page: page - 1, // Backend uses 0-based indexing
            size: 10,
            status: "ALL",
            search: "",
            sort: sortParam,
            doctorId: doctorId, // Include doctor ID to filter patients
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const responseData = response?.data?.data || response?.data;
      const content = responseData?.data || [];
      const totalRecord = responseData?.totalRecord || 0;
      const totalPagesCount = responseData?.page || 0;

      setPatients(content);
      setTotalPages(totalPagesCount);
      setTotalRecords(totalRecord);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setPatients([]);
      setTotalPages(0);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  useEffect(() => {
    fetchPatients(currentPage, sortOrder);
  }, [currentPage, sortOrder, fetchPatients]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Define columns for patients table
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value, item) => {
        const fullName = `${item.firstName || ""} ${item.lastName || ""}`.trim() || value || "-";
        return (
          <div className="flex items-center gap-2">
            <img
              src={item.profileURL || item.image || "/assets/user.png"}
              alt={fullName}
              className="w-9 h-9 rounded-full object-cover border border-[#285772]"
            />
            <span className="font-semibold">{fullName}</span>
          </div>
        );
      },
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
    },
    {
      key: "address",
      label: "Address",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => {
        const statusConfig = {
          active: {
            className: "bg-[#4ECC530D] text-[#4ECC53]",
          },
          inactive: {
            className: "bg-[#FFE30D1A] text-[#D4BE16] rounded-none",
          },
          pending: {
            className: "bg-[#FF57570D] text-[#FF5757]",
          },
        };

        const statusLower = value?.toLowerCase() || "";
        const config = statusConfig[statusLower] || statusConfig.pending;

        return (
          <span
            className={`px-3 py-2 rounded-full text-xs font-normal capitalize ${config.className}`}
          >
            {value || "-"}
          </span>
        );
      },
    },
  ];

  return (
    <div className="py-6 px-6">
      <MainTable
        columns={columns}
        data={patients}
        loading={loading}
        useBackendPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalRecords}
        pageSize={10}
        onPageChange={handlePageChange}
        showSearch={false}
        tabs={[]}
      />
    </div>
  );
}

export default PatientsTable;
