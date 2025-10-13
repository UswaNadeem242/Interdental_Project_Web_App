// import React, { useState } from "react";
// import { ErrorMessage } from "formik";

// const TagInput = ({ field, form }) => {
//   const [inputValue, setInputValue] = useState("");

//   const addTag = (e) => {
//     e.preventDefault();
//     const trimmed = inputValue.trim();
//     if (trimmed && !field.value.includes(trimmed)) {
//       form.setFieldValue(field.name, [...field.value, trimmed]);
//     }
//     setInputValue("");
//   };

//   const removeTag = (indexToRemove) => {
//     const updatedTags = field.value.filter(
//       (_, index) => index !== indexToRemove
//     );
//     form.setFieldValue(field.name, updatedTags);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       addTag(e);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="flex flex-wrap items-center border border-[#00000014] rounded-lg px-3 py-2 gap-2 min-h-[46px]">
//         {/* Display Tags */}
//         {field.value.map((tag, index) => (
//           <div
//             key={index}
//             className="flex items-center bg-gray-100 rounded-md px-2 py-1 text-sm text-gray-600"
//           >
//             <span>{tag}</span>
//             <button
//               type="button"
//               className="ml-2 text-gray-500 hover:text-gray-700"
//               onClick={() => removeTag(index)}
//             >
//               ✕
//             </button>
//           </div>
//         ))}

//         {/* Input Field */}
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Type and press Enter"
//           className="flex-grow border-none focus:ring-0 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
//         />
//       </div>

//       {/* Validation Message */}
//       <ErrorMessage
//         name={field.name}
//         component="div"
//         className="text-red-500 text-xs mt-1"
//       />
//     </div>
//   );
// };

// export default TagInput;

import React, { useState } from "react";
import { Xmark } from "../../icon/xmark";

const TagInput = ({ value = [], onChange }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap items-center  text-sm  font-poppins border-2 rounded-md px-3 py-3 mb-2">
      {value.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2 "
        >
          <span>{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-2 text-gray-500 hover:text-red-500"
          >
            <span className="text-gray-950 ">
              <Xmark />
            </span>
          </button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tag"
        className="flex-grow focus:outline-none py-1"
      />
    </div>
  );
};

export default TagInput;
