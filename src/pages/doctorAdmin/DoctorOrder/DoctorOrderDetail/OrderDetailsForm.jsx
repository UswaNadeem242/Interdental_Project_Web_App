import { useEffect, useState } from "react";
import { SecondaryButton } from "../../../../Common/Button";
import DropDownComponent from "../../../../Common/DropDown";
// import { options, ShippingDetail } from "../../../../Constant";
import CardIcon from "../../../../icon/CardIcon";
import TeethSelection from "../../../../components/doctorAdmin/TeethSelection";
import { getOrderByID } from "../../../../api/doctorDasboard";

export default function OrderDetailsForm({ id }) {
  const [selected, setSelected] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  // Helper function to format date as MM/DD/YYYY
  const formatDate = (dateString) => {
    if (!dateString || dateString === "-") return "-";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";

      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();

      return `${month}/${day}/${year}`;
    } catch (error) {
      return "-";
    }
  };

  const options = [
    { label: "Subtotal:", value: orderDetails?.totalAmount || 0 },
    { label: "Shipping:", value: 0 },
  ];

  const ShippingDetail = [
    { label: "Shipping Address" },
    { label: "1901 Thornridge Cir. Shiloh, Hawaii 81063" },
  ];

  useEffect(() => {
    const fetchOrderByID = async () => {
      const response = await getOrderByID(id);

      if (response.status === 200) {
        setOrderDetails(response.data.data);
      }
    };
    fetchOrderByID();
  }, [id]);

  const handleSelect = (option) => {
    setSelected(option);
  };

  // Use selectedTooths from orderDetails instead of local state

  // No tooth selection needed - display only

  return (
    <div className="grid md:grid-cols-12 col-span-6  gap-4 mt-7 ">
      <div className="md:col-span-8 col-span-4 bg-white p-4 rounded-2xl">
        <div className="flex justify-between items-center pb-4">
          <div>
            <h4 className="text-[#1A1A1A] font-semibold text-sm font-poppins">
              Implant Design Form:
            </h4>
          </div>
          <div>
            <SecondaryButton
              title="Download Form"
              className="border text-secondaryBrand font-medium text-xs border-secondaryBrand rounded-full  px-6 py-3"
            />
          </div>
        </div>

        <div>
          <div className="border border-gray-200  rounded-lg p-4 sm:p-5">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-[#434343]">
              Doctor Info
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm sm:text-base text-center">
              <div>
                <p className="text-[#949494] mb-2  font-normal md:text-sm text-xs font-poppins">
                  Contact Info
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins ">
                  {orderDetails?.doctorName || "-"}
                </p>
              </div>
              <div>
                <p className="text-[#949494] mb-2  font-normal md:text-sm text-xs font-poppins whitespace-nowrap">
                  Office Registration
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {orderDetails?.doctorRegNumber || "-"}
                </p>
              </div>

              <div>
                <p className="text-[#949494] mb-2 font-normal md:text-sm text-xs font-poppins">
                  Create Date
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {formatDate(orderDetails?.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-[#949494] mb-2 font-normal md:text-sm text-xs font-poppins">
                  Due Date
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {formatDate(orderDetails?.expectedDeliveryDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-[#434343]">
              Patient Information
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base">
              <div>
                <p className="text-[#949494] mb-2 font-normal md:text-sm text-xs font-poppins">
                  First Name:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {orderDetails?.patientFirstName || "-"}
                </p>
              </div>
              <div>
                <p className="text-[#949494] mb-2 font-normal md:text-sm text-xs font-poppins">
                  Last Name:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {orderDetails?.patientLastName || "-"}
                </p>
              </div>

              <div>
                <p className="text-[#949494] mb-2 font-normal md:text-sm text-xs font-poppins">
                  Subscription ID:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {orderDetails?.subscriptionId || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {/* tooth selection  */}
          <div className="border border-gray-200  rounded-lg p-4 mt-4">
            <p className="text-sm font-medium font-poppins text-[#434343] mb-4">
              Tooth Selection
            </p>
            <div className="py-4">
              <TeethSelection
                selectedTeeth={orderDetails?.selectedTooths || []}
                onToothSelect={() => {}} // No selection needed - display only
                showIds={true}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-[#434343]">
              Customization Details
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base pb-2">
              <div>
                <p className="text-[#949494] mb-2  font-normal md:text-sm text-xs font-poppins">
                  Material:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  Miles
                </p>
              </div>
              <div>
                <p className="text-[#949494] mb-2 font-normal md:text-sm text-xs font-poppins">
                  Colour:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  Esther
                </p>
              </div>

              <div>
                <p className="text-[#949494] mb-2 font-normal md:text-sm text-xs font-poppins">
                  Type:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  466437#
                </p>
              </div>
            </div>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base   pt-2">
              <div>
                <p className="text-[#949494] mb-2 font-normal md:text-sm text-xs font-poppins">
                  Manufacturer
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  Miles
                </p>
              </div>
              <div>
                <p className="text-[#949494] mb-2 font-normal md:text-sm text-xs font-poppins">
                  Manufacture Process
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  Esther
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200  rounded-lg p-4 sm:p-6 mt-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-[#434343]">
              Notes
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className=" text-sm sm:text-base pb-2">
              <div>
                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">
                  {orderDetails?.doctorName || "-"}:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {orderDetails?.additionalNotes || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <div className="relative">
          <DropDownComponent
            label="Cart Total"
            options={options}
            selected={selected}
            optionValue="value"
            onSelect={handleSelect}
            className="text-xs"
          />
        </div>

        <div className="relative mt-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
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

        <div className="relative mt-4">
          <DropDownComponent
            label="Shipping Detail"
            options={ShippingDetail}
            selected={selected}
            optionValue="value"
            onSelect={handleSelect}
            className="text-[10px]"
          />
        </div>
      </div>
    </div>
  );
}
