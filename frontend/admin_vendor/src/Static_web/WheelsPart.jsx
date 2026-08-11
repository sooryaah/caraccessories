import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { serverurl, baseUrl } from "../services/serverURL";
import axios from "axios";

const ITEMS_PER_PAGE = 8; // Show 8 products per page in the UI (2 rows of 4)

const WheelsPart = () => {
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch ALL products once (backend page_size is fixed at 10, so fetch all pages)
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
          // Get the next page URL but strip any absolute host to use relative if needed
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
    <div>
      <div className="px-6 max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="flex justify-center items-center gap-3 mb-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <IoSearchOutline className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-xl shadow-md border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
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
              <p className="text-center text-gray-500 py-10">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {currentProducts.map((prod) => {
                  const imgUrl = getMainImage(prod);
                  const defaultVariant = prod.variants?.find((v) => v.is_default);
                  const price = defaultVariant?.price || prod.price;

                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-xl shadow-md p-4 text-left hover:shadow-lg transition"
                    >
                      {imgUrl ? (
                        <img
                          src={imgUrl.startsWith("http") ? imgUrl : `${baseUrl}${imgUrl}`}
                          alt={prod.name}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-4xl">
                          🚗
                        </div>
                      )}
                      <h3 className="text-[#0a1c3e] font-bold text-md mb-2 line-clamp-2">{prod.name}</h3>
                      {prod.category && (
                        <p className="text-xs text-purple-600 font-medium mb-1">{prod.category.name}</p>
                      )}
                      {prod.size && <p className="text-sm text-gray-600">Size: {prod.size}</p>}
                      {prod.weight && <p className="text-sm text-gray-600"><b>Weight:</b> {prod.weight} kg</p>}
                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        ₹{parseFloat(price).toLocaleString("en-IN")}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md text-purple-600 border-purple-600 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={`px-3 py-1 border rounded-md transition ${
                      currentPage === index + 1
                        ? "bg-purple-600 text-white border-purple-600"
                        : "text-purple-600 border-purple-600 hover:bg-purple-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md text-purple-600 border-purple-600 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
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
