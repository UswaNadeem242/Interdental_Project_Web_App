import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header';

function ProductLandingPage({ isLanding }) {
    const navigate = useNavigate();
    return (
        <>  <div className='pb-20'>{!isLanding && <Header />}
        </div>
            <section className="bg-white py-16 px-8 flex flex-col md:flex-row items-center justify-between">
                {/* Left Side: Image */}
                <div className="flex flex-col md:flex-row w-full items-center">
                    {/* Left Side: Image */}
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <img
                            src="/assets/landing-page/product1.png"
                            alt="Dentist"
                            className="w-124 h-124 object-cover"
                        />
                    </div>

                    {/* Right Side: Text */}
                    <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-16 text-gray-800">
                        <h3 className="text-lg font-bold text-secondaryBrand font-poppins">ARGEN PMMA</h3>
                        <p className="mt-4 text-[#808080] w-full md:w-[58%] font-poppins">
                            Argen PMMA offers high quality, life-like temporary material
                            in a wide selection of monochromatic and multilayer discs.
                        </p>
                    </div>
                </div>

            </section>
        </>

    )
}

export default ProductLandingPage