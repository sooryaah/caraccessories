import React, { useState, useEffect } from "react";
import { IoSearchOutline, IoArrowForward } from "react-icons/io5";
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

  return (
    <div className="py-12 border-t border-gray-100">
      {/* Title & Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block bg-orange-500/10 text-[#ff9200] border border-orange-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          CATEGORIES
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#071a3d] tracking-tight">
          EXPLORE BY CATEGORY
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Find genuine automotive parts and accessories tailored to your vehicle specifications.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center gap-3 mb-10 max-w-xl mx-auto px-4">
        <div className="relative flex-1">
          <IoSearchOutline className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl shadow-sm bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#ff9200] focus:border-[#ff9200] focus:outline-none transition-all"
          />
        </div>
        <button className="px-6 py-3 bg-[#ff9200] hover:bg-[#e07f00] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
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
        <p className="text-center text-red-500 py-6">{error}</p>
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
                className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:border-[#ff9200]/40 transition-all duration-300 flex items-center justify-between cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2.5 shrink-0 group-hover:bg-orange-50/50 transition-colors">
                    {cat.image ? (
                      <img
                        src={`${baseUrl}${cat.image}`}
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
                    <p className="text-xs text-gray-400 mt-0.5">Explore Products</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#ff9200] text-gray-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
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
