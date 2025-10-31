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
  const today = new Date();

  const restoration = useSelector((state) => state.restoration);
  const patient = restoration?.patient;
  const doctor = restoration?.doctor;
  const selectedTeeth = restoration?.selectedTeeth || [];
  const note = restoration?.note || "";
  const globalSelections = restoration?.globalSelections || {};

  console.log("Patietns:", patient);
  console.log("Doctorr", doctor);
  console.log("profileee", doctorProfile);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return (
      (selectedTeeth?.length || 0) *
      Object.values(globalSelections || {})
        .filter(
          (selection) => selection && selection?.price && selection?.price > 0
        )
        .reduce((sum, selection) => sum + (selection?.price || 0), 0)
    );
  }, [selectedTeeth, globalSelections]);

  console.log("Nigggaaaaa", globalSelections);
  //

  // Get due date from doctor array
  const dueDate = doctor?.find((d) => d.field === "dueDate")?.value || "";

  // const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="">
      <div className="grid md:grid-cols-12 col-span-6  gap-4 mt-7 ">
        <div className="md:col-span-9 col-span-4 bg-white p-4 rounded-2xl">
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "210mm",
              backgroundColor: "#fff",
              zIndex: -9999,
              opacity: 0,
              pointerEvents: "none",
            }}
          ></div>

          <div className="p-4">
            <div className="flex justify-between items-center pb-4">
              <h4 className="text-[#1A1A1A] font-semibold text-sm font-poppins">
                Restoration Design Form
              </h4>
            </div>

            <div>
              <div className="border-2 border-gray-200 ">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-gray-200">
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Doctor's Name
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {doctorProfile?.firstName || ""}{" "}
                      {doctorProfile?.lastName || ""}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Office Reference Number
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {doctorProfile?.officeRefNumber || ""}
                    </span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="border-b-2 border-gray-200">
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Patient
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {patient?.name || ""}
                    </span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Created Date
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {/* {formatDate(doctorProfile?.createdAt)} */}
                      {today.toLocaleDateString("en-GB").replace(/\//g, "-")}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Expected Delivery Date:
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {formatDate(dueDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              {/* tooth selection  */}
              <div className="border-2 border-gray-200  ">
                <p className="text-xs font-normal font-poppins border-b-2 p-2 text-[#000000] mb-4">
                  Tooth Selection
                </p>
                <div className="p-4">
                  {/* Upper 16 */}
                  <div className="flex flex-wrap gap-4 mt-4 justify-center ">
                    {Object.entries(topTeeth).map(([id, ToothComponent]) => (
                      <div
                        key={id}
                        className="flex flex-col items-center justify-end"
                      >
                        <ToothComponent
                          highlighted={selectedTeeth?.includes(Number(id))}
                        />
                        <span className="text-sm mt-1 text-gray-600 capitalize">
                          {id}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Lower 16 */}
                  <div className="flex flex-wrap gap-[16px] mt-4 mb-4 justify-center">
                    {Object.entries(bottomTeeth).map(([id, ToothComponent]) => (
                      <div
                        key={id}
                        className="flex flex-col items-center justify-end"
                      >
                        <ToothComponent
                          highlighted={selectedTeeth?.includes(Number(id))}
                        />
                        <span className="text-sm text-gray-600 mt-1 capitalize">
                          {id}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Smile Design and Scanner Type - Separate Section */}
            <div className="mt-4">
              <div className="border-2 border-gray-200  p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Selected Smile Design:
                    </span>
                    <span className="text-secondaryBrand capitalize text-xs font-normxs font-poppins">
                      {globalSelections?.smileDesign?.option?.label || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Scanner Type:
                    </span>
                    <span className="text-secondaryBrand capitalize text-xs font-normxs font-poppins">
                      {globalSelections?.scannerType?.option?.label || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="font-normal text-xs font-poppins text-[#000000] mb-3">
                Customization Details
              </h3>
              <div className="border-2 border-gray-200">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-gray-200">
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Denture type:
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {globalSelections?.digitalOptions?.option.label || "N/A"}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Surgical guide:
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {globalSelections?.surgical_guide?.option?.label || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-gray-200">
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Smart Crown:
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {globalSelections?.crown?.option?.label || "N/A"}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Material:
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {globalSelections?.material?.option.label || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-gray-200">
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Shade:
                    </span>
                    {/* <span className="text-secondaryBrand font-normal text-sm font-popxsns">
                      {globalSelections?.shades?.["Vita Classic Shades"]
                        ?.name || "N/A"}
                    </span> */}
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {(() => {
                        const shades = globalSelections?.shades;
                        if (!shades || Object.keys(shades).length === 0)
                          return "N/A";
                        const firstKey = Object.keys(shades)[0]; // e.g. "Vita Classic Shades"
                        return shades[firstKey]?.name || "N/A";
                      })()}
                    </span>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="text-secondaryText text-xs font-normal font-poppins">
                      Digital Model Type:
                    </span>
                    <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                      {globalSelections?.Model_type?.option?.label || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="p-2 flex items-center gap-2">
                  <span className="text-secondaryText text-xs font-normal font-poppins">
                    Dental Lab Alliance:
                  </span>
                  <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                    {globalSelections?.lab?.option?.label || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="font-normal text-xs font-poppins text-[#0F153E] pb-2 border-b-2 border-gray-200">
                Additional Notes
              </h3>
              <div className="pt-2">
                <p className="text-secondaryText text-xs font-normal font-poppins">
                  {note}
                </p>
              </div>
            </div>
          </div>
          {/* */}
        </div>
        {/* Right Panel / Order Summary */}
        <div className="col-span-4 md:mx-0 mx-8 md:col-span-3 bg-white  border-2 md:border-l-2 md:border-t-0 md:border-b-0 md:border-r-0 border-gray-200 p-6 flex flex-col justify-between font-poppins ">
          <div>
            <h2 className="text-xl font-medium mb-4 text-[#1A1A1A]">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              {globalSelections?.material &&
                globalSelections?.material?.price > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <p className="text-[#828386] text-sm font-normal font-poppins">
                      {globalSelections?.material?.option?.label || "Material"}{" "}
                      <span className="text-[#1A1A1A] text-xs font-normal">
                        x{selectedTeeth?.length || 0}
                      </span>
                    </p>
                    <p className="text-sm text-[#1A1A1A] font-normal font-poppins">
                      $
                      {(globalSelections?.material?.price || 0) *
                        (selectedTeeth?.length || 0)}
                    </p>
                  </div>
                )}

              {globalSelections?.crown &&
                globalSelections?.crown?.price > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <p className="text-[#828386] text-sm font-normal font-poppins">
                      {globalSelections?.crown?.option?.label || "Crown"}{" "}
                      <span className="text-[#1A1A1A] text-xs font-normal">
                        x{selectedTeeth?.length || 0}
                      </span>
                    </p>
                    <p className="text-sm text-[#1A1A1A] font-normal font-poppins">
                      $
                      {(globalSelections?.crown?.price || 0) *
                        (selectedTeeth?.length || 0)}
                    </p>
                  </div>
                )}

              {globalSelections?.Model_type &&
                globalSelections?.Model_type?.price > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <p className="text-[#828386] text-sm font-normal font-poppins">
                      {globalSelections?.Model_type?.option?.label ||
                        "Digital Model Type"}{" "}
                      <span className="text-[#1A1A1A] text-xs font-normal">
                        x{selectedTeeth?.length || 0}
                      </span>
                    </p>
                    <p className="text-sm text-[#1A1A1A] font-normal font-poppins">
                      $
                      {(globalSelections?.Model_type?.price || 0) *
                        (selectedTeeth?.length || 0)}
                    </p>
                  </div>
                )}

              {globalSelections?.digitalOptions &&
                globalSelections?.digitalOptions?.price > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <p className="text-[#828386] text-sm font-normal font-poppins">
                      {globalSelections?.digitalOptions?.option?.label ||
                        "Digital Denture "}{" "}
                      <span className="text-[#1A1A1A] text-xs font-normal">
                        x{selectedTeeth?.length || 0}
                      </span>
                    </p>
                    <p className="text-sm text-[#1A1A1A] font-normal font-poppins">
                      $
                      {(globalSelections?.digitalOptions?.price || 0) *
                        (selectedTeeth?.length || 0)}
                    </p>
                  </div>
                )}

              {globalSelections?.lab && globalSelections?.lab?.price > 0 && (
                <div className="flex justify-between items-center py-1">
                  <p className="text-[#828386] text-sm font-normal font-poppins">
                    {globalSelections?.lab?.option?.label ||
                      "Participating Lab"}{" "}
                    <span className="text-[#1A1A1A] text-xs font-normal">
                      x{selectedTeeth?.length || 0}
                    </span>
                  </p>
                  <p className="text-sm text-[#1A1A1A] font-normal font-poppins">
                    $
                    {(globalSelections?.lab?.price || 0) *
                      (selectedTeeth?.length || 0)}
                  </p>
                </div>
              )}

              {globalSelections?.scannerType &&
                globalSelections?.scannerType?.price > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <p className="text-xs text-textFieldHeading">
                      {globalSelections?.scannerType?.option?.label ||
                        "Scanner Type"}{" "}
                      <span className="text-[#1A1A1A] text-xs font-normal">
                        x{selectedTeeth?.length || 0}
                      </span>
                    </p>
                    <p className="text-sm text-[#1A1A1A] font-normal font-poppins">
                      $
                      {(globalSelections?.scannerType?.price || 0) *
                        (selectedTeeth?.length || 0)}
                    </p>
                  </div>
                )}
            </div>

            <div className="">
              <div className="flex justify-between items-center py-3">
                <p className="text-[#828386] text-sm font-normal font-poppins">
                  Subtotal:
                </p>
                <p className="text-[#1A1A1A] font-semibold text-sm font-poppins">
                  ${totalPrice?.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between items-center py-3 border-t">
                <p className="text-[#828386] text-sm font-normal font-poppins">
                  Shipping:
                </p>
                <p className="text-[#1A1A1A] font-normal text-sm font-poppins">
                  Free
                </p>
              </div>
              <div className="flex justify-between items-center py-3 font-poppins">
                <p className="text-[#001D58] text-base font-normal leading-normal">
                  Total:
                </p>
                <p className="text-[#001D58] font-semibold text-lg font-poppins">
                  ${totalPrice?.toFixed(2)}
                </p>
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
