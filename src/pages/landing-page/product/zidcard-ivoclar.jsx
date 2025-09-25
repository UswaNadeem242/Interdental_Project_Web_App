import Header from '../header';
import UpperFooter from '../../../components/upper-footer';
import Footer from '../../../components/Footer';
import { cardsecondZidCard, CardZidcard, compositionData, newDiameterszidCard, newThicknesseszidCard, shadesproductzidCard, zidCardComponent } from '../../../Constant';
import Shades from '../../../Common/product-landing/shades-product-landing';
import Dimensions from '../../../Common/product-landing/dimensions-product-landing';
import Contact from '../contact';
import IndicationProductLanding from '../../../components/product-landing/IndicationProductLanding';
import CompositionProductLanding from '../../../components/product-landing/CompositionProductLanding';
import FrequentlyAskedQuestion from '../../../components/frequently-asked-question';
import { NavLink } from 'react-router-dom';

function ZidcardIvoclar({ isLanding }) {



    return (
        <div>

            <div className='pb-20'>{!isLanding && <Header />} </div>
            <section className="container mx-auto   px-4  pb-10">
                <div className='w-full md:pt-10 '>
                    <img src='/assets/landing-page/1.4.png' className="md:w-full h-auto min-w-[384px] object-fit" />
                </div>


            </section>
            <section className='container mx-auto px-8'>
                <div className="grid grid-cols-1 md:grid-cols-8 gap-2 py-12">
                    {/* Left Image */}
                    <div className="col-span-4 flex justify-center items-center ">
                        <img
                            src="/assets/landing-page/product4.png"
                            alt="image"
                            className="w-auto  h-auto object-contain  md:block hidden"
                        />
                    </div>
                    <div className="col-span-4 flex flex-col justify-center items-center md:items-start  mx-0 md:mx-0  text-left">
                        <div className='max-w-[510px]'>
                            <h4 className='text-secondaryBrand md:text-3xl text-lg font-bold font-poppins pb-8'>ZirCad Ivoclar</h4>
                            <p className="mt-2 font-poppins text-base md:text-lg text-[#808080] pb-2">
                                IPS e.max ZirCAD provides a versatile range of zirconium oxide materials for labside CAD/CAM applications. It is used for the fabrication of frameworks and full-contour crowns and bridges. High strength, thin wall thickness and high esthetics are among its hallmarks. IPS e.max ZirCAD Prime is redefining all-ceramics. This revolutionary material is characterized by exceptional quality and <NavLink to='#' className='text-fouthBrand'>
                                    Read more...
                                </NavLink>
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className='container mx-auto px-8'>
                <div className="grid md:grid-cols-12 grid-col-6 gap-4">

                    {
                        CardZidcard?.map((item, id) => {
                            return (
                                <div className="md:col-span-4  col-span-6  bg-background p-8 text-center ">
                                    <h3 className='text-secondaryText text-base font-poppins pb-6'>{item?.title}</h3>
                                    <div className='pb-3'>
                                        <p className='text-primaryText font-poppins font-semibold text-base'>{item?.label1} <span className='text-secondaryBrand'>{item?.value1}</span></p>
                                    </div>
                                    <div>
                                        <p className='text-primaryText font-poppins font-semibold text-base'>{item?.label2} <span className='text-secondaryBrand'>{item?.value2}</span></p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* First Row */}
                    {
                        cardsecondZidCard?.map((item, id) => {
                            return (
                                <div className="col-span-6 bg-gray-100 p-8 text-center"> <h3 className='text-secondaryText text-base font-poppins pb-6'>{item?.title}</h3>
                                    <div className='pb-3'>
                                        <p className='text-primaryText font-poppins font-semibold text-base'>{item?.label1} <span className='text-secondaryBrand'>{item?.value1}</span></p>
                                    </div>
                                    <div>
                                        <p className='text-primaryText font-poppins font-semibold text-base'>{item?.label2} <span className='text-secondaryBrand'>{item?.value2}</span></p>
                                    </div></div>
                            )
                        })
                    }
                </div>


            </section>


            <section className="container  mx-auto  px-4 py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="py-10">
                        <Shades shades={shadesproductzidCard} title="Shades" />
                    </div>

                    <div className="p-4">
                        <Dimensions thicknesses={newThicknesseszidCard} diameters={newDiameterszidCard} />
                    </div>
                </div>
            </section>

            <section className='container  mx-auto  px-4 py-10'>

                <div className="grid grid-cols-12 gap-4 space-y-10">
                    {zidCardComponent.map((card, index) => (
                        <div
                            key={index}
                            className="col-span-12 border border-grey-100 rounded-2xl md:p-16 p-8"
                        >
                            <h2 className="font-poppins capitalize md:text-2xl text-lg text-secondaryBrand pb-8 font-bold">
                                {card.title}
                            </h2>

                            <ul className="space-y-4 list-disc list-inside marker:text-secondaryBrand">
                                {card.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="bg-background py-6 px-8 text-black text-lg font-semibold font-poppins capitalize rounded-md"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
            <FrequentlyAskedQuestion />
            <Contact />
            <UpperFooter />
            <Footer />
        </div>
    )
}

export default ZidcardIvoclar