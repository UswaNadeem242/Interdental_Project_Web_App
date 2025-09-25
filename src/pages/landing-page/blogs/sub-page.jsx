import React from "react";
import FrequentlyAskedQuestion from "../../../components/frequently-asked-question";
import Contact from "../contact";
import UpperFooter from "../../../components/upper-footer";
import Footer from "../../../components/Footer";
import BlogNext from "../../../components/landing-page-component/blog-next.jsx";


const sections = [
  {
    id: "why-choose",
    title: "Why Choose Implant–Retained Dentures?",
    paras: [
      "Losing natural teeth affects both function and appearance. While traditional dentures serve a purpose, they can shift or move, which causes poor fit, discomfort, and instability when eating or speaking. Additionally, over time they do not stimulate the jawbone, leading to gradual bone loss and facial structure changes. Routine maintenance is also required to keep removable dentures clean and functional.",
      "Implant-retained dentures offer superior stabilization. Instead of relying on adhesives, these dentures are anchored by dental implants, which also provide added security. This eliminates many of the challenges posed by conventional dentures and significantly improves quality of life.",
    ],
  },
  {
    id: "how-it-works",
    title: "How Do Implant Dentures Work?",
    paras: [
      "Implant-supported dentures combine dental implants with custom-made dentures. Here's what the process looks like:",
    ],
    bullets: [
      "Implant Placement: An oral surgeon inserts small titanium posts into the jawbone, acting as artificial tooth roots. If necessary, a bone graft may be performed to ensure implant stability.",
      "Healing & Integration: Over several months, the implants undergo osseointegration, where they fuse with the jawbone to create a stable foundation.",
      "Custom Denture Creation: Your dentures are designed to match your natural teeth, ensuring a comfortable fit and a natural appearance.",
      "Secure Attachment: The dentures are firmly connected to the implants, eliminating the need for adhesives and preventing slippage.",
      "Renewed Functionality: With implant-supported dentures, you can eat, speak, and smile with confidence, knowing your dentures will stay in place.",
    ],
  },
  {
    id: "why-choose-interoral",
    title: "Why Choose InterOral.Ai?",
    paras: [
      "Implant-supported dentures combine dental implants with custom-made dentures. Here's what the process looks like again, at a glance:",
    ],
    bullets: [
      "Implant Placement details tailored to your case.",
      "Healing & Integration supported by modern protocols.",
      "Custom Denture Creation with digital precision.",
      "Secure Attachment using proven systems.",
      "Renewed Functionality backed by ongoing support.",
    ],
  },
];

const HeadingWithLeader = ({ children }) => (
  <h2 className="flex items-center gap-4 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
    <span className="shrink-0">{children}</span>
    {/* dotted leader to the right */}
    <span className="hidden sm:block grow border-t border-dotted border-gray-300"></span>
  </h2>
);

export default function ImplantDenturesPage() {
  return (
    <>



      <div className="container px-4 mx-auto py-8 sm:py-12 md:pt-32  sm:px-6 md:px-8">
        {/*  flex flex-col md:flex-row items-center justify-between */}

        <h1 className="text-5xl font-bold text-primaryText max-w-[700px]  text-center mx-auto">What Are Implant-Retained
          Dentures?</h1>
        <p className="text-sm font-normal font-poppins text-primaryText text-center">Dentures</p>

      </div>



      <section className="bg-white text-gray-700 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-6 sm:py-10 md:py-14">
        {/* Hero image */}
        <div className="max-w-4xl mx-auto">
          <img
            src="/assets/landing-page/blog 1.png"
            alt="Implant retained dentures"
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        {/* Intro paragraph (optional) */}
        <p className="max-w-4xl mx-auto mt-4 sm:mt-6 text-sm md:text-base leading-relaxed text-gray-600">
          Implant-retained dentures are revolutionizing tooth replacement, blending the reliability of traditional dentures
          with advanced dental implant technology. By addressing common issues associated with conventional dentures,
          implant-supported dentures offer a more secure, comfortable, and long-lasting solution.
        </p>

        {/* Content sections rendered via map */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-12 space-y-10 md:space-y-12">
          {sections.map((sec) => (
            <section key={sec.id} className="space-y-4">
              <HeadingWithLeader>{sec.title}</HeadingWithLeader>

              {sec.paras?.map((p, i) => (
                <p key={i} className="text-sm md:text-base leading-7 text-gray-700">
                  {p}
                </p>
              ))}

              {sec.bullets && (
                <ul className="list-disc pl-5 text-sm md:text-base leading-7 space-y-1">
                  {sec.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </section>

<BlogNext />


      <FrequentlyAskedQuestion />
      <Contact />
      <UpperFooter />
      <Footer />
    </>




  );
}
