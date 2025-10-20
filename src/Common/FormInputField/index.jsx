// export function InputField({ label, type = "text", className = "" }) {
//   return (
//     <div className={`flex items-center gap-2 ${className}`}>
//       <label className="whitespace-nowrap text-[#949494] font-normal">
//         {label}
//       </label>
//       <input
//         type={type}
//         className={`py-2 pl-2  flex-1 border-2 border-[#0000001A] focus:outline-none `}
//       />
//     </div>
//   );
// }



// import { Field, ErrorMessage } from "formik";

// export function InputField({ label, name, type = "text", className = "" }) {
//   return (
//     <div className={`flex flex-col ${className}`}>
//       <label
//         htmlFor={name}
//         className="mb-1 whitespace-nowrap text-[#949494] font-normal"
//       >
//         {label}
//       </label>

//       {/* Formik Field binds value & onChange automatically */}
//       <Field
//         id={name}
//         name={name}
//         type={type}
//         className="py-2 pl-2 border-2 border-[#0000001A] rounded-md focus:outline-none"
//       />

//       {/* Show validation error */}
//       <ErrorMessage
//         name={name}
//         component="div"
//         className="text-red-500 text-sm mt-1"
//       />
//     </div>
//   );
// }




// import { Field, ErrorMessage } from "formik";

// export function InputField({ label, name, type = "text", className = "", placeholder }) {
//   return (
//     <div className={`flex flex-col ${className}`}>
//       <label
//         htmlFor={name}
//         className="mb-1 whitespace-nowrap text-[#949494] font-normal"
//       >
//         {label}
//       </label>

//       <Field
//         id={name}
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         className="py-2 pl-2 border-2 border-[#0000001A] rounded-md focus:outline-none"
//       />

//       <ErrorMessage
//         name={name}
//         component="div"
//         className="text-red-700 text-sm mt-1"
//       />
//     </div>
//   );
// }



import { Field, ErrorMessage } from "formik";

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
            className="py-2 pl-2 border-2 border-[#0000001A] rounded-md focus:outline-none placeholder-[#949494] placeholder:font-poppins placeholder:text-[10px] placeholder:capitalize"
          />
        )}
      </Field>

      {/* <ErrorMessage
        name={name}
        component="div"
        className="text-red-700 text-sm mt-1"
      /> */}
    </div>
  );
};

export default InputField;
