import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap } from "react-icons/fi";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const from = location.state?.from?.pathname || "/";

    // Demo credentials
    const demoUser = {
        email: "demo@pawmart.com",
        password: "Demo@123"
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fillDemoCredentials = () => {
        setFormData(demoUser);
        toast.success("Demo credentials filled! Click Sign In to continue.");
    };

    const handleLogin = event => {
        event.preventDefault();
        setLoading(true);

        signIn(formData.email, formData.password)
            .then(result => {
                toast.success('Login Successful! Welcome back 🎉');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message || 'Login failed. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleSignIn = () => {
        setLoading(true);
        googleSignIn()
            .then(result => {
                toast.success('Google Login Successful! 🎉');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message || 'Google login failed.');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-secondary/20 blur-3xl"></div>
                <div className="absolute bottom-0 left-1/2 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
            </div>

            <div className="max-w-md w-full relative z-10">
                {/* Demo Credentials Banner */}
                <div className="bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 rounded-2xl p-4 mb-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-accent/20 p-2 rounded-full">
                            <FiZap className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">Try Demo Account</p>
                            <p className="text-xs text-base-content/60">Quick access without registration</p>
                        </div>
                        <button 
                            onClick={fillDemoCredentials}
                            className="btn btn-sm btn-accent"
                        >
                            Use Demo
                        </button>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-base-100/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-base-200">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black text-primary mb-2">Welcome Back</h1>
                        <p className="text-base-content/70">
                            Sign in to manage your pet listings and orders
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold flex items-center gap-2">
                                    <FiMail className="w-4 h-4" /> Email Address
                                </span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="input input-bordered w-full bg-base-100 focus:border-primary transition-colors"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold flex items-center gap-2">
                                    <FiLock className="w-4 h-4" /> Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="input input-bordered w-full bg-base-100 focus:border-primary transition-colors pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                                >
                                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                </button>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            className={`btn btn-primary w-full shadow-lg shadow-primary/30 hover:shadow-xl transition-all ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-base-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-base-100 text-base-content/50">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Sign In */}
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="btn btn-outline w-full hover:bg-base-100 hover:border-base-300 gap-3"
                        >
                            <FcGoogle className="w-5 h-5" />
                            Sign in with Google
                        </button>
                    </form>

                    <p className="text-center text-sm text-base-content/70 mt-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-primary hover:text-primary-focus transition-colors">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
