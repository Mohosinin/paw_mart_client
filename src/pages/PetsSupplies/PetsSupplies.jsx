import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";

const PetsSupplies = () => {
    const [listings, setListings] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/listings`)
            .then(res => setListings(res.data));
    }, []);

    const filteredListings = listings.filter(item => {
        return (category ? item.category === category : true) &&
               (search ? item.name.toLowerCase().includes(search.toLowerCase()) : true);
    });

    return (
        <div className="min-h-screen bg-base-200/30 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                     <h2 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Match</h2>
                     <p className="text-base-content/70 text-lg">Browse our wide selection of pets and supplies</p>
                </div>
            
                {/* Filters */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-lg mb-12 flex flex-col md:flex-row gap-4 items-center justify-between border border-base-200">
                    <div className="w-full md:w-1/3">
                        <input 
                            type="text" 
                            placeholder="🔍 Search by name..." 
                            className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-all" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                         <select className="select select-bordered w-full bg-base-200/50 focus:bg-base-100 transition-all" onChange={(e) => setCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            <option value="Pets">Pets</option>
                            <option value="Pet Food">Pet Food</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Pet Care Products">Pet Care Products</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredListings.map((item, index) => (
                        <motion.div 
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-base-200"
                        >
                            <figure className="relative h-64 overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                                />
                                <div className="absolute top-4 right-4 badge badge-secondary shadow-md">{item.category}</div>
                                {item.price === 0 && <div className="absolute top-4 left-4 badge badge-accent shadow-md">Adoption</div>}
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl font-bold">
                                    {item.name}
                                </h2>
                                <p className="text-sm text-base-content/60 flex items-center mb-2">
                                     <span className="mr-1">📍</span> {item.location}
                                </p>
                                <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-200">
                                    <div className="text-2xl font-black text-primary">
                                        {item.price === 0 ? "Free" : `$${item.price}`}
                                    </div>
                                    <Link to={`/listings/${item._id}`} className="btn btn-primary btn-sm rounded-full px-6 shadow-md hover:shadow-lg">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {filteredListings.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <h3 className="text-2xl font-bold text-base-content/50">No results found 😢</h3>
                             <p className="text-base-content/40">Try adjusting your filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PetsSupplies;
