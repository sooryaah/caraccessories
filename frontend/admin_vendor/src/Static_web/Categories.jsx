import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
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
    <div className="px-6 py-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8">
        PRODUCT CATEGORIES
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center items-center gap-3 mb-10 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <IoSearchOutline className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl shadow-md border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg">
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* Categories Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-14xl mx-auto">
          {filteredCategories.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No categories found.</p>
          ) : (
            filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-row items-center justify-center gap-3 bg-white hover:bg-gray-100 rounded-xl shadow-md p-6 cursor-pointer transition"
              >
                {cat.image ? (
                  <img
                    src={`${baseUrl}${cat.image}`}
                    alt={cat.name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-2xl">
                    📦
                  </div>
                )}
                <p className="text-lg font-semibold text-[#0a1c3e] text-start">{cat.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
