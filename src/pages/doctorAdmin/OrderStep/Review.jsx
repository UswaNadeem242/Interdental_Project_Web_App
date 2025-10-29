import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ToothOne,
  ToothTwo,
  ToothThree,
  ToothFour,
  ToothFive,
  ToothSix,
  ToothSeven,
  ToothEight,
  ToothNine,
  ToothTen,
  ToothEleven,
  ToothTwelve,
  ToothThirteen,
  ToothFourteen,
  ToothFifteen,
  ToothSixteen,
  ToothSeventeen,
  ToothEighteen,
  ToothNineteen,
  ToothTwenty,
  ToothTwentyOne,
  ToothTwentyTwo,
  ToothTwentyThree,
  ToothTwentyFour,
  ToothTwentyFive,
  ToothTwentySix,
  ToothTwentySeven,
  ToothTwentyEight,
  ToothTwentyNine,
  ToothThirty,
  ToothThirtyOne,
  ToothThirtyTwo,
} from "../../../icon/tooth-one";

const topTeeth = {
  1: ToothOne,
  2: ToothTwo,
  3: ToothThree,
  4: ToothFour,
  5: ToothFive,
  6: ToothSix,
  7: ToothSeven,
  8: ToothEight,
  9: ToothNine,
  10: ToothTen,
  11: ToothEleven,
  12: ToothTwelve,
  13: ToothThirteen,
  14: ToothFourteen,
  15: ToothFifteen,
  16: ToothSixteen,
};

const bottomTeeth = {
  17: ToothSeventeen,
  18: ToothEighteen,
  19: ToothNineteen,
  20: ToothTwenty,
  21: ToothTwentyOne,
  22: ToothTwentyTwo,
  23: ToothTwentyThree,
  24: ToothTwentyFour,
  25: ToothTwentyFive,
  26: ToothTwentySix,
  27: ToothTwentySeven,
  28: ToothTwentyEight,
  29: ToothTwentyNine,
  30: ToothThirty,
  31: ToothThirtyOne,
  32: ToothThirtyTwo,
};

