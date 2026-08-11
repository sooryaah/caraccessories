import React, { useState, useEffect } from "react";
import { IoSearchOutline, IoChevronBack, IoChevronForward, IoBagHandleOutline } from "react-icons/io5";
import { serverurl, baseUrl } from "../services/serverURL";
import axios from "axios";

const ITEMS_PER_PAGE = 8; // Show 8 products per page in the UI (2 rows of 4)

const WheelsPart = () => {
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch ALL products once
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      let results = [];
      let url = `${serverurl}/products/products/`;

      while (url) {
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.results) {
          results = [...results, ...data.results];
          url = data.next || null;
        } else if (Array.isArray(data)) {
          results = data;
          url = null;
        } else {
          url = null;
        }
      }

      setAllProducts(results);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filter by search
  const filteredProducts = allProducts.filter((prod) =>
    prod.name.toLowerCase().includes(search.toLowerCase())
  );

  // Client-side pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset page on search change
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const getMainImage = (product) => {
    if (!product.image_list) return null;
    const main = product.image_list.find((img) => img && img.image);
    return main ? main.image : null;
  };

  return (
    <div className="py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title & Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block bg-orange-500/10 text-[#ff9200] border border-orange-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            PRODUCTS & ACCESSORIES
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#071a3d] tracking-tight">
            FEATURED PARTS CATALOG
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Browse high-performance wheels, accessories, and replacement parts directly from verified vendors.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center items-center gap-3 mb-10 max-w-xl mx-auto">
          <div className="relative flex-1">
            <IoSearchOutline className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products by name..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-11 pr-4 py-3 rounded-xl shadow-sm bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#ff9200] focus:border-[#ff9200] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#ff9200] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-center text-red-500 py-10">{error}</p>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <>
            {currentProducts.length === 0 ? (
              <p className="text-center text-gray-500 py-16">No products found matching your search.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentProducts.map((prod) => {
                  const imgUrl = getMainImage(prod);
                  const defaultVariant = prod.variants?.find((v) => v.is_default);
                  const price = defaultVariant?.price || prod.price;

                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between group"
                    >
                      <div>
                        {/* Image Container with Badge */}
                        <div className="relative h-48 bg-gray-50 overflow-hidden flex items-center justify-center p-4">
                          {imgUrl ? (
                            <img
                              src={imgUrl.startsWith("http") ? imgUrl : `${baseUrl}${imgUrl}`}
                              alt={prod.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => { e.target.style.display = "none"; }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
                              🚗
                            </div>
                          )}

                          {/* Category Badge */}
                          {prod.category && (
                            <span className="absolute top-3 left-3 bg-[#071a3d]/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                              {prod.category.name}
                            </span>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                          <h3 className="text-[#0a1c3e] font-bold text-base hover:text-[#ff9200] transition-colors line-clamp-2 leading-snug mb-3">
                            {prod.name}
                          </h3>

                          {/* Specifications Pills */}
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                            {prod.size && (
                              <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium">
                                Size: {prod.size}
                              </span>
                            )}
                            {prod.weight && (
                              <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium">
                                Weight: {prod.weight} kg
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Price & CTA */}
                      <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-gray-50 mt-auto">
                        <div>
                          <span className="text-xs text-gray-400 block font-medium">Price</span>
                          <span className="text-lg font-extrabold text-[#071a3d]">
                            ₹{parseFloat(price).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff9200] group-hover:bg-[#ff9200] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                          <IoBagHandleOutline size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3.5 py-2 border rounded-xl text-sm font-semibold text-gray-700 border-gray-200 hover:border-[#ff9200] hover:text-[#ff9200] bg-white disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700 disabled:cursor-not-allowed transition-all flex items-center gap-1 shadow-sm"
                >
                  <IoChevronBack size={16} /> Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={`w-9 h-9 border rounded-xl text-sm font-bold transition-all ${
                      currentPage === index + 1
                        ? "bg-[#ff9200] text-white border-[#ff9200] shadow-md shadow-orange-500/30"
                        : "text-gray-700 border-gray-200 hover:border-[#ff9200] hover:text-[#ff9200] bg-white shadow-sm"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-2 border rounded-xl text-sm font-semibold text-gray-700 border-gray-200 hover:border-[#ff9200] hover:text-[#ff9200] bg-white disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700 disabled:cursor-not-allowed transition-all flex items-center gap-1 shadow-sm"
                >
                  Next <IoChevronForward size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WheelsPart;
