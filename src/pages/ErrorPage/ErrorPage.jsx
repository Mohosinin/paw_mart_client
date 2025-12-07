import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                    <p className="py-6 text-2xl">Oops! Page not found.</p>
                    <Link to="/" className="btn btn-primary">Go Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
