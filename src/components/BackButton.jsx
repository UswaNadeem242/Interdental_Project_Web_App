import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

/**
 * BackButton Component
 *
 * A reusable back button component that navigates to the previous page or executes a custom action.
 *
 * @param {Object} props - Component props
 * @param {Function} [props.onClick] - Custom click handler. If not provided, navigates back in history
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.text='Back'] - Button text
 * @param {boolean} [props.showIcon=true] - Whether to show the chevron icon
 * @param {'default'|'minimal'|'rounded'} [props.variant='default'] - Button style variant
 *
 * @example
 * // Basic usage
 * <BackButton />
 *
 * @example
 * // Custom text and style
 * <BackButton text="Go Back" variant="rounded" />
 *
 * @example
 * // Custom navigation
 * <BackButton onClick={() => navigate('/shop')} text="Back to Shop" />
 */
const BackButton = ({
  onClick,
  className = "",
  text = "Back",
  showIcon = true,
  variant = "default", // 'default', 'minimal', 'rounded'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  const getChevronStyles = () => {
    const baseStyles =
      "flex items-center justify-center w-8 h-8 text-gray-700 transition-all duration-200 cursor-pointer";

    switch (variant) {
      case "minimal":
        return `${baseStyles} hover:text-gray-900`;
      case "rounded":
        return `${baseStyles} bg-white hover:bg-gray-50 rounded-md`;
      default:
        return `${baseStyles} bg-gray-100 hover:bg-gray-200 rounded-md hover:shadow-sm`;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-3 ${className}`}
      type="button"
    >
      {showIcon && (
        <div className={getChevronStyles()}>
          <ChevronLeftIcon className="w-5 h-5" />
        </div>
      )}
      <span className="font-medium text-gray-700">{text}</span>
    </button>
  );
};

export default BackButton;
