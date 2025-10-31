import { useEffect, useRef, useState } from "react";
import DropDownComponent from "../../../../Common/DropDown";
// import { options, ShippingDetail } from "../../../../Constant";
import CardIcon from "../../../../icon/CardIcon";
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

  const formRef = useRef();
  // Helper: format date as DD-MM-YYYY
  const formatDateDMY = (dateString) => {
    if (!dateString || dateString === "-") return "-";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
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
    { label: orderDetails?.address || "N/A" },
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

  const handleDownloadPDF = async () => {
    const element = formRef.current;
    if (!element) {
      console.error("formRef is missing or null");
      return;
    }

    try {
      // Hide the download button before capturing
      const button = element.querySelector(".pdf-hide-button");
      if (button) {
        button.style.display = "none";
      }

      // Give React time to fully render
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Capture the exact visible content
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Show the button again
      if (button) {
        button.style.display = "";
      }

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Use scale factor to convert pixels to mm at 96 DPI
      const scale = 3; // html2canvas scale we used
      const imgWidthMM = (canvas.width / scale) * 0.264583; // 1px = 0.264583mm at 96 DPI
      const imgHeightMM = (canvas.height / scale) * 0.264583;

      // Small margins
      const margin = 10;
      const maxWidth = pdfWidth - 2 * margin;
      const maxHeight = pdfHeight - 2 * margin;

      // Calculate scaling to fit width with margins
      let finalWidth = imgWidthMM;
      let finalHeight = imgHeightMM;

      if (finalWidth > maxWidth) {
        const ratio = maxWidth / finalWidth;
        finalWidth = maxWidth;
        finalHeight = finalHeight * ratio;
      }

      if (finalHeight > maxHeight) {
        const ratio = maxHeight / finalHeight;
        finalHeight = maxHeight;
        finalWidth = finalWidth * ratio;
      }

      // Start from top with margin, center horizontally
      const x = (pdfWidth - finalWidth) / 2;
      const y = margin; // Start from top margin instead of centering vertically

      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
      pdf.save("Restoration_Design_Form.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Make sure to show the button again even if there's an error
      const button = element.querySelector(".pdf-hide-button");
      if (button) {
        button.style.display = "";
      }
    }
  };

  console.log(orderDetails, "orderDetails");

  return (
    <div className="grid md:grid-cols-12 col-span-6  gap-4 mt-7 ">
      <div className="md:col-span-9 col-span-4 bg-white p-4 rounded-2xl">
        {/* PDF Content - This will be captured */}
        <div ref={formRef} className="p-4 bg-white">
          <div className="flex justify-between items-center pb-4">
            <h4 className="text-black font-semibold text-xl font-poppins">
              Restoration Design Form
            </h4>
            <button
              onClick={handleDownloadPDF}
              className="border text-secondaryBrand font-medium text-sm border-secondaryBrand rounded-full px-6 py-3 pdf-hide-button"
            >
              Download Form
            </button>
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
                    {`${orderDetails?.doctorFirstName || ""} ${
                      orderDetails?.doctorLastName || ""
                    }`}
                  </span>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <span className="text-secondaryText text-xs font-normal font-poppins">
                    Office Reference Number
                  </span>
                  <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                    {orderDetails?.doctorRefNumber || "-"}
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
                    {`${orderDetails?.patientFirstName || ""} ${
                      orderDetails?.patientLastName || ""
                    }`}
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
                    {formatDateDMY(orderDetails?.createdAt)}
                  </span>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <span className="text-secondaryText text-xs font-normal font-poppins">
                    Expected Delivery Date:
                  </span>
                  <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                    {formatDateDMY(orderDetails?.expectedDeliveryDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            {/* tooth selection  */}
            <div className="border-2 border-gray-200  ">
              <p className="text-xs font-normal font-poppins border-b-2 p-2 text-black mb-4">
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
                        highlighted={(
                          orderDetails?.selectedTooths || []
                        ).includes(Number(id))}
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
                        highlighted={(
                          orderDetails?.selectedTooths || []
                        ).includes(Number(id))}
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
                  <span className="text-secondaryBrand capitalize text-sm font-normal font-poppins">
                    {orderDetails?.smileDesign ||
                      (orderDetails?.doctorOrderItems || []).find((item) => {
                        const t = item?.dropdown?.type || "";
                        return t === "Smile Type" || t === "Smile Design";
                      })?.dropdown?.name ||
                      "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondaryText text-xs font-normal font-poppins">
                    Scanner Type:
                  </span>
                  <span className="text-secondaryBrand capitalize text-sm font-normal font-poppins">
                    {orderDetails?.doctorOrderItems?.find(
                      (item) => item.dropdown?.type === "Scanner"
                    )?.dropdown?.name || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <h3 className="font-normal text-xs font-poppins text-black mb-3">
              Customization Details
            </h3>
            <div className="border-2 border-gray-200 ">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-gray-200">
                <div className="p-2 flex items-center gap-2">
                  <span className="text-secondaryText text-xs font-normal font-poppins">
                    Denture type:
                  </span>
                  <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                    {orderDetails?.doctorOrderItems?.find(
                      (item) => item.dropdown?.type === "Denture"
                    )?.dropdown?.name || "N/A"}
                  </span>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <span className="text-secondaryText text-xs font-normal font-poppins">
                    Surgical guide:
                  </span>
                  <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                    {orderDetails?.doctorOrderItems?.find(
                      (item) => item.dropdown?.type === "Surgical guide"
                    )?.dropdown?.name || "N/A"}
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
                    {orderDetails?.doctorOrderItems?.find(
                      (item) => item.dropdown?.type === "Crown"
                    )?.dropdown?.name || "N/A"}
                  </span>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <span className="text-secondaryText text-xs font-normal font-poppins">
                    Material:
                  </span>
                  <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                    {orderDetails?.doctorOrderItems?.find(
                      (item) => item.dropdown?.type === "Material"
                    )?.dropdown?.name || "N/A"}
                  </span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-gray-200">
                <div className="p-2 flex items-center gap-2">
                  <span className="text-secondaryText text-xs font-normal font-poppins">
                    Shade:
                  </span>
                  <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                    {orderDetails?.doctorOrderItems
                      ?.filter((item) => item.dropdown?.type === "Shade")
                      ?.map((item) => item.dropdown?.name)
                      ?.join(", ") || "N/A"}
                  </span>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <span className="text-secondaryText text-xs font-normal font-poppins">
                    Digital Model Type:
                  </span>
                  <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                    {orderDetails?.doctorOrderItems?.find(
                      (item) => item.dropdown?.type === "Digital Model Type"
                    )?.dropdown?.name || "N/A"}
                  </span>
                </div>
              </div>

              {/* Row 4 */}
              <div className="p-2 flex items-center gap-2">
                <span className="text-secondaryText text-xs font-normal font-poppins">
                  Dental Lab Alliance:
                </span>
                <span className="text-secondaryBrand capitalize font-normal text-xs font-poppins">
                  {orderDetails?.doctorOrderItems?.find(
                    (item) => item.dropdown?.type === "Participating Lab"
                  )?.dropdown?.name || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <h3 className="font-normal text-xs font-poppins text-black pb-2 border-b-2 border-gray-200">
              Additional Notes
            </h3>
            <div className="pt-2">
              <p className="text-secondaryText text-xs font-normal font-poppins">
                {orderDetails?.additionalNotes ||
                  "Please ensure shade A2 is used for all anterior crowns. Adjust occlusion slightly to reduce pressure on implant #11. Patient prefers a natural matte finish rather than high gloss."}
              </p>
            </div>
          </div>
        </div>
        {/* End of PDF Content */}
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
            disabled={true}
          />
        </div>

        <div className="relative mt-4">
          <div className="bg-white p-4  shadow-lg">
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
