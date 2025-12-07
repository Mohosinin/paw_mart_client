import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import toast from 'react-hot-toast';

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        // Password validation
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error('Password must have at least one uppercase letter');
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error('Password must have at least one lowercase letter');
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(name, photo)
                    .then(() => {
                        // Create user entry in DB (optional but good practice)
                        toast.success('User Created Successfully');
                        navigate('/');
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                toast.success('Google Login Successful');
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }


    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-secondary/20 blur-3xl"></div>
            </div>

            <div className="max-w-xl w-full space-y-8 relative z-10 bg-base-100/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-primary">Join Our Community</h1>
                    <p className="mt-2 text-sm text-base-content/70">
                        Create an account to start your journey with PawMart
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Full Name</span>
                            </label>
                            <input type="text" name="name" placeholder="e.g., Rahim Ahmed" className="input input-bordered w-full bg-base-100/50 focus:bg-base-100" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="https://example.com/photo.jpg" className="input input-bordered w-full bg-base-100/50 focus:bg-base-100" required />
                        </div>
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email Address</span>
                        </label>
                        <input type="email" name="email" placeholder="name@example.com" className="input input-bordered w-full bg-base-100/50 focus:bg-base-100" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full bg-base-100/50 focus:bg-base-100" required />
                        <label className="label">
                            <span className="label-text-alt text-base-content/60">Must contain at least 6 chars, 1 uppercase, 1 lowercase</span>
                        </label>
                    </div>

                    <div>
                        <button className="btn btn-primary w-full shadow-lg shadow-primary/30 hover:shadow-xl transition-all">
                            Create Account
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-base-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-base-100 text-base-content/50">Or join with</span>
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
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-primary hover:text-primary-focus transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
