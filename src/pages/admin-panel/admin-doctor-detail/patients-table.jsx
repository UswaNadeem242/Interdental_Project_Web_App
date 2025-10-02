import React from "react";
import SecondTable from "../../../Common/second-table-component";
import { dataDoctors, headingsAdminPanelTable } from "../../../Constant";
import { useState } from "react";
import { useMemo } from "react";

function PatientsTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filteredData = useMemo(() => {
    let filtered = dataDoctors;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
    }
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = Object.values(a)[0]?.toString().toLowerCase() || "";
        const bVal = Object.values(b)[0]?.toString().toLowerCase() || "";

        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }
    return filtered;
  }, [searchQuery, sortOrder]);

  return (
    <div>
      <SecondTable
        headings={headingsAdminPanelTable}
        data={filteredData}
        actionButton="active"
      />
    </div>
  );
}

export default PatientsTable;
