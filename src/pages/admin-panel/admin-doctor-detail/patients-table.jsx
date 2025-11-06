import React from "react";
import MainTable from "../../../Common/MainTable";

function PatientsTable({
  patients = [],
  loading = false,
  currentPage = 1,
  totalPages = 0,
  totalRecords = 0,
  onPageChange,
}) {
  console.log("Patients", patients);

  // Define columns for patients table
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value, item) => {
        const fullName =
          `${item.firstName || ""} ${item.lastName || ""}`.trim() ||
          value ||
          "-";
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
        onPageChange={onPageChange}
        showSearch={false}
        tabs={[]}
      />
    </div>
  );
}

export default PatientsTable;
