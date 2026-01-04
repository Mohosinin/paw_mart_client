import { Link } from "react-router";
import { FaArrowRight, FaMapMarkerAlt, FaShieldAlt, FaTruck, FaHeadset, FaHeart, FaPaw, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typewriter } from 'react-simple-typewriter';
import { motion } from "framer-motion";
import { CardSkeleton } from "../../components/ui/Skeleton";
import { FiChevronLeft, FiChevronRight, FiStar, FiMail, FiUsers, FiAward, FiGlobe } from "react-icons/fi";

const Home = () => {
    const [recentListings, setRecentListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [email, setEmail] = useState("");

    // Array of background images for the banner
    const bannerImages = [
        'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
    ];

    const categories = [
        { name: 'Pets', icon: '🐕', desc: 'Find your perfect furry companion', gradient: 'from-blue-500 to-indigo-500' },
        { name: 'Pet Food', icon: '🦴', desc: 'Premium nutrition for your pets', gradient: 'from-indigo-500 to-violet-500' },
        { name: 'Accessories', icon: '🎀', desc: 'Stylish accessories and toys', gradient: 'from-sky-500 to-blue-500' },
        { name: 'Pet Care Products', icon: '💊', desc: 'Health and wellness supplies', gradient: 'from-violet-500 to-purple-500' }
    ];

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/listings?limit=6`)
            .then(res => {
                setRecentListings(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Auto-change background image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [bannerImages.length]);

    const features = [
        { icon: <FaShieldAlt className="w-6 h-6" />, title: "Verified Sellers", desc: "Trusted & verified" },
        { icon: <FaTruck className="w-6 h-6" />, title: "Safe Delivery", desc: "Secure shipping" },
        { icon: <FaHeadset className="w-6 h-6" />, title: "24/7 Support", desc: "Always here to help" },
        { icon: <FaHeart className="w-6 h-6" />, title: "Happy Pets", desc: "10K+ adoptions" },
    ];

    const stats = [
        { value: "10K+", label: "Happy Adoptions", icon: <FaHeart className="w-6 h-6" />, gradient: "from-blue-500 to-indigo-500" },
        { value: "50K+", label: "Active Users", icon: <FiUsers className="w-6 h-6" />, gradient: "from-indigo-500 to-violet-500" },
        { value: "500+", label: "Partner Shelters", icon: <FiAward className="w-6 h-6" />, gradient: "from-sky-500 to-blue-500" },
        { value: "4.9", label: "Average Rating", icon: <FiStar className="w-6 h-6" />, gradient: "from-violet-500 to-purple-500" },
    ];

    const testimonials = [
        {
            name: "Sarah Mitchell",
            image: "https://i.pravatar.cc/150?img=11",
            text: "Found my sweet golden retriever through PawMart. The process was seamless and the support team was amazing!",
            rating: 5,
            role: "Pet Parent"
        },
        {
            name: "John Davidson",
            image: "https://i.pravatar.cc/150?img=12",
            text: "Best platform for pet supplies. Great prices, fast delivery, and excellent customer service every time.",
            rating: 5,
            role: "Regular Customer"
        },
        {
            name: "Emily Roberts",
            image: "https://i.pravatar.cc/150?img=13",
            text: "Adopted two cats from different sellers. Both experiences were wonderful and my cats are thriving!",
            rating: 5,
            role: "Cat Lover"
        },
    ];

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        setEmail("");
        alert("Thanks for subscribing! 🎉");
    };

    return (
        <div className="font-sans bg-base-100">
            {/* SECTION 1: Hero Banner with Auto-Changing Background */}
            <div className="hero min-h-[85vh] relative overflow-hidden">
                {/* Background Images */}
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
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" style={{ zIndex: 2 }}></div>
                
                {/* Carousel Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {bannerImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-primary w-8' : 'bg-white/50 w-2 hover:bg-white'}`}
                        />
                    ))}
                </div>

                {/* Arrow Controls */}
                <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 z-20"
                >
                    <FiChevronLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 z-20"
                >
                    <FiChevronRight className="w-6 h-6" />
                </button>
                
                <div className="hero-content text-center text-white relative z-10 px-4">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Badge */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/20"
                            >
                                <FaPaw className="text-primary" />
                                <span>Trusted by 50,000+ Pet Lovers</span>
                            </motion.div>

                            <h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    PawMart
                                </span>
                            </h1>
                            
                            <div className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 h-16 flex items-center justify-center">
                                <Typewriter
                                    words={['Find Your Best Friend', 'Give a Forever Home', 'Shop Premium Supplies']}
                                    loop={0}
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={80}
                                    deleteSpeed={40}
                                    delaySpeed={2000}
                                />
                            </div>
                            
                            <p className="mb-10 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                Join a community dedicated to the well-being of animals. 
                                Find your perfect companion or provide them with the best care.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/pets-supplies" className="btn btn-primary btn-lg px-8 border-none shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300">
                                    <FaPaw className="mr-2" />
                                    Browse Listings
                                </Link>
                                <Link to="/register" className="btn btn-lg bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-300">
                                    Join Community
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: Features Strip - Floating Card Style */}
            <div className="relative -mt-16 z-30 px-4 pb-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-base-100 rounded-2xl shadow-2xl border border-base-200 p-6 md:p-8"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left"
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base-content">{feature.title}</h3>
                                        <p className="text-sm text-base-content/60">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* SECTION 3: Category Cards - Premium Design */}
            <div className="py-20 md:py-28 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            What We Offer
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">Explore Categories</h2>
                        <p className="text-base-content/60 max-w-2xl mx-auto text-lg">
                            Discover everything your pet needs in one place
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, idx) => (
                            <Link to={`/category-filtered-product/${cat.name}`} key={idx} className="block group">
                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    className="relative bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30"
                                >
                                    {/* Gradient top bar */}
                                    <div className={`h-1.5 bg-gradient-to-r ${cat.gradient} w-full`} />
                                    
                                    <div className="p-8 text-center">
                                        {/* Icon container */}
                                        <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${cat.gradient} text-white text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            {cat.icon}
                                        </div>
                                        
                                        <h3 className="text-xl font-bold mb-2 text-base-content group-hover:text-primary transition-colors">
                                            {cat.name}
                                        </h3>
                                        <p className="text-base-content/60 text-sm">
                                            {cat.desc}
                                        </p>
                                        
                                        {/* Arrow indicator */}
                                        <div className="mt-4 flex items-center justify-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-sm font-medium">Explore</span>
                                            <FaArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 4: Statistics - Premium Gradient Cards */}
            <div className="py-20 md:py-24 bg-gradient-to-br from-base-200/50 to-base-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* Glow effect on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                                
                                <div className="relative bg-base-100 rounded-2xl p-6 md:p-8 text-center shadow-xl border border-base-200 hover:border-transparent transition-all duration-300 overflow-hidden">
                                    {/* Background accent */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl -mr-16 -mt-16`}></div>
                                    
                                    {/* Icon */}
                                    <div className={`relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.icon}
                                    </div>
                                    
                                    {/* Value */}
                                    <div className={`text-3xl md:text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                        {stat.value}
                                    </div>
                                    
                                    {/* Label */}
                                    <div className="text-sm md:text-base text-base-content/70 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 5: Recent Listings Grid */}
            <div className="py-20 md:py-28 bg-base-100">
                <div className="px-4 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                                Fresh Listings
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-base-content">New Arrivals</h2>
                        </motion.div>
                        <Link to="/pets-supplies" className="btn btn-outline btn-primary gap-2 hover:gap-3 transition-all">
                            View All <FaArrowRight />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {recentListings.map((item, idx) => (
                                <motion.div 
                                    key={item._id} 
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-base-200 overflow-hidden"
                                >
                                    <figure className="relative h-56 md:h-64 overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute top-4 right-4 badge badge-primary badge-lg shadow-md font-medium">{item.category}</div>
                                        {item.price === 0 && <div className="absolute top-4 left-4 badge badge-accent badge-lg shadow-md font-medium">Free Adoption</div>}
                                    </figure>
                                    <div className="card-body p-5">
                                        <h2 className="card-title text-xl font-bold text-base-content">{item.name}</h2>
                                        <div className="flex items-center text-sm text-base-content/60">
                                            <FaMapMarkerAlt className="mr-1.5 text-primary" />
                                            {item.location}
                                        </div>
                                        <div className="divider my-2"></div>
                                        <div className="card-actions justify-between items-center">
                                            <div className="text-2xl font-bold text-primary">
                                                {item.price === 0 ? "Free" : `$${item.price}`}
                                            </div>
                                            <Link to={`/listings/${item._id}`} className="btn btn-primary btn-sm px-6 rounded-full shadow-md hover:shadow-lg transition-shadow">
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* SECTION 6: Why Adopt - Modern Design */}
            <div className="py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.1)_0%,transparent_50%)]"></div>
                
                <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block text-3xl mb-4">🐾</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-primary-content">
                            Why Adopt from PawMart?
                        </h2>
                        <p className="text-xl md:text-2xl leading-relaxed text-primary-content/90 mb-12 max-w-3xl mx-auto">
                            "Adopting a pet saves a life and opens up space for another animal in need. 
                            When you adopt, you give a second chance at happiness."
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {["Save a Life", "Verified Shelters", "24/7 Support", "Easy Process"].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-primary-content">
                                    <FaCheck className="text-white" />
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        
                        <Link to="/pets-supplies" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            Start Your Journey
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* SECTION 7: How It Works */}
            <div className="py-20 md:py-28 bg-base-100">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            Simple Steps
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-base-content">How It Works</h2>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { step: 1, title: "Browse Listings", desc: "Explore our wide range of pets and premium supplies", icon: "🔍" },
                            { step: 2, title: "Connect", desc: "Contact verified sellers and ask questions directly", icon: "💬" },
                            { step: 3, title: "Adopt or Order", desc: "Complete the adoption or purchase securely", icon: "🎉" },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                className="relative text-center group"
                            >
                                {/* Connector line */}
                                {idx < 2 && (
                                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                                )}
                                
                                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary text-white rounded-2xl text-3xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                
                                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                                    Step {item.step}
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-3 text-base-content">{item.title}</h3>
                                <p className="text-base-content/70 max-w-xs mx-auto">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 8: Testimonials */}
            <div className="py-20 md:py-28 bg-base-200/50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            Testimonials
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-base-content">What Our Community Says</h2>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {testimonials.map((t, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl hover:border-primary/20 transition-all duration-300"
                            >
                                <div className="card-body p-6 md:p-8">
                                    {/* Stars */}
                                    <div className="flex text-yellow-400 mb-4">
                                        {[...Array(t.rating)].map((_, i) => <FiStar key={i} className="w-5 h-5 fill-current" />)}
                                    </div>
                                    
                                    {/* Quote */}
                                    <p className="text-base-content/80 text-lg leading-relaxed mb-6">"{t.text}"</p>
                                    
                                    {/* Author */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-base-200">
                                        <div className="avatar">
                                            <div className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={t.image} alt={t.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base-content">{t.name}</h3>
                                            <p className="text-sm text-base-content/60">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 9: Newsletter */}
            <div className="py-20 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
                
                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <FiMail className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Stay in the Loop</h2>
                        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                            Subscribe to get updates on new pets, exclusive offers, and pet care tips.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-lg flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
                                required
                            />
                            <button type="submit" className="btn btn-lg bg-white text-indigo-600 hover:bg-gray-100 border-none shadow-lg">
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* SECTION 10: Final CTA */}
            <div className="py-20 md:py-28 bg-base-100">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block text-4xl mb-4">🐾</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-base-content">
                            Ready to Find Your New Best Friend?
                        </h2>
                        <p className="text-lg md:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto">
                            Thousands of loving pets are waiting for their forever homes. Start your journey today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/pets-supplies" className="btn btn-primary btn-lg px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300">
                                <FaPaw className="mr-2" /> Browse Pets
                            </Link>
                            <Link to="/about" className="btn btn-outline btn-lg px-8 hover:scale-105 transition-all duration-300">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;
