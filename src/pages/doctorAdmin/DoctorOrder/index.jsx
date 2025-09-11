import React, { useMemo, useState } from 'react'
import Drawers from '../../../Common/Drawers'
import { PrimaryButtonUI } from '../../../Common/Button';
import TableComponent from '../../../Common/Table';
import { data, dataOrder, dataPatient, headings, headingsOrder, headingsPateint } from '../../../Constant';
import SearchBar from '../../../Common/SearchBar';
import TabsStepper from '../../../Common/TabsStepper';

const OrderDoctorPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const filteredData = useMemo(() => {
        let filtered = dataOrder;
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
    }, [searchQuery, sortOrder]); 
    const steps = [
        {
            name: "All", content: <TableComponent headings={headingsOrder}
                data={filteredData}
                actionHrefKey="detailUrl"
            />
        },
        {
            name: "Pending", content: <TableComponent headings={headingsOrder}
                data={filteredData}
                actionHrefKey="detailUrl"
            />
        },
        {
            name: "in Progress", content: <TableComponent headings={headings}
                data={filteredData}
                actionHrefKey="detailUrl"
            />
        },
        {
            name: "shipped", content: <TableComponent headings={headingsOrder}
                data={filteredData}
                actionHrefKey="detailUrl"
            />
        },
        {
            name: "completed", content: <TableComponent headings={headings}
                data={filteredData}
                actionHrefKey="detailUrl"
            />
        },
    ];

    return (
        <div>
            <div className='bg-white rounded-2xl py-6 px-6'>
                <div className='flex flex-col md:flex-row justify-between gap-2 pb-3'>
                    <div className='md:flex-1 '>
                        <SearchBar
                            title='Sort By'
                            onSearch={setSearchQuery} 
                            onSort={setSortOrder} 
                        />
                    </div>
                    <div className='flex flex-col  md:flex-row items-start md:items-center gap-2 '>
                        <div className='md:block hidden'>

                            <PrimaryButtonUI title='Place New Order' className='rounded-md px-8 py-4 font-semibold ' href='/doctorAdmin/Orders-Details' />
                        </div>
                        <div className='md:hidden block w-full'>

                            <PrimaryButtonUI title='Place New Order' className='rounded-md px-8 py-4 w-full font-semibold ' />
                        </div>
                    </div>
                </div>
                <div className=''>
                    <TabsStepper steps={steps} />
                </div>
            </div>

        </div>
    )
}

export default OrderDoctorPage