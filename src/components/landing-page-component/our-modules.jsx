import CircleTrickIcon from '../../icon/circle-trick-icon'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import { ThirdButtonUI } from '../../Common/Button';
function OurModules() {
    const navigate = useNavigate();
    return (
        <div className=''>
            <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center md:px-16 px-4 py-20 bg-[#F7FCFC]">
                <div className="flex justify-center">
                    <img
                        src="/assets/landing-page/landing1.png"
                        alt="Doctor Enrollment"
                        className="w-full max-w-sm"
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
                    <ThirdButtonUI title=' Explore Labs Now' />

                </div>
            </section>
        </div>
    )
}

export default OurModules