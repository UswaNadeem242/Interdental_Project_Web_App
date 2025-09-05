import React, { useState } from 'react'
import Drawers from '../../../Common/Drawers'
import { PrimaryButtonUI } from '../../../Common/Button';
import AddPatientForm from './AddPatientForm';
import OrdersTable from '../../../Common/OrdersTable';
import TableComponent from '../../../Common/Table';
import { data, dataPatient, headings, headingsPateint } from '../../../Constant';

const PatientPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='bg-white rounded-2xl py-6 px-6'>
        <div className='flex justify-end pb-3'>
          <PrimaryButtonUI title='Add Patient' onClick={() => setIsOpen(true)} className='rounded-md px-8 py-4' />
          <div>
            <Drawers
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title='Add Patient'
              Content={<AddPatientForm />}
            />
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