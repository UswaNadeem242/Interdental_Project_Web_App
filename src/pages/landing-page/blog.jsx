import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { tabs } from "../../Constant";
import FrequentlyAskedQuestion from "../../components/frequently-asked-question";
import UpperFooter from "../../components/upper-footer";
import Footer from "../../components/Footer";
import Header from "./header";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
function Blog({ isLanding }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const filteredCards =
    currentTab?.cards.filter(
      (card) =>
        card.title.toLowerCase().includes(search.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(search.toLowerCase())
    ) || [];
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);
  const slugify = (s) =>
    s
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  return (
    <div className="">
      {!isLanding && <Header />}

      <section className="bg-blue-300/5 ">
        <div className="container mx-auto px-4 py-5 md:pt-40 ">
          <div className="">
            <div className="  ">
              <h1 className="flex   justify-center gap-6 mb-6 text-5xl text-secondaryBrand font-bold font-poppins">
                {" "}
                Blog<span className="text-primaryText">&</span>{" "}
                <span className="text-fouthBrand">Articles</span>{" "}
              </h1>
              <p className="flex text-primaryText font-normal font-poppins justify-center gap-6 mb-6">
                {" "}
                Read our interesting blog
              </p>
            </div>
            {/* Tabs */}
            <div className="flex md:flex-row flex-col justify-center gap-6 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-4 rounded-full font-poppins ${
                    activeTab === tab.id
                      ? "bg-fouthBrand text-white "
                      : "text-secondaryText border-secondaryText  border"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search bar */}
            <div className="flex justify-center mb-6">
              <div className="relative w-full md:w-1/2">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-full pl-10 pr-4 py-3 text-sm outline-none placeholder:font-poppins font-poppins"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto px-4 py-8">
          {/* Cards */}
          <div className="grid md:grid-cols-12 grid-cols-2 gap-8 justify-items-center  mx-auto mt-16">
            {filteredCards && filteredCards.length > 0 ? (
              filteredCards.map((card, index) => {
                const slug = card.slug || slugify(card.title) || String(index);
                return (
                  <Link
                    key={index}
                    to={`/blogs/${slug}`}
                    className="col-span-4 block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-secondaryBrand"
                  >
                    <img
                      src={card.img}
                      alt={card.title || "Implant card"}
                      className=""
                    />
                    <h3 className="text-xs font-medium font-poppins uppercase text-fouthBrand pt-5">
                      {card.title}
                    </h3>
                    <p className="text-xl font-normal font-poppins capitalize w-4/5 py-5">
                      {card.subtitle}
                    </p>

                    {/* style the Link like a button (avoid nested button-inside-link) */}
                    <span className="inline-flex justify-center items-center w-[150px] sm:w-[172.7px] h-[40px] sm:h-[53.73px] rounded-[50.7px] border-2 border-fouthBrand gap-2 sm:gap-4 p-2">
                      <span className="font-poppins font-semibold text-base text-[#434343]">
                        {card.button}
                      </span>
                      <span className="rounded-full bg-secondaryBrand text-white p-2">
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </span>
                  </Link>
                );
              })
            ) : (
              <p className="col-span-12 text-center text-gray-500 font-poppins">
                No results found.
              </p>
            )}
          </div>
          {/* page  */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-3  rounded-full bg-fouthBrand disabled:opacity-50"
              >
                <ArrowLeftIcon className="w-6 h-6 text-white stroke-current" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-5 py-3  border-fouthBrand border rounded-full ${
                    currentPage === i + 1 ? "bg-fouthBrand text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-3  rounded-full bg-fouthBrand disabled:opacity-50"
              >
                <ArrowRightIcon className="w-6 h-6 text-white stroke-current" />
              </button>
            </div>
          )}
        </div>
      </section>
      <FrequentlyAskedQuestion />
      <UpperFooter />
      <Footer />
    </div>
  );
}

export default Blog;
