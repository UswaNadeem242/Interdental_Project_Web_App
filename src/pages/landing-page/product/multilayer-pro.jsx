import Header from '../header';
import UpperFooter from '../../../components/upper-footer';
import Footer from '../../../components/Footer';
import { compositionData, newDiametersargenzst, newThicknessesargenzst, shadesproductargenzst, teethOption, teethOptionMutiple, } from '../../../Constant';
import Shades from '../../../Common/product-landing/shades-product-landing';
import Dimensions from '../../../Common/product-landing/dimensions-product-landing';
import Contact from '../contact';
import IndicationProductLanding from '../../../components/product-landing/IndicationProductLanding';
import CompositionProductLanding from '../../../components/product-landing/CompositionProductLanding';
import FrequentlyAskedQuestion from '../../../components/frequently-asked-question';

function Multilayerpro({ isLanding }) {
    const features = [
        {
            title: "Bionic",
            description:
                "3D pro Zir is developed by Aidite Technology and Peking University School of Stomatology. The material comes closer to natural teeth. Not only from the esthetic point of view, also its abrasion characteristics makes it to a dental material with biomimetic properties.",
        },
        {
            title: "High Strength",
            description:
                "The flexural strength of 3D pro zir is up to 1100 MPa which is greatly improved. Long span bridges are stable and fully meet the strength requirements of laboratories for a broad range of indications.",
        },
        {
            title: "Layerless Natural Transition",
            description:
                "Matching the color transition of natural teeth from cervical to incisal, 3D pro zir has a smooth color gradient without visible layer.",
        },
        {
            title: "Fast Delivery",
            description:
                "3D pro zir is the leading digital solution in the field of zirconia materials. The excellent characteristics of the material itself, combined with the 3D pro zir Rapid Aesthetic Solution will help laboratories to finalize and deliver zirconia restorations within 24 hours.",
        },
    ];

    return (
        <div>

            <div className='pb-20'>{!isLanding && <Header />} </div>
            <section className="container mx-auto    pb-10">
                <div className='w-full pt-10'>
                    <img src='/assets/landing-page/1.5.png' className="w-full h-auto object-fit" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-8 gap-2 py-12 bg-background">
                    {/* Left Image */}

                    <div className="col-span-4 flex justify-center items-center">
                        <div className='max-w-[578px]'>
                            <h4 className='text-secondaryBrand md:text-3xl text-lg font-bold font-poppins pb-8'>Aidite zirconia </h4>
                            <p className="mt-2 font-poppins text-base md:text-lg text-[#808080] pb-2">
                                3D Pro zir is fabricated with the most advanced production processes at Aidite, producing a layerless,natural shade gradient, with optimal strengthand translucency, transitioning from Cervical to Incisal areas of the restoration. With a maximum flexural strength of 1100 MPa, 3D Pro zirensures aesthetic results while being suitable for all indications from single crowns to 14- unitbridge structures.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-4 flex justify-center items-center ">
                        <img
                            src="/assets/landing-page/yt.png"
                            alt="image"
                            className="w-auto  h-auto object-contain  md:block hidden"
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
                    <div className="flex flex-wrap justify-center gap-10">
                        {teethOptionMutiple?.slice(0, 6).map((teeth) => (
                            <div key={teeth.title} className="flex flex-col items-center w-20 sm:w-24 md:w-32">
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

                    <div className="flex  flex-wrap justify-center gap-10">
                        {teethOptionMutiple.slice(6, 11).map((teeth) => (
                            <div key={teeth.title} className="flex flex-col items-center w-20 sm:w-24 md:w-32">
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


            <section className='container mx-auto md:px-8 px-4 py-10 md:py-20'>
                <div className='flex justify-center pb-20'>
                    <h1 className='text-secondaryBrand md:text-5xl text-xl text-center font-bold'>Strength <span className='text-secondaryBrand md:text-5xl text-xl text-center'>and</span> <span className='text-[#94D3DD] font-bold'> Translucency</span>
                    </h1>
                </div>
                <div className='flex justify-center'>
                    <img src='/assets/landing-page/transpacy.png' className='text-center' />
                </div>
                <div className='grid grid-col-12 gap-3'>
                    <div className='col-span-12'>
                        {features.map((item, index) => (
                            <div key={index} className="pb-5">
                                <h3 className="text-black font-semibold md:text-lg text-sm pb-5">
                                    {item.title}
                                </h3>
                                <p className="text-secondaryText font-poppins text-lg capitalize">
                                    {item.description}
                                </p>
                            </div>
                        ))}



                    </div>

                </div>
            </section>

            <section className="container  mx-auto  px-4 py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="py-10">
                        <Shades shades={shadesproductargenzst} title="Shades" description='3D Pro zir is available in 16 shades of the classical VITA shade guide and 3 bleach shades OM1/OM2/OM3. For individual further charac-terisation, Biomic Stain&Glaze can be used. 3D Pro zir simplifies the whole process in achieving highly aesthetic results.' />
                    </div>

                    <div className="p-4">
                        <Dimensions thicknesses={newThicknessesargenzst} diameters={newDiametersargenzst} />
                    </div>
                </div>
            </section>

            <FrequentlyAskedQuestion />
            <Contact />
            <UpperFooter />
            <Footer />
        </div>
    )
}

export default Multilayerpro