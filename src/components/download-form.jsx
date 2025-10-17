import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ImplantDesignForm = () => {
    const formRef = useRef();

    const handleDownloadPDF = async () => {
        const element = formRef.current;

        // Use html2canvas to capture the component as an image
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Implant_Design_Form.pdf");
    };

    return (
        <div className="p-6">
            {/* Download Button */}
            <button
                onClick={handleDownloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md mb-4"
            >
                Download PDF
            </button>

            {/* The form content to convert */}
            <div ref={formRef} className="bg-white shadow-md border rounded-md p-5 w-[800px] mx-auto">
                <h2 className="text-lg font-semibold mb-4">Implant Design Form</h2>

                {/* Doctor Info */}
                <section className="border rounded-md p-4 mb-4">
                    <h3 className="font-semibold mb-2">Doctor Info</h3>
                    <div className="grid grid-cols-4 text-sm gap-2">
                        <div>
                            <p className="text-gray-500">Doctor’s Name</p>
                            <p className="font-semibold text-blue-700">StAn</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Office Reference Number</p>
                            <p className="font-semibold text-blue-700">03*****32</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Create Date</p>
                            <p className="font-semibold text-blue-700">16/22/2026</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Case Expected Due Date</p>
                            <p className="font-semibold text-blue-700">20/22/2026</p>
                        </div>
                    </div>
                </section>

                {/* Patient Info */}
                <section className="border rounded-md p-4 mb-4">
                    <h3 className="font-semibold mb-2">Patient Information</h3>
                    <div className="grid grid-cols-2 text-sm gap-2">
                        <div>
                            <p className="text-gray-500">Patient’s Name</p>
                            <p className="font-semibold text-blue-700">MiEs</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Subscription ID</p>
                            <p className="font-semibold text-blue-700">466437#</p>
                        </div>
                    </div>
                </section>

                {/* Tooth Selection */}
                <section className="border rounded-md p-4 mb-4">
                    <h3 className="font-semibold mb-2">Tooth Selection</h3>
                    <img
                        src="/assets/teeth-diagram.png"
                        alt="Tooth Selection"
                        className="w-full object-contain"
                    />
                </section>

                {/* Customization Details */}
                <section className="border rounded-md p-4 mb-4">
                    <h3 className="font-semibold mb-2">Customization Details</h3>
                    <div className="grid grid-cols-3 text-sm gap-4">
                        <div>
                            <p className="text-gray-500">Material</p>
                            <p className="font-semibold text-blue-700">Miles</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Colour</p>
                            <p className="font-semibold text-blue-700">Esther</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Type</p>
                            <p className="font-semibold text-blue-700">466437#</p>
                        </div>
                    </div>
                </section>

                {/* Notes */}
                <section className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-sm text-gray-700">Dr. Weed Bran</p>
                    <p className="text-sm text-blue-700">
                        Kindly use strong material for the upper teeth for better.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ImplantDesignForm;
