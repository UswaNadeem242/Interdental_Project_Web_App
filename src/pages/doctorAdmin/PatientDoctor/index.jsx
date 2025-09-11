import React, { useMemo, useState } from 'react'
import Drawers from '../../../Common/Drawers'
import { PrimaryButtonUI } from '../../../Common/Button';
import AddPatientForm from './AddPatientForm';
import TableComponent from '../../../Common/Table';
import { data, dataPatient, headings, headingsPateint } from '../../../Constant';
import SearchBar from '../../../Common/SearchBar';

const PatientPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");  
 
  const filteredData = useMemo(() => {
    let filtered = dataPatient;
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

  return (
    <div>
      <div className='bg-white rounded-2xl py-6 px-6'>
        <div className='flex flex-col md:flex-row justify-between gap-2 pb-3'>
          <div className='md:flex-1 '>
            <SearchBar
              title='Sort By'
              onSearch={setSearchQuery} // ✅ live search
              onSort={setSortOrder} // ✅ "asc" | "desc"
            />
          </div>

          <div className='flex flex-col  md:flex-row items-start md:items-center gap-2 '>
            <div className='md:block hidden'>

              <PrimaryButtonUI title='Add Patient' onClick={() => setIsOpen(true)} className='rounded-md px-8 py-4  font-semibold ' />
            </div>
            <div className='md:hidden block w-full'>

              <PrimaryButtonUI title='Add Patient' onClick={() => setIsOpen(true)} className='rounded-md px-8 py-4 w-full font-semibold ' />
            </div>

            <div>
              <Drawers
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title='Add Patient'
                Content={<AddPatientForm />}
              />
            </div>

          </div>

        </div>
        <TableComponent headings={headingsPateint}
          data={filteredData}
        />
      </div>

    </div>
  )
}

export default PatientPage