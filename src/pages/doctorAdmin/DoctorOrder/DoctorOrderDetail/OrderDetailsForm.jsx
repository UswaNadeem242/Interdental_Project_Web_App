import { useEffect, useRef, useState } from "react";
import { SecondaryButton } from "../../../../Common/Button";
import DropDownComponent from "../../../../Common/DropDown";
// import { options, ShippingDetail } from "../../../../Constant";
import CardIcon from "../../../../icon/CardIcon";
import TeethSelection from "../../../../components/doctorAdmin/TeethSelection";
import { getOrderByID } from "../../../../api/doctorDasboard";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
} from "../../../../icon/tooth-one";
import DownloadPdfForm from "../../../../components/doctorAdmin/download-form";

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

export default function OrderDetailsForm({ id }) {
  const [selected, setSelected] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const restoration = useSelector((state) => state.restoration);
  const toothSelections = restoration.toothSelections || [];
  const selectedTeeth = restoration.selectedTeeth || [];
  const patient = restoration.patient;
  const teeth = toothSelections.reduce((acc, t) => {
    acc[t.toothId] = t;
    return acc;
  }, {});
  const doctor = restoration.doctor.reduce((acc, d) => {
    acc[d.field] = d.value || "N/A";
    return acc;
  }, {});
  const formRef = useRef();
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

  const totalPrice = orderDetails?.totalAmount || 0;
  const options = [
    { label: "Subtotal:", value: totalPrice },
    { label: "Shipping:", value: "Free" },
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

  const maskNamePart = (name) => {
    if (!name?.trim()) return "Unknown";
    const clean = name.trim();
    return clean.charAt(0).toUpperCase() + clean.slice(1, 2).toLowerCase();
  };

  const maskNumber = (num) => {
    if (!num) return "";
    const str = String(num).trim();

    if (str.length <= 2) return str; // too short to mask

    const first = str.charAt(0);
    const last = str.charAt(str.length - 1);
    const middle = "*".repeat(str.length - 2);

    return first + middle + last;
  };

  const handleDownloadPDF = async () => {
    const element = formRef.current;
    if (!element) {
      console.error("formRef is missing or null");
      return;
    }

    try {
      // Give React time to fully render the hidden component
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("Implant_Design_Form.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  console.log(orderDetails,'orderDetails');

  return (
    <div className="grid md:grid-cols-12 col-span-6  gap-4 mt-7 ">
      <div
        className="md:col-span-9 col-span-4 bg-white p-4 rounded-2xl"
        ref={formRef}
      >
        <div className="flex justify-between items-center pb-4">
          <div>
            <h4 className="text-[#1A1A1A] font-semibold text-sm font-poppins">
              Implant Design Form:
            </h4>
          </div>
          {/* <div>
            <SecondaryButton
              title="Download Form"
              className="border text-secondaryBrand font-medium text-xs border-secondaryBrand rounded-full  px-6 py-3"
              onClick={handleDownloadPDF}
            />
          </div> */}

          <div

            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "210mm", // A4 width
              backgroundColor: "#fff",
              zIndex: -9999,
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <DownloadPdfForm ref={formRef} />
          </div>



          <button
            onClick={handleDownloadPDF}
            className="border text-secondaryBrand font-medium text-xs border-secondaryBrand rounded-full px-6 py-3 no-print"
          >
            Download Form
          </button>
        </div>

        <div>
          <div className="border border-gray-200  rounded-lg p-4 sm:p-5">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText">
              Doctor Info
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm sm:text-base text-center">
              <div>
                <p className="text-secondaryText    mb-2  font-normal md:text-sm text-xs font-poppins">
                  Contact Info
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins ">
                  {`${maskNamePart(
                    orderDetails?.doctorFirstName
                  )}${maskNamePart(orderDetails?.doctorLastName)}`}
                </p>
              </div>
              <div>
                <p className="text-secondaryText    mb-2  font-normal md:text-sm text-xs font-poppins whitespace-nowrap">
                  Office Registration
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {maskNumber(orderDetails?.doctorRefNumber) || "-"}
                </p>
              </div>

              <div>
                <p className="text-secondaryText    mb-2 font-normal md:text-sm text-xs font-poppins">
                  Create Date
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {formatDate(orderDetails?.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-secondaryText    mb-2 font-normal md:text-sm text-xs font-poppins">
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
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText">
              Patient Information
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base">
              <div>
                <p className="text-secondaryText    mb-2 font-normal md:text-sm text-xs font-poppins">
                  Patient Name:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {`${maskNamePart(
                    orderDetails?.patientFirstName
                  )}${maskNamePart(orderDetails?.patientLastName)}`}
                </p>
              </div>{" "}
              <div>
                <p className="text-secondaryText    mb-2 font-normal md:text-sm text-xs font-poppins">
                  Subscription ID:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {patient?.id || "-"}#
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {/* tooth selection  */}
          <div className="border border-gray-200  rounded-lg p-4 mt-4">
            <p className="text-sm font-medium font-poppins text-primaryText mb-4">
              Tooth Selection{" "}
              <span className="font-semibold">
                {/* {orderDetails?.selectedTooths > 0
                  ? orderDetails?.selectedTooths.map((t) => `#${t}`).join(", ")
                  : "None"} */}
                {(orderDetails?.selectedTooths || []).length > 0
                  ? orderDetails.selectedTooths.map((t) => `#${t}`).join(", ")
                  : "None"}
              </span>
            </p>
            <div className="">
              {/* <img src="/assets/doctor/teeth.png" alt="image" /> */}
              {/* <TeethSelection
                selectedTeeth={orderDetails?.selectedTooths || []}
                onToothSelect={() => {}} // No selection needed - display only
                showIds={true}
              /> */}
              {/* Upper 16 */}
              <div className="flex flex-wrap gap-4 mt-4 justify-center ">
                {Object.entries(topTeeth).map(([id, ToothComponent]) => (
                  <div
                    key={id}
                    className="flex flex-col items-center justify-end"
                  >
                    <ToothComponent
                      highlighted={(
                        orderDetails?.selectedTooths || []
                      ).includes(Number(id))}
                    />
                    <span className="text-sm mt-1 text-gray-600">{id}</span>
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
                      highlighted={(
                        orderDetails?.selectedTooths || []
                      ).includes(Number(id))}
                    />
                    <span className="text-sm text-gray-600 mt-1">{id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText">
              Customization Details
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {/* Material */}
              {orderDetails?.doctorOrderItems?.find(item => item.dropdown?.type === "Material") && (
                <div>
                  <p className="text-[#949494] text-xs font-poppins">
                    Material:
                  </p>
                  <p className="font-bold text-secondaryBrand font-poppins text-xs">
                    {orderDetails.doctorOrderItems.find(item => item.dropdown?.type === "Material")?.dropdown?.name || "N/A"}
                  </p>
                </div>
              )}
              
              {/* Scanner Type */}
              {orderDetails?.doctorOrderItems?.find(item => item.dropdown?.type === "Scanner") && (
                <div>
                  <p className="text-[#949494] text-xs font-poppins">
                    Scanner Type:
                  </p>
                  <p className="font-bold text-secondaryBrand font-poppins text-xs">
                    {orderDetails.doctorOrderItems.find(item => item.dropdown?.type === "Scanner")?.dropdown?.name || "N/A"}
                  </p>
                </div>
              )}
              
              {/* Digital Denture */}
              {orderDetails?.doctorOrderItems?.find(item => item.dropdown?.type === "Denture") && (
                <div>
                  <p className="text-[#949494] text-xs font-poppins">
                    Digital Denture:
                  </p>
                  <p className="font-bold text-secondaryBrand font-poppins text-xs">
                    {orderDetails.doctorOrderItems.find(item => item.dropdown?.type === "Denture")?.dropdown?.name || "N/A"}
                  </p>
                </div>
              )}
              
              {/* Digital Model Type */}
              {orderDetails?.doctorOrderItems?.find(item => item.dropdown?.type === "Digital Model Type") && (
                <div>
                  <p className="text-[#949494] text-xs font-poppins">
                    Digital Model Type:
                  </p>
                  <p className="font-bold text-secondaryBrand font-poppins text-xs">
                    {orderDetails.doctorOrderItems.find(item => item.dropdown?.type === "Digital Model Type")?.dropdown?.name || "N/A"}
                  </p>
                </div>
              )}
              
              {/* Participating Lab */}
              {orderDetails?.doctorOrderItems?.find(item => item.dropdown?.type === "Participating Lab") && (
                <div>
                  <p className="text-[#949494] text-xs font-poppins">
                    Participating Lab:
                  </p>
                  <p className="font-bold text-secondaryBrand font-poppins text-xs">
                    {orderDetails.doctorOrderItems.find(item => item.dropdown?.type === "Participating Lab")?.dropdown?.name || "N/A"}
                  </p>
                </div>
              )}
              
              {/* Crown */}
              {orderDetails?.doctorOrderItems?.find(item => item.dropdown?.type === "Crown") && (
                <div>
                  <p className="text-[#949494] text-xs font-poppins">
                    Crown:
                  </p>
                  <p className="font-bold text-secondaryBrand font-poppins text-xs">
                    {orderDetails.doctorOrderItems.find(item => item.dropdown?.type === "Crown")?.dropdown?.name || "N/A"}
                  </p>
                </div>
              )}
              
              {/* Shade */}
              {orderDetails?.doctorOrderItems?.find(item => item.dropdown?.type === "Shade") && (
                <div>
                  <p className="text-[#949494] text-xs font-poppins">
                    Shade:
                  </p>
                  <p className="font-bold text-secondaryBrand font-poppins text-xs">
                    {orderDetails.doctorOrderItems
                      .filter(item => item.dropdown?.type === "Shade")
                      .map(item => item.dropdown?.name)
                      .join(", ") || "N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="border border-gray-200  rounded-lg p-4 sm:p-6 mt-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText ">
              Notes
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className=" text-sm sm:text-base pb-2">
              <div>
                <p className="text-secondaryText     font-normal md:text-sm text-xs font-poppins ">
                  {`${maskNamePart(
                    orderDetails?.doctorFirstName
                  )}${maskNamePart(orderDetails?.doctorLastName)}`}
                  :
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {orderDetails?.additionalNotes || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="relative">
          <DropDownComponent
            label="Cart Total"
            options={options}
            selected={selected}
            optionValue="value"
            onSelect={handleSelect}
            className="text-xs"
            totalAmount={totalPrice}
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