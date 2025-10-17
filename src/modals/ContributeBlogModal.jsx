import React, { useEffect, useState } from "react";
import Icons from "../components/Icons";

const ContributeBlogModal = ({ isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    office: "",
    topicIdea: "",
    file: null,
  });

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      office: "",
      topicIdea: "",
      file: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        file: e.target.files[0],
      }));
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.office || !formData.topicIdea) {
      alert("Please fill in all required fields");
      return;
    }

    // Handle form submission logic here
    console.log("Form submitted:", formData);

    // Close modal after successful submission
    handleCloseModal();
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icons.Close className="w-6 h-6" fill="currentColor" />
        </button>

        {/* Modal Content */}
        <div className="p-8 md:p-12">
          {/* Header */}
          <h2 className="font-poppins font-semibold text-2xl md:text-3xl text-[#0F153E] mb-2">
            Become a Contributing Doctor
          </h2>
          <div className="w-full h-[1px] bg-gray-200 mb-8"></div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block font-poppins font-medium text-[#434343] text-sm md:text-base mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 border border-[#624C7926] rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-sm md:text-base"
              />
            </div>

            {/* Office Field */}
            <div>
              <label className="block font-poppins font-medium text-[#434343] text-sm md:text-base mb-2">
                Office (clinic/lab name)
              </label>
              <input
                type="text"
                name="office"
                value={formData.office}
                onChange={handleInputChange}
                placeholder="Enter Office (clinic/lab name)"
                className="w-full px-4 py-3 border border-[#624C7926] rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-sm md:text-base"
              />
            </div>

            {/* Topic Idea Field */}
            <div>
              <label className="block font-poppins font-medium text-[#434343] text-sm md:text-base mb-2">
                Topic idea
              </label>
              <textarea
                name="topicIdea"
                value={formData.topicIdea}
                onChange={handleInputChange}
                placeholder="Enter a Topic idea"
                rows="4"
                className="w-full px-4 py-3 border border-[#624C7926] rounded-xl outline-none focus:border-[#001D58] transition-colors resize-none font-poppins text-sm md:text-base"
              />
            </div>

            {/* File Upload Field */}
            <div>
              <label className="block font-poppins font-medium text-[#434343] text-sm md:text-base mb-2">
                Add any supporting images, documents, or article drafts
              </label>

              {formData.file ? (
                <div className="border-2 border-dashed border-[#001D58] rounded-xl p-6  flex items-center justify-between bg-blue-50/30">
                  <div className="flex items-center gap-3">
                    <Icons.FileIcon className="w-10 h-10" fill="#001D58" />
                    <div>
                      <p className="font-poppins text-sm font-medium text-[#434343]">
                        {formData.file.name}
                      </p>
                      <p className="font-poppins text-xs text-gray-500">
                        {(formData.file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Icons.Close className="w-5 h-5" fill="currentColor" />
                  </button>
                </div>
              ) : (
                <label className="border-2 py-10 border-dashed border-[#00000014] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#001D58] transition-colors">
                  <div className="text-center">
                    <span className="font-poppins text-[#001D58] font-normal text-sm md:text-base">
                      + upload file / URL
                    </span>
                    <p className="font-poppins text-xs text-gray-400 mt-1">
                      accept pdf, png, JPG
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#001D58] text-white font-poppins font-semibold text-sm md:text-base py-4 rounded-full hover:bg-[#002575] transition-colors shadow-lg"
              >
                Contribute Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContributeBlogModal;
