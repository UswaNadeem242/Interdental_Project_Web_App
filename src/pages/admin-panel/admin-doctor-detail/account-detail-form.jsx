import React from "react";

function AccountDetailForm({ name, email, buttonText, icon }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl h-full shadow p-4">
      {/* Profile Information Section */}
      <div className="flex items-center gap-4 p-4 bg-[#F8F8F8] rounded-2xl">
        <div className="flex-shrink-0">
          <img 
            src={icon} 
            alt={name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-[#0000000D]"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <h1 className="text-xl font-bold text-[#000000] capitalize">{name}</h1>
          <h3 className="text-sm font-medium text-secondaryText">{email}</h3>
        </div>
      </div>
      
      {/* Deactivate Account Button */}
      <button className="w-full text-center text-xs font-medium text-[#D4BE16] bg-[#FFE30D1A] py-2 px-6 rounded-md border-[#D4BE16] border hover:bg-[#FFE30D2A] transition-colors">
        {buttonText}
      </button>
    </div>
  );
}

export default AccountDetailForm;
