import React, { useEffect, useState } from 'react';
import {
  FaTachometerAlt,
  FaBoxes,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaUsers,
  FaBook,
  FaCog,
  FaChevronRight,
  FaChevronDown,
  FaUserShield,
  FaStar,
  FaUserTie,
  FaUser,
  FaBars,
  FaTimes,
  FaTags,
  FaSignOutAlt
} from 'react-icons/fa';
import { HiArrowTrendingUp } from "react-icons/hi2";
import { GrNotification, GrUserSettings } from "react-icons/gr";

import AdminDashboard from './AdminDashboard';
import { RiHomeFill } from 'react-icons/ri';
import { PiCalculatorDuotone, PiCurrencyDollarSimpleBold, PiPuzzlePieceFill, PiQuestion } from 'react-icons/pi';
import { AiOutlineAppstore, AiOutlineStock } from 'react-icons/ai';
import { MdOutlineCategory, MdOutlineInventory } from 'react-icons/md';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineDocumentReport } from "react-icons/hi";

import user from '../../assets/user.jpg';
import logo from '../../assets/carooa_logo.png';
import UserDataTable from '../../components/admin/userAndVendor/UserData';
import VendorDataTable from '../../components/admin/userAndVendor/VendorData';
import AdminOverview from '../../components/admin/userAndVendor/AdminsData';
import SalesReport from '../../components/admin/reports/SalesReport';
import ReturnsReport from '../../components/admin/reports/ReturnsReport';
import Transaction from '../../components/admin/reports/TransactionReports';
import TaxReport from '../../components/admin/reports/TaxReport';
import InventoryOverview from '../../components/admin/inventoryControl/InventoryOverview';
import StockTable from '../../components/admin/inventoryControl/StockManagement';

import FinancialDashboard from './FinancialDashboard';
import AuditLogs from './AuditLogs';
import SalesAnalytics from './SalesAnalytics';
import RevenueTrends from './RevenueTrends';
import { BsGraphUpArrow } from 'react-icons/bs';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getAdminAccountSettingsApi } from '../../services/allAPI';

