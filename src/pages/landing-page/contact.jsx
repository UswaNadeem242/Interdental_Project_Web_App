import Header from "./header";
import Footer from "../../components/Footer";

const Contact = ({ isLanding }) => {
  return (
    <>
      <div className='md:pb-20 pb-0'>{!isLanding && <Header />} </div>
      <section className="bg-white  py-8 md:py-16 px-4 md:px-8 shadow-lg rounded-xl w-full max-w-7xl mx-auto my-6 md:my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Contact Details */}
          <div className="p-6 md:p-8 rounded-lg">
            <h3 className="text-2xl font-extrabold text-black mb-4">CONTACT US</h3>
            <p className="text-gray-600 text-sm mb-6">
              Contact us by email, phone, or simply drop your message here. Let us know if you have any questions.
            </p>

            <div className="space-y-4">
              {/* Phone Section */}
              <div className="flex items-center bg-gray-100 rounded-full p-3 md:p-4 shadow-md">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
                  {/* Phone SVG */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect width="48" height="48" rx="24" fill="#013764" /> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4792 12.0516C17.94 10.5991 20.3452 10.8576 21.5684 12.4915L23.0816 14.5128C24.0768 15.8422 23.989 17.7003 22.8076 18.875L22.5211 19.1599C22.5086 19.1963 22.4782 19.3105 22.5119 19.5277C22.5878 20.0167 22.9961 21.054 24.7103 22.7584C26.4239 24.4623 27.4686 24.8703 27.9645 24.9463C28.1893 24.9808 28.3068 24.9487 28.3432 24.936L28.8328 24.4492C29.8831 23.4049 31.4969 23.2097 32.7972 23.9165L35.0898 25.1628C37.053 26.23 37.549 28.8985 35.9406 30.4977L34.2359 32.1927C33.6988 32.7267 32.9766 33.1721 32.0951 33.2543C29.9242 33.4566 24.8624 33.1984 19.5439 27.91C14.5784 22.9727 13.6255 18.6672 13.5049 16.5458L14.4035 16.4947L13.5049 16.5458C13.444 15.4731 13.9509 14.5655 14.5956 13.9244L16.4792 12.0516ZM20.1274 13.5702C19.5195 12.7581 18.3863 12.6936 17.7483 13.328L15.8648 15.2008C15.4689 15.5945 15.2784 16.0283 15.302 16.4436C15.3978 18.1291 16.1674 22.0144 20.813 26.6336C25.6868 31.4797 30.1882 31.6242 31.928 31.462C32.2835 31.4289 32.637 31.2442 32.9668 30.9163L34.6714 29.2213C35.3644 28.5323 35.2115 27.2778 34.2301 26.7443L31.9375 25.498C31.3045 25.1538 30.5628 25.2674 30.102 25.7256L29.5554 26.269L28.9209 25.6308C29.5554 26.269 29.5546 26.2699 29.5537 26.2707L29.552 26.2724L29.5483 26.276L29.5405 26.2835L29.5229 26.2999C29.5103 26.3114 29.4959 26.324 29.4796 26.3375C29.447 26.3645 29.4069 26.3951 29.359 26.4272C29.2629 26.4915 29.136 26.5615 28.9766 26.6209C28.6516 26.742 28.223 26.807 27.6916 26.7255C26.6515 26.566 25.2736 25.8569 23.4412 24.0349C21.6094 22.2135 20.8943 20.842 20.7332 19.8036C20.6508 19.2727 20.7165 18.8439 20.8391 18.5187C20.8991 18.3592 20.9699 18.2325 21.0349 18.1366C21.0673 18.0888 21.0981 18.0488 21.1253 18.0164C21.1389 18.0001 21.1516 17.9858 21.1632 17.9732L21.1797 17.9557L21.1872 17.9479L21.1908 17.9443L21.1925 17.9426C21.1934 17.9417 21.1943 17.9408 21.8288 18.5791L21.1943 17.9408L21.5384 17.5986C22.0528 17.0872 22.1248 16.2383 21.6406 15.5915L20.1274 13.5702Z" fill="white" /> </svg>
                </div>
                <input
                  type="number"
                  placeholder="+92 345 346 543"
                  className="ml-3 md:ml-4 h-10 w-full text-gray-800 placeholder-gray-500 bg-gray-100 border-none focus:outline-none placeholder:text-sm"
                />
              </div>

              {/* Email Section */}
              <div className="flex items-center bg-gray-100 rounded-full p-3 md:p-4 shadow-md">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
                  {/* Email SVG */}
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect width="48" height="48" rx="24" fill="#013764" /> <path d="M12 24C12 19.4745 12 17.2117 13.4059 15.8059C14.8118 14.4 17.0745 14.4 21.6 14.4H26.4C30.9255 14.4 33.1882 14.4 34.5941 15.8059C36 17.2117 36 19.4745 36 24C36 28.5254 36 30.7882 34.5941 32.1941C33.1882 33.6 30.9255 33.6 26.4 33.6H21.6C17.0745 33.6 14.8118 33.6 13.4059 32.1941C12 30.7882 12 28.5254 12 24Z" stroke="white" stroke-width="1.8" /> <path d="M16.8 19.2L19.3907 21.3588C21.5947 23.1955 22.6966 24.1138 24 24.1138C25.3034 24.1138 26.4054 23.1955 28.6093 21.3588L31.2 19.2" stroke="white" stroke-width="1.8" stroke-linecap="round" /> </svg>
                </div>
                <input
                  type="email"
                  placeholder="eventfulcae@gmail.com"
                  className="ml-3 md:ml-4 h-10 w-full text-gray-800 placeholder-gray-500 bg-gray-100 border-none focus:outline-none placeholder:text-sm"
                />
              </div>

              {/* Social Media */}
              <div className="flex flex-wrap gap-3 mt-2">
                {/* Add social icons here */}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
                />
              </div>

              <input
                type="email"
                placeholder="E-Mail Address"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
              />

              <textarea
                placeholder="Message"
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
              ></textarea>

              <button
                type="submit"
                className="w-full md:w-auto mt-4 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <span>Send</span>
                {/* Send SVG */}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* {!isLanding && <Footer />} */}
    </>
  );
};

export default Contact;
