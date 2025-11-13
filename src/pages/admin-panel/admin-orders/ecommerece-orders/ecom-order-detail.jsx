import React, { useState, useEffect } from "react";
import { SecondaryButton } from "../../../../Common/Button";
import AreYouSureModel from "../../../../modals/AreYouSureModel";
import DropDownComponent from "../../../../Common/DropDown";
import UserDetailsCard from "../../../../Common/UserDetailsCard";
import CardIcon from "../../../../icon/CardIcon";
import SecondTable from "../../../../Common/second-table-component";
import { useMemo } from "react";
import TrackingOrderAdmin from "../../admin-orders-detail/tracking-order";
import { useSearchParams } from "react-router-dom";
import { getEcomOrderById } from "../../../../services/admin-order";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../store/toast-slice";
import axios from "axios";
import { BASE_URL } from "../../../../config";

function EcomOrdersDetail() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrderDetails = async () => {
    if (!id) return;
    try {
      const response = await getEcomOrderById(id);
      if (response.status === 200) {
        console.log('order details', response.data);
        setOrderDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      dispatch(
        showToast({
          message: "Failed to fetch order details",
          type: "error",
        })
      );
    }
  };
  useEffect(() => {
  
    fetchOrderDetails();
  }, [id, dispatch]);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleMoveToDelivered = async () => {
    if (!id) return;
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/orders/updateOrderStatus/${id}`,
        {
          orderStatus: "DELIVERED",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          showToast({
            message: "Order status updated to Delivered successfully",
            type: "success",
          })
        );
        setIsModalOpen(false);
        // Refetch order details
        const orderResponse = await getEcomOrderById(id);
        if (orderResponse.status === 200) {
          setOrderDetails(orderResponse.data.data);
        }
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      dispatch(
        showToast({
          message:
            error.response?.data?.message || "Failed to update order status",
          type: "error",
        })
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const totalAmount = orderDetails?.totalAmount || 0;
  const kratos = [
    { label: "Subtotal:", value: totalAmount },
    { label: "Shipping:", value: "Free" },
  ];

  const headings = [
    { label: "Products", key: "products" },
    { label: "Price", key: "price" },
    { label: "Quantity", key: "quantity" },
    { label: "Sub Total", key: "subTotal" },
  ];

  // Transform order items to table data
  const data = useMemo(
    () =>
      orderDetails?.orderItems?.map((item) => ({
        products: item?.productName || item?.name || "N/A",
        price: `$${item?.price || 0}`,
        quantity: item?.quantity || 0,
        subTotal: `$${(item?.price || 0) * (item?.quantity || 0)}`,
        image: item?.image || "/assets/brush.png",
      })) || [],
    [orderDetails]
  );

  const canMoveToDelivered =
    orderDetails?.orderStatus?.toUpperCase() !== "DELIVERED";

  return (
    <div className="">
      <div className="">
        <TrackingOrderAdmin isadmin={false} id={id} refresh={() => fetchOrderDetails()}/>

        {canMoveToDelivered && (
          <div className="mt-4">
            <SecondaryButton
              title={isUpdating ? "Updating..." : "Move Order To Delivered"}
              icon={""}
              className="bg-[#001D58] text-[#FFFFFF] text-xs font-medium font-poppins px-6 py-3 rounded-xl"
              onClick={() => setIsModalOpen(true)}
              disabled={isUpdating}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-10 mt-6">
        <div className="col-span-8 bg-bgWhite p-4 rounded-2xl">
          <SecondTable
            headings={headings}
            data={data}
            actionHrefKey="detailUrl"
            className={"min-h-[500px]"}
          />
        </div>
        <div className="col-span-4">
          <div className="relative">
            <DropDownComponent
              label="Cart Total"
              options={kratos}
              selected={selected}
              optionValue="value"
              onSelect={handleSelect}
              className="text-xs"
              totalAmount={totalAmount}
              disabled={true}
            />
          </div>

          <div className="relative mt-4">
            <UserDetailsCard
              fullName={
                orderDetails?.customerName ||
                `${orderDetails?.firstName || ""} ${
                  orderDetails?.lastName || ""
                }`.trim() ||
                "N/A"
              }
              email={orderDetails?.email || "N/A"}
              contactNumber={orderDetails?.phoneNumber || "N/A"}
              shippingAddress={orderDetails?.shippingAddress || "N/A"}
            />
          </div>

          <div className="relative mt-4">
            <div className="bg-white p-4 rounded-lg ">
              <h1 className="text-[#1A1A1A] text-base font-semibold font-poppins capitalize pb-4">
                Payment Detail
              </h1>
              <div className="flex  items-center gap-2">
                <CardIcon className="w-3 h-3" />
                <p className="text-primaryText font-normal font-poppins">
                  {orderDetails?.paymentMethod || "Credit or debit card"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <AreYouSureModel
            setIsModalOpen={setIsModalOpen}
            title="Move Order to Delivered"
            desc="Are you sure you want to mark this order as delivered? This action will update the order status."
            onConfirm={handleMoveToDelivered}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
}

export default EcomOrdersDetail;
