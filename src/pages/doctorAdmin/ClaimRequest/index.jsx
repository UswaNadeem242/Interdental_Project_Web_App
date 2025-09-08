import TabsStepper from '../../../Common/TabsStepper'
import TableComponent from '../../../Common/Table';
import { data, headings } from '../../../Constant';

const ClaimRequest = () => {

  const steps = [
    {
      name: "All",
      content: <TableComponent headings={headings}
        data={data}
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
        <div className=''>
          <TabsStepper steps={steps} />
        </div>
      </div>
    </div>)
}

export default ClaimRequest