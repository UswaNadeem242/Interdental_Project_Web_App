import { Orders } from "../../Constant";

export default function OrdersTable() {
  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex flex-row md:flex-row items-start md:items-center justify-between gap-3 mb-4">
        <h2 className="text-sm md:text-base font-poppins font-semibold text-[#434343]">
          Recent Orders
        </h2>

        <div className="flex flex-wrap gap-2 md:gap-4">
          <button className="py-1 px-4 md:px-6 font-poppins font-light text-xs bg-[#001D58] text-white rounded-lg shadow hover:bg-blue-800">
            Place New Order
          </button>
          <button className="py-1 px-3 md:px-4 font-poppins font-light text-xs border border-[#013764] bg-white text-[#013764] rounded-lg shadow hover:bg-blue-800 hover:text-white">
            View All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs md:text-sm">
          <thead>
            <tr className="font-poppins font-medium text-[#949494]">
              <th className="py-2 px-3 font-medium">Order ID</th>
              <th className="py-2 px-3 font-medium">Scan Date</th>
              <th className="py-2 px-3 font-medium">Doctor Name</th>
              <th className="py-2 px-3 font-medium">Patient Name</th>
              <th className="py-2 px-3 font-medium">Shopping Date</th>
              <th className="py-2 px-3 font-medium">Status</th>
              <th className="py-2 px-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Orders.map((order, i) => (
              <tr key={i} className="font-poppins border-b last:border-b-0">
                <td className="py-3 px-3 font-semibold">{order.id}</td>
                <td className="py-3 px-3 font-normal text-[#434343]">
                  {order.scanDate}
                </td>
                <td className="py-3 px-3 font-normal text-[#434343]">
                  {order.doctor}
                </td>
                <td className="py-3 px-3 font-normal text-[#434343]">
                  {order.patient}
                </td>
                <td className="py-3 px-3 font-normal text-[#434343]">
                  {order.shoppingDate}
                </td>
                <td className="py-3 px-3 font-normal">
                  <span className="bg-[#EF6A1F1A] text-[#FF5757] text-xs py-1 px-2 rounded-xl">
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-xs md:text-sm text-[#434343]">
                  <a
                    href="#"
                    className="text-[#001D58] hover:underline font-medium"
                  >
                    View Detail ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