const AdminHome = () => {
  const [openDropdown, setOpenDropdown] = useState('');
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();
  const activePath = location.pathname;

  const [profileData, setProfileData] = useState({
    profile_image: null,
    username: '',
    email: '',
  });

  // Auto-expand dropdown if child route is active
  useEffect(() => {
    if (['/admin/users', '/admin/vendors', '/admin/admins'].includes(activePath)) {
      setOpenDropdown('User & Vendor');
    } else if (['/admin/Sales-Report', '/admin/returns', '/admin/transaction', '/admin/tax-reports'].includes(activePath)) {
      setOpenDropdown('Reports');
    }
  }, [activePath]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getAdminAccountSettingsApi();
        if (res) {
          setProfileData({
            profile_image: res.profile_image || null,
            username: res.username || 'Admin',
            email: res.email || 'admin@example.com',
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();

    const handleProfileUpdate = (event) => {
      const updatedProfile = event.detail;
      setProfileData({
        profile_image: updatedProfile.profile_image ? (
          updatedProfile.profile_image.startsWith('http') ?
            updatedProfile.profile_image :
            updatedProfile.profile_image
        ) : null,
        username: updatedProfile.username || 'Admin',
        email: updatedProfile.email || 'admin@example.com',
      });
    };

    window.addEventListener('adminProfileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('adminProfileUpdated', handleProfileUpdate);
    };
  }, []);

  const serverUrl = "http://127.0.0.1:8000/";

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? '' : menuName);
  };

  const SidebarItem = ({ to, label, icon, activePath }) => {
    const isActive = activePath === to;
    return (
      <li>
        <Link
          to={to}
          className={`cursor-pointer px-4 py-2.5 rounded-3xl flex items-center gap-3 transition-all duration-200 text-sm md:text-base font-semibold ${
            isActive
              ? "bg-[#0a1c3e] text-white border-l-4 border-[#ff9200] shadow-lg"
              : "text-[#0a1c3e] hover:bg-[#0a1c3e] hover:text-white hover:shadow-lg"
          }`}
        >
          {icon && <span className="text-lg shrink-0">{icon}</span>}
          <span>{label}</span>
        </Link>
      </li>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/signin", { replace: true });
  };

  const isUserVendorActive = ['/admin/users', '/admin/vendors', '/admin/admins'].includes(activePath);
  const isReportsActive = ['/admin/Sales-Report', '/admin/returns', '/admin/transaction', '/admin/tax-reports'].includes(activePath);

  return (
    <div className='flex-1 px-1 bg-white transition-all duration-500 select-none'>

      {/* Toggle Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className={`fixed top-1.5 z-50 text-xl p-1 rounded transition-all duration-500 ease-in-out ${
          showSidebar ? 'left-4' : 'left-1'
        }`}
      >
        <div
          className={`flex items-center bg-white transition-all duration-500 ease-in-out ${
            showSidebar ? 'px-2 py-2 w-56' : 'w-10 h-10 justify-center'
          }`}
        >
          {showSidebar ? (
            <img src={logo} alt="Carooa International" className="h-12 w-auto object-contain" />
          ) : (
            <div className="w-8 h-8 overflow-hidden flex items-center justify-start">
              <img src={logo} alt="Carooa International" className="h-8 w-auto max-w-none object-cover object-left" />
            </div>
          )}
        </div>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-[#D8D8D8] z-40 transform transition-transform duration-300 ease-in-out ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header background to cover scrolled items behind logo */}
        <div className="h-20 bg-white w-full flex-shrink-0" />

        {/* Scrollable Menu Items */}
        <div className="h-[calc(100vh-5rem)] overflow-y-auto px-5 pb-6 scrollbar-none">
          <ul className="space-y-3 text-base">
            <SidebarItem to="/admin/dashboard" label="Dashboard" icon={<AiOutlineAppstore />} activePath={activePath} />
            <SidebarItem to="/admin/sales-analytics" label="Sales Analytics" icon={<BsGraphUpArrow />} activePath={activePath} />
            <SidebarItem to="/admin/revenue-trends" label="Revenue Trends" icon={<HiArrowTrendingUp />} activePath={activePath} />
            <SidebarItem to="/admin/inventory-overview" label="Inventory Overview" icon={<MdOutlineInventory />} activePath={activePath} />

            {/* User & Vendor Dropdown */}
            <li>
              <div
                className={`cursor-pointer px-4 py-2.5 rounded-3xl flex justify-between items-center transition-all duration-200 text-sm md:text-base font-semibold ${
                  isUserVendorActive
                    ? "bg-[#0a1c3e] text-white border-l-4 border-[#ff9200] shadow-lg"
                    : "text-[#0a1c3e] hover:bg-[#0a1c3e] hover:text-white hover:shadow-lg"
                }`}
                onClick={() => toggleDropdown("User & Vendor")}
              >
                <span className="flex items-center gap-3">
                  <FaUsers className="text-lg shrink-0" /> User & Vendor
                </span>
                {openDropdown === "User & Vendor" ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {openDropdown === "User & Vendor" && (
                <ul className="pl-4 mt-2 space-y-2 text-sm">
                  <SidebarItem to="/admin/users" label="User Overview" icon={<FaUser />} activePath={activePath} />
                  <SidebarItem to="/admin/vendors" label="Vendor Overview" icon={<FaUserTie />} activePath={activePath} />
                  <SidebarItem to="/admin/admins" label="Admin Overview" icon={<FaUserShield />} activePath={activePath} />
                </ul>
              )}
            </li>

            {/* Reports Dropdown */}
            <li>
              <div
                className={`cursor-pointer px-4 py-2.5 rounded-3xl flex justify-between items-center transition-all duration-200 text-sm md:text-base font-semibold ${
                  isReportsActive
                    ? "bg-[#0a1c3e] text-white border-l-4 border-[#ff9200] shadow-lg"
                    : "text-[#0a1c3e] hover:bg-[#0a1c3e] hover:text-white hover:shadow-lg"
                }`}
                onClick={() => toggleDropdown("Reports")}
              >
                <span className="flex items-center gap-3">
                  <HiOutlineDocumentReport className="text-lg shrink-0" /> Reports
                </span>
                {openDropdown === "Reports" ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {openDropdown === "Reports" && (
                <ul className="pl-4 mt-2 space-y-2 text-sm">
                  <SidebarItem to="/admin/Sales-Report" label="Sales Report" icon={<BsGraphUpArrow />} activePath={activePath} />
                  <SidebarItem to="/admin/returns" label="Returns Report" icon={<FaClipboardList />} activePath={activePath} />
                  <SidebarItem to="/admin/transaction" label="Transaction Report" icon={<FaMoneyCheckAlt />} activePath={activePath} />
                  <SidebarItem to="/admin/tax-reports" label="Tax Report" icon={<PiCalculatorDuotone />} activePath={activePath} />
                </ul>
              )}
            </li>

            <SidebarItem to="/admin/promotions" label="Promotions" icon={<FaTags />} activePath={activePath} />
            <SidebarItem to="/admin/index-catogery" label="Manage Category" icon={<MdOutlineCategory />} activePath={activePath} />
            <SidebarItem to="/admin/auditlogs" label="Audit Logs" icon={<PiCalculatorDuotone />} activePath={activePath} />
            <SidebarItem to="/admin/notification-admin" label="Notifications" icon={<GrNotification />} activePath={activePath} />
            <SidebarItem to="/admin/support-admin" label="Support/Help" icon={<PiQuestion />} activePath={activePath} />
            <SidebarItem to="/admin/admin-accounts-admin" label="Account Settings" icon={<GrUserSettings />} activePath={activePath} />

            <hr className="my-4 border-gray-300" />
            <li
              className="cursor-pointer text-[#0a1c3e] hover:bg-red-600 hover:text-white px-4 py-2.5 rounded-3xl flex items-center gap-3 font-semibold transition-all duration-200"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="text-lg shrink-0" /> Logout
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-white transition-all duration-300 ${showSidebar ? 'pl-72' : 'pl-14'}`}
      >
        {/* Search + Profile Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-grow min-w-[240px] sm:min-w-[300px] md:min-w-[400px] lg:max-w-5xl">
            <IoSearchOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl md:text-2xl" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-12 pr-3 py-3 md:py-4 rounded-[2rem] text-base md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#0a1c3e] border border-gray-200 shadow-sm"
            />
          </div>

          {/* Profile Info */}
          <div
            className="flex items-center gap-3 cursor-pointer relative w-full sm:w-auto justify-start sm:justify-end p-2 rounded-2xl hover:bg-gray-100 transition-all duration-200"
            onClick={() => navigate('/admin/admin-accounts-admin')}
          >
            <img
              src={
                profileData.profile_image
                  ? profileData.profile_image.startsWith('http')
                    ? profileData.profile_image
                    : `${serverUrl}${profileData.profile_image}`
                  : user
              }
              alt="profile"
              className="w-11 h-11 md:w-13 md:h-13 rounded-full object-cover shadow-sm border border-gray-200"
            />
            <div className="flex flex-col font-semibold text-sm md:text-base truncate">
              <div className="text-[#0a1c3e] font-bold">{profileData.username}</div>
              <span className="text-gray-500 text-xs md:text-sm truncate max-w-[150px] md:max-w-none">
                {profileData.email}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Component Render */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
