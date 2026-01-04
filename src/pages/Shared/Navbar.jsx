import { Link, NavLink } from "react-router";
import { IoMenu } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ThemeToggle from "../../components/ui/ThemeToggle";
import { FiUser, FiLogOut, FiGrid, FiHome, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => { });
    };

    const linkClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg transition-all duration-300 font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'hover:bg-base-200 text-base-content'}`;

    const publicLinks = (
        <>
            <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/pets-supplies" className={linkClass}>Pets & Supplies</NavLink></li>
            <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
        </>
    );

    const userLinks = (
        <>
            <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-lg shadow-sm border-b border-base-200">
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* Navbar Start */}
                <div className="navbar-start">
                    {/* Mobile Menu Button */}
                    <div className="dropdown lg:hidden">
                        <div 
                            tabIndex={0} 
                            role="button" 
                            className="btn btn-ghost"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <IoMenu className="h-6 w-6" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow-xl bg-base-100 rounded-2xl w-56 gap-2 border border-base-200">
                            {publicLinks}
                            {user && userLinks}
                            <div className="divider my-2"></div>
                            <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
                            <li><NavLink to="/faq" className={linkClass}>FAQ</NavLink></li>
                        </ul>
                    </div>
                    
                    {/* Logo */}
                    <Link to="/" className="btn btn-ghost text-2xl font-black text-primary hover:bg-transparent px-2">
                        PawMart <span className="text-secondary text-3xl">🐾</span>
                    </Link>
                </div>

                {/* Navbar Center - Desktop Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1 font-medium">
                        {publicLinks}
                        {user && userLinks}
                        
                        {/* More Dropdown */}
                        <li className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className="px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:bg-base-200 flex items-center gap-1">
                                More <FiChevronDown className="w-4 h-4" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-xl bg-base-100 rounded-xl w-52 mt-2 border border-base-200">
                                <li><NavLink to="/contact" className="rounded-lg">Contact Us</NavLink></li>
                                <li><NavLink to="/faq" className="rounded-lg">FAQ</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-2">
                    {/* Theme Toggle */}
                    <ThemeToggle />
                    
                    {user ? (
                        /* User Profile Dropdown */
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-base-100 ring-offset-2 hover:ring-offset-4 transition-all">
                                <div className="w-10 rounded-full">
                                    <img 
                                        src={user?.photoURL || "https://i.ibb.co/tYHpt12/avatar.png"} 
                                        alt={user?.displayName || "User"} 
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[100] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-60 border border-base-200">
                                {/* User Info Header */}
                                <li className="px-4 py-3 pointer-events-none">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="font-bold text-base">{user?.displayName || "User"}</span>
                                        <span className="text-xs text-base-content/60 truncate w-full">{user?.email}</span>
                                    </div>
                                </li>
                                <div className="divider my-1 px-4"></div>
                                
                                {/* Menu Items */}
                                <li>
                                    <NavLink to="/dashboard/profile" className="flex items-center gap-3 py-3 rounded-xl">
                                        <FiUser className="w-4 h-4" /> My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard" className="flex items-center gap-3 py-3 rounded-xl">
                                        <FiGrid className="w-4 h-4" /> Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/" className="flex items-center gap-3 py-3 rounded-xl">
                                        <FiHome className="w-4 h-4" /> Home
                                    </NavLink>
                                </li>
                                <div className="divider my-1 px-4"></div>
                                <li>
                                    <button 
                                        onClick={handleLogOut} 
                                        className="flex items-center gap-3 py-3 rounded-xl text-error hover:bg-error/10"
                                    >
                                        <FiLogOut className="w-4 h-4" /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        /* Guest Buttons */
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="btn btn-ghost btn-sm hover:bg-base-200 rounded-full px-4 hidden sm:flex">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm rounded-full px-6 shadow-md shadow-primary/30 hover:shadow-lg transition-all">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
