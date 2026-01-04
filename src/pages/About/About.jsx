import { FiHeart, FiUsers, FiAward, FiGlobe, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router";

const About = () => {
    const stats = [
        { 
            number: "10K+", 
            label: "Happy Pets Adopted", 
            icon: <FiHeart className="w-7 h-7 md:w-8 md:h-8" />, 
            gradient: "from-blue-500 to-indigo-500",
            bgGlow: "bg-blue-500/20"
        },
        { 
            number: "50K+", 
            label: "Active Members", 
            icon: <FiUsers className="w-7 h-7 md:w-8 md:h-8" />, 
            gradient: "from-indigo-500 to-violet-500",
            bgGlow: "bg-indigo-500/20"
        },
        { 
            number: "500+", 
            label: "Partner Shelters", 
            icon: <FiAward className="w-7 h-7 md:w-8 md:h-8" />, 
            gradient: "from-sky-500 to-blue-500",
            bgGlow: "bg-sky-500/20"
        },
        { 
            number: "25+", 
            label: "Cities Covered", 
            icon: <FiGlobe className="w-7 h-7 md:w-8 md:h-8" />, 
            gradient: "from-violet-500 to-purple-500",
            bgGlow: "bg-violet-500/20"
        },
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
            bio: "Passionate animal lover with 15+ years in animal welfare."
        },
        {
            name: "Michael Chen",
            role: "Head of Operations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            bio: "Expert in logistics and supply chain management."
        },
        {
            name: "Emily Rodriguez",
            role: "Community Manager",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            bio: "Building bridges between pet lovers worldwide."
        },
    ];

    const values = [
        {
            title: "Compassion First",
            description: "Every decision we make is guided by our love for animals and their well-being.",
            icon: "❤️",
            gradient: "from-blue-500 to-indigo-500"
        },
        {
            title: "Trust & Transparency",
            description: "We maintain honest relationships with our community and partners.",
            icon: "🤝",
            gradient: "from-indigo-500 to-violet-500"
        },
        {
            title: "Community Driven",
            description: "Our platform is built by pet lovers, for pet lovers.",
            icon: "🏠",
            gradient: "from-sky-500 to-blue-500"
        },
        {
            title: "Quality Care",
            description: "We ensure all products and services meet the highest standards.",
            icon: "⭐",
            gradient: "from-violet-500 to-purple-500"
        },
    ];

    return (
        <div className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-content py-28 md:py-36 overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.1)_0%,transparent_50%)]"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
                    >
                        <span>🐾</span>
                        <span>Since 2020</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black mb-6"
                    >
                        About PawMart
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed"
                    >
                        Connecting loving homes with pets in need. 
                        We're on a mission to make pet adoption accessible to everyone.
                    </motion.p>
                </div>
            </div>

            {/* Stats Section - Redesigned with colorful gradient cards */}
            <div className="py-16 md:py-24 relative -mt-12 md:-mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* Card with gradient border effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                                <div className={`relative bg-base-100 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-xl border border-base-200 hover:border-transparent transition-all duration-300 overflow-hidden`}>
                                    {/* Background glow effect */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 ${stat.bgGlow} rounded-full blur-3xl -mr-16 -mt-16 opacity-50`}></div>
                                    
                                    {/* Icon with gradient background */}
                                    <div className={`relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.icon}
                                    </div>
                                    
                                    {/* Number with gradient text */}
                                    <div className={`text-3xl md:text-4xl lg:text-5xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                        {stat.number}
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

            {/* Our Story */}
            <div className="py-16 md:py-24 bg-base-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                                Our Journey
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-base-content">
                                Our Story
                            </h2>
                            <div className="space-y-5 text-base-content/80 text-base md:text-lg leading-relaxed">
                                <p>
                                    PawMart was born from a simple idea: every pet deserves a loving home, 
                                    and every pet lover deserves access to quality care products.
                                </p>
                                <p>
                                    What started as a small community project in 2020 has grown into a 
                                    thriving marketplace connecting thousands of pet parents with adorable 
                                    companions and premium supplies.
                                </p>
                                <p>
                                    Today, we partner with over 500 shelters and rescue organizations 
                                    across 25+ cities, helping facilitate thousands of successful adoptions 
                                    every year.
                                </p>
                            </div>
                            
                            <Link 
                                to="/pets-supplies" 
                                className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:gap-4 transition-all duration-300"
                            >
                                <span>Explore Our Platform</span>
                                <FiArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative order-1 lg:order-2"
                        >
                            <div className="relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600" 
                                    alt="Happy pets" 
                                    className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                                />
                                {/* Decorative accent */}
                                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform translate-x-4 translate-y-4"></div>
                            </div>
                            
                            {/* Badge - repositioned for better responsiveness */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-4 left-4 sm:-bottom-6 sm:left-6 bg-gradient-to-br from-primary to-secondary text-primary-content p-4 sm:p-6 rounded-2xl shadow-xl"
                            >
                                <p className="text-2xl sm:text-3xl font-black">4+ Years</p>
                                <p className="text-sm sm:text-base opacity-90">of Making Tails Wag</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="py-16 md:py-24 bg-base-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            What We Stand For
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
                            Our Values
                        </h2>
                    </motion.div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group bg-base-200/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-base-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${value.gradient} text-white text-3xl md:text-4xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-3 text-base-content">
                                    {value.title}
                                </h3>
                                <p className="text-sm md:text-base text-base-content/70 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 md:py-24 bg-base-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            The People Behind PawMart
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
                            Meet Our Team
                        </h2>
                    </motion.div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="h-56 md:h-64 overflow-hidden relative">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-base-content mb-1">{member.name}</h3>
                                    <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                                    <p className="text-base-content/70 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
                
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block text-3xl mb-4">🐾</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary-content">
                            Ready to Find Your Perfect Companion?
                        </h2>
                        <p className="text-lg md:text-xl text-primary-content/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of happy pet parents who found their best friends through PawMart.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/pets-supplies" 
                                className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Browse Pets
                            </Link>
                            <Link 
                                to="/register" 
                                className="btn btn-lg btn-outline text-white border-white/50 hover:bg-white hover:text-primary hover:border-white transition-all duration-300"
                            >
                                Join Community
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
