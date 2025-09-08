import React, { useState } from 'react'
import Drawers from '../../../Common/Drawers'
import { PrimaryButtonUI } from '../../../Common/Button';
import AddPatientForm from './AddPatientForm';
import TableComponent from '../../../Common/Table';
import { data, dataPatient, headings, headingsPateint } from '../../../Constant';
import SearchBar from '../../../Common/SearchBar';

const PatientPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='bg-white rounded-2xl py-6 px-6'>
        <div className='flex flex-col md:flex-row justify-between gap-2 pb-3'>
          <div className='md:flex-1 '>
            <SearchBar
              title='Sort By'
              onSearch={(value) => console.log("Searching here:", value)}
              onSort={() => console.log("Sort clicked")}
            />
          </div>

          <div className='flex flex-col  md:flex-row items-start md:items-center gap-2 '>
            <div className='md:block hidden'>

              <PrimaryButtonUI title='Add Patient' onClick={() => setIsOpen(true)} className='rounded-md px-8 py-4' />
            </div>
            <div className='md:hidden block w-full'>

              <PrimaryButtonUI title='Add Patient' onClick={() => setIsOpen(true)} className='rounded-md px-8 py-4' />
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
          data={dataPatient}
        />
      </div>

    </div>
  )
}

export default PatientPage