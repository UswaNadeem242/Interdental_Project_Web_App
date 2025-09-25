import React from 'react'
import { accordionData } from '../../Constant'
import Accordion from '../../Common/accordion'

export default function FrequentlyAskedQuestion() {
    return (
        <section className='container mx-auto md:px-8 px-4 py-10 md:py-20  bg-background'>
            <div className='flex justify-center pb-20'>
                <h1 className='text-secondaryBrand md:text-5xl text-xl text-center'>Frequently <br /> <span className='text-[#94D3DD] font-bold'> Asked Questions</span>
                </h1>
            </div>
            <div>
                <Accordion items={accordionData} />
            </div>
        </section>
    )
}
