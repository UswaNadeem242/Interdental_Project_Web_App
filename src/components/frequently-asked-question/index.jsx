import React from 'react'
import { accordionData } from '../../Constant'
import Accordion from '../../Common/accordion'
import Contact from '../../pages/landing-page/contact'

export default function FrequentlyAskedQuestion() {
    return (
        <section className="relative">
            <div className="absolute inset-0 -z-10">
                <div className="bg-background h-[80%]"></div>
                <div className="bg-white h-[30%]"></div>
            </div>
            <section className='container mx-auto md:px-8 px-4 py-10 md:py-20  bg-background'>
                <div className='flex justify-center pb-20'>
                    <h1 className='text-secondaryBrand md:text-5xl text-xl text-center'>Frequently <br /> <span className='text-[#94D3DD] font-bold'> Asked Questions</span>
                    </h1>
                </div>
                <div>
                    <Accordion items={accordionData} />
                </div>
            </section>
            <div className="relative z-10 -mt-24 md:-mt-32 max-w-5xl mx-auto shadow-[0px_59px_124px_0px_rgba(0,0,0,0.06)]">
                <Contact />
            </div>
        </section>

    )
}
