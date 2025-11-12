import React from "react";

function AccountDetailForm({
  name,
  email,
  buttonText,
  icon,
  onButtonClick,
  isLoading,
  isActive,
  button,
  bg,
}) {
  // Determine button colors based on action
  const isActivateButton = !isActive; // Button shows "Activate" when status is not active

  const buttonClasses = isActivateButton
    ? "w-full text-center text-xs font-medium text-[#1E7C79] bg-[#4ECC530D]   py-2 px-6 rounded-md border-[#1E7C79] border hover:bg-[#4ECC531A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    : "w-full text-center text-xs font-medium text-[#D4BE16] bg-[#FFE30D1A] py-2 px-6 rounded-md border-[#D4BE16] border hover:bg-[#FFE30D2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-col gap-4 rounded-2xl h-full border-2 p-4 ">
      {/* Profile Information Section */}
      <div
        className={`flex flex-col items-center gap-4 p-2 bg-[#F8F8F8]  rounded-2xl ${bg}`}
      >
        <div className="flex-shrink-0">
          <img
            src={icon}
            alt={name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#0000000D]"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <h1 className="text-xl font-bold text-[#000000] capitalize">
            {name}
          </h1>
          <h3 className="text-sm font-medium text-secondaryText">{email}</h3>
        </div>
      </div>

      {/* Deactivate/Activate Account Button */}
      <div className={`${button}`}>
        <button onClick={onButtonClick} className={buttonClasses}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default AccountDetailForm;
