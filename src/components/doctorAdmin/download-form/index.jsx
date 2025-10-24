import { useEffect, useRef, useState } from "react";
import DropDownComponent from "../../../Common/DropDown";
// import { options, ShippingDetail } from "../../../../Constant";
import CardIcon from "../../../icon/CardIcon";
import TeethSelection from "../../../components/doctorAdmin/TeethSelection";
import { getOrderByID } from "../../../api/doctorDasboard";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadPdfForm({ id }) {
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
  // download the pdf
  // const handleDownloadPDF = async () => {
  //   const element = formRef.current;
  //   const downloadBtn = element.querySelector(".no-print");
  //   if (downloadBtn) {
  //     downloadBtn.style.display = "none";
  //     console.log("Button hidden"); // Add this to debug
  //   }
  //   // ✅ Capture fast (optimized settings)
  //   const canvas = await html2canvas(element, {
  //     scale: 1.5, // Lower scale → faster render, still clear enough
  //     useCORS: true,
  //     backgroundColor: "#ffffff", // Ensures white background
  //     logging: false,
  //     removeContainer: true,
  //   });

  //   // ✅ Restore button visibility
  //   if (downloadBtn) downloadBtn.style.display = "block";

  //   const imgData = canvas.toDataURL("image/jpeg", 0.95);
  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save(`Implant_Design_Form.pdf`);
  // };
  const handleDownloadPDF = async () => {
    const element = formRef.current;
    const downloadBtn = element.querySelector(".no-print");

    // Hide the download button during capture
    if (downloadBtn) downloadBtn.style.display = "none";

    // Wait a moment for reflow
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Capture the full element, not just the visible part
    const canvas = await html2canvas(element, {
      scale: 2, // High quality
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY, // Prevent cropping
    });

    // Restore the button
    if (downloadBtn) downloadBtn.style.display = "block";

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add the first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add extra pages as needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("Implant_Design_Form.pdf");
  };

  const totalPrice = toothSelections.reduce((toothSum, tooth) => {
    // for each tooth, sum its fields that have price
    const toothTotal = Object.values(tooth)
      .filter((field) => field && typeof field === "object" && field.price)
      .reduce((sum, field) => sum + field.price, 0);

    return toothSum + toothTotal;
  }, 0);

  return (
    <div className="grid md:grid-cols-12 col-span-6  gap-4 mt-7 ">
      <div
        className="md:col-span-8 col-span-4 bg-white p-4 rounded-2xl"
        ref={formRef}
      >
        <div className="flex justify-between items-center pb-4">
          <div>
            <h4 className="text-[#1A1A1A] font-semibold text-sm font-poppins">
              Implant Design Form:
            </h4>
          </div>
        </div>

        <div>
          <div className="">
            <div className="grid grid-cols-2  gap-4 text-sm sm:text-base border-t border-x border-gray-200 p-4">
              <div className="flex gap-4 items-center">
                <p className="text-secondaryText   font-normal md:text-sm text-xs font-poppins">
                  Doctor Info
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins ">
                  {`${maskNamePart(
                    orderDetails?.doctorFirstName
                  )}${maskNamePart(orderDetails?.doctorLastName)}`}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <p className="text-secondaryText    mb-2  font-normal md:text-sm text-xs font-poppins whitespace-nowrap">
                  Office Registration
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {maskNumber(orderDetails?.doctorRefNumber) || "-"}
                </p>
              </div>
            </div>
            <div className=" border-t border-x border-gray-200 p-3">
              <div>
                <p className="text-secondaryText  font-normal md:text-sm text-xs font-poppins">
                  Patient Name:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {`${maskNamePart(
                    orderDetails?.patientFirstName
                  )}${maskNamePart(orderDetails?.patientLastName)}`}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2  gap-4 text-sm sm:text-base  border border-gray-200 p-3">
              <div>
                <p className="text-secondaryText  font-normal md:text-sm text-xs font-poppins">
                  Create Date
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {formatDate(orderDetails?.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-secondaryText mb-2 font-normal md:text-sm text-xs font-poppins">
                  Due Date
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  {/* {formatDate(orderDetails?.expectedDeliveryDate)}
                   */}

                  {formatDate(doctor?.dueDate)}
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
                {orderDetails?.selectedTooths > 0
                  ? orderDetails?.selectedTooths.map((t) => `#${t}`).join(", ")
                  : "None"}
              </span>
            </p>
            <div className="py-4">
              {/* <img src="/assets/doctor/teeth.png" alt="image" /> */}
              <TeethSelection
                selectedTeeth={orderDetails?.selectedTooths || []}
                onToothSelect={() => {}} // No selection needed - display only
                showIds={true}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="border border-gray-200  p-2">
            <div className="grid grid-cols-2 gap-8 text-sm sm:text-base whitespace-nowrap">
              <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
                <p className="text-secondaryText font-normal md:text-sm font-poppins">
                  Selected Smile Design:
                </p>
                <p className="font-normal text-secondaryBrand text-sm font-poppins">
                  Smile Design_7
                </p>
              </div>

              <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
                <p className="text-secondaryText font-normal md:text-sm text-xs font-poppins">
                  Scanner Type:{" "}
                </p>
                <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                  Not Available{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText">
              Customization Details
            </h3>

            <div className="border border-gray-200 p-2">
              <div className="grid grid-cols-2 gap-2 text-sm sm:text-base whitespace-nowrap border-b border-gray- pb-2">
                <div className="flex gap-2 items-center overflow-hidden text-ellipsis ">
                  <p className="text-secondaryText font-normal text-sm font-poppins">
                    Denture type:
                  </p>
                  <p className="font-normal text-secondaryBrand text-sm font-poppins">
                    Partial Denture
                  </p>
                </div>

                <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
                  <p className="text-secondaryText font-normal text-sm font-poppins">
                    Surgical guide:
                  </p>
                  <p className="font-normal text-secondaryBrand text-sm  font-poppins">
                    Not Available
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm sm:text-base whitespace-nowrap border-b border-gray-200 pb-2 ">
                <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
                  <p className="text-secondaryText font-normal text-sm font-poppins">
                    Smart Crown:
                  </p>
                  <p className="font-normal text-secondaryBrand text-sm font-poppins">
                    Full Crown
                  </p>
                </div>

                <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
                  <p className="text-secondaryText font-normal text-sm font-poppins">
                    Material:
                  </p>
                  <p className="font-normal text-secondaryBrand text-sm  font-poppins">
                    Ivovlar Prime Cad
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm sm:text-base whitespace-nowrap border-b border-gray-200 pb-2">
                <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
                  <p className="text-secondaryText font-normal only-of-type:text-sm font-poppins">
                    Shade:
                  </p>
                  <p className="font-normal text-secondaryBrand text-sm font-poppins">
                    A2 (Vita Classic Shades)
                  </p>
                </div>

                <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
                  <p className="text-secondaryText font-normal md:text-sm text-xs font-poppins">
                    Digital Model Type{" "}
                  </p>
                  <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                    full arch
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm whitespace-nowrap  pt-2">
                <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
                  <p className="text-secondaryText font-normal md:text-sm font-poppins">
                    Dental Lab Alliance:
                  </p>
                  <p className="font-normal text-secondaryBrand text-sm font-poppins">
                    Ceramic Arts Dental Lab
                  </p>
                </div>
              </div>
            </div>

            {selectedTeeth.map((toothId) => {
              const tooth = teeth[toothId] || {};

              return (
                <div key={toothId} className="  p-3 rounded-lg">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-[#949494] text-xs font-poppins">
                        Material:
                      </p>
                      <p className="font-bold text-secondaryBrand font-poppins text-xs">
                        {tooth.materialOption?.label || tooth.material || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#949494] text-xs font-poppins">
                        Scanner Type:
                      </p>
                      <p className="font-bold text-secondaryBrand font-poppins text-xs">
                        {tooth.scannerTypeOption?.label ||
                          tooth.scannerType ||
                          "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#949494] text-xs font-poppins">
                        Digital Denture:
                      </p>
                      <p className="font-bold text-secondaryBrand font-poppins text-xs">
                        {tooth?.digitalOptionsOption?.label ||
                          tooth?.digitalOptions ||
                          "N/A"}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-[#949494] text-xs font-poppins">
                        Surgical Guide:
                      </p>
                      <p className="font-bold text-secondaryBrand font-poppins text-xs">
                        {tooth?.surgical_guideOption?.label ||
                          tooth?.surgical_guide ||
                          "N/A"}
                      </p>
                    </div> */}
                    <div>
                      <p className="text-[#949494] text-xs font-poppins">
                        Digital Model:
                      </p>
                      <p className="font-bold text-secondaryBrand font-poppins text-xs">
                        {tooth?.digitalOptionsOption?.label ||
                          tooth?.digitalOptionsOption ||
                          "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#949494] text-xs font-poppins">
                        Laboratory:
                      </p>
                      <p className="font-bold text-secondaryBrand font-poppins text-xs">
                        {tooth?.labOption?.label || tooth?.labOption || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#949494] text-xs font-poppins">
                        Photogrammetry:
                      </p>
                      <p className="font-bold text-secondaryBrand font-poppins text-xs">
                        {tooth?.photogrammetryfilesOption?.label ||
                          tooth?.photogrammetryfilesOption ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText ">
              Additional Notes
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className=" text-sm sm:text-base pb-2">
              <div>
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
