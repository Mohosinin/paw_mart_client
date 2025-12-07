import { Link } from "react-router";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typewriter } from 'react-simple-typewriter';
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

const Home = () => {
    const [recentListings, setRecentListings] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of background images for the banner
    const bannerImages = [
        'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/listings?limit=6')
            .then(res => setRecentListings(res.data));
    }, []);

    // Auto-change background image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [bannerImages.length]);

    return (
        <div className="font-sans">
            {/* Banner Section with Auto-Changing Background */}
            <div className="hero min-h-[80vh] relative overflow-hidden">
                {/* Background Images with Fade Transition */}
                {bannerImages.map((image, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                        style={{
                            backgroundImage: `url(${image})`,
                            opacity: currentImageIndex === index ? 1 : 0,
                            zIndex: currentImageIndex === index ? 1 : 0
                        }}
                    />
                ))}
                
                <div className="hero-overlay bg-gradient-to-t from-black/80 via-black/50 to-transparent" style={{ zIndex: 2 }}></div>
                
                {/* Decorative shapes */}
                <motion.div 
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-10 left-10 w-24 h-24 bg-primary/30 rounded-full blur-3xl"
                    style={{ zIndex: 3 }}
                />
                
                <div className="hero-content text-center text-white z-10" style={{ zIndex: 10 }}>
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="mb-6 text-5xl md:text-7xl font-black tracking-tight leading-tight">
                                <span className="block text-primary">PawMart</span>
                                <span className="block text-3xl md:text-5xl mt-2 font-bold opacity-90">
                                    <Typewriter
                                        words={['Find Your Best Friend', 'Give a Forever Home', 'Shop Premium Supplies']}
                                        loop={0}
                                        cursor
                                        cursorStyle='|'
                                        typeSpeed={80}
                                        deleteSpeed={40}
                                        delaySpeed={1500}
                                    />
                                </span>
                            </h1>
                            
                            <p className="mb-8 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                                Join a community dedicated to the well-being of animals. 
                                Find your perfect companion or provide them with the best care products available.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/pets-supplies" className="btn btn-primary btn-lg border-none shadow-lg shadow-primary/40 hover:scale-105 transition-transform">
                                    Browse Listings
                                </Link>
                                <Link to="/register" className="btn btn-outline btn-lg text-white hover:bg-white hover:text-black hover:border-transparent transition-colors">
                                    Join Community
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Category Section Cards */}
            <div className="py-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">Explore Categories</h2>
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {['Pets', 'Pet Food', 'Accessories', 'Pet Care Products'].map((cat, idx) => (
                        <Link to={`/category-filtered-product/${cat}`} key={idx} className="block">
                            <motion.div 
                                whileHover={{ y: -10 }}
                                className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 group overflow-hidden h-full"
                            >
                                <div className="h-2 bg-gradient-to-r from-primary to-secondary w-full" />
                                <div className="card-body items-center text-center p-8">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <span className="text-3xl">🐾</span> {/* Placeholder for nice icons */}
                                    </div>
                                    <h2 className="card-title text-2xl mb-2 group-hover:text-primary transition-colors">{cat}</h2>
                                    <p className="text-base-content/70">Find the best {cat.toLowerCase()} for your furry friends.</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Listings Grid */}
            <div className="py-20 bg-base-200/50">
                <div className="px-4 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">New Arrivals</h2>
                            <p className="text-base-content/70">Check out the latest pets and supplies added by our community.</p>
                        </div>
                        <Link to="/pets-supplies" className="btn btn-ghost hover:bg-transparent text-primary hover:text-primary-focus transition-colors">
                            View All <FaArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentListings.map(item => (
                            <motion.div 
                                key={item._id} 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                            >
                                <figure className="relative h-64 overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                                    />
                                    <div className="absolute top-4 right-4 badge badge-secondary badge-lg shadow-md">{item.category}</div>
                                    {item.price === 0 && <div className="absolute top-4 left-4 badge badge-accent badge-lg shadow-md">Adoption</div>}
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl font-bold">
                                        {item.name}
                                    </h2>
                                    <div className="flex items-center text-sm text-base-content/60 mb-2">
                                        <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                                        {item.location}
                                    </div>
                                    <div className="divider my-2"></div>
                                    <div className="card-actions justify-between items-center mt-2">
                                        <div className="text-2xl font-bold text-primary">
                                            {item.price === 0 ? "Free" : `$${item.price}`}
                                        </div>
                                        <Link to={`/listings/${item._id}`} className="btn btn-primary btn-sm px-6 rounded-full">Details</Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Adopt Section with distinct visuals */}
            <div className="py-24 bg-gradient-to-br from-primary/90 to-primary text-primary-content relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
                
                <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Why Adopt from PawMart?</h2>
                    <p className="text-xl md:text-2xl leading-relaxed font-light mb-10 opacity-95">
                        "Adopting a pet saves a life and opens up space in a shelter for another animal who might desperately need it. 
                        When you adopt, you give a second chance to an animal that has likely known little kindness."
                    </p>
                    <Link to="/register" className="btn btn-lg bg-base-100 text-primary hover:bg-base-200 border-none shadow-xl">Start Your Journey</Link>
                </div>
            </div>

            {/* Pet Heroes / Testimonials */}
            <div className="py-20 px-4 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16">Community Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((hero) => (
                        <div key={hero} className="card bg-base-100 shadow-xl border border-base-200">
                            <div className="card-body">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img src={`https://i.pravatar.cc/150?img=${hero + 10}`} alt="avatar" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Happy Parent #{hero}</h3>
                                        <div className="rating rating-xs">
                                            {[1,2,3,4,5].map(r => <input key={r} type="radio" name={`rating-${hero}`} className="mask mask-star-2 bg-orange-400" checked readOnly />)}
                                        </div>
                                    </div>
                                </div>
                                <p className="italic text-base-content/80">"Adopting changed my life for the better! The process was smooth and I found my best friend."</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
