import React, { useMemo, useState } from "react";
import { PrimaryButtonUI } from "../../../Common/Button";
import TableComponent from "../../../Common/Table";
import {
  dataOrdersAdminPanel,
  headings,
  headingsAdminPanelOrders,
} from "../../../Constant";

import SearchBar from "../../../Common/SearchBar";
import TabsStepper from "../../../Common/TabsStepper";
import SecondTable from "../../../Common/second-table-component";
import AdminSearchBar from "../../../Common/admin-panel-search-bar";

const OrdersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filteredData = useMemo(() => {
    let filtered = dataOrdersAdminPanel;
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
          headings={headingsAdminPanelOrders}
          data={filteredData}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "Pending",
      content: (
        <SecondTable
          headings={headingsAdminPanelOrders}
          data={filteredData}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "In Progress",
      content: (
        <SecondTable
          headings={headingsAdminPanelOrders}
          data={filteredData}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "Shipped",
      content: (
        <SecondTable
          headings={headingsAdminPanelOrders}
          data={filteredData}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "completed",
      content: (
        <SecondTable
          headings={headingsAdminPanelOrders}
          data={filteredData}
          actionHrefKey="detailUrl"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="bg-white rounded-2xl py-6 ">
        <div className="flex flex-col md:flex-row justify-between gap-2 pb-3">
          <div className="w-full ">
            <AdminSearchBar
              //   title="Sort By"
              className=" py-2 mb-3 mx-auto"
              // secondaryButton="hide"
              title="Sort By"
              onSearch={setSearchQuery}
              onSort={setSortOrder}
              firstField={"Order Id"}
              secondField={"Doctor Name"}
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

export default OrdersTable;
