import React, { useMemo, useState } from "react";
import { PrimaryButtonUI } from "../../../Common/Button";
import TableComponent from "../../../Common/Table";
import {
  dataClaimreqAdminPanel,
  dataOrdersAdminPanel,
  headingsAdminPanelClaimReq,
  headingsAdminPanelOrders,
} from "../../../Constant";

import SearchBar from "../../../Common/SearchBar";
import TabsStepper from "../../../Common/TabsStepper";
import SecondTable from "../../../Common/second-table-component";
import Drawers from "../../../Common/Drawers";
import ClaimDetailForm from "../../doctorAdmin/ClaimRequest/ClaimDetailForm";
import ClaimDetailAdminPanel from "./claim-detail-form";

const AdminClaimRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredData = useMemo(() => {
    let filtered = dataClaimreqAdminPanel;
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
          headings={headingsAdminPanelClaimReq}
          data={filteredData}
          onActionClick={(row) => {
            setSelectedRow(row);
            setIsOpen(true);
          }}
          // actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "Pending",
      content: (
        <SecondTable
          headings={headingsAdminPanelClaimReq}
          data={filteredData}
          onActionClick={(row) => {
            setSelectedRow(row);
            setIsOpen(true);
          }}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "In Progress",
      content: (
        <SecondTable
          headings={headingsAdminPanelClaimReq}
          data={filteredData}
          onActionClick={(row) => {
            setSelectedRow(row);
            setIsOpen(true);
          }}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "Shipped",
      content: (
        <TableComponent
          headings={headingsAdminPanelOrders}
          data={filteredData}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "completed",
      content: (
        <TableComponent
          headings={headingsAdminPanelOrders}
          data={filteredData}
          actionHrefKey="detailUrl"
        />
      ),
    },
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
          <Drawers
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Claim Details"
            status={selectedRow?.status}
            Content={<ClaimDetailAdminPanel row={selectedRow} />}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminClaimRequest;
