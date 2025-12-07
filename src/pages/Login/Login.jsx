import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import toast from 'react-hot-toast';

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;

                toast.success('User Login Successful');
                navigate(from, { replace: true });
            })
            .catch(error => {

                toast.error(error.message);
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {

                // TODO: Save user to DB if needed
                toast.success('Google Login Successful');
                navigate(from, { replace: true });
            })
            .catch(error => {

                toast.error(error.message);
            })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-secondary/20 blur-3xl"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10 bg-base-100/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-primary">Welcome Back</h1>
                    <p className="mt-2 text-sm text-base-content/70">
                        Sign in to manage your pet listings and adoption requests
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email Address</span>
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="name@example.com" 
                                className="input input-bordered w-full bg-base-100/50 focus:bg-base-100 transition-colors" 
                                required 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="••••••••" 
                                className="input input-bordered w-full bg-base-100/50 focus:bg-base-100 transition-colors" 
                                required 
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button className="btn btn-primary w-full shadow-lg shadow-primary/30 hover:shadow-xl transition-all">
                            Sign in
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-base-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-base-100 text-base-content/50">Or continue with</span>
                        </div>
                    </div>

                    <div>
                        <button type="button" onClick={handleGoogleSignIn} className="btn btn-outline w-full hover:bg-base-100 hover:text-base-content">
                            <FcGoogle className="w-5 h-5 mr-2" />
                            Google
                        </button>
                    </div>
                </form>
                
                <p className="text-center text-sm text-base-content/70">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-primary hover:text-primary-focus transition-colors">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
