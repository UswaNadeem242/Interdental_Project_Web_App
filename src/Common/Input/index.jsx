// export default function TextInput({
//     id,
//     name,
//     label,
//     placeholder,
//     type = "text",
//     icon,
// }) {
//     return (
//         <div className="w-full">
//             {label && (
//                 <label
//                     htmlFor={id}
//                     className="block md:text-sm text-xs font-medium text-primaryText mb-2"
//                 >
//                     {label}
//                 </label>
//             )}
//             <div className="flex items-center rounded-md border border-borderPrimary px-3  ">
//                 <input
//                     id={id}
//                     name={name}
//                     type={type}
//                     placeholder={placeholder}
//                     className="block w-full bg-white py-2 px-2 text-base text-primaryText placeholder:text-secondaryText md:placeholder:text-sm placeholder:text-xs  font-poppins focus:outline-none sm:text-sm"
//                 />
//                 {icon && <div className="ml-2 text-gray-500">{icon}</div>}

//             </div>
//         </div>
//     );
// }
export default function TextInput({
  id,
  name,
  label,
  placeholder,
  type = "text",
  icon,
  value,
  onChange,
  onBlur,
  className,
  className2,
  className3
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`block md:text-sm text-xs font-medium text-primaryText mb-2 ${className}`}
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center rounded-md border border-borderPrimary ${className2}`}
      >
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full bg-white py-2 px-2 text-base text-primaryText placeholder:text-secondaryText md:placeholder:text-sm placeholder:text-xs  font-poppins focus:outline-none sm:text-sm ${className3}`}
        />
        {icon && <div className="ml-2 text-gray-500">{icon}</div>}
      </div>
    </div>
  );
}
