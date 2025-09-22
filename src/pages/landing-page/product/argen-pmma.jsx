import Header from '../header';
import UpperFooter from '../../../components/upper-footer';
import Footer from '../../../components/Footer';
import { settingsOption, teethOption } from '../../../Constant';

function ArgebbPmma({ isLanding }) {





    return (
        <div>

            <div className='pb-20'>{!isLanding && <Header />} </div>
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

            <Footer />


        </div>
    )
}

export default ArgebbPmma