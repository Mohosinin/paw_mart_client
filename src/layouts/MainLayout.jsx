import { Outlet, useLocation } from "react-router";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="min-h-[calc(100vh-288px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
