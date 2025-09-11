import { CardComponet } from "../../../Common/Card";
import { UserIcon } from "../../../icon/UserIcon";
import {
  CardDashboard,
  Chartdata,
  ChartStatusLines,
  dataOrder,
  headingsOrder,
  PatientDashboard,
} from "../../../Constant";
import { PatientCard } from "../../../Common/PatientCard/index.jsx";
import { ChartLegend, MultiLineChart } from "../../../Common/Chart/index.jsx";
import {
  PrimaryButtonUI,
  SecondaryButton,
} from "../../../Common/Button/index.jsx";
import TableComponent from "../../../Common/Table/index.jsx";
const DoctorDashaboard = () => {
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
                fromDate={item?.date}
                toDate={item?.duedate}
                icon={item?.icon}
              />
            ))}
          </div>
          {/* Order Overview */}
          <div className="col-span-1 md:col-span-1 lg:col-span-8 bg-[#FFFFFF] mt-3 md:mt-4 lg:mt-5 rounded-lg p-3 md:p-4 lg:p-4">
            <div className="mt-3 md:mt-4 lg:mt-5">
              <MultiLineChart
                data={Chartdata}
                lines={ChartStatusLines}
                // height={300}
                title="Order Overview"
                showLegend={true}
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[#FFFFFF] rounded-lg md:rounded-xl lg:rounded-xl">
          <PatientCard title="Patients" />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-12 bg-white p-6 rounded-2xl">
          <div className="flex flex-row md:flex-row items-start md:items-center justify-between gap-3 mb-4">
            <h2 className="text-sm md:text-base font-poppins font-semibold text-[#434343]">
              Recent Orders
            </h2>

            <div className="flex flex-wrap gap-2 md:gap-4">
              <PrimaryButtonUI
                title="  Place New Order"
                className="py-1 px-4 md:px-6 font-poppins  font-normal text-xs bg-secondaryBrand text-white rounded-lg shadow "
              />
              <SecondaryButton
                title="View All"
                className="py-1 px-3 md:px-4 font-poppins font-normal text-xs border border-brand bg-white text-brand rounded-lg shadow"
                href="/doctorAdmin/Orders"
              />
            </div>
          </div>
          {/* <div className="overflow-x-auto"> */}
          <TableComponent
            headings={headingsOrder}
            data={dataOrder}
            actionHrefKey="detailUrl"
          />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashaboard;
