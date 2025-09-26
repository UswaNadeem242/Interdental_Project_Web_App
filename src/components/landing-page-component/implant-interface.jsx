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
                        className="w-full max-w-md"
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-sm  text-black md:text-3xl font-bold font-poppins  ">
                        <span className='text-fouthBrand'>Implant</span>  <span className='text-secondaryBrand'>Interface</span>
                    </h1>
                    <p className='text-xl font-normal font-poppins text-black'>Benefit for dentists:</p>
                    <ul className="flex flex-col space-y-1">
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
                            No phone calls needed to order implant parts.
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
                            Eliminates errors in size and brand selection.
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
                            Saves 10–15 minutes per case with digital ordering.
                        </li>
                        <li className="flex items-start gap-3 bg-white p-3 rounded-md font-poppins font-normal text-sm text-primaryText">
                            Case and parts are bundled and sent together to the lab.
                        </li>
                    </ul>
                    <button className="flex justify-center items-center w-[300px] sm:w-[210px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2" >
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