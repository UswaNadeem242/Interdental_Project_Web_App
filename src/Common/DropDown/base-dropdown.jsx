import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useFloating, offset, flip, shift } from "@floating-ui/react";
import { useCallback, useEffect } from "react";

/**
 * Scroll close handler component - closes dropdown on scroll
 */
const ScrollCloseHandler = ({ open, close }) => {
  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      close();
    };

    // Listen to scroll events with capture phase to catch all scroll events
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      document.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [open, close]);

  return null;
};

/**
 * Base dropdown component for action menus using Headless UI Menu with Floating UI for positioning
 * @param {Object} props
 * @param {Array} props.actionMenuItems - Array of action menu items
 * @param {Object} props.rowData - The row data item
 * @param {ReactNode} props.triggerButton - Custom trigger button (optional)
 */
export const ActionMenuDropdown = ({
  actionMenuItems = [],
  rowData,
  triggerButton,
}) => {
  // Floating UI configuration for automatic positioning with edge detection
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end", // Start with bottom-right, will auto-flip
    middleware: [
      offset(4), // 4px gap from trigger
      flip({ // Automatically flip to top if not enough space below
        fallbackPlacements: ["top-end", "bottom-start", "top-start"],
      }),
      shift({ // Shift to keep within viewport
        padding: 8,
      }),
    ],
  });

  // Stable ref callback to prevent re-renders
  const setReferenceRef = useCallback((node) => {
    refs.setReference(node);
  }, []); // refs.setReference is stable, no need to include it in deps

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open, close }) => (
        <>
          <ScrollCloseHandler open={open} close={close} />
          {triggerButton ? (
            <MenuButton
              ref={setReferenceRef}
              as="div"
              className="inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              {triggerButton}
            </MenuButton>
          ) : (
            <MenuButton
              ref={setReferenceRef}
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </MenuButton>
          )}

          <MenuItems
            ref={refs.setFloating}
            style={floatingStyles}
            className="min-w-44 rounded-md bg-white border border-gray-200 shadow-lg z-[60] focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              {actionMenuItems.map((menuItem, menuIndex) => {
                const label =
                  typeof menuItem.label === "function"
                    ? menuItem.label(rowData)
                    : menuItem.label;
                const icon =
                  typeof menuItem.icon === "function"
                    ? menuItem.icon(rowData)
                    : menuItem.icon;
                const isDisabled =
                  typeof menuItem.disabled === "function"
                    ? menuItem.disabled(rowData)
                    : menuItem.disabled || false;
                const variant =
                  typeof menuItem.variant === "function"
                    ? menuItem.variant(rowData)
                    : menuItem.variant || "default";
                const textColor =
                  typeof menuItem.textColor === "function"
                    ? menuItem.textColor(rowData)
                    : menuItem.textColor;
                const iconColor =
                  typeof menuItem.iconColor === "function"
                    ? menuItem.iconColor(rowData)
                    : menuItem.iconColor;

                // Determine text color class
                let textColorClass = "text-gray-700";
                if (textColor) {
                  textColorClass = textColor;
                } else if (variant === "destructive") {
                  textColorClass = "text-red-500 hover:text-red-600";
                }

                // Determine icon color class (use textColor if iconColor not specified)
                const iconColorClass = iconColor || textColorClass;

                return (
                  <MenuItem key={menuIndex} disabled={isDisabled}>
                    {({ active, disabled }) => (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!disabled) {
                            menuItem.onClick(rowData);
                          }
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-poppins capitalize font-normal flex items-center gap-2 ${
                          active && !disabled ? "bg-background" : ""
                        } ${textColorClass} ${
                          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                        disabled={disabled}
                      >
                        {icon && (
                          <span className={`flex items-center ${iconColorClass}`}>
                            {icon}
                          </span>
                        )}
                        <span className="whitespace-nowrap">{label}</span>
                      </button>
                    )}
                  </MenuItem>
                );
              })}
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
};

// Legacy export for backward compatibility
export const AcctStatusDropDown = ActionMenuDropdown;
