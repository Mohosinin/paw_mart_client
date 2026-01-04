import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FiEdit3, FiCamera, FiMail, FiUser, FiCalendar, FiMapPin, FiPhone, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        phone: "",
        address: "",
        bio: "Pet lover and animal welfare advocate. Passionate about finding forever homes for our furry friends! 🐾"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateUserProfile(formData.displayName, formData.photoURL);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const memberSince = user?.metadata?.creationTime 
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : 'N/A';

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Header Card */}
            <div className="bg-gradient-to-br from-primary via-primary to-secondary rounded-3xl p-1 shadow-2xl">
                <div className="bg-base-100 rounded-3xl p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-100 overflow-hidden">
                                <img 
                                    src={formData.photoURL || "https://i.ibb.co/tYHpt12/avatar.png"} 
                                    alt={formData.displayName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-2 right-2 btn btn-circle btn-primary btn-sm shadow-lg">
                                    <FiCamera className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1 text-center md:text-left">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    className="input input-bordered input-lg text-3xl font-bold w-full max-w-md"
                                />
                            ) : (
                                <h1 className="text-4xl font-black text-base-content mb-2">
                                    {user?.displayName || "Anonymous User"}
                                </h1>
                            )}
                            <p className="text-base-content/60 flex items-center justify-center md:justify-start gap-2 text-lg">
                                <FiMail className="w-5 h-5" />
                                {user?.email}
                            </p>
                            <p className="text-base-content/50 flex items-center justify-center md:justify-start gap-2 mt-2">
                                <FiCalendar className="w-4 h-4" />
                                Member since {memberSince}
                            </p>
                            
                            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                <span className="badge badge-primary badge-lg">Pet Lover</span>
                                <span className="badge badge-secondary badge-lg">Verified</span>
                                <span className="badge badge-accent badge-lg">Active Seller</span>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <div>
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleSave}
                                        className={`btn btn-primary gap-2 ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        <FiSave /> Save
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="btn btn-outline btn-primary gap-2"
                                >
                                    <FiEdit3 /> Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* About Section */}
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FiUser className="text-primary" /> About Me
                    </h3>
                    {isEditing ? (
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full h-32"
                            placeholder="Tell us about yourself..."
                        />
                    ) : (
                        <p className="text-base-content/70 leading-relaxed">
                            {formData.bio}
                        </p>
                    )}
                </div>

                {/* Contact Details */}
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FiPhone className="text-primary" /> Contact Info
                    </h3>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Phone Number</span>
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="+880 1XXX-XXXXXX"
                                />
                            ) : (
                                <p className="text-base-content/70">{formData.phone || "Not provided"}</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Address</span>
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    placeholder="City, Country"
                                />
                            ) : (
                                <p className="text-base-content/70 flex items-center gap-2">
                                    <FiMapPin className="w-4 h-4" />
                                    {formData.address || "Not provided"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Photo URL (when editing) */}
                {isEditing && (
                    <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FiCamera className="text-primary" /> Profile Photo
                        </h3>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Photo URL</span>
                            </label>
                            <input
                                type="url"
                                name="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="https://example.com/photo.jpg"
                            />
                            <label className="label">
                                <span className="label-text-alt text-base-content/50">
                                    Enter a URL to your profile picture
                                </span>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Account Stats */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                <h3 className="text-xl font-bold mb-6">Account Statistics</h3>
                <div className="stats stats-vertical md:stats-horizontal shadow w-full bg-base-200/50">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">Total Listings</div>
                        <div className="stat-value text-primary">--</div>
                        <div className="stat-desc">View in Dashboard</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Orders Placed</div>
                        <div className="stat-value text-secondary">--</div>
                        <div className="stat-desc">View in My Orders</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        </div>
                        <div className="stat-title">Account Status</div>
                        <div className="stat-value text-accent text-2xl">Active</div>
                        <div className="stat-desc">Verified member</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
