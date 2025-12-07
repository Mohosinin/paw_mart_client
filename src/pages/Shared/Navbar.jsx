import { Link, NavLink } from "react-router";
import { IoMenu } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {});
    }

    const linkClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg transition-all duration-300 font-medium ${isActive ? 'bg-primary text-white shadow-md' : 'hover:bg-base-200 text-base-content'}`;

    const navOptions = <>
        <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
        <li><NavLink to="/pets-supplies" className={linkClass}>Pets & Supplies</NavLink></li>
        {
            user && <>
                <li><NavLink to="/add-listing" className={linkClass}>Add Listing</NavLink></li>
                <li><NavLink to="/my-listings" className={linkClass}>My Listings</NavLink></li>
                <li><NavLink to="/my-orders" className={linkClass}>My Orders</NavLink></li>
            </>
        }
    </>

    return (
        <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg shadow-sm">
            <div className="navbar max-w-7xl mx-auto px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <IoMenu className="h-5 w-5" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-2xl font-black text-primary hover:bg-transparent">
                        PawMart <span className="text-secondary text-3xl">🐾</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1 font-medium">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                    {
                        user ? <>
                            <div className="avatar tooltip tooltip-bottom z-50" data-tip={user?.displayName}>
                                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 transition-transform hover:scale-105 cursor-pointer">
                                    <img src={user?.photoURL || "https://i.ibb.co/tYHpt12/avatar.png"} alt="User Profile" className="object-cover" />
                                </div>
                            </div>
                            <button onClick={handleLogOut} className="btn btn-sm btn-outline btn-error rounded-full px-4">Logout</button>
                        </> : <>
                            <Link to="/login" className="btn btn-sm btn-ghost hover:bg-base-200 rounded-full px-4">Login</Link>
                            <Link to="/register" className="btn btn-sm btn-primary rounded-full px-6 shadow-md shadow-primary/30 hover:shadow-lg transition-all">Register</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
