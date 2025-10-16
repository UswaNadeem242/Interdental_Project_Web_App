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

export default function OrderDetailsForm({ id }) {
  const [selected, setSelected] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const restoration = useSelector((state) => state.restoration);
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
  // Use selectedTooths from orderDetails instead of local state
  // No tooth selection needed - display only
  const maskName = (name) => {
    if (!name?.trim()) return "Unknown";
    const clean = name.trim();
    return (
      clean.slice(0, 2).charAt(0).toUpperCase() +
      clean.slice(1, 2).toLowerCase()
    );
  };

  const maskLastName = (lastName) => {
    if (!lastName?.trim()) return "Unknown";
    const clean = lastName.trim();
    return (
      clean.slice(0, 2).charAt(0).toUpperCase() +
      clean.slice(1, 2).toLowerCase()
    );
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

    const downloadBtn = element.querySelector(".no-print");
    if (downloadBtn) {
      downloadBtn.style.display = "none";
      console.log("Button hidden"); // Add this to debug
    }

    // ✅ Capture fast (optimized settings)
    const canvas = await html2canvas(element, {
      scale: 1.5, // Lower scale → faster render, still clear enough
      useCORS: true,
      backgroundColor: "#ffffff", // Ensures white background
      logging: false,
      removeContainer: true,
    });

    // ✅ Restore button visibility
    if (downloadBtn) downloadBtn.style.display = "block";

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Implant_Design_Form_${Date.now()}.pdf`);
  };


  return (
    <div className="grid md:grid-cols-12 col-span-6  gap-4 mt-7 ">
      <div className="md:col-span-8 col-span-4 bg-white p-4 rounded-2xl" ref={formRef}>
        <div className="flex justify-between items-center pb-4">
          <div>
            <h4 className="text-[#1A1A1A] font-semibold text-sm font-poppins" >
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
          <button
            onClick={handleDownloadPDF}
            className="border text-secondaryBrand font-medium text-xs border-secondaryBrand rounded-full px-6 py-3 no-print"
          >
            Download Form
          </button>

        </div>

        <div >
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
                  {`${maskName(orderDetails?.doctorFirstName)}${maskLastName(
                    orderDetails?.doctorLastName
                  )}`}

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
                  {/* {formatDate(orderDetails?.expectedDeliveryDate)}
                   */}

                  {formatDate(doctor?.dueDate)}
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
                  {`${maskName(orderDetails?.patientFirstName)}${maskLastName(
                    orderDetails?.patientLastName
                  )}`}
                </p>
              </div>   <div>
                <p className="text-secondaryText    mb-2 font-normal md:text-sm text-xs font-poppins">
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
            <p className="text-sm font-medium font-poppins text-primaryText mb-4">
              Tooth Selection  <span className="font-semibold">
                {orderDetails?.selectedTooths > 0
                  ? orderDetails?.selectedTooths.map((t) => `#${t}`).join(", ")
                  : "None"}
              </span>
            </p>
            <div className="py-4">
              {/* <img src="/assets/doctor/teeth.png" alt="image" /> */}
              <TeethSelection
                selectedTeeth={orderDetails?.selectedTooths || []}
                onToothSelect={() => { }} // No selection needed - display only
                showIds={true}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
            <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText">
              Customization Details
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base pb-2">
              <div>
                <p className="text-secondaryText    mb-2  font-normal md:text-sm text-xs font-poppins">
                  Material:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  Miles
                </p>
              </div>
              <div>
                <p className="text-secondaryText    mb-2 font-normal md:text-sm text-xs font-poppins">
                  Colour:
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  Esther
                </p>
              </div>

              <div>
                <p className="text-secondaryText    mb-2 font-normal md:text-sm text-xs font-poppins">
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
                <p className="text-secondaryText    mb-2 font-normal md:text-sm text-xs font-poppins">
                  Manufacturer
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  Miles
                </p>
              </div>
              <div>
                <p className="text-secondaryText    mb-2 font-normal md:text-sm text-xs font-poppins">
                  Manufacture Process
                </p>
                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                  Esther
                </p>
              </div>
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
                  {`${maskName(orderDetails?.doctorFirstName)}${maskLastName(
                    orderDetails?.doctorLastName
                  )}`}:

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
