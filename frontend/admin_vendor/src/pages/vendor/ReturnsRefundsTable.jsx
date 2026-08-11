import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { toast } from "react-toastify";
import { getVendorReturnsApi, actionVendorReturnApi } from "../../services/allAPI";

const ReturnsRefundsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const itemsPerPage = 5;

  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const data = await getVendorReturnsApi();
      setReturns(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch returns data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleAction = async (id, actionStr) => {
    try {
      await actionVendorReturnApi(id, { action: actionStr });
      toast.success(`Return request ${actionStr}d successfully`);
      fetchReturns(); // refresh data
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${actionStr} return request`);
    }
  };

  const totalItems = returns.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = returns.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-[#ECECF0] rounded-2xl min-h-screen px-4 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2 md:py-2 lg:py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
        <h2 className="text-xl md:text-2xl font-bold text-[#0a1c3e]">
          Returns & Refunds
        </h2>
        <button className="bg-[#0a1c3e] text-white text-sm px-4 py-2 rounded-md hover:bg-[#ff9200] transition w-full sm:w-auto font-medium">
          Download Report
        </button>
      </div>

      {/* Filter Form */}
      <div className="bg-white w-full py-4 px-5 sm:px-6 rounded-lg shadow-sm mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
            <input
              type="text"
              placeholder="e.g. ORD1023"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1c3e]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Email</label>
            <input
              type="text"
              placeholder="buyer@example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1c3e]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1c3e]">
              <option value="">Select Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date - From</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1c3e]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date - To</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1c3e]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <button className="border border-gray-300 text-gray-700 px-6 py-2 text-sm rounded-md hover:bg-gray-50 w-full sm:w-auto font-medium">
            Reset
          </button>
          <button className="bg-[#0a1c3e] text-white px-6 py-2 text-sm rounded-md hover:bg-[#ff9200] w-full sm:w-auto font-medium transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Products Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white shadow text-sm">
          <thead className="text-gray-600 bg-gray-50">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 font-medium">
                  Loading return requests...
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No Return Requests Found
                </td>
              </tr>
            ) : (
              currentItems.map((ret, idx) => (
                <tr key={ret.id || idx} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{ret.order_id || ret.id}</td>
                  <td className="p-3 text-[#0a1c3e] font-semibold">{ret.product_name || "N/A"}</td>
                  <td className="p-3 text-gray-600">{ret.customer_email || ret.customer || "N/A"}</td>
                  <td className="p-3 truncate max-w-xs text-gray-600">{ret.reason || "N/A"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        ret.status === "approved" || ret.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : ret.status === "pending" || ret.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : ret.status === "rejected" || ret.status === "Rejected" || ret.status === "Expired"
                          ? "bg-red-100 text-red-700"
                          : ret.status === "refunded" || ret.status === "Received"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ret.status}
                    </span>
                  </td>
                  <td className="p-3 font-medium">₹{ret.item_price || ret.price || "0"}</td>
                  <td className="p-3">
                    {ret.status === 'pending' || ret.status === 'Pending' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction(ret.id, 'approve')}
                          className="bg-emerald-600 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-emerald-700 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(ret.id, 'reject')}
                          className="bg-red-500 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs font-medium">Actioned</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <p className="text-center py-4 text-gray-500 font-medium">Loading...</p>
        ) : currentItems.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No Return Requests Found</p>
        ) : (
          currentItems.map((ret, idx) => (
            <div key={ret.id || idx} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[#0a1c3e] font-semibold text-sm">{ret.product_name || "N/A"}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                    ret.status === "approved" || ret.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : ret.status === "pending" || ret.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : ret.status === "rejected" || ret.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : ret.status === "refunded"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {ret.status}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-medium">Order ID:</span> {ret.order_id || ret.id}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-medium">Customer:</span> {ret.customer_email || ret.customer}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-medium">Reason:</span> {ret.reason}
              </p>
              <p className="text-gray-700 text-sm mb-2">
                <span className="font-medium">Price:</span> ₹{ret.item_price || ret.price}
              </p>
              <div className="flex justify-end gap-2 mt-3">
                {ret.status === 'pending' || ret.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleAction(ret.id, 'approve')}
                      className="bg-emerald-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-emerald-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(ret.id, 'reject')}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400 text-xs font-medium">Actioned</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm gap-3">
        <span className="text-gray-600">
          Showing {totalItems === 0 ? 0 : startIndex + 1} to {endIndex} of {totalItems}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="text-[#0a1c3e] font-medium px-3 py-1 border border-gray-300 bg-white rounded disabled:opacity-50 hover:bg-gray-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className="text-[#0a1c3e] font-medium px-3 py-1 border border-gray-300 bg-white rounded disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnsRefundsTable;