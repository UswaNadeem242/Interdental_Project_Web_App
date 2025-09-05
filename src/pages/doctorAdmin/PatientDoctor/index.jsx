import React, { useState } from 'react'
import TabsStepper from '../../../Common/TabsStepper'
import Drawers from '../../../Common/Drawers'
import {PrimaryButtonUI} from '../../../Common/Button';
import AddPatientForm from './AddPatientForm';
import OrdersTable from '../../../Common/OrdersTable';

const PatientPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='bg-white rounded-e-2xl py-6 px-6'>
        <div className='flex justify-end'>
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
        <OrdersTable />
      </div>

    </div>
  )
}

export default PatientPage