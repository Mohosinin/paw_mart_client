import { useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";

const UpdateListing = () => {

    const listing = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if(listing){
            reset(listing);
        }
    }, [listing, reset]);

    const onSubmit = data => {
        const listingData = {
            ...data,
            price: parseFloat(data.price),
        };
        
        axios.put(`${import.meta.env.VITE_API_URL}/listings/${listing._id}`, listingData)
            .then(res => {
                if(res.data.modifiedCount > 0 || res.data.upsertedCount > 0){
                    toast.success('Listing Updated Successfully');
                    navigate('/my-listings');
                }
            })
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Update Listing</h2>
            <div className="card w-full bg-base-100 shadow-2xl border border-base-200">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body p-8 space-y-4">
                    
                    {/* Section 1: Basic Info */}
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

                    {/* Section 2: Details */}
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

                    {/* Section 3: Media */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Image URL</span>
                        </label>
                        <input type="url" {...register("image", { required: true })} placeholder="https://example.com/image.jpg" className="input input-bordered w-full" />
                    </div>

                    {/* Section 4: Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-32 text-base leading-relaxed w-full" placeholder="Description"></textarea>
                    </div>

                    <div className="form-control mt-8">
                        <button className="btn btn-primary w-full btn-lg shadow-lg shadow-primary/30 hover:shadow-xl transition-all">Update Listing</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateListing;
