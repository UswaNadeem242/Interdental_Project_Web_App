import React from 'react'
import { useNavigate } from 'react-router-dom';
import CircleTrickIcon from '../../icon/circle-trick-icon';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ThirdButtonUI } from '../../Common/Button';

function MakeSmile() {
    const navigate = useNavigate();
    return (
        <div>

            <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-center md:px-16 px-4 py-20  ">
                <div className="flex justify-center">
                    <img
                        src="/assets/landing-page/landing 2.png"
                        alt="Doctor Enrollment"
                        className="w-full max-w-md rounded-lg"
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-sm  text-black md:text-3xl font-bold font-poppins  ">
                        <span className='text-fouthBrand'>MakeMeSmile
                        </span>  <span className='text-secondaryBrand'>Warranty (MMS)</span>
                    </h1>
                    <p className='text-xl font-normal font-poppins text-black'>Benefit for dentists:</p>
                    <ul className="flex flex-col space-y-1">

                        <li className="flex items-start gap-3  bg-textFieldColor p-3 rounded-md font-poppins font-medium text-primaryText">
                            Provides patients with peace of mind and trust.
                        </li>

                        <li className="flex items-start gap-3  bg-textFieldColor p-3 rounded-md font-poppins font-medium text-primaryText">
                            Dentist saves money with lab bill discounts.
                        </li>

                        <li className="flex items-start gap-3  bg-textFieldColor p-3 rounded-md font-poppins font-medium text-primaryText">
                            No disputes over who pays if a crown or implant breaks.
                        </li>

                        <li className="flex items-start gap-3 bg-textFieldColor  p-3 rounded-md font-poppins font-medium text-primaryText">
                            Builds loyalty and professionalism in the practice.
                        </li>
                    </ul>

                    <ThirdButtonUI title='Protect Your Smile' />

                </div>


            </section>
        </div>
    )
}

export default MakeSmile