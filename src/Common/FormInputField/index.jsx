export function InputField({ label, type = "text", className = "" }) {
  return (
    <div className="flex items-center">
      <label className="whitespace-nowrap">{label}:</label>
      <input
        type={type}
        className={`mt-4 ml-2 flex-1 border-b border-gray-400 focus:outline-none ${className}`}
      />
    </div>
  );
}
