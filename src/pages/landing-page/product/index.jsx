import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header';

function ProductLandingPage({ isLanding }) {
    const navigate = useNavigate();


    const products = [
        {
            id: 1,
            title: "ARGEN PMMA",
            description:
                "Argen PMMA offers high quality, life-like temporary material in a wide selection of monochromatic and multilayer discs.",
            image: "/assets/landing-page/product1.png",
        },
        {
            id: 2,
            title: "ARGEN Z HT+",
            description:
                "ArgenZ HT+ Zirconia offers extremely accurate, life-like restorations with 4-5% more translucency and 100-150 MPa higher strength over traditional HT zirconia. Available for milling in high definition by Argen. TRANSLUCENCY STRENGTH.",
            image: "/assets/landing-page/product2.png",
        },
        {
            id: 3,
            title: "ARGEN Z ST M",
            description:
                "Argen Z ST Multilayer Zirconia features proprietary layer shading technology for natural transitions from dentin to enamel. Available for milling in high definition by Argen to ensure ultra-reliable designs.",
            image: "/assets/landing-page/product3.png",
        },
        {
            id: 4,
            title: "ZirCad Ivoclar",
            description:
                "Argen Z ST Multilayer Zirconia features proprietary layer shading technology for natural transitions from dentin to enamel. Available for milling in high definition by Argen to ensure ultra-reliable designs.",
            image: "/assets/landing-page/product3.png",
        },
    ];

    return (
        <>  <div className='pb-20'>{!isLanding && <Header />} </div>





            <section className="py-16">
                <div className="grid grid-cols-1 gap-12">
                    {products.map((item, index) => (
                        <div
                            key={item.id}
                            className={`grid grid-cols-1 md:grid-cols-2 items-center p-6  ${index % 2 !== 0 ? "bg-background py-40" : "bg-transparent"
                                }`}
                        >
                            {/* Image first if even, text first if odd */}
                            {index % 2 === 0 ? (
                                <>
                                    <div className="flex justify-center items-center p-6">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="max-w-[300px] h-auto object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center max-w-[509px] mx-auto">
                                        <h3 className="text-base font-bold font-poppins md:text-3xl text-secondaryBrand">
                                            {item.title}
                                        </h3>
                                        <p className="mt-4 font-poppins md:text-xl text-base text-[#808080]">
                                            {item.description}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col justify-center max-w-[509px] mx-auto p-6">
                                        <h3 className="text-base font-bold font-poppins md:text-3xl text-secondaryBrand">
                                            {item.title}
                                        </h3>
                                        <p className="mt-4 font-poppins md:text-xl text-base text-[#808080]">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="max-w-[300px] h-auto object-contain"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>



        </>

    )
}

export default ProductLandingPage