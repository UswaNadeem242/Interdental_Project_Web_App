const warranties = [
  {
    id: 1,
    title: "WARRANTY PROGRAM",
    subtitle: "PATIENT",
    description:
      "Our warranty gives you the comfort and reassurance you deserve",
    image: "/assets/landing-page/warranty-image-1.png",
    buttonStyle: "bg-blue-900 text-white hover:bg-blue-700",
  },
  {
    id: 2,
    title: "WARRANTY PLAN",
    subtitle: "DOCTOR",
    description:
      "Find everything you need to know about our Services Warranty Plan",
    image: "/assets/landing-page/warranty-image-2.png",
    buttonStyle: "bg-blue-900 text-white hover:bg-blue-700",
  },
];
const Warranty = () => {
  return (
    <section className="bg-white py-16 px-8">
      {/* Section Header */}
      <h2 className="text-3xl font-bold text-blue-300  uppercase text-center">
        THE WARRANTY
      </h2>
      <p className="mt-4 text-gray-600 text-center max-w-3xl mx-auto">
        Interdental Lab provides peace of mind and a unique practice growth
        opportunity with a comprehensive Warranty Plans and Referral Program.
      </p>

      {/* Warranty Cards */}
      <div className="mx-32 mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {warranties.map((warranty, index) => (
          <div
            key={warranty.id}
            className={`bg-white border flex ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse pr-8"
            } rounded-lg shadow-md overflow-hidden hover:shadow-lg transition`}>
            <div className="relative">
              <img
                src={warranty.image}
                alt={warranty.subtitle}
                className="w-96 h-72 m-4 rounded-lg object-cover"
              />
            </div>
            <div className="p-6 my-auto">
              <h3 className="text-lg font-bold text-gray-900">
                {warranty.title}
              </h3>
              <h4 className="text-blue-300 text-2xl font-bold mt-8">
                {warranty.subtitle}
              </h4>
              <p className="mt-4 text-gray-400">{warranty.description}</p>
              <button
                className={`mt-6 px-6 py-3 border transition rounded-lg ${warranty.buttonStyle}`}>
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Warranty;
