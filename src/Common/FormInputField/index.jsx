import { Field } from "formik";
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  className = "",
  value,
  onChange,
  readOnly,
  disabled,
  min,
  max,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 whitespace-nowrap text-[#949494] font-normal"
        >
          {label}
        </label>
      )}

      <Field name={name}>
        {({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            value={value ?? field.value}         // ✅ allow external control or Formik fallback
            onChange={onChange ?? field.onChange} // ✅ custom or Formik handler
            readOnly={readOnly}
            disabled={disabled}
            min={min}
            max={max}
            className="py-2 pl-2 border-2 border-[#0000001A] rounded-md focus:outline-none placeholder-[#949494] placeholder:font-poppins placeholder:text-[10px] placeholder:capitalize cursor-not-allowed bg-background"
          />
        )}
      </Field>
    </div>
  );
};

export default InputField;
