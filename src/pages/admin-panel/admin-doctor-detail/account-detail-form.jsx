import React from "react";

function AccountDetailForm({ name, email, buttonText, icon }) {
  return (
    <div className="flex p-4 flex-col items-center gap-2 rounded-2xl border-2 border-[#0000000D]">
      <span className="rounded-full border-2">
        <img src={icon} alt="dasdsa" />
      </span>
      <h1 className="text-xl font-bold text-[#000000]">{name}</h1>
      <h3 className="text-sm font-medium text-secondaryText">{email}</h3>
      <span className="w-full text-center text-xs font-medium text-[#D4BE16] bg-[#FFE30D1A] py-2 px-6  rounded-md border-[#D4BE16] border">
        <button className="">{buttonText}</button>
      </span>
    </div>
  );
}

export default AccountDetailForm;
