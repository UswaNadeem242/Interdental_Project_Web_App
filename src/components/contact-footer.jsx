import React from 'react'
import Contact from '../pages/landing-page/contact'
import Footer from './Footer'

function ContactFooter({ className }) {
    return (
        <div>
            <section className={`relative ${className}`}>
                {/* Background layers (optional aesthetic) */}
                <div className="absolute top-0  left-0 w-full h-full z-0">
                    {/* <div className="h-[80%] bg-background"></div> */}
                    {/* <div className="h-[20%] bg-white"></div> */}
                </div>

                {/* Contact Section */}
                <div className="relative z-20 top-24 w-full flex justify-center px-4">
                    <div className="max-w-7xl w-full text-center">
                        <Contact />
                    </div>
                </div>

                {/* Footer Section (Contact overlaps it slightly) */}
                <div className="relative z-10 -mt-20 md:-mt-28 bg-white shadow-[0px_59px_124px_0px_rgba(0,0,0,0.06)]">
                    <Footer className=' pt-52' />
                </div>
            </section>
        </div>
    )
}

export default ContactFooter