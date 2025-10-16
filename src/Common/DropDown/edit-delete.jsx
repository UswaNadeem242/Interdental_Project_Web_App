import DeleteIcon from "../../icon/deleteIcon";
import PenIcon from "../../icon/PenIcon";

export const EditDeleteDropdownMenu = ({ onEdit, onDelete }) => {
    return (
        <div className="absolute right-0   w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <ul className="py-1 text-sm text-gray-700 font-poppins">
                <li
                    onClick={onEdit}
                    className="px-4 py-2 text-xs font-poppins capitalize font-normal hover:bg-background cursor-pointer flex items-center gap-4"
                >
                    <span><PenIcon /></span>   Edit
                </li>
                <li
                    onClick={onDelete}
                    className="px-4 py-2 hover:bg-background cursor-pointer text-red-500 flex items-center gap-4"
                >
                    <span><DeleteIcon /></span>
                    Delete
                </li>
            </ul>
        </div>
    );
};
