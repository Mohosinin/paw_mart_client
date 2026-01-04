import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate form submission
        setTimeout(() => {
            toast.success("Message sent successfully! We'll get back to you soon.");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setLoading(false);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <FiMail className="w-6 h-6" />,
            title: "Email Us",
            details: ["support@pawmart.com", "info@pawmart.com"],
            color: "text-primary"
        },
        {
            icon: <FiPhone className="w-6 h-6" />,
            title: "Call Us",
            details: ["+880 1234-567890", "+880 9876-543210"],
            color: "text-secondary"
        },
        {
            icon: <FiMapPin className="w-6 h-6" />,
            title: "Visit Us",
            details: ["123 Pet Street, Dhaka", "Bangladesh, 1205"],
            color: "text-accent"
        },
        {
            icon: <FiClock className="w-6 h-6" />,
            title: "Working Hours",
            details: ["Mon - Fri: 9AM - 6PM", "Sat - Sun: 10AM - 4PM"],
            color: "text-success"
        },
    ];

    const faqs = [
        {
            q: "How do I adopt a pet?",
            a: "Browse our listings, find a pet you love, and click 'Adopt Now'. Fill out the application form and we'll connect you with the pet's caretaker."
        },
        {
            q: "Is there a fee for adoption?",
            a: "Adoption fees vary by pet and cover vaccinations, microchipping, and spaying/neutering. Some pets are free for adoption."
        },
        {
            q: "How do I list my pet for adoption?",
            a: "Create an account, go to 'Add Listing' in your dashboard, fill in your pet's details, and submit. Our team will review and approve within 24 hours."
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary to-secondary text-primary-content py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black mb-4"
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl opacity-90 max-w-2xl mx-auto"
                    >
                        Have questions about adoption or our services? We'd love to hear from you!
                    </motion.p>
                </div>
            </div>

            {/* Contact Cards */}
            <div className="py-16 bg-base-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-base-200 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow"
                            >
                                <div className={`${info.color} mb-4 flex justify-center`}>
                                    <div className="p-4 bg-base-100 rounded-full shadow-lg">
                                        {info.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-base-content/70 text-sm">{detail}</p>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Form & Map */}
            <div className="py-16 bg-base-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-base-100 rounded-3xl p-8 shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <FiMessageSquare className="w-8 h-8 text-primary" />
                                <h2 className="text-3xl font-bold">Send a Message</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Your Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Your Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Subject</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Message</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your inquiry..."
                                        className="textarea textarea-bordered h-32 w-full"
                                        required
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className={`btn btn-primary btn-lg w-full gap-2 ${loading ? 'loading' : ''}`}
                                    disabled={loading}
                                >
                                    {!loading && <FiSend />}
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </motion.div>

                        {/* Map & FAQs */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Map Placeholder */}
                            <div className="bg-base-100 rounded-3xl overflow-hidden shadow-xl h-64">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.27923710646988!3d23.780573258035964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1704000000000!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="PawMart Location"
                                ></iframe>
                            </div>

                            {/* Quick FAQs */}
                            <div className="bg-base-100 rounded-3xl p-8 shadow-xl">
                                <h3 className="text-2xl font-bold mb-6">Quick FAQs</h3>
                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="collapse collapse-arrow bg-base-200 rounded-xl">
                                            <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                                            <div className="collapse-title text-lg font-medium">
                                                {faq.q}
                                            </div>
                                            <div className="collapse-content">
                                                <p className="text-base-content/70">{faq.a}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
