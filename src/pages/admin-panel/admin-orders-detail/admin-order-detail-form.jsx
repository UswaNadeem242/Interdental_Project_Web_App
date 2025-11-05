import { useState } from "react";
// import { SecondaryButton } from "../../../Common/Button";
import DropDownComponent from "../../../Common/DropDown";
// import { options, ShippingDetail } from "../../../Constant";
import CardIcon from "../../../icon/CardIcon";
import UserDetailsCard from "../../../Common/UserDetailsCard";
import ImpalntDesignForm from "../../../Common/ImplantDesignForm";
// import { TeethSelection } from "../../../../components/doctorAdmin/TeethSelection";

export default function AdminOrderDetailForm() {
  const kratos = [
    { label: "Emax x4", value: "$80.00" },
    { label: "Argen ST:", value: "$90.00" },
    { label: "Subtotal:", value: "$180.00" },
    { label: "Shipping:", value: "Free" },
  ];
  const [selected, setSelected] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
  };

  const [selectedTeeth, setSelectedTeeth] = useState([]);

  const toggleTooth = (id) => {
    setSelectedTeeth(
      (prev) =>
        prev.includes(id)
          ? prev.filter((tooth) => tooth !== id) // unselect
          : [...prev, id] // select
    );
  };

  return (
    <div className="grid md:grid-cols-12 col-span-6  gap-4 mt-7 ">
      <div className="md:col-span-8 col-span-4 bg-white rounded-2xl">
        <ImpalntDesignForm />
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

        {/* <div className="relative mt-4">
          <DropDownComponent
            label="Shipping Detail"
            options={ShippingDetail}
            selected={selected}
            optionValue="value"
            onSelect={handleSelect}
            className="text-[10px]"
          />
        </div> */}
      </div>
    </div>
  );
}
