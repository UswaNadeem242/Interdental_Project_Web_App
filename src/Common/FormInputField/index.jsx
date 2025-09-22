export function InputField({ label, type = "text", className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label className="whitespace-nowrap text-[#949494] font-normal">
        {label}
      </label>
      <input
        type={type}
        className={`py-2 pl-2  flex-1 border-2 border-[#0000001A] focus:outline-none `}
      />
    </div>
  );
}
