import React, { useState } from 'react'
import Drawers from '../../../Common/Drawers'
import { PrimaryButtonUI } from '../../../Common/Button';
import TableComponent from '../../../Common/Table';
import { data, dataOrder, dataPatient, headings, headingsOrder, headingsPateint } from '../../../Constant';
import SearchBar from '../../../Common/SearchBar';
import TabsStepper from '../../../Common/TabsStepper';

const OrderDoctorPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const steps = [
        {
            name: "All", content: <TableComponent headings={headingsOrder}
                data={dataOrder}
            />
        },
        {
            name: "Pending", content: <TableComponent headings={headingsOrder}
                data={dataOrder}
            />
        },
        {
            name: "in Progress", content: <TableComponent headings={headings}
                data={dataOrder}
            />
        },
        {
            name: "shipped", content: <TableComponent headings={headingsOrder}
                data={dataOrder}
            />
        },
        {
            name: "completed", content: <TableComponent headings={headings}
                data={dataOrder}
            />
        },
    ];

    return (
        <div>
            <div className='bg-white rounded-2xl py-6 px-6'>
                <div className='flex flex-col md:flex-row justify-between gap-2 pb-3'>
                    <div className='md:flex-1 '>
                        <SearchBar
                            title='Filter'
                            onSearch={(value) => console.log("Searching here:", value)}
                            onSort={() => console.log("Sort clicked")}
                        />
                    </div>

                    <div className='flex flex-col  md:flex-row items-start md:items-center gap-2 '>
                        <div className='md:block hidden'>

                            <PrimaryButtonUI title='Place New Order' className='rounded-md px-8 py-4'   />
                        </div>
                        <div className='md:hidden block w-full'>

                            <PrimaryButtonUI title='Place New Order' className='rounded-md px-8 py-4' />
                        </div>

                        <div>
                            {/* <Drawers
                                isOpen={isOpen}
                                onClose={() => setIsOpen(false)}
                                title='Add Patient'
                            /> */}
                        </div>

                    </div>

                </div>

                <div className=''>
                    <TabsStepper steps={steps} />
                </div>
                {/* <TableComponent headings={headingsOrder}
                    data={dataOrder}
                /> */}
            </div>

        </div>
    )
}

export default OrderDoctorPage