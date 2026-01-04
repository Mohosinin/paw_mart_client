import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Spinner from "../components/ui/Spinner";

const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    // Not logged in - redirect to login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Logged in and is admin - allow access
    if (user && isAdmin) {
        return children;
    }

    // Logged in but not admin - show access denied
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl">🛡️</span>
                </div>
                <h2 className="text-2xl font-bold text-base-content mb-4">
                    Admin Access Only
                </h2>
                <p className="text-base-content/70 mb-6">
                    This page is restricted to administrators only. You don't have permission to view this content.
                </p>
                <button 
                    onClick={() => window.history.back()}
                    className="btn btn-primary"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default AdminRoute;
