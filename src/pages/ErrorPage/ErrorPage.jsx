import { Link, useRouteError } from "react-router";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";

const ErrorPage = () => {
    const error = useRouteError();
    
    const is404 = error?.status === 404 || !error?.status;

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* Animated Paw Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-8"
                >
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-7xl">🐾</span>
                    </div>
                </motion.div>

                {/* Error Code */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-9xl font-black text-primary mb-4"
                >
                    {is404 ? '404' : error?.status || 'Oops!'}
                </motion.h1>

                {/* Error Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold text-base-content mb-4">
                        {is404 ? 'Page Not Found' : 'Something Went Wrong'}
                    </h2>
                    <p className="text-lg text-base-content/60 max-w-md mx-auto mb-8">
                        {is404 
                            ? "The page you're looking for seems to have wandered off like a curious kitten. Let's get you back on track!"
                            : error?.statusText || error?.message || "An unexpected error occurred. Please try again."
                        }
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link 
                        to="/" 
                        className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/30"
                    >
                        <FiHome className="w-5 h-5" />
                        Go Home
                    </Link>
                    <button 
                        onClick={() => window.history.back()}
                        className="btn btn-outline btn-lg gap-2"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                    <Link 
                        to="/pets-supplies" 
                        className="btn btn-ghost btn-lg gap-2"
                    >
                        <FiSearch className="w-5 h-5" />
                        Browse Pets
                    </Link>
                </motion.div>

                {/* Fun Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-base-content/40 text-sm"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span>Lost? Don't worry, even the best pets get lost sometimes</span>
                        <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            🐕
                        </motion.span>
                    </div>
                </motion.div>

                {/* Decorative Paw Prints */}
                <div className="absolute bottom-10 left-10 text-5xl opacity-10 rotate-[-20deg]">🐾</div>
                <div className="absolute top-20 right-10 text-4xl opacity-10 rotate-[30deg]">🐾</div>
                <div className="absolute bottom-20 right-20 text-3xl opacity-10 rotate-[-10deg]">🐾</div>
            </div>
        </div>
    );
};

export default ErrorPage;
