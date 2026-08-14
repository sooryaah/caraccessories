import React, { useState, useEffect } from "react";
import { IoSearchOutline, IoArrowForward, IoGridOutline } from "react-icons/io5";
import { serverurl, baseUrl } from "../services/serverURL";
import axios from "axios";

const Categories = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${serverurl}/products/category/`);
        // Only show parent-level categories (no parent) and that are available
        const parentCategories = response.data.filter(
          (cat) => cat.parent === null && cat.available !== false
        );
        setCategories(parentCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${base}${path}`;
  };

  return (
    <div className="py-16 border-t border-gray-200/60 relative">
      {/* Title & Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-[#ff9200] border border-orange-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <IoGridOutline className="text-sm" />
          CATEGORIES
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#071a3d] tracking-tight">
          EXPLORE BY CATEGORY
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Find genuine automotive parts and accessories tailored to your vehicle specifications.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12 px-4 flex gap-2">
        <div className="relative flex-1">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl shadow-sm bg-white/90 backdrop-blur-md border border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#ff9200] focus:border-[#ff9200] focus:outline-none transition-all"
          />
        </div>
        <button className="px-6 py-3 bg-[#ff9200] hover:bg-[#e07f00] text-white font-semibold rounded-2xl shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="w-10 h-10 border-4 border-[#ff9200] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <p className="text-center text-red-500 py-6 font-medium">{error}</p>
      )}

      {/* Categories Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto px-4">
          {filteredCategories.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-8">
              No categories found matching your search.
            </p>
          ) : (
            filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:border-[#ff9200]/40 transition-all duration-300 flex items-center justify-between cursor-pointer transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle top hover accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff9200] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center justify-center p-2.5 shrink-0 group-hover:bg-orange-50 group-hover:border-orange-100 transition-all duration-300">
                    {cat.image ? (
                      <img
                        src={getImageUrl(cat.image)}
                        alt={cat.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0a1c3e] group-hover:text-[#ff9200] transition-colors text-base line-clamp-1">
                      {cat.name}
                    </h3>
                    <span className="inline-block text-[11px] font-semibold text-gray-400 group-hover:text-orange-500 transition-colors mt-0.5">
                      Explore Products →
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#ff9200] text-gray-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-xs">
                  <IoArrowForward className="text-sm group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
