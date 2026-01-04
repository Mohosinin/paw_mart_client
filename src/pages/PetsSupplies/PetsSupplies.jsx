import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ListSkeleton } from "../../components/ui/Skeleton";

const PetsSupplies = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/listings`)
            .then(res => {
                setListings(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Filter and Sort Logic
    const filteredListings = listings
        .filter(item => {
            const matchesCategory = category ? item.category === category : true;
            const matchesSearch = search ? item.name.toLowerCase().includes(search.toLowerCase()) : true;
            
            let matchesPrice = true;
            if (priceRange === 'free') matchesPrice = item.price === 0;
            else if (priceRange === '0-50') matchesPrice = item.price > 0 && item.price <= 50;
            else if (priceRange === '50-100') matchesPrice = item.price > 50 && item.price <= 100;
            else if (priceRange === '100+') matchesPrice = item.price > 100;
            
            return matchesCategory && matchesSearch && matchesPrice;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return -1; // Assuming newer items come first from API
            if (sortBy === 'oldest') return 1;
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return 0;
        });

    // Pagination calculations
    const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setSearch('');
        setCategory('');
        setPriceRange('');
        setSortBy('newest');
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-base-200/50 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Find Your Perfect Match</h1>
                    <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                        Browse our wide selection of pets and premium supplies. Use filters to find exactly what you're looking for.
                    </p>
                </div>

                {/* Filters Section */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-lg mb-8 border border-base-200">
                    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-end">
                        {/* Search */}
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text font-medium">Search</span>
                            </label>
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    className="input input-bordered w-full pl-12 bg-base-200/50 focus:bg-base-100"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="w-full lg:w-48">
                            <label className="label">
                                <span className="label-text font-medium">Category</span>
                            </label>
                            <select
                                className="select select-bordered w-full bg-base-200/50 focus:bg-base-100"
                                value={category}
                                onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="">All Categories</option>
                                <option value="Pets">Pets</option>
                                <option value="Pet Food">Pet Food</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Pet Care Products">Pet Care Products</option>
                            </select>
                        </div>

                        {/* Price Range Filter */}
                        <div className="w-full lg:w-40">
                            <label className="label">
                                <span className="label-text font-medium">Price</span>
                            </label>
                            <select
                                className="select select-bordered w-full bg-base-200/50 focus:bg-base-100"
                                value={priceRange}
                                onChange={(e) => { setPriceRange(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="">Any Price</option>
                                <option value="free">Free</option>
                                <option value="0-50">$1 - $50</option>
                                <option value="50-100">$50 - $100</option>
                                <option value="100+">$100+</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="w-full lg:w-40">
                            <label className="label">
                                <span className="label-text font-medium">Sort By</span>
                            </label>
                            <select
                                className="select select-bordered w-full bg-base-200/50 focus:bg-base-100"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                        </div>

                        {/* Clear Filters */}
                        <button
                            onClick={clearFilters}
                            className="btn btn-ghost text-error hover:bg-error/10"
                        >
                            Clear
                        </button>
                    </div>

                    {/* Results Count & View Toggle */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-base-200">
                        <p className="text-base-content/70 mb-4 sm:mb-0">
                            Showing <span className="font-bold text-primary">{paginatedListings.length}</span> of{' '}
                            <span className="font-bold">{filteredListings.length}</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-base-content/60 mr-2">View:</span>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`btn btn-sm btn-square ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                <FiGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`btn btn-sm btn-square ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                <FiList className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && <ListSkeleton count={8} />}

                {/* Grid View */}
                {!loading && viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginatedListings.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-base-200 overflow-hidden h-full"
                            >
                                <figure className="relative h-56 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 badge badge-secondary shadow-md">{item.category}</div>
                                    {item.price === 0 && <div className="absolute top-3 left-3 badge badge-accent shadow-md">Free Adoption</div>}
                                </figure>
                                <div className="card-body p-5">
                                    <h2 className="card-title text-xl font-bold line-clamp-1">{item.name}</h2>
                                    <p className="text-sm text-base-content/60 flex items-center gap-1">
                                        <span>📍</span> {item.location}
                                    </p>
                                    <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-200">
                                        <div className="text-2xl font-black text-primary">
                                            {item.price === 0 ? "Free" : `$${item.price}`}
                                        </div>
                                        <Link to={`/listings/${item._id}`} className="btn btn-primary btn-sm rounded-full px-5">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* List View */}
                {!loading && viewMode === 'list' && (
                    <div className="space-y-4">
                        {paginatedListings.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="card card-side bg-base-100 shadow-lg hover:shadow-xl transition-all border border-base-200 overflow-hidden"
                            >
                                <figure className="w-48 h-48 flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </figure>
                                <div className="card-body p-5">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <span className="badge badge-secondary">{item.category}</span>
                                        {item.price === 0 && <span className="badge badge-accent">Free Adoption</span>}
                                    </div>
                                    <h2 className="card-title text-xl font-bold">{item.name}</h2>
                                    <p className="text-sm text-base-content/60">📍 {item.location}</p>
                                    <div className="card-actions justify-between items-center mt-auto">
                                        <div className="text-2xl font-black text-primary">
                                            {item.price === 0 ? "Free" : `$${item.price}`}
                                        </div>
                                        <Link to={`/listings/${item._id}`} className="btn btn-primary btn-sm rounded-full px-5">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && filteredListings.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">😢</div>
                        <h3 className="text-2xl font-bold text-base-content/50 mb-2">No results found</h3>
                        <p className="text-base-content/40 mb-6">Try adjusting your filters or search terms</p>
                        <button onClick={clearFilters} className="btn btn-primary">
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-circle btn-outline"
                        >
                            <FiChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <div className="join">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`join-item btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-ghost'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="btn btn-circle btn-outline"
                        >
                            <FiChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PetsSupplies;
