import React, { useMemo, useState } from "react";
import { PrimaryButtonUI, SecondaryButton } from "../../../Common/Button";
import TableComponent from "../../../Common/Table";
import {
  data,
  dataOrder,
  dataPatient,
  dataProducts,
  headings,
  headingsOrder,
  headingsPateint,
  headingsProducts,
} from "../../../Constant";
import SearchBar from "../../../Common/SearchBar";
import TabsStepper from "../../../Common/TabsStepper";
import { PlusIcon } from "../../../icon/PlusIcon";

const ProductsAdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filteredData = useMemo(() => {
    let filtered = dataProducts;
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
  //   const steps = [
  //     {
  //       name: "All",
  //       content: (
  //         <TableComponent
  //           headings={headingsOrder}
  //           data={filteredData}
  //           actionHrefKey="detailUrl"
  //         />
  //       ),
  //     },
  //     {
  //       name: "Pending",
  //       content: (
  //         <TableComponent
  //           headings={headingsOrder}
  //           data={filteredData}
  //           actionHrefKey="detailUrl"
  //         />
  //       ),
  //     },
  //     {
  //       name: "in Progress",
  //       content: (
  //         <TableComponent
  //           headings={headings}
  //           data={filteredData}
  //           actionHrefKey="detailUrl"
  //         />
  //       ),
  //     },
  //     {
  //       name: "shipped",
  //       content: (
  //         <TableComponent
  //           headings={headingsOrder}
  //           data={filteredData}
  //           actionHrefKey="detailUrl"
  //         />
  //       ),
  //     },
  //     {
  //       name: "completed",
  //       content: (
  //         <TableComponent
  //           headings={headings}
  //           data={filteredData}
  //           actionHrefKey="detailUrl"
  //         />
  //       ),
  //     },
  //   ];

  return (
    <div>
      <div className="bg-white rounded-2xl py-6 px-6">
        <div className="flex flex-col md:flex-row justify-between gap-2 pb-3">
          <div className="md:flex-1 ">
            <SearchBar
              title="Sort By"
              onSearch={setSearchQuery}
              onSort={setSortOrder}
              secondaryButton="hide"
              className="py-2"
            />
          </div>

          <div className="flex flex-col  md:flex-row items-start md:items-center gap-2 ">
            <div className="md:block hidden">
              <SecondaryButton
                title="Add product"
                className="rounded-md px-8 py-3 font-semibold bg-[#F8F8F8] "
                icon={<PlusIcon />}
                href="/admin-panel/list-product"
              />
            </div>
          </div>
        </div>
        <div className="">
          <TableComponent
            headings={headingsProducts}
            data={filteredData}
            actionHrefKey="detailUrl"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsAdminPanel;
