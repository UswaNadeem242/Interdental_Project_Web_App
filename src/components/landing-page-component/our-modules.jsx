import CircleTrickIcon from '../../icon/circle-trick-icon'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
function OurModules() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-center ">
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
            <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center md:px-16 px-4 py-20 bg-secondaryBrand">

                <div className="flex justify-center">
                    <img
                        src="/assets/landing-page/landing1.png"
                        alt="Doctor Enrollment"
                        className="w-full max-w-md rounded-lg"
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-sm  text-white md:text-4xl font-bold font-poppins  ">
                        Dental Lab Alliance (DLA)
                    </h1>
                    <p className='text-xl font-normal font-poppins text-white'>Nationwide lab access at your fingertips.</p>
                    <ul className="flex flex-col space-y-3">
                        <li className="flex items-start gap-3 bg-blue-300/10 p-3 rounded-md font-poppins font-medium text-white">
                            <CircleTrickIcon className="w-5 h-5 shrink-0   text-white" />
                            Explore labs across the country, not just nearby.
                        </li>
                        <li className="flex items-start gap-3 bg-blue-300/10 p-3 rounded-md font-poppins font-medium text-white">
                            <CircleTrickIcon className="w-5 h-5 shrink-0   text-white" />
                            View specialties, prices, turnaround times, and portfolio photos.
                        </li>
                        <li className="flex items-start gap-3 bg-blue-300/10 p-3 rounded-md font-poppins font-medium text-white">
                            <CircleTrickIcon className="w-5 h-5 shrink-0  text-white" />
                            Compare and choose the best match with ease.
                        </li>
                        <li className="flex items-start gap-3 bg-blue-300/10 p-3 rounded-md font-poppins font-medium text-white">
                            <CircleTrickIcon className="w-5 h-5 shrink-0   text-white" />
                            Access denture, implant, crown & bridge labs without guesswork.
                        </li>
                    </ul>
                    <button className="flex justify-center items-center w-[300px] sm:w-[210px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2" onClick={() => navigate("/blog")}>
                        <h1 className="font-poppins font-semibold text-base text-white">
                            Explore Labs Now
                        </h1>
                        <div className="rounded-full bg-white text-secondaryBrand p-2">
                            <ArrowRightIcon className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default OurModules