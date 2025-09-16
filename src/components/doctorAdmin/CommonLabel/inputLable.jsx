export default function LabeledInput({
    label,
    placeholder,
    value,
    onChange,
    required,
    type = "text",
    name,
}) {
    return (
        <div className="space-y-2">
            {/* {label && (
                <label className="block text-xs font-semibold text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )} */}
            <input
                type={type}
                name={name}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-[#949494]outline-none transition-shadow  outline-none placeholder:font-poppins placeholder:text-[10px] placeholder:capitalize"
            />
        </div>
    );
}