const ReviewOrder = ({ next, doctorProfile }) => {
  const restoration = useSelector((state) => state.restoration);
  const patient = restoration?.patient;
  const doctor = restoration?.doctor;
  const selectedTeeth = restoration?.selectedTeeth || [];
  const note = restoration?.note || "";
  const globalSelections = restoration?.globalSelections || {};

  // Calculate total price
  const totalPrice = useMemo(() => {
    return (
      (selectedTeeth?.length || 0) *
      Object.values(globalSelections || {})
        .filter((selection) => selection && selection?.price && selection?.price > 0)
        .reduce((sum, selection) => sum + (selection?.price || 0), 0)
    );
  }, [selectedTeeth, globalSelections]);

  // Get due date from doctor array
  const dueDate = doctor?.find((d) => d.field === "dueDate")?.value || "";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Panel */}
        <div className="md:col-span-9 bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-6">
          <h2 className="text-sm font-poppins text-primaryText">
            Implant Design Details:
          </h2>

          {/* Doctor Info */}
          <div className="border border-gray-200 p-4 sm:p-6">
            <h3 className="font-medium mb-2 text-sm sm:text-base font-poppins text-[#434343]">
              Doctor Info
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm sm:text-base">
              <div>
                <p className="text-[#949494] font-normal md:text-sm text-xs font-poppins">
                  Doctor's Name
                </p>
                <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                  {doctorProfile?.firstName || ""} {doctorProfile?.lastName || ""}
                </p>
              </div>
              <div>
                <p className="text-[#949494] font-normal md:text-sm text-xs font-poppins">
                  Office Registration#
                </p>
                <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                  {doctorProfile?.officeRefNumber || ""}
                </p>
              </div>
              <div>
                <p className="text-[#949494] font-normal md:text-sm text-xs font-poppins">
                  Create Date
                </p>
                <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                  {formatDate(doctorProfile?.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-[#949494] font-normal md:text-sm text-xs font-poppins">
                  Due Date
                </p>
                <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                  {formatDate(dueDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="border border-gray-200 p-4 font-poppins">
            <h3 className="font-medium mb-2 text-[#434343]">Patient Information</h3>
            <hr className="border-gray-200 my-2" />
            {patient ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[#949494]">Full Name</p>
                  <p className="font-normal text-secondaryBrand">
                    {patient?.name || patient?.firstName || ""}{" "}
                    {patient?.lastName || ""}
                  </p>
                </div>
                <div>
                  <p className="text-[#949494]">Patient ID:</p>
                  <p className="font-normal text-secondaryBrand">{patient?.id}#</p>
                </div>
                <div>
                  <p className="text-[#949494]">Email:</p>
                  <p className="font-normal text-secondaryBrand">{patient?.email || "N/A"}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No patient selected</p>
            )}
          </div>

          {/* Selected Teeth */}
          <div className="border border-gray-200 p-4">
            <p className="text-sm font-medium font-poppins text-black mb-2">
              Selected Teeth:{" "}
              <span className="font-semibold">
                {selectedTeeth?.length > 0
                  ? selectedTeeth?.map((t) => `#${t}`).join(", ")
                  : "None"}
              </span>
            </p>

            {/* Upper 16 */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {Object.entries(topTeeth || {}).map(([id, ToothComponent]) => (
                <div
                  key={id}
                  className="flex flex-col items-center justify-end"
                >
                  <ToothComponent
                    highlighted={selectedTeeth?.includes(Number(id))}
                  />
                  <span className="text-sm mt-1 text-gray-600">{id}</span>
                </div>
              ))}
            </div>

            {/* Lower 16 */}
            <div className="flex flex-wrap gap-[10px] mt-4 mb-4 justify-center">
              {Object.entries(bottomTeeth || {}).map(([id, ToothComponent]) => (
                <div
                  key={id}
                  className="flex flex-col items-center justify-end"
                >
                  <ToothComponent
                    highlighted={selectedTeeth?.includes(Number(id))}
                  />
                  <span className="text-sm text-gray-600 mt-1">{id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customization Details */}
          <div className="border border-gray-200 font-poppins p-4">
            <h3 className="font-medium mb-3 text-[#000000]">
              Customization Details
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[#949494] text-xs font-poppins">Material:</p>
                <p className="font-bold text-secondaryBrand font-poppins text-xs">
                  {globalSelections?.material?.option?.label || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[#949494] text-xs font-poppins">Colour:</p>
                <p className="font-bold text-secondaryBrand font-poppins text-xs">
                  {Object.values(globalSelections?.shades || {})
                    .map((shade) => shade?.name)
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[#949494] text-xs font-poppins">
                  Digital Model Type:
                </p>
                <p className="font-bold text-secondaryBrand font-poppins text-xs">
                  {globalSelections?.Model_type?.option?.label || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[#949494] text-xs font-poppins">
                  Participating Lab:
                </p>
                <p className="font-bold text-secondaryBrand font-poppins text-xs">
                  {globalSelections?.lab?.option?.label || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[#949494] text-xs font-poppins">Crown:</p>
                <p className="font-bold text-secondaryBrand font-poppins text-xs">
                  {globalSelections?.crown?.option?.label || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[#949494] text-xs font-poppins">
                  Scanner Type:
                </p>
                <p className="font-bold text-secondaryBrand font-poppins text-xs">
                  {globalSelections?.scannerType?.option?.label || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Note */}
          {note && (
            <div className="border border-gray-200 p-4 sm:p-6">
              <h3 className="font-medium mb-2 text-sm sm:text-base font-poppins text-[#434343]">
                Note
              </h3>
              <hr className="border-gray-200 my-2" />
              <div className="grid grid-cols-1 gap-4 text-sm sm:text-base">
                <div>
                  <p className="text-[#949494] font-normal text-xs font-poppins pb-2">
                    {doctorProfile?.firstName || ""} {doctorProfile?.lastName || ""}
                  </p>
                  <p className="font-normal text-secondaryBrand text-xs font-poppins">
                    {note}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel / Order Summary */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between font-poppins">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-[#1A1A1A]">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#828386] font-poppins text-sm">
                  Selected Teeth ({selectedTeeth?.length || 0}):
                </span>
                <span className="text-[#1A1A1A] font-poppins text-sm">
                  {selectedTeeth?.map((toothId) => `#${toothId}`).join(", ")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#828386] font-poppins text-sm">
                  Subtotal:
                </span>
                <span className="font-semibold text-[#1A1A1A]">
                  ${totalPrice?.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#828386] font-poppins text-sm">
                  Shipping:
                </span>
                <span className="text-[#1A1A1A]">Free</span>
              </div>

              <div className="flex justify-between font-normal text-secondaryBrand text-lg mt-4 border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>${totalPrice?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            className="mt-6 w-full py-3 rounded-3xl bg-secondaryBrand text-white font-medium"
            onClick={next}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
