import { CardComponet } from "../../../Common/Card";
import { UserIcon } from "../../../icon/UserIcon";
import {
  // CardDashboard,
  // Chartdata,
  ChartStatusLines,
  dataOrder,
  headingsOrder,
} from "../../../Constant";
import { PatientCard } from "../../../Common/PatientCard/index.jsx";
import { MultiLineChart } from "../../../Common/Chart/index.jsx";
import DurationSelection from "../../../Common/Chart/DurationSelection/index.jsx";
import {
  PrimaryButtonUI,
  SecondaryButton,
} from "../../../Common/Button/index.jsx";
import TableComponent from "../../../Common/Table/index.jsx";
import { useEffect, useState } from "react";
import {
  getDoctorStats,
  getDoctorOrders,
  getGrapgStats,
  getDoctorPatients,
} from "../../../api/doctorDasboard/index.jsx";
import { CartIcon } from "../../../icon/CartIcon.jsx";
import ProfileIcon from "../../../icon/ProfileIcon.jsx";
import GraphStatuses from "../../../Common/Chart/GraphStatuses/index.jsx";
import { processChartData } from "../../../services/utils/chartDataProcessor";
import { useNavigate } from "react-router-dom";

const DoctorDashaboard = () => {
  const navigate = useNavigate();
  const [doctorStats, setDoctorStats] = useState([]);
  const [doctorOrders, setDoctorOrders] = useState([]);
  const [graphStats, setGraphStats] = useState([]);
  const [doctorPatients, setDoctorPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("month");

  // Transform API orders data to match table format
  const transformOrdersData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];

    return apiData.map((order) => ({
      id: order.id,
      pName: `${order?.patientFirstName} ${order?.patientLastName}`,
      product: "Argen HT",
      status: order?.orderStatus?.toLowerCase() || "pending",
      submission: order?.createdAt
        ? new Date(order?.createdAt).toLocaleDateString()
        : "N/A",
      action: "View Detail",
      // dName: order?.doctorName || "N/A",
      dName: `${order?.doctorFirstName || "-"} ${order?.doctorLastName || "-"
        }`,
      shipping: order?.expectedDeliveryDate
        ? new Date(order?.expectedDeliveryDate).toLocaleDateString()
        : "N/A",
      detailUrl: `/doctor-admin/order-details/${order?.id}`,
    }));
  };

  const transformPatientsData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];

    return apiData.map((order) => ({
      name: `${order.firstName} ${order.lastName || ""}`,
      email: order.email,
      linkName: "View Detail",
      icon: <UserIcon />,
      profileURL: order?.profileURL
    }));
  };

  // Transform doctor stats API data to get counts for cards
  const getStatsCounts = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) {
      return {
        totalPatients: "0",
        ordersInProgress: "0",
        ordersCompleted: "0",
      };
    }

    const stats = {};
    apiData.forEach((item) => {
      switch (item.label) {
        case "totalPatients":
          stats.totalPatients = item.value.toString();
          break;
        case "orderInprogress":
          stats.ordersInProgress = item.value.toString();
          break;
        case "orderCompleted":
          stats.ordersCompleted = item.value.toString();
          break;
        default:
          break;
      }
    });

    return {
      totalPatients: stats.totalPatients || "0",
      ordersInProgress: stats.ordersInProgress || "0",
      ordersCompleted: stats.ordersCompleted || "0",
    };
  };

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all API calls in parallel for better performance
        const [statsResponse, ordersResponse, graphResponse, patientsResponse] =
          await Promise.all([
            getDoctorStats(),
            getDoctorOrders(),
            getGrapgStats("month"),
            getDoctorPatients(),
          ]);

        // Only update state if component is still mounted
        if (isMounted) {
          // Handle stats response
          if (statsResponse?.status === 200) {
            setDoctorStats(statsResponse.data);
          } else {
            console.error("Failed to fetch doctor stats:", statsResponse);
          }

          // Handle orders response
          if (ordersResponse?.status === 200) {
            const transformedOrders = transformOrdersData(
              ordersResponse.data.data
            );
            setDoctorOrders(transformedOrders);
          } else {
            console.error("Failed to fetch doctor orders:", ordersResponse);
          }

          // Handle graph stats response
          if (graphResponse?.status === 200) {
            setGraphStats(graphResponse.data);
          } else {
            console.error("Failed to fetch graph stats:", graphResponse);
          }

          // Handle patients response
          if (patientsResponse?.status === 200) {
            const transformedPatients = transformPatientsData(
              patientsResponse.data.data
            );

            setDoctorPatients(transformedPatients);
          } else {
            console.error("Failed to fetch doctor patients:", patientsResponse);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching dashboard data:", err);
          setError("Failed to load dashboard data. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Refetch graph data when time period changes
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await getGrapgStats(selectedTimePeriod);
        if (response?.status === 200) {
          setGraphStats(response.data);
        }
      } catch (err) {
        console.error("Error fetching graph data:", err);
      }
    };

    fetchGraphData();
  }, [selectedTimePeriod]);

  // Get dynamic counts from API data
  const statsCounts = getStatsCounts(doctorStats.data);

  // Get dynamic chart data from API and process it for complete ranges
  const chartData = processChartData(
    graphStats.data && graphStats.data.length > 0 ? graphStats.data : [],
    selectedTimePeriod
  );

  const CardDashboard = [
    {
      title: "Total Patients",
      count: statsCounts.totalPatients,
      date: "Jan 01, 2024",
      path: "/doctor-admin/dashboard",
      // duedate: "Mar 30, 2024",
      // From jan 01,2024  March 30,2024
      icon: <UserIcon />,
    },
    {
      title: "Orders In Progress",
      count: statsCounts.ordersInProgress,
      date: "Jan 01, 2024",
      path: "/doctor-admin/dashboard",
      // duedate: "Mar 30, 2024",
      icon: <CartIcon />,
    },
    {
      title: "Orders Completed",
      count: statsCounts.ordersCompleted,
      date: "Jan 01, 2024",
      path: "/doctor-admin/dashboard",
      // duedate: "Mar 30, 2024",
      icon: <ProfileIcon />,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-3 md:gap-3 lg:gap-4 ">
        <div className="col-span-1 md:col-span-1 lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-4">
            {CardDashboard?.map((item, id) => (
              <CardComponet
                key={id}
                title={item?.title}
                count={item?.count}
                // fromDate={item?.date}
                toDate={item?.duedate}
                icon={item?.icon}
              />
            ))}
          </div>
          {/* Order Overview */}
          <div className="col-span-1 md:col-span-1 lg:col-span-8 bg-white mt-3 md:mt-4 lg:mt-5 rounded-lg p-3 md:p-4">
            {/* Top row: Order Overview title and status options */}

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm lg:text-sm md:text-base font-poppins font-semibold text-[#434343]">
                Order Overview
              </h3>
              <GraphStatuses />
            </div>

            {/* Chart area with overlay DurationSelection */}
            <div className="relative">
              {/* Chart area */}
              <MultiLineChart
                data={chartData}
                lines={ChartStatusLines}
                // height={300}
                title=""
                showLegend={false}
              />

              {/* DurationSelection positioned on top-right of chart */}
              <div className="absolute top-4 right-4 z-10">
                <DurationSelection
                  selectedTimePeriod={selectedTimePeriod}
                  onTimePeriodChange={setSelectedTimePeriod}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[#FFFFFF] rounded-lg md:rounded-xl lg:rounded-xl">
          <PatientCard title="Patients" data={doctorPatients || []} />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-12 bg-white p-6 rounded-2xl">
          <div className="flex flex-row md:flex-row items-start md:items-center justify-between gap-3 mb-4">
            <h2 className="text-sm md:text-base font-poppins font-semibold text-[#434343]">
              Recent Orders
            </h2>

            <div className="flex flex-wrap gap-2 md:gap-4">
              <PrimaryButtonUI
                title="  Place New Order"
                href="/doctor-admin/place-order"
                className="py-1 px-4 md:px-6 font-poppins  font-normal text-xs bg-secondaryBrand text-white rounded-lg shadow "
              />
              <SecondaryButton
                title="View All"
                className="py-1 px-3 md:px-4 font-poppins font-normal text-xs border border-brand bg-white text-brand rounded-lg shadow"
                href="/doctor-admin/orders"
              />
            </div>
          </div>
          {/* <div className="overflow-x-auto"> */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading orders...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-red-500">{error}</div>
            </div>
          ) : (
            doctorOrders && (
              <TableComponent
                headings={headingsOrder}
                data={doctorOrders.length > 0 ? doctorOrders : dataOrder}
                actionHrefKey="detailUrl"
              />
            )
          )}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashaboard;
