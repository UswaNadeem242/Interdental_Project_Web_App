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
import { diameters, newDiameters, newThicknesses, settingsOption, shadesproduct, shadesProductLanding, teethOption, thicknesses } from '../../../Constant';
import Shades from '../../../Common/product-landing/shades-product-landing';
import Dimensions from '../../../Common/product-landing/dimensions-product-landing';
import Accordion from '../../../Common/accordion';
import Contact from '../contact';

function ZidcardIvoclar({ isLanding }) {

    const accordionData = [
        {
            title: "How do you generate $5 leads?",
            description:
                "Files must be submitted by 3:00 p.m. PST. Units will be received within 2 business days.",
        },
        {
            title: "How quickly can I see results?",
            description: [
                "Wall Thickness: <b>0.80 mm minimum</b>",
                "Margin Thickness: <b>0.10 mm</b>",
                "Margin Angle: <b>90° degrees</b>",
                "Note: If walls/margins are too thin, failures may occur during the build process (i.e. cracks, holes).",
            ],
        },
        {
            title: "What’s included in your service?",
            description: [
                "Wall Thickness: <b>0.80 mm minimum</b>",
                "Margin Thickness: <b>0.10 mm</b>",
                "Margin Angle: <b>90° degrees</b>",
                "Note: If walls/margins are too thin, failures may occur during the build process (i.e. cracks, holes).",
            ],
        },
        {
            title: "How do you ensure the leads are qualified?",
            description: [
                "Wall Thickness: <b>0.80 mm minimum</b>",
                "Margin Thickness: <b>0.10 mm</b>",
                "Margin Angle: <b>90° degrees</b>",
                "Note: If walls/margins are too thin, failures may occur during the build process (i.e. cracks, holes).",
            ],
        },
        {
            title: "Can this system work for my specific market?",
            description: [
                "Wall Thickness: <b>0.80 mm minimum</b>",
                "Margin Thickness: <b>0.10 mm</b>",
                "Margin Angle: <b>90° degrees</b>",
                "Note: If walls/margins are too thin, failures may occur during the build process (i.e. cracks, holes).",
            ],
        },

    ];
 

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
 
            <section className="continer mx-auto md:px-8 px-4  pb-10">
                <div className='w-full pt-10'>
                    <img src='/assets/landing-page/argen1.png' className="w-full h-auto object-cover" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16">
                    {/* Left Image */}
                    <div className="col-span-6 flex justify-center items-center">
                        <img
                            src="/assets/landing-page/product1.png"
                            alt="image"
                            className="w-full max-w-[300px] h-auto object-contain"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="col-span-6 flex flex-col justify-center items-center md:items-start max-w-[509px] mx-auto text-center md:text-left">
                        <p className="mt-4 font-poppins md:text-xl text-base text-[#808080] pb-5">
                            Argen PMMA offers high quality, life-like temporary material in a wide
                            selection of monochromatic and multilayer discs.
                        </p>
                        <img
                            src="/assets/landing-page/teeth.png"
                            alt="image"
                            className="w-full max-w-[400px] object-contain"
                        />
                    </div>
                </div>
            </section>
            <section className='continer mx-auto md:px-8 px-4  pb-10'>

                <div className='flex justify-center'>
                    <h2 className='font-poppins text-secondaryBrand md:text-4xl text-base pb-10'> Recommended <span className='text-[#94D3DD]'>Indications</span></h2>
                </div>
                <div className="flex flex-col items-center gap-8">
                    {/* Top row → first 5 items */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {teethOption.slice(0, 5).map((teeth) => (
                            <div key={teeth.title} className="flex flex-col items-center w-20 sm:w-24 md:w-28">
                                <img
                                    src={teeth.img}
                                    alt={teeth.title}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                                />
                                <span className="mt-2 text-xs sm:text-sm font-poppins text-center">
                                    {teeth.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Bottom row → last 2 items centered */}
                    <div className="flex justify-center gap-6">
                        {teethOption.slice(5, 7).map((teeth) => (
                            <div key={teeth.title} className="flex flex-col items-center w-20 sm:w-24 md:w-28">
                                <img
                                    src={teeth.img}
                                    alt={teeth.title}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                                />
                                <span className="mt-2 text-xs sm:text-sm font-poppins text-center">
                                    {teeth.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
            <section className='continer mx-auto md:px-8 px-4  pb-10 rounded-2xl '>
                <div className='bg-background py-20 px-8'>
                    <h1 className='text-secondaryBrand font-poppins flex justify-center md:text-4xl text-lg pb-10'>Recommended Setting    <span className='text-[#94D3DD] ml-2'>  Parameters </span> </h1>

                    <div className="space-y-6">
                        {settingsOption.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center"
                            >
                                {/* Title */}
                                <div className='col-span-1'></div>
                                <div className="md:col-span-1 text-center md:text-left">
                                    <h5 className="text-[#000000] font-semibold">{item.title}</h5>
                                </div>

                                <div className="md:col-span-3 text-center md:text-left space-y-1">


                                    {Array.isArray(item.description) ? (
                                        item.description.map((line, i) => {
                                            if (line.startsWith("Note")) {
                                                return (
                                                    <p key={i} className="text-gray-700 text-sm md:text-base leading-relaxed">
                                                        {line}
                                                    </p>
                                                );
                                            }

                                            const [label, value] = line.split(":");
                                            return (
                                                <p key={i} className="text-gray-700 text-sm md:text-base leading-relaxed">
                                                    {label}: <span className="font-bold">{value}</span>
                                                </p>
                                            );
                                        })
                                    ) : (
                                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}


                                </div>
                            </div>
                        ))}
                    </div>


                </div>

            </section>
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="py-10">
                        <Shades shades={shadesproduct} title="Shades" />
                    </div>

                    <div className="p-4">
                        <Dimensions thicknesses={newThicknesses} diameters={newDiameters} />
 
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