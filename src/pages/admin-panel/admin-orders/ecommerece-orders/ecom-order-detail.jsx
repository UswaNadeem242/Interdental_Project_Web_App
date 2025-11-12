import React, { useState } from "react";
import { ProgressBar } from "../../../../Common/ProgressBar";

import { SecondaryButton } from "../../../../Common/Button";

import AreYouSureModel from "../../../../modals/AreYouSureModel";
import AdminOrderDetailForm from "../../admin-orders-detail/admin-order-detail-form";
import DropDownComponent from "../../../../Common/DropDown";
import UserDetailsCard from "../../../../Common/UserDetailsCard";
import CardIcon from "../../../../icon/CardIcon";
import SecondTable from "../../../../Common/second-table-component";
import { useMemo } from "react";
import {
  dataClaimreqAdminPanel,
  headingsProducts,
  stepsDefault,
} from "../../../../Constant";
import TrackingOrderAdmin from "../../admin-orders-detail/tracking-order";

function EcomOrdersDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
  };
  const kratos = [
    { label: "Emax x4", value: "$80.00" },
    { label: "Argen ST:", value: "$90.00" },
    { label: "Subtotal:", value: "$180.00" },
    { label: "Shipping:", value: "Free" },
  ];
  const headings = [
    { label: "Products", key: "products" },
    { label: "Price", key: "price" },
    { label: "Quality", key: "quality" },
    { label: "Sub Total", key: "subTotal" },
  ];

  const data = [
    {
      products: "Green Capsicum",
      price: "$23",

      quality: "4",
      subTotal: "$543",
      image: "/assets/brush.png",
    },
    {
      products: "Green Capsicum",
      price: "$23",

      quality: "4",
      subTotal: "$543",
      image: "/assets/brush.png",
    },
    {
      products: "Green Capsicum",
      price: "$23",

      quality: "4",
      subTotal: "$543",
      image: "/assets/brush.png",
    },
    {
      products: "Green Capsicum",
      price: "$23",

      quality: "4",
      subTotal: "$543",
      image: "/assets/brush.png",
    },
    {
      products: "Green Capsicum",
      price: "$23",

      quality: "4",
      subTotal: "$543",
      image: "/assets/brush.png",
    },
  ];
  const filteredData = useMemo(() => {
    let filtered = data;
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
    <div className="">
      <div className="">
        <TrackingOrderAdmin setIsModalOpen={setIsModalOpen} />

        {/* <SecondaryButton
                title="Move Order To Delivered"
                icon={""}
                className="bg-[#001D58] text-[#FFFFFF] text-xs font-light font-poppins px-6 py-3 rounded-xl "
                onClick={() => setIsModalOpen(true)}
              /> */}
      </div>
      {/* <AdminOrderDetailForm /> */}

      <div className="grid grid-cols-12 gap-10 mt-6">
        <div className="col-span-8 bg-bgWhite p-4 rounded-2xl">
          <SecondTable
            headings={headings}
            data={filteredData}
            actionHrefKey="detailUrl"
            className={"min-h-[500px]"}
          />
        </div>
        <div className="col-span-4">
          <div className="relative">
            <DropDownComponent
              label="Cart Total"
              options={kratos}
              selected={selected}
              optionValue="value"
              onSelect={handleSelect}
              className="text-xs"
            />
          </div>

          <div className="relative mt-4">
            <UserDetailsCard
              fullName="Varga Dóra"
              email="dihec134@gmail.com"
              contactNumber="0325 4382345"
              shippingAddress="1901 Thornridge Cir. Shiloh, Hawaii 81063"
            />
          </div>

          <div className="relative mt-4">
            <div className="bg-white p-4 rounded-lg ">
              <h1 className="text-[#1A1A1A] text-base font-semibold font-poppins capitalize pb-4">
                Payment Detail
              </h1>
              <div className="flex  items-center gap-2">
                <CardIcon className="w-3 h-3" />
                <p className="text-primaryText font-normal font-poppins">
                  Credit or debit card{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <AreYouSureModel
            setIsModalOpen={setIsModalOpen}
            title="Are You Sure"
            desc="You can not undo the action"
          />
        )}
      </div>
    </div>
  );
}

export default EcomOrdersDetail;
