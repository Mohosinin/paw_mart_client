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

    if (user && isAdmin) {
        return children;
    }

    // Redirect non-admins to dashboard
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;
