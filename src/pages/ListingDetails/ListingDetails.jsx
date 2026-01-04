import { useContext, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaTag, FaUser, FaHeart, FaShare } from "react-icons/fa";
import { useParams, Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { DetailsSkeleton, CardSkeleton } from "../../components/ui/Skeleton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [relatedListings, setRelatedListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const { user } = useContext(AuthContext);

    // Multiple images array (using same image for demo, replace with actual array when available)
    const images = listing ? [
        listing.image,
        listing.image, // Duplicate for demo
        listing.image,
    ] : [];

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/listings/${id}`)
            .then(res => {
                setListing(res.data);
                // Fetch related listings
                return axios.get(`${import.meta.env.VITE_API_URL}/listings?category=${res.data.category}&limit=4`);
            })
            .then(res => {
                // Filter out current listing and limit to 3
                const related = res.data.filter(item => item._id !== id).slice(0, 3);
                setRelatedListings(related);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching listing:', error);
                toast.error('Failed to load listing details');
                setLoading(false);
            });
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
            productImage: listing.image,
            buyerName: user.displayName,
            email: user.email,
            quantity,
            price: listing.price,
            address,
            phone,
            date,
            additionalNotes: notes
        };

        axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Order Placed Successfully! 🎉');
                    document.getElementById('order_modal').close();
                }
            })
            .catch(error => {
                console.error('Error placing order:', error);
                toast.error(error.response?.data?.message || 'Failed to place order.');
            });
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <DetailsSkeleton />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😢</div>
                    <h2 className="text-2xl font-bold mb-2">Listing Not Found</h2>
                    <p className="text-base-content/60 mb-6">The listing you're looking for doesn't exist.</p>
                    <Link to="/pets-supplies" className="btn btn-primary">Browse Listings</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200/30 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-sm breadcrumbs mb-6">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/pets-supplies">Pets & Supplies</Link></li>
                        <li className="text-primary font-medium">{listing.name}</li>
                    </ul>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Image Gallery */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-base-100">
                            <img 
                                src={images[activeImage]} 
                                alt={listing.name}
                                className="w-full h-full object-cover"
                            />
                            {listing.price === 0 && (
                                <div className="absolute top-4 left-4 badge badge-accent badge-lg font-bold shadow-lg">
                                    Free Adoption
                                </div>
                            )}
                            <div className="absolute top-4 right-4 badge badge-secondary badge-lg shadow-lg">
                                {listing.category}
                            </div>
                            
                            {/* Image Navigation */}
                            {images.length > 1 && (
                                <>
                                    <button 
                                        onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70"
                                    >
                                        <FiChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70"
                                    >
                                        <FiChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {/* Thumbnails */}
                        <div className="flex gap-3">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                                        activeImage === idx ? 'border-primary ring-2 ring-primary/30' : 'border-transparent opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Listing Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-base-content mb-4">{listing.name}</h1>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="badge badge-primary badge-lg">{listing.category}</span>
                                {listing.price === 0 && <span className="badge badge-secondary badge-lg">Adoption</span>}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                            <p className="text-sm text-base-content/60 mb-1">Price</p>
                            <p className="text-4xl font-black text-primary">
                                {listing.price === 0 ? "Free" : `$${listing.price}`}
                            </p>
                        </div>

                        {/* Key Info */}
                        <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200 space-y-4">
                            <h3 className="font-bold text-lg border-b border-base-200 pb-3">Key Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <FaMapMarkerAlt className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/60">Location</p>
                                        <p className="font-medium">{listing.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                        <FaTag className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/60">Category</p>
                                        <p className="font-medium">{listing.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-accent/10 rounded-lg text-accent">
                                        <FaEnvelope className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/60">Contact</p>
                                        <p className="font-medium text-sm truncate">{listing.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-success/10 rounded-lg text-success">
                                        <FaCalendarAlt className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/60">Posted</p>
                                        <p className="font-medium">{listing.date || 'Recently'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button 
                                onClick={() => document.getElementById('order_modal').showModal()} 
                                className="btn btn-primary btn-lg flex-1 shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                            >
                                {listing.category === 'Pets' ? '🐾 Adopt Now' : '🛒 Order Now'}
                            </button>
                            <button className="btn btn-outline btn-lg btn-square">
                                <FaHeart className="w-5 h-5" />
                            </button>
                            <button className="btn btn-outline btn-lg btn-square">
                                <FaShare className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Description Section */}
                <div className="bg-base-100 rounded-3xl p-8 shadow-lg border border-base-200 mb-12">
                    <h2 className="text-2xl font-bold mb-6">Description</h2>
                    <p className="text-base-content/80 leading-relaxed text-lg">
                        {listing.description || "No description available for this listing."}
                    </p>
                </div>

                {/* Related Listings */}
                {relatedListings.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Similar Listings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedListings.map(item => (
                                <Link 
                                    key={item._id} 
                                    to={`/listings/${item._id}`}
                                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-all border border-base-200 group"
                                >
                                    <figure className="h-48 overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </figure>
                                    <div className="card-body p-4">
                                        <h3 className="card-title text-lg">{item.name}</h3>
                                        <p className="text-primary font-bold">
                                            {item.price === 0 ? "Free" : `$${item.price}`}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Order Modal */}
            <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-11/12 max-w-3xl bg-base-100 p-0 overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-r from-primary to-secondary text-primary-content p-6">
                        <h3 className="text-2xl font-bold">Confirm Your Order</h3>
                        <p className="opacity-80">Fill in your details to complete the order</p>
                    </div>
                    
                    <div className="p-8">
                        <form onSubmit={handleOrder} className="space-y-6">
                            {/* Product Info */}
                            <div className="flex gap-4 p-4 bg-base-200/50 rounded-xl">
                                <img src={listing?.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                                <div>
                                    <h4 className="font-bold text-lg">{listing?.name}</h4>
                                    <p className="text-primary font-bold text-xl">
                                        {listing?.price === 0 ? "Free" : `$${listing?.price}`}
                                    </p>
                                </div>
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
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    defaultValue={1} 
                                    readOnly={listing?.category === 'Pets'} 
                                    className="input input-bordered w-full" 
                                    min="1" 
                                />
                                {listing?.category === 'Pets' && (
                                    <label className="label">
                                        <span className="label-text-alt text-warning">Pets can only be adopted one at a time.</span>
                                    </label>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Phone Number</span>
                                    </label>
                                    <input type="tel" name="phone" required placeholder="+880 1XXX-XXXXXX" className="input input-bordered w-full" />
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
                                <input type="text" name="address" required placeholder="Your full address" className="input input-bordered w-full" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Additional Notes (Optional)</span>
                                </label>
                                <textarea name="notes" className="textarea textarea-bordered h-24 w-full" placeholder="Any special requests?"></textarea>
                            </div>

                            <div className="modal-action pt-4 flex justify-between items-center">
                                <form method="dialog">
                                    <button className="btn btn-ghost">Cancel</button>
                                </form>
                                <button type="submit" className="btn btn-primary px-10 shadow-lg">
                                    Confirm Order
                                </button>
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
