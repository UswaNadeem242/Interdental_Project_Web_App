import React, { useEffect, useMemo, useState } from "react";
import { PrimaryButtonUI } from "../../../Common/Button";
import TableComponent from "../../../Common/Table";
import {
  data,
  dataOrder,
  dataPatient,
  headings,
  headingsOrder,
  headingsPateint,
} from "../../../Constant";
import SearchBar from "../../../Common/SearchBar";
import TabsStepper from "../../../Common/TabsStepper";
import { getDoctorOrders } from "../../../api/doctorDasboard";
import { useSelector } from "react-redux";

const OrderDoctorPage = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [orders, setOrders] = useState([]);

  const transformOrdersData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];

    return apiData.map((order) => ({
      id: `#${order?.id}`,
      pName: `${order?.patientFirstName || "-"} ${order?.patientLastName || "-"
        }`,
      product: "Argen HT",
      status: order?.orderStatus?.toLowerCase() || "pending",
      submission: order?.createdAt
        ? new Date(order?.createdAt).toLocaleDateString()
        : "N/A",
      action: "View Detail",
      shipping: order?.createdAt
      ? (new Date(order?.createdAt)).toLocaleDateString("en-GB").replace(/\//g, "-")
      : "N/A",
      detailUrl: `/doctor-admin/order-details/${order?.id}`,
    }));
  };


  const profileData = useSelector(
    (state) => state.profileData?.userProfileData
  );
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getDoctorOrders(profileData?.id);
        if (response.status === 200) {
          setOrders(transformOrdersData(response.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatients();
  }, [profileData?.id]);

  const filteredData = useMemo(() => {
    let filtered = orders;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      );
    }
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = Object.values(a)[0]?.toString().toLowerCase() || "";
        const bVal = Object.values(b)[0]?.toString().toLowerCase() || "";

        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }
    return filtered;
  }, [searchQuery, sortOrder, orders]);

  // Filter data based on status for different tabs
  const getFilteredDataByStatus = (status) => {
    if (status === "all") {
      return filteredData;
    }
    const filtered = filteredData.filter((order) => order.status === status);

    return filtered;
  };
 
  const steps = [
    {
      name: "All",
      content: (
        <TableComponent
          headings={headingsOrder}
          data={getFilteredDataByStatus("all")}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "Pending",
      content: (
        <TableComponent
          headings={headingsOrder}
          data={getFilteredDataByStatus("pending")}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "in Progress",
      content: (
        <TableComponent
          headings={headingsOrder}
          data={getFilteredDataByStatus("progress")}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "shipped",
      content: (
        <TableComponent
          headings={headingsOrder}
          data={getFilteredDataByStatus("shipped")}
          actionHrefKey="detailUrl"
        />
      ),
    },
    {
      name: "completed",
      content: (
        <TableComponent
          headings={headingsOrder}
          data={getFilteredDataByStatus("delivered")}
          actionHrefKey="detailUrl"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="bg-white rounded-2xl lg:py-6 py-4 lg:px-6 px-4">
        <div className="flex flex-col md:flex-row justify-between gap-2 pb-3">
          <div className="md:flex-1 ">
            <SearchBar
              title="Sort By"
              placeholder="Search here..."
              onSearch={setSearchQuery}
              onSort={setSortOrder}
            />
          </div>
          <div className="flex flex-col  md:flex-row items-start md:items-center gap-2 ">
            <div className="md:block hidden">
              <PrimaryButtonUI
                title="Place New Order"
                className="rounded-md px-8 py-3 font-semibold "
                href="/doctor-admin/place-order"
              />
            </div>
            <div className="md:hidden block w-full">
              <PrimaryButtonUI
                title="Place New Order"
                className="rounded-md px-8 py-3 w-full font-semibold "
                href="/doctor-admin/place-order"
              />
            </div>
          </div>
        </div>
        <div className="">
          <TabsStepper steps={steps} />
        </div>
      </div>
    </div>
  );
};

export default OrderDoctorPage;
