import { useContext, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import ThemeToggle from "../components/ui/ThemeToggle";
import { 
    FiHome, FiGrid, FiLogOut, FiUser, FiMenu, FiX, 
    FiPackage, FiShoppingCart, FiPlusCircle, FiUsers, 
    FiShield, FiUserCheck, FiChevronDown
} from "react-icons/fi";

const DashboardLayout = () => {
    const { user, logOut, isAdmin, isSeller, userRole } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut().then(() => {
            navigate('/');
        });
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive 
                ? 'bg-primary text-primary-content shadow-md' 
                : 'hover:bg-base-200 text-base-content'
        }`;

    // User menu items (available to all logged-in users)
    const userMenuItems = [
        { to: "/dashboard", icon: <FiGrid />, label: "Overview", end: true },
        { to: "/dashboard/profile", icon: <FiUser />, label: "My Profile" },
        { to: "/dashboard/my-orders", icon: <FiShoppingCart />, label: "My Orders" },
    ];

    // Seller menu items (available to sellers and admins)
    const sellerMenuItems = [
        { to: "/dashboard/my-listings", icon: <FiPackage />, label: "My Listings" },
        { to: "/dashboard/add-listing", icon: <FiPlusCircle />, label: "Add Listing" },
    ];

    // Admin menu items
    const adminMenuItems = [
        { to: "/dashboard/admin", icon: <FiShield />, label: "Admin Overview" },
        { to: "/dashboard/manage-users", icon: <FiUsers />, label: "Manage Users" },
        { to: "/dashboard/all-orders", icon: <FiShoppingCart />, label: "All Orders" },
    ];

    const getRoleBadge = () => {
        switch (userRole) {
            case 'admin':
                return <span className="badge badge-error badge-sm gap-1"><FiShield className="w-3 h-3" /> Admin</span>;
            case 'seller':
                return <span className="badge badge-warning badge-sm gap-1"><FiUserCheck className="w-3 h-3" /> Seller</span>;
            default:
                return <span className="badge badge-info badge-sm gap-1"><FiUser className="w-3 h-3" /> User</span>;
        }
    };

    return (
        <div className="min-h-screen bg-base-200/50">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed top-4 left-4 z-50 btn btn-circle btn-primary shadow-lg lg:hidden"
            >
                {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-base-100 shadow-2xl z-40 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-base-200">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-black text-primary">
                            PawMart <span className="text-3xl">🐾</span>
                        </Link>
                    </div>

                    {/* User Info */}
                    <div className="p-4 border-b border-base-200">
                        <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-xl">
                            <div className="avatar">
                                <div className="w-12 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                                    <img 
                                        src={user?.photoURL || "https://i.ibb.co/tYHpt12/avatar.png"} 
                                        alt={user?.displayName} 
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold truncate">{user?.displayName || "User"}</p>
                                <div className="mt-1">{getRoleBadge()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto space-y-2">
                        {/* User Menu */}
                        <div className="mb-4">
                            <p className="text-xs uppercase tracking-wider text-base-content/50 font-semibold px-4 mb-2">Main</p>
                            {userMenuItems.map((item) => (
                                <NavLink 
                                    key={item.to} 
                                    to={item.to} 
                                    end={item.end}
                                    className={linkClass}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        {/* Seller Menu */}
                        {(isSeller || isAdmin) && (
                            <div className="mb-4">
                                <p className="text-xs uppercase tracking-wider text-base-content/50 font-semibold px-4 mb-2">Seller</p>
                                {sellerMenuItems.map((item) => (
                                    <NavLink 
                                        key={item.to} 
                                        to={item.to} 
                                        className={linkClass}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}

                        {/* Admin Menu */}
                        {isAdmin && (
                            <div className="mb-4">
                                <p className="text-xs uppercase tracking-wider text-error/70 font-semibold px-4 mb-2 flex items-center gap-2">
                                    <FiShield className="w-3 h-3" /> Admin
                                </p>
                                {adminMenuItems.map((item) => (
                                    <NavLink 
                                        key={item.to} 
                                        to={item.to} 
                                        className={linkClass}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="p-4 border-t border-base-200 space-y-2">
                        <Link 
                            to="/" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-200 transition-all"
                        >
                            <FiHome />
                            <span>Back to Home</span>
                        </Link>
                        <button 
                            onClick={handleLogOut}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-error/10 text-error transition-all w-full"
                        >
                            <FiLogOut />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="lg:ml-72 min-h-screen">
                {/* Top Navbar */}
                <div className="sticky top-0 z-20 bg-base-100/95 backdrop-blur-lg border-b border-base-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="lg:hidden"></div> {/* Spacer for mobile */}
                        <div className="hidden lg:block">
                            <h1 className="text-lg font-semibold text-base-content/80">Dashboard</h1>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            
                            {/* Profile Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer hover:bg-base-200 px-3 py-2 rounded-xl transition-all">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full ring-2 ring-primary ring-offset-1">
                                            <img src={user?.photoURL || "https://i.ibb.co/tYHpt12/avatar.png"} alt="" />
                                        </div>
                                    </div>
                                    <span className="hidden sm:block font-medium">{user?.displayName?.split(' ')[0]}</span>
                                    <FiChevronDown className="w-4 h-4" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow-2xl bg-base-100 rounded-2xl w-56 mt-2 border border-base-200">
                                    <li className="px-4 py-3 pointer-events-none">
                                        <div className="flex flex-col items-start gap-1">
                                            <span className="font-bold">{user?.displayName}</span>
                                            <span className="text-xs text-base-content/60 truncate w-full">{user?.email}</span>
                                            <div className="mt-1">{getRoleBadge()}</div>
                                        </div>
                                    </li>
                                    <div className="divider my-1"></div>
                                    <li><Link to="/dashboard/profile"><FiUser className="w-4 h-4" /> Profile</Link></li>
                                    <li><Link to="/"><FiHome className="w-4 h-4" /> Home</Link></li>
                                    <div className="divider my-1"></div>
                                    <li>
                                        <button onClick={handleLogOut} className="text-error">
                                            <FiLogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
