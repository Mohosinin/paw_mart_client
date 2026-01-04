import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import ImageUpload from "../../components/ui/ImageUpload";

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    // Password validation rules
    const passwordValidation = {
        minLength: password.length >= 6,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
    };
    const isPasswordValid = Object.values(passwordValidation).every(Boolean);

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;

        if (!photoURL) {
            toast.error('Please upload a profile photo');
            return;
        }

        if (!isPasswordValid) {
            toast.error('Please meet all password requirements');
            return;
        }

        setLoading(true);
        createUser(email, password)
            .then(result => {
                updateUserProfile(name, photoURL)
                    .then(() => {
                        toast.success('Account created successfully! 🎉');
                        navigate('/');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                toast.error(error.message);
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleSignIn = () => {
        setLoading(true);
        googleSignIn()
            .then(result => {
                toast.success('Google Login Successful! 🎉');
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            })
            .finally(() => setLoading(false));
    };

    const ValidationItem = ({ isValid, text }) => (
        <div className={`flex items-center gap-2 text-sm ${isValid ? 'text-success' : 'text-base-content/50'}`}>
            {isValid ? <FiCheck className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
            {text}
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-secondary/20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-accent/10 blur-3xl -translate-x-1/2"></div>
            </div>

            <div className="max-w-xl w-full relative z-10">
                <div className="bg-base-100/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-base-200">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">🐾</span>
                        </div>
                        <h1 className="text-4xl font-black text-primary mb-2">Join PawMart</h1>
                        <p className="text-base-content/70">
                            Create an account to start your journey
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Profile Photo Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Profile Photo</span>
                            </label>
                            <ImageUpload 
                                onImageUpload={(url) => setPhotoURL(url)}
                                currentImage={photoURL}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold flex items-center gap-2">
                                        <FiUser className="w-4 h-4" /> Full Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="input input-bordered w-full bg-base-100 focus:border-primary"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold flex items-center gap-2">
                                        <FiMail className="w-4 h-4" /> Email Address
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    className="input input-bordered w-full bg-base-100 focus:border-primary"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input input-bordered w-full bg-base-100 focus:border-primary pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                                >
                                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                </button>
                            </div>
                            
                            {/* Password Requirements */}
                            <div className="mt-3 p-3 bg-base-200/50 rounded-xl space-y-1">
                                <p className="text-xs font-medium text-base-content/70 mb-2">Password Requirements:</p>
                                <ValidationItem isValid={passwordValidation.minLength} text="At least 6 characters" />
                                <ValidationItem isValid={passwordValidation.hasUppercase} text="One uppercase letter" />
                                <ValidationItem isValid={passwordValidation.hasLowercase} text="One lowercase letter" />
                                <ValidationItem isValid={passwordValidation.hasNumber} text="One number" />
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" required />
                                <span className="label-text text-sm">
                                    I agree to the{' '}
                                    <Link to="/faq" className="text-primary hover:underline">Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link to="/faq" className="text-primary hover:underline">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className={`btn btn-primary w-full shadow-lg shadow-primary/30 hover:shadow-xl ${loading ? 'loading' : ''}`}
                            disabled={loading || !isPasswordValid}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
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
                            Sign up with Google
                        </button>
                    </form>

                    <p className="text-center text-sm text-base-content/70 mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-primary hover:text-primary-focus transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
