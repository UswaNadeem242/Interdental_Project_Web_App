import TabsStepper from '../../../Common/TabsStepper'
import TableComponent from '../../../Common/Table';
import { data, headings } from '../../../Constant';
import Drawers from '../../../Common/Drawers';
import { useState } from 'react';
import ClaimDetailForm from './ClaimDetailForm';

const ClaimRequest = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      name: "All",
      content: <TableComponent headings={headings}
        data={data}
        onActionClick={(row) => {
          setSelectedRow(row);
          setIsOpen(true);
        }}
      />
    },
    {
      name: "Active", content: <TableComponent headings={headings}
        data={data}
      />
    },
    {
      name: "Expired", content: <TableComponent headings={headings}
        data={data}
      />
    },
  ];
  return (
    <div>
      <div className='bg-white rounded-2xl p-6'>
        <TabsStepper steps={steps} />
        <Drawers
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Claim Details"
          status={selectedRow?.status}
          Content={<ClaimDetailForm row={selectedRow} />}
        />
      </div>
    </div>)
}

export default ClaimRequest