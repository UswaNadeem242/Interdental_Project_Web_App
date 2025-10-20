import { useState } from "react";
import { SecondaryButton } from "../../../Common/Button";

function AddNoteForm() {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleSend = () => {
    const alphabetCount = (note.match(/[a-zA-Z]/g) || []).length;

    if (alphabetCount === 0) {
      setError("Note cannot be empty.");
    } else if (alphabetCount < 5) {
      setError("Note must contain at least 5 alphabetic characters.");
    } else {
      setError("");

      setNote("");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setNote(value);

    const alphabetCount = (value.match(/[a-zA-Z]/g) || []).length;

    if (alphabetCount >= 5) {
      setError("");
    } else if (alphabetCount === 0) {
      setError("Note cannot be empty.");
    } else {
      setError("Note must contain at least 5 alphabetic characters.");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="font-poppins">
        <p className="text-sm font-bold text-[#333A44] mb-4">My Notes</p>

        <textarea
          placeholder="Add a note"
          value={note}
          onChange={handleChange}
          className={`w-full h-44 p-4 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none shadow-sm placeholder-gray-400 text-gray-700 ${
            error
              ? "border-red-400 focus:ring-red-300"
              : "border-[#E5E5E5] focus:ring-blue-400"
          }`}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div>
        <SecondaryButton
          title="Send to Email"
          onClick={handleSend}
          className="text-base font-bold text-white bg-[#001D58] px-36 py-4 rounded-full w-full text-center"
        />
      </div>
    </div>
  );
}

export default AddNoteForm;
