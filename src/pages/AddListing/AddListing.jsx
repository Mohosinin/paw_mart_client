import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUpload from "../../components/ui/ImageUpload";

const AddListing = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const [imageURL, setImageURL] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = data => {
        if (!imageURL) {
            toast.error('Please upload an image for your listing');
            return;
        }

        setLoading(true);
        const listingData = {
            ...data,
            image: imageURL,
            price: parseFloat(data.price),
            email: user?.email,
        };
        
        axios.post(`${import.meta.env.VITE_API_URL}/listings`, listingData)
            .then(res => {
                if(res.data.insertedId){
                    toast.success('Listing Added Successfully! 🎉');
                    reset();
                    setImageURL("");
                }
            })
            .catch(error => {
                console.error('Error adding listing:', error);
                toast.error(error.response?.data?.message || 'Failed to add listing. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Add New Listing</h2>
            <div className="card w-full bg-base-100 shadow-2xl border border-base-200">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body p-8 space-y-4">
                    
                    {/* Section 1: Image Upload */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Listing Image</span>
                        </label>
                        <ImageUpload 
                            onImageUpload={(url) => setImageURL(url)}
                            currentImage={imageURL}
                        />
                    </div>

                    {/* Section 2: Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Product/Pet Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="e.g., Golden Retriever or Deshi Cat" className="input input-bordered w-full" />
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
                                <span className="label-text font-semibold">Date (Pick Up)</span>
                            </label>
                            <input type="date" {...register("date", { required: true })} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Location</span>
                            </label>
                            <input type="text" {...register("location", { required: true })} placeholder="e.g., Dhanmondi, Dhaka" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* Section 4: Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-32 text-base leading-relaxed w-full" placeholder="Tell potential owners about this pet or product..."></textarea>
                    </div>

                    {/* Section 5: User Info (Read-only) */}
                    <div className="form-control">
                         <label className="label">
                            <span className="label-text font-semibold">Contact Email</span>
                        </label>
                        <input type="text" value={user?.email} readOnly className="input input-bordered bg-base-200/50 text-base-content/70 cursor-not-allowed" />
                    </div>

                    <div className="form-control mt-8">
                        <button 
                            type="submit"
                            className={`btn btn-primary w-full btn-lg shadow-lg shadow-primary/30 hover:shadow-xl transition-all ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Adding Listing...' : 'Add Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddListing;
