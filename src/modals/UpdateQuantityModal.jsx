import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Icons from "../components/Icons";

const UpdateQuantityModal = ({ isOpen, onClose, products, onSave }) => {
  const [quantities, setQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [operations, setOperations] = useState({});

  const MAX_QUANTITY = 999999;

  useEffect(() => {
    if (isOpen && products) {
      const initialQuantities = {};
      const initialOperations = {};
      products.forEach((product) => {
        initialQuantities[product.productId] = {
          currentStock: product.stockQuantity || 0,
          quantityToAdd: 0,
        };
        initialOperations[product.productId] = "add";
      });
      setQuantities(initialQuantities);
      setOperations(initialOperations);
      setErrors({});
    }
  }, [isOpen, products]);

  const handleQuantityChange = (productId, value) => {
    // Allow empty string for user to clear input
    if (value === "") {
      setQuantities((prev) => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          quantityToAdd: 0,
        },
      }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[productId];
        return newErrors;
      });
      return;
    }

    // Only allow positive numbers
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0) {
      return;
    }

    const amount = numValue;
    const currentStock = quantities[productId]?.currentStock || 0;
    const operation = operations[productId] || "add";

    if (operation === "add") {
      const newTotal = currentStock + amount;
      if (newTotal > MAX_QUANTITY) {
        setErrors((prev) => ({
          ...prev,
          [productId]: `Maximum stock is ${MAX_QUANTITY.toLocaleString()}`,
        }));
        return;
      }
    } else {
      if (amount > currentStock) {
        setErrors((prev) => ({
          ...prev,
          [productId]: `Cannot reduce more than current stock (${currentStock})`,
        }));
        return;
      }
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[productId];
      return newErrors;
    });

    setQuantities((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantityToAdd: operation === "add" ? amount : -amount,
      },
    }));
  };

  const handleOperationChange = (productId, operation) => {
    setOperations((prev) => ({
      ...prev,
      [productId]: operation,
    }));

    const currentAmount = Math.abs(quantities[productId]?.quantityToAdd || 0);
    const currentStock = quantities[productId]?.currentStock || 0;

    if (operation === "subtract" && currentAmount > 0) {
      if (currentAmount > currentStock) {
        setErrors((prev) => ({
          ...prev,
          [productId]: `Cannot reduce more than current stock (${currentStock})`,
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[productId];
          return newErrors;
        });
      }
    } else if (operation === "add" && currentAmount > 0) {
      const newTotal = currentStock + currentAmount;
      if (newTotal > MAX_QUANTITY) {
        setErrors((prev) => ({
          ...prev,
          [productId]: `Maximum stock is ${MAX_QUANTITY.toLocaleString()}`,
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[productId];
          return newErrors;
        });
      }
    }

    setQuantities((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantityToAdd: operation === "add" ? currentAmount : -currentAmount,
      },
    }));
  };

  const handleSave = async () => {
    if (Object.keys(errors).length > 0) return;

    const hasChanges = Object.values(quantities).some(
      (q) => q.quantityToAdd !== 0
    );
    if (!hasChanges) {
      onClose();
      return;
    }

    setIsLoading(true);
    try {
      const updates = Object.entries(quantities)
        .filter(([_, data]) => data.quantityToAdd !== 0)
        .map(([productId, data]) => ({
          productId: parseInt(productId),
          quantityToAdd: data.quantityToAdd,
        }));

      await onSave(updates);
      onClose();
    } catch (error) {
      console.error("Error updating quantities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNewTotal = (productId) => {
    const data = quantities[productId];
    if (!data) return 0;
    return data.currentStock + data.quantityToAdd;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl bg-white rounded-3xl shadow-lg flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="p-8 pb-4 border-b border-gray-100">
            <DialogTitle className="text-2xl font-bold text-[#3D3D3D]">
              Update Products Quantities
            </DialogTitle>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="border border-gray-200 rounded-2xl p-6">
              <p className="text-lg font-semibold text-[#3D3D3D] mb-8 font-poppins">
                {products?.length} Variant{products?.length !== 1 ? "s" : ""}{" "}
                Will Be Changed
              </p>

              {products?.map((product) => (
                <div className="border-b border-gray-200 last:border-0">
                  <div
                    key={product.productId}
                    className=" py-3 space-y-2 flex justify-between items-center "
                  >
                    <div className="">
                      <p className="text-base font-normal text-[#3D3D3D] mb-3 font-poppins">
                        {product.name}
                      </p>
                      <div className="text-sm text-[#8C8C8C] font-poppins">
                        Current QTY:{" "}
                        <span className="font-semibold text-[#3D3D3D]">
                          {quantities[product.productId]?.currentStock || 0}
                        </span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4   ">
                      <div className="mb-10">
                        <button
                          type="button"
                          onClick={() =>
                            handleOperationChange(product.productId, "add")
                          }
                          className={`px-4 py-1 rounded-lg font-normal font-poppins ${
                            operations[product.productId] === "add"
                              ? "  shadow text-[#001D58] "
                              : "text-[#949494]"
                          }`}
                        >
                          Add
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleOperationChange(product.productId, "subtract")
                          }
                          className={`px-4 py-1 rounded-lg font-normal font-poppins ${
                            operations[product.productId] === "subtract"
                              ? " shadow text-[#001D58]"
                              : "text-[#949494]"
                          }`}
                        >
                          Minus
                        </button>
                      </div>

                      <div className="flex flex-col items-end justify-between  ">
                        <div>
                          <input
                            inputMode="numeric"
                            value={
                              Math.abs(
                                quantities[product.productId]?.quantityToAdd ||
                                  0
                              ) || ""
                            }
                            onChange={(e) =>
                              handleQuantityChange(
                                product.productId,
                                e.target.value
                              )
                            }
                            placeholder="Enter QTY"
                            className=" w-[90px] px-2 py-1 border-2 border-gray-300 rounded-lg text-center text-sm text-[#3D3D3D] focus:outline-none focus:border-[#001D58] placeholder:text-sm placeholder:font-poppins "
                          />
                        </div>

                        <div className=" text-[#8C8C8C] font-poppins text-base font-light mt-4 ">
                          New QTY:{" "}
                          <span className="font-semibold text-sm text-[#434343]">
                            {getNewTotal(product.productId)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {errors[product.productId] && (
                    <p className="text-sm text-red-500">
                      {errors[product.productId]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-8 py-6 flex gap-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-4 bg-[#F8F8F8] text-[#434343] rounded-full font-semibold text-base hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading || Object.keys(errors).length > 0}
              className="flex-1 py-4 bg-[#001D58] text-white rounded-full font-semibold text-base hover:bg-[#001D58]/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Done"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateQuantityModal;
