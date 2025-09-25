import CircleTrickIcon from '../../icon/circle-trick-icon'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
function ImplantInterfeace() {
    const navigate = useNavigate();
    return (
        <div>
            <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center md:px-16 px-4 py-20 bg-textField">
                <div className="flex justify-center">
                    <img
                        src="/assets/landing-page/landing 3.png"
                        alt="Doctor Enrollment"
                        className="w-full max-w-md rounded-lg"
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-sm  text-black md:text-4xl font-bold font-poppins  ">
                        Implant Interface
                    </h1>
                    <p className='text-xl font-normal font-poppins text-black'>Nationwide lab access at your fingertips.</p>
                    <ul className="flex flex-col space-y-3">
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-medium text-primaryText">
                            <CircleTrickIcon className="w-5 h-5 shrink-0   text-secondaryBrand" />
                            Explore labs across the country, not just nearby.
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-medium text-primaryText">
                            <CircleTrickIcon className="w-5 h-5 shrink-0   text-secondaryBrand" />
                            View specialties, prices, turnaround times, and portfolio photos.
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-medium text-primaryText">
                            <CircleTrickIcon className="w-5 h-5 shrink-0  text-secondaryBrand" />
                            Compare and choose the best match with ease.
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-medium text-primaryText">
                            <CircleTrickIcon className="w-5 h-5 shrink-0   text-secondaryBrand" />
                            Access denture, implant, crown & bridge labs without guesswork.
                        </li>
                    </ul>
                    <button className="flex justify-center items-center w-[300px] sm:w-[210px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2" onClick={() => navigate("/blog")}>
                        <h1 className="font-poppins font-semibold text-base text-primaryText">
                            Order Smarter
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

export default ImplantInterfeace