import { useState } from "react";
import { ToggleSwitch } from "./toogle-switch";
import {
  NameAddModal,
  NameAndPriceAddModal,
  SmileDesignAddModal,
} from "../../../modals/DentureAddOptionModal";
import ChevronDownIcon from "../../../icon/ChevronDownIcon";

function DropDownCard({
  id,
  title,
  type = "standard",
  data,
  showPrice,
  SmileDesignCard,
  smileData,
  shadesData,
  isModalOpen,
  onOpenAddModal,
  onCloseAddModal,
  isEditModalOpen,
  onOpenEditModal,
  onCloseEditModal,
  modalType,
  editModalType,
  setIsEditSidebarOpen,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const toggleHandler = () => {
    setIsChecked(!isChecked);
  };

  const getAddModalTitle = () => {
    return `Add Option for ${title}`;
  };
            title={getAddModalTitle()}
          />
        );
      case "smile-design":
        return (
          <SmileDesignAddModal
            onClose={onCloseAddModal}
            title={getAddModalTitle()}
          />
        );
      default:
        return null;
    }
  };

  // const renderEditModal = () => {
  //   if (!isEditModalOpen) return null;

  //   switch (editModalType) {
  //     case "name":
  //       return (
  //         <NameEditModal
  //           onClose={onCloseEditModal}
  //           title={getEditModalTitle()}
  //         />
  //       );
  //     case "name-price":
  //       return (
  //         <NameAndPriceEditModal
  //           onClose={onCloseEditModal}
  //           title={getEditModalTitle()}
  //         />
  //       );
  //     case "smile-design":
  //       return (
  //         <SmileDesignEditModal
  //           onClose={onCloseEditModal}
  //           title={getEditModalTitle()}
  //         />
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const renderShadesSection = () => {
    if (type !== "shades" || !shadesData) return null;

    //

    return (
      <div className="space-y-6">
        <div className="bg-background p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-tertiaryBrand mb-4">
            Vita Classic Shades
          </h3>
          <div className="flex gap-6 flex-wrap">
            {shadesData.vitaClassic?.map((shade, key) => (
              <ToggleSwitch
                key={shade.id || key}
                label={shade.name}
                initialState={true}
                price={shade.price}
                showPrice={showPrice}
                onClick={onOpenEditModal}
                compact={true}
                bgColor="bg-background"
              />
            ))}
          </div>
        </div>

        <div className="bg-background p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-tertiaryBrand mb-4">
            Vita 3D-Master Shades - Set 1
          </h3>
          <div className="flex gap-6 flex-wrap">
            {shadesData.vita3DMaster?.map((shade, key) => (
              <ToggleSwitch
                key={shade.id || key}
                label={shade.name}
                initialState={true}
                price={shade.price}
                showPrice={showPrice}
                onClick={onOpenEditModal}
                compact={true}
                bgColor="bg-background"
              />
            ))}
          </div>
        </div>
        <div className="bg-background p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-tertiaryBrand mb-4">
            Vita 3D-Master Shades - Set 2
          </h3>
          <div className="flex gap-6 flex-wrap">
            {shadesData.vita3DMasterShadesSet2?.map((shade, key) => (
              <ToggleSwitch
                key={shade.id || key}
                label={shade.name}
                initialState={true}
                price={shade.price}
                showPrice={showPrice}
                onClick={onOpenEditModal}
                compact={true}
                bgColor="bg-background"
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 bg-bgWhite font-[Inter]">
      <div className="flex justify-between items-center pb-4 border-gray-100">
        <h2 className="text-base font-medium text-tertiaryBrand capitalize">
          {title}
        </h2>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center px-6 py-3 rounded-lg gap-2 bg-background"
            // onClick={onOpenAddModal}
            onClick={() => setIsEditSidebarOpen(true)}
          >
            <span className="text-primaryText font-semibold text-sm">Edit</span>
          </button>
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleHandler();
              }}
              className={`relative inline-flex items-center h-6 w-10 rounded-full transition-colors duration-200 ease-in-out flex-shrink-0  ${
                isChecked ? "bg-secondaryBrand" : "bg-gray-300"
              }`}
              role="switch"
              aria-checked={isChecked}
            >
              <span className="sr-only">Toggle </span>

              <span
                className={`
            inline-block h-4 w-4 transform rounded-full bg-bgWhite shadow-lg ring-0 transition duration-200 ease-in-out
            ${isChecked ? "translate-x-5" : "translate-x-1"}
          `}
              >
                {isChecked && (
                  <span className="block h-full w-full rounded-full  "></span>
                )}
                {!isChecked && (
                  <span className="block h-full w-full rounded-full"></span>
                )}
              </span>
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={`${id}-content`}
            className="p-2 text-gray-400 hover:text-gray-600 transition duration-150"
          >
            <ChevronDownIcon
              className={`w-4 h-4 transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div id={`${id}-content`} className="pt-6">
          {type === "standard" && data && (
            <div className="flex gap-6 flex-wrap">
              {data.map((item, key) => (
                <ToggleSwitch
                  key={item.id || key}
                  label={item.name}
                  initialState={true}
                  price={item.price}
                  showPrice={showPrice}
                  onClick={onOpenEditModal}
                />
              ))}
            </div>
          )}

          {type === "smile-design" && smileData && SmileDesignCard && (
            <div className="flex gap-6 flex-wrap">
              {smileData.map((item, key) => (
                <SmileDesignCard
                  key={item.id || key}
                  label={item.name}
                  image={item.image}
                  onClick={onOpenEditModal}
                />
              ))}
            </div>
          )}

          {type === "shades" && renderShadesSection()}

          {/* {renderAddModal()}
          {renderEditModal()} */}
        </div>
      )}
    </div>
  );
}

export default DropDownCard;
