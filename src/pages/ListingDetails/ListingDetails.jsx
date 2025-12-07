import { useContext, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useParams } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const { user } = useContext(AuthContext);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/listings/${id}`)
            .then(res => setListing(res.data));
    }, [id]);

    const handleOrder = (event) => {
        event.preventDefault();
        const form = event.target;
        const quantity = form.quantity.value;
        const address = form.address.value;
        const phone = form.phone.value;
        const date = form.date.value;
        const notes = form.notes.value;

        const orderData = {
            productId: listing._id,
            productName: listing.name,
            buyerName: user.displayName,
            email: user.email,
            quantity,
            price: listing.price,
            address,
            phone,
            date,
            additionalNotes: notes
        };

        axios.post('${import.meta.env.VITE_API_URL}/orders', orderData)
            .then(res => {
                if(res.data.insertedId){
                    toast.success('Order Placed Successfully');
                    document.getElementById('order_modal').close();
                }
            })
    };

    if (!listing) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row gap-8">
                <img src={listing.image} className="max-w-sm rounded-lg shadow-2xl" alt={listing.name} />
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold text-base-content">{listing.name}</h1>
                    <div className="flex gap-2">
                        <div className="badge badge-primary badge-lg">{listing.category}</div>
                        {listing.price === 0 && <div className="badge badge-secondary badge-lg">Adoption</div>}
                    </div>
                    <p className="py-2 text-lg leading-relaxed max-w-xl">{listing.description}</p>
                    
                    <div className="space-y-2">
                        <p className="font-semibold flex items-center gap-2">
                            <FaMapMarkerAlt className="h-5 w-5 text-primary" />
                            {listing.location}
                        </p>
                        <p className="font-semibold flex items-center gap-2">
                            <FaEnvelope className="h-5 w-5 text-primary" />
                            {listing.email}
                        </p>
                    </div>

                    <p className="text-3xl font-black text-primary py-2">{listing.price == 0 ? "Free" : `$${listing.price}`}</p>
                    <button onClick={() => document.getElementById('order_modal').showModal()} className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform">Adopt / Order Now</button>
                </div>
            </div>

            {/* DaisyUI Native Modal */}
            <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-11/12 max-w-3xl bg-base-100 p-0 overflow-hidden shadow-2xl border border-base-200">
                    <div className="bg-primary/10 p-6 border-b border-base-200">
                         <h3 className="text-2xl font-bold text-center">Confirm Your Order</h3>
                    </div>
                    
                    <div className="p-8">
                        <form onSubmit={handleOrder} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product ID</span>
                                    </label>
                                    <input type="text" value={listing._id} readOnly className="input input-bordered bg-base-200/50" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Product Name</span>
                                    </label>
                                    <input type="text" value={listing.name} readOnly className="input input-bordered bg-base-200/50" />
                                </div>
                            </div>
                             <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Price</span>
                                </label>
                                <input type="text" value={listing.price === 0 ? "Free" : `$${listing.price}`} readOnly className="input input-bordered bg-base-200/50 w-full" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Your Name</span>
                                    </label>
                                    <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-base-200/50" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Your Email</span>
                                    </label>
                                    <input type="text" value={user?.email} readOnly className="input input-bordered bg-base-200/50" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Quantity</span>
                                </label>
                                <input type="number" name="quantity" defaultValue={listing.category === 'Pets' ? 1 : 1} readOnly={listing.category === 'Pets'} className="input input-bordered w-full" min="1" />
                                {listing.category === 'Pets' && <label className="label"><span className="label-text-alt text-warning">Pets can only be adopted one at a time.</span></label>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Phone Number</span>
                                    </label>
                                    <input type="tel" name="phone" required placeholder="+8801XXXXXXXXX" className="input input-bordered w-full" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Pickup/Delivery Date</span>
                                    </label>
                                    <input type="date" name="date" required className="input input-bordered w-full" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Delivery Address</span>
                                </label>
                                <input type="text" name="address" required placeholder="e.g., House #12, Road #5, Dhanmondi, Dhaka" className="input input-bordered w-full" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Additional Notes</span>
                                </label>
                                <textarea name="notes" className="textarea textarea-bordered h-24 w-full" placeholder="Any special requests or questions?"></textarea>
                            </div>

                             <div className="modal-action pt-4 flex justify-between items-center">
                                {/* Use type="button" to prevent form submission on close, or separate form method="dialog" */}
                                <form method="dialog">
                                     <button className="btn btn-ghost hover:bg-base-200">Cancel</button>
                                </form>
                                <button type="submit" className="btn btn-primary px-10 shadow-lg">Confirm Order</button>
                            </div>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ListingDetails;
