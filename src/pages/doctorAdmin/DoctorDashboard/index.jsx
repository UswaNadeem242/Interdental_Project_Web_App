import { CardComponet } from "../../../Common/Card";
import { CardDashboard, dataOrder, headingsOrder } from "../../../Constant";
import { PatientCard } from "../../../Common/PatientCard/index.jsx";
import TableComponent from "../../../Common/Table/index.jsx";
import { PrimaryButtonUI, SecondaryButton } from "../../../Common/Button/index.jsx";

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
          <div className="col-span-1 md:col-span-1 lg:col-span-8 bg-[#FFFFFF] mt-3 md:mt-4 lg:mt-5 rounded-lg p-3 md:p-4 lg:p-4 ">
            <div className="flex flex-row items-center md:flex-row lg:flex-row justify-between ">
              <h3 className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm  text-primaryText ">
                Order Overview
              </h3>
              <div className="flex flex-row md:flex-row lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-3 md:gap-3 lg:gap-5 font-poppins text-xs md:text-xs lg:text-xs text-primaryText mt-2 md:mt-2 lg:mr-3 lg:mt-0">
                <div className="flex items-center">
                  <span className="text-[7px] w-2 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3 mr-1 bg-[#94D3DD] rounded-full inline-block"></span>
                  <label className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm text-primaryText">
                    Total Orders
                  </label>
                </div>
                {/* <p>Total Orders</p> */}
                <div className="flex items-center">
                  <span className="w-2 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3 mr-1 bg-[#4FAD2E] rounded-full inline-block"></span>
                  <label className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm text-primaryText">
                    Completed
                  </label>
                </div>
                {/* <p>In Progress</p> */}
                <div className="flex items-center">
                  <span className="w-2 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3 mr-1 bg-[#E13434] rounded-full inline-block"></span>
                  <label className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm text-primaryText">
                    In progress
                  </label>
                </div>
                {/* <p>Pending</p> */}
                <div className="flex items-center">
                  <span className="w-2 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3 mr-1 bg-blue-500 rounded-full inline-block"></span>
                  <label className="text-[8px] sm:text-[7px] sm:text-xs md:text-sm lg:text-sm text-primaryText">
                    Pending
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-3 md:mt-4 lg:mt-5">
              <img
                className="w-full h-auto md:h-[180px] lg:h-full object-cover"
                src="/assets/Months.jpg"
                alt="image"
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-white rounded-xl shadow-md flex flex-col">
          <PatientCard title='Patients' />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-12 bg-white p-6 rounded-2xl">
          <div className="flex flex-row md:flex-row items-start md:items-center justify-between gap-3 mb-4">
            <h2 className="text-sm md:text-base font-poppins font-semibold text-[#434343]">
              Recent Orders
            </h2>

            <div className="flex flex-wrap gap-2 md:gap-4">
              <PrimaryButtonUI title='  Place New Order' className='py-1 px-4 md:px-6 font-poppins font-light text-xs bg-secondaryBrand text-white rounded-lg shadow ' />
              <SecondaryButton title='View All' className='py-1 px-3 md:px-4 font-poppins font-light text-xs border border-brand bg-white text-brand rounded-lg shadow' href='/doctorAdmin/Orders' />

            </div>
          </div>
          {/* <div className="overflow-x-auto"> */}
          <TableComponent headings={headingsOrder}
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
