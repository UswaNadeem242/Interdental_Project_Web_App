import Header from '../header';
import UpperFooter from '../../../components/upper-footer';
import Footer from '../../../components/Footer';
import { accordionData, compositionData, diameters, newDiameters, newThicknesses, settingsOption, shadesproduct, shadesProductLanding, teethOption, thicknesses } from '../../../Constant';
import Shades from '../../../Common/product-landing/shades-product-landing';
import Dimensions from '../../../Common/product-landing/dimensions-product-landing';
import Accordion from '../../../Common/accordion';
import Contact from '../contact';
import IndicationProductLanding from '../../../components/product-landing/IndicationProductLanding';
import CompositionProductLanding from '../../../components/product-landing/CompositionProductLanding';

function ZidcardIvoclar({ isLanding }) {


    return (
        <div>

            <div className='pb-20'>{!isLanding && <Header />} </div>
            <section className="continer mx-auto md:px-8 px-4  pb-10">
                <div className='w-full pt-10'>
                    <img src='/assets/landing-page/1.3.png' className="w-full h-auto object-fit" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-8 gap-2 py-12">
                    {/* Left Image */}
                    <div className="col-span-4 flex justify-center items-center ">
                        <img
                            src="/assets/landing-page/image 6.png"
                            alt="image"
                            className="w-auto  h-auto object-contain  md:block hidden"
                        />
                    </div>
                    <div className="col-span-4 flex flex-col justify-center items-center md:items-start  mx-0 md:mx-0  text-left">
                        <div className='max-w-[510px]'>
                            <h4 className='text-secondaryBrand md:text-3xl text-lg font-bold font-poppins'>ARGEN Z ST MULTILAYER</h4>
                            <p className="mt-2 font-poppins text-base md:text-lg text-[#808080] pb-2">
                                ArgenZ ST Multilayer Zirconia features proprietary layer blending technology for natural shade transition. Suitable for single units anywhere in the mouth and up to three unit anterior bridges.
                            </p>
                        </div>
                        <div className="grid   grid-cols-3 gap-2">
                            <div className="bg-background py-8 px-4 flex flex-col items-center justify-center text-center">
                                <h6 className="text-secondaryBrand md:text-2xl text-base font-bold font-poppins">50%</h6>
                                <p className="text-[#949494] font-poppins text-base font-semibold">TRANSLUCENCY</p>
                            </div>

                            <div className="bg-background py-8 px-4 flex flex-col items-center justify-center text-center">
                                <h6 className="text-secondaryBrand md:text-2xl text-base font-bold font-poppins">850 MPa</h6>
                                <p className="text-[#949494] font-poppins text-base font-semibold">Strength</p>
                            </div>

                            <div className="bg-background py-8 px-4 flex flex-col items-center justify-center text-center">
                                <h6 className="text-secondaryBrand md:text-2xl text-base font-bold font-poppins">5Y</h6>
                                <p className="text-[#949494] font-poppins text-base font-semibold">MOLE%</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>












            <section className='continer mx-auto md:px-8 px-4  pb-10'>


                <div className='flex  justify-around items-center'>

                    <IndicationProductLanding />


                    <CompositionProductLanding data={compositionData} title="Composition" />
                </div>




            </section>

            <section className="container  mx-auto  px-4 py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="py-10">
                        <Shades shades={shadesproduct} title="Shades" />
                    </div>

                    <div className="p-4">
                        <Dimensions thicknesses={newThicknesses} diameters={newDiameters} />
                    </div>
                </div>
            </section>

            <section className='continer mx-auto md:px-8 px-4 py-10 md:py-40 bg-background'>
                <div className='flex justify-center pb-5'>
                    <h1 className='text-secondaryBrand md:text-5xl text-xl text-center'>Frequently <br /> <span className='text-[#94D3DD]'> Asked Questions</span>
                    </h1>
                </div>
                <div>
                    <Accordion items={accordionData} />
                </div>
            </section>
            <Contact />
            <UpperFooter />
            <Footer />


        </div>
    )
}

export default ZidcardIvoclar