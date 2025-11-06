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
    
    const hasChanges = Object.values(quantities).some((q) => q.quantityToAdd !== 0);
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
          <div className="p-8 pb-4">
            <DialogTitle className="text-2xl font-bold text-[#3D3D3D] mb-2">
              Update Products Quantities
            </DialogTitle>
          </div>
          
          <div className="flex-1 overflow-y-auto px-8">
            <div className="border rounded-2xl p-6">
              <p className="text-lg font-semibold text-[#3D3D3D] mb-6">
                {products?.length} Variant{products?.length !== 1 ? 's' : ''} Will Be Changed
              </p>
              
              <div className="space-y-4">
                {products?.map((product) => (
                  <div key={product.productId} className="space-y-2">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                      <span className="text-base text-[#5C5C5C] font-medium flex-1 pr-4">
                        {product.name}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#3D3D3D]">
                          {quantities[product.productId]?.currentStock || 0}
                        </span>
                        
                        <Menu as="div" className="relative">
                          <MenuButton className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-3xl hover:bg-gray-200 transition-colors">
                            <span className="text-base font-bold text-[#3D3D3D]">
                              {operations[product.productId] === "add" ? "+" : "-"}
                            </span>
                            <Icons.ChevronDown className="w-3 h-3" fill="#3D3D3D" />
                          </MenuButton>
                          
                          <MenuItems className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 focus:outline-none">
                            <div className="py-1">
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleOperationChange(product.productId, "add")}
                                    className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 ${
                                      active ? "bg-gray-50" : ""
                                    } ${
                                      operations[product.productId] === "add"
                                        ? "text-[#001D58] font-semibold"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    <Icons.Plus className="w-3 h-3" fill={operations[product.productId] === "add" ? "#001D58" : "#4B4B4B"} />
                                    <span>Add</span>
                                  </button>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleOperationChange(product.productId, "subtract")}
                                    className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 ${
                                      active ? "bg-gray-50" : ""
                                    } ${
                                      operations[product.productId] === "subtract"
                                        ? "text-[#001D58] font-semibold"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    <Icons.Minus className="w-3 h-3" fill={operations[product.productId] === "subtract" ? "#001D58" : "#4B4B4B"} />
                                    <span>Subtract</span>
                                  </button>
                                )}
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Menu>
                        
                        <input
                          type="text"
                          inputMode="numeric"
                          value={Math.abs(quantities[product.productId]?.quantityToAdd || 0) || ""}
                          onChange={(e) =>
                            handleQuantityChange(product.productId, e.target.value)
                          }
                          className="w-24 px-4 py-2 border-2 border-gray-200 rounded-lg text-center text-base text-[#3D3D3D] focus:outline-none focus:border-[#001D58] transition-colors"
                          placeholder="0000"
                        />
                      </div>
                    </div>
                    {errors[product.productId] && (
                      <p className="text-sm text-red-500 text-right">
                        {errors[product.productId]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 rounded-b-3xl mt-4 bg-white border-t border-gray-200 p-8 pt-6">
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-12 py-4 bg-[#F8F8F8] w-full text-[#434343] rounded-full font-semibold text-base hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading || Object.keys(errors).length > 0}
                className="px-12 py-4 bg-[#001D58] w-full text-white rounded-full font-semibold text-base hover:bg-[#001D58]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Done"}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateQuantityModal;

