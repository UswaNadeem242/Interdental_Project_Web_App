import CircleTrickIcon from '../../icon/circle-trick-icon'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
function OurModules() {
    const navigate = useNavigate();
    return (
        <div className='border-t border-bg-background'>
            <div className="flex justify-center  pt-10">
                <h1 className="text-3xl lg:text-4xl font-poppins capitalize">
                    our
                    <span className="text-secondaryBrand font-bold capitalize ml-2">
                        Modules
                    </span>
                </h1>
            </div>
            <div className="flex justify-center pb-6">
                <p className="text-secondaryText text-sm font-poppins text-center max-w-3xl py-6">
                    Explore our top-rated selections crafted just for you!
                </p>
            </div>
            <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center md:px-16 px-4 py-20 bg-[#F7FCFC]">

                <div className="flex justify-center">
                    <img
                        src="/assets/landing-page/landing1.png"
                        alt="Doctor Enrollment"
                        className="w-full max-w-md rounded-lg"
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-sm    md:text-4xl font-bold font-poppins  ">
                        <span className='text-fouthBrand'> Dental Lab</span>  <span className='text-secondaryBrand'>Alliance (DLA)</span>
                    </h1>
                    <p className='text-xl font-normal font-poppins text-primaryText'>Benefit for dentists:</p>
                    <ul className="flex flex-col space-y-1">
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
                            Access to a nationwide lab network.
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">

                            Freedom to choose labs by quality, cost, or speed.
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
                            Transparent pricing and profiles with no hidden surprises.
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
                            Centralized communication with no more phone calls.
                        </li>
                    </ul>
                    <button className="flex justify-center items-center w-[300px] sm:w-[210px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
                        <h1 className="font-poppins font-semibold text-sm capitalize text-primaryText">
                            Explore Labs Now
                        </h1>
                        <div className="rounded-full bg-secondaryBrand text-white p-2">
                            <ArrowRightIcon className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default OurModules