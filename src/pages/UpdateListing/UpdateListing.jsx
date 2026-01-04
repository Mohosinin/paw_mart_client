import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import ImageUpload from "../../components/ui/ImageUpload";
import { FiUpload, FiLink } from "react-icons/fi";

const UpdateListing = () => {
    const listing = useLoaderData();
    const { register, handleSubmit, reset, setValue } = useForm();
    const navigate = useNavigate();
    const [imageURL, setImageURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageMode, setImageMode] = useState("upload"); // "upload" or "url"

    useEffect(() => {
        if(listing){
            reset(listing);
            setImageURL(listing.image || "");
            // Also set the imageUrl field for URL mode
            setValue("imageUrl", listing.image || "");
        }
    }, [listing, reset, setValue]);

    const onSubmit = data => {
        const finalImageURL = imageMode === "upload" ? imageURL : data.imageUrl;
        
        if (!finalImageURL) {
            toast.error('Please provide an image for your listing');
            return;
        }

        setLoading(true);
        const listingData = {
            ...data,
            image: finalImageURL,
            price: parseFloat(data.price),
        };
        
        // Remove imageUrl from data as we use 'image' field
        delete listingData.imageUrl;
        
        axios.put(`${import.meta.env.VITE_API_URL}/listings/${listing._id}`, listingData)
            .then(res => {
                if(res.data.modifiedCount > 0 || res.data.upsertedCount > 0){
                    toast.success('Listing Updated Successfully! 🎉');
                    navigate('/dashboard/my-listings');
                }
            })
            .catch(error => {
                console.error('Error updating listing:', error);
                toast.error(error.response?.data?.message || 'Failed to update listing. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Update Listing</h2>
            <div className="card w-full bg-base-100 shadow-2xl border border-base-200">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body p-8 space-y-4">
                    
                    {/* Section 1: Image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Listing Image</span>
                        </label>
                        
                        {/* Toggle between upload and URL */}
                        <div className="tabs tabs-boxed bg-base-200 p-1 mb-4 w-fit">
                            <button
                                type="button"
                                onClick={() => setImageMode("upload")}
                                className={`tab gap-2 ${imageMode === "upload" ? "tab-active bg-primary text-primary-content" : ""}`}
                            >
                                <FiUpload className="w-4 h-4" />
                                Upload Image
                            </button>
                            <button
                                type="button"
                                onClick={() => setImageMode("url")}
                                className={`tab gap-2 ${imageMode === "url" ? "tab-active bg-primary text-primary-content" : ""}`}
                            >
                                <FiLink className="w-4 h-4" />
                                Image URL
                            </button>
                        </div>

                        {imageMode === "upload" ? (
                            <ImageUpload 
                                onImageUpload={(url) => setImageURL(url)}
                                currentImage={imageURL}
                            />
                        ) : (
                            <div>
                                <input 
                                    type="url" 
                                    {...register("imageUrl")} 
                                    placeholder="https://example.com/image.jpg" 
                                    className="input input-bordered w-full" 
                                />
                                <label className="label">
                                    <span className="label-text-alt text-base-content/60">
                                        Paste a direct link to an image hosted online
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Section 2: Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Product/Pet Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Category</span>
                            </label>
                            <select {...register("category", { required: true })} className="select select-bordered w-full">
                                <option value="Pets">Pets</option>
                                <option value="Pet Food">Pet Food</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Pet Care Products">Pet Care Products</option>
                            </select>
                        </div>
                    </div>

                    {/* Section 3: Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Price <span className="text-xs text-base-content/60 font-normal">(Put 0 for Adoption)</span></span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-base-content/50">$</span>
                                <input type="number" {...register("price", { required: true, min: 0 })} placeholder="0.00" className="input input-bordered w-full pl-8" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Location</span>
                            </label>
                            <input type="text" {...register("location", { required: true })} placeholder="Location" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* Section 4: Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-32 text-base leading-relaxed w-full" placeholder="Description"></textarea>
                    </div>

                    <div className="form-control mt-8">
                        <button 
                            type="submit"
                            className={`btn btn-primary w-full btn-lg shadow-lg shadow-primary/30 hover:shadow-xl transition-all ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateListing;
