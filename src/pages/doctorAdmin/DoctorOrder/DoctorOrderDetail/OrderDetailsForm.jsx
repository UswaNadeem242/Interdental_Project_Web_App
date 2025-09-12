import { useState } from 'react'
import { SecondaryButton } from '../../../../Common/Button'
import DropDownComponent from '../../../../Common/DropDown'
import { options, ShippingDetail } from '../../../../Constant';
import CardIcon from '../../../../icon/CardIcon';
import { TeethSelection } from '../../../../components/doctorAdmin/TeethSelection';

export default function OrderDetailsForm() {
    const [selected, setSelected] = useState("");

    const handleSelect = (option) => {
        setSelected(option);
    };

    const [selectedTeeth, setSelectedTeeth] = useState([]);

    const toggleTooth = (id) => {
        setSelectedTeeth((prev) =>
            prev.includes(id)
                ? prev.filter((tooth) => tooth !== id) // unselect
                : [...prev, id] // select
        );
    };

    return (
        <div className='grid md:grid-cols-12 col-span-6  gap-4 mt-7 '>

            <div className='md:col-span-8 col-span-4 bg-white p-4 rounded-2xl'>
                <div className='flex justify-between items-center pb-4'>
                    <div>
                        <h4 className='text-[#1A1A1A] font-semibold text-sm font-poppins'>Implant Design Form:</h4>
                    </div>
                    <div>
                        <SecondaryButton title='Download Form' className='border text-secondaryBrand border-secondaryBrand rounded-full  px-6 py-3' />
                    </div>
                </div>

                <div>
                    <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
                        <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-[#434343]">Doctor Info</h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm sm:text-base">
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Contact Info</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins ">Doctor</p>
                            </div>
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Office Registration No#</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">officeReg</p>
                            </div>

                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Create Date</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">createDate</p>
                            </div>
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Due Date</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">dueDate</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='mt-4'>
                    <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
                        <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-[#434343]">Patient Information</h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base">
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">First Name:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">Miles</p>
                            </div>
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Last Name:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">Esther</p>
                            </div>

                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Subscription ID:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">466437#</p>
                            </div>

                        </div>
                    </div>
                </div>


                <div className='mt-4'>
                    <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
                        <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-[#434343]">Tooth Selection</h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base">
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">First Name:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">Miles</p>
                            </div>
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Last Name:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">Esther</p>
                            </div>

                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Subscription ID:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">466437#</p>
                            </div>

                        </div>
                    </div>


                    {/* tooth selection  */}
                    <div className="border border-gray-200  rounded-lg p-4 mt-4">
                        <p className="text-sm font-medium font-poppins text-[#434343]">
                            Tooth Selection : {selectedTeeth.sort((a, b) => a - b).join(", ")}
                        </p>
                        <div className="py-4">
                            <img
                                src="/assets/doctor/teeth.png"
                                alt="Teeth Chart"
                                className="w-full h-auto rounded-md border border-gray-300"
                            />
                            {/* <TeethSelection selectedTeeth={selectedTeeth} setSelectedTeeth={setSelectedTeeth} toggleTooth={toggleTooth} /> */}
                        </div>


                    </div>
                </div>

                <div className='mt-4'>
                    <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
                        <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-[#434343]">Customization Details</h3>
                        <hr className="border-gray-200 my-2" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base pb-2">
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Material:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">Miles</p>
                            </div>
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Colour:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">Esther</p>
                            </div>

                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Type:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">466437#</p>
                            </div>

                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base border-gray-200  border-t-2 pt-2">
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Manufacturer</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">Miles</p>
                            </div>
                            <div>
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Manufacture Process</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">Esther</p>
                            </div>



                        </div>

                    </div>
                    <div className="border border-gray-200  rounded-lg p-4 sm:p-6 mt-4">
                        <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-[#434343]">Notes</h3>
                        <hr className="border-gray-200 my-2" />
                        <div className=" text-sm sm:text-base pb-2">
                            <div >
                                <p className="text-[#949494]  font-normal md:text-sm text-xs font-poppins">Dr,weed bran:</p>
                                <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">kindly Use strong material for the upper teeth for better </p>
                            </div>


                        </div>


                    </div>

                </div>

            </div>
            <div className="col-span-4">
                <div className="relative">
                    <DropDownComponent
                        label="Cart Total"
                        options={options}
                        selected={selected}
                        optionValue="value"
                        onSelect={handleSelect}
                    />
                </div>

                <div className="relative mt-4">
                    <div className='bg-white p-4 rounded-lg shadow-lg'>
                        <h1 className='text-[#1A1A1A] text-lg font-semibold font-poppins capitalize pb-4'>Payment Detail</h1>
                        <div className='flex  items-center gap-2'>
                            <CardIcon className='w-3 h-3' />
                            <p className='text-primaryText font-normal font-poppins'>Credit or debit card </p>
                        </div>

                    </div>
                </div>

                <div className="relative mt-4">
                    <DropDownComponent
                        label="Shipping Detail"
                        options={ShippingDetail}
                        selected={selected}
                        optionValue="value"
                        onSelect={handleSelect}
                    />
                </div>
            </div>



        </div>
    )
}
