import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Spinner from "../components/ui/Spinner";

const SellerRoute = ({ children }) => {
    const { user, loading, isSeller } = useContext(AuthContext);
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

    // Logged in but not a seller or admin - redirect to dashboard with message
    if (user && !isSeller) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-5xl">🔒</span>
                    </div>
                    <h2 className="text-2xl font-bold text-base-content mb-4">
                        Seller Access Required
                    </h2>
                    <p className="text-base-content/70 mb-6">
                        You need to be a seller to access this page. Please contact admin to upgrade your account.
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
    }

    return children;
};

export default SellerRoute;
