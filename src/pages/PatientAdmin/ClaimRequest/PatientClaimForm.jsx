import { CloudUpload } from "../../../icon/CloudUpload";

export default function PatientClaimForm() {
  return (
    <div className="bg-bgWhite">
      <form className="space-y-5 font-poppins">
        {/* Product Name */}
        <div>
          <label className="block text-sm mb-1  text-[#333A44]  font-semibold">
            Product Name
          </label>
          <select className="w-full rounded-md border text-[#737791]  border-borderPrimary px-3 py-2 text-sm focus:outline-none">
            <option className="">Select Product</option>
          </select>
        </div>

        {/* Purchase Date */}
        <div>
          <label className="block text-sm  text-[#333A44]  font-semibold mb-1">
            Purchase Date
          </label>
          <input
            type="date"
            className="w-full rounded-md border text-[#737791] border-gray-300 px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm  text-[#333A44]  font-semibold mb-1">
            Quantity
          </label>
          <input
            type="number"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Reason for Claim */}
        <div>
          <label className="block text-sm  text-[#333A44]  font-semibold mb-1">
            Reason for Claim
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Upload Supporting Documents */}
        <div>
          <label className="block text-sm text-[#333A44]  font-semibold mb-2">
            Upload Supporting Documents
          </label>
          {/* Hidden file input */}
          <input id="file-upload" type="file" className="hidden" />

          {/* Styled label as button */}
          <label
            htmlFor="file-upload"
            className="flex items-center w-fit gap-2 px-4 py-3 rounded-md border border-gray-300 bg-[#F8F8F8]  text-sm font-medium text-gray-700 cursor-pointer"
          >
            {/* Upload Icon (SVG) */}
            <CloudUpload />
            Update Photo
          </label>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm  text-[#333A44]  font-semibold mb-1">
            Additional Notes
          </label>
          <textarea
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="button"
          className="w-full bg-[#001F54] text-white font-medium rounded-full py-3 text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
}
