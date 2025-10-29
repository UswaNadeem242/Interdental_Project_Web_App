function ViewDetail({ onClose, userData }) {
  if (!userData) return null;

  const [firstName, ...rest] = userData.name?.trim().split(" ") || [];
  const lastName = rest.join(" ");

  return (
    <div className="p-6 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-sm font-bold font-poppins text-[#333A44] mb-1">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            readOnly
            className="border rounded-md px-3 py-2 focus:outline-none text-sm "
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-sm font-bold font-poppins text-[#333A44] mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            readOnly
            className="border rounded-md px-3 py-2 focus:outline-none text-sm "
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col mt-4">
        <label className="text-sm font-bold font-poppins text-[#333A44] mb-1">
          Email
        </label>
        <input
          type="text"
          value={userData.email}
          readOnly
          className="border rounded-md px-3 py-2 focus:outline-none text-sm "
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col mt-4">
        <label className="text-sm font-bold font-poppins text-[#333A44] mb-1">
          Phone Number
        </label>
        <input
          type="text"
          value={userData.phone}
          readOnly
          className="border rounded-md px-3 py-2 focus:outline-none text-sm "
        />
      </div>

      {/* Address */}
      <div className="flex flex-col mt-4">
        <label className="text-sm font-bold font-poppins text-[#333A44] mb-1">
          Address
        </label>
        <input
          type="text"
          value={userData.address}
          readOnly
          className="border rounded-md px-3 py-2 focus:outline-none text-sm "
        />
      </div>
    </div>
  );
}

export default ViewDetail;
