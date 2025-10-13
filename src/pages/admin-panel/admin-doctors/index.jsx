import React, { useMemo, useState } from "react";
import { PrimaryButtonUI } from "../../../Common/Button";
import TableComponent from "../../../Common/Table";
import {
  dataDoctors,
  headings,
  headingsAdminPanelTable,
} from "../../../Constant";

import SearchBar from "../../../Common/SearchBar";
import TabsStepper from "../../../Common/TabsStepper";
import SecondTable from "../../../Common/second-table-component";
import OptionsDots from "../../../icon/options-dots";

const DoctorsAdminPanel = () => {
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
  const steps = [
    {
      name: "All",
      content: (
        <SecondTable
          headings={headingsAdminPanelTable}
          data={filteredData}
          actionButton="active"
        />
      ),
    },
    {
      name: "New",
      content: (
        <SecondTable
          headings={headingsAdminPanelTable}
          data={filteredData}
          actionButton="active"
        />
      ),
    },
    {
      name: "Disabled",
      content: (
        <SecondTable
          headings={headingsAdminPanelTable}
          data={filteredData}
          actionButton="active"
        />
      ),
    },
    {
      name: "Deactivated",
      content: (
        <SecondTable
          headings={headingsAdminPanelTable}
          data={filteredData}
          actionButton="active"
        />
      ),
    },
    // {
    //   name: "completed",
    //   content: (
    //     <TableComponent
    //       headings={headings}
    //       data={filteredData}
    //       actionHrefKey="detailUrl"
    //     />
    //   ),
    // },
  ];

  return (
    <div>
      <div className="bg-white rounded-2xl py-6 px-6">
        <div className="flex flex-col md:flex-row justify-between gap-2 pb-3">
          <div className="md:flex-1 ">
            <SearchBar
              //   title="Sort By"
              className=" py-2"
              secondaryButton="hide"
              onSearch={setSearchQuery}
              onSort={setSortOrder}
            />
          </div>
        </div>
        <div className="">
          <TabsStepper steps={steps} />
        </div>
      </div>
    </div>
  );
};

export default DoctorsAdminPanel;
