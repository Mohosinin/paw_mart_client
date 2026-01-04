import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router";

const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", label: "All Questions" },
        { id: "adoption", label: "Adoption" },
        { id: "selling", label: "Selling & Listing" },
        { id: "account", label: "Account" },
        { id: "payment", label: "Payment & Fees" },
    ];

    const faqs = [
        {
            category: "adoption",
            question: "How do I adopt a pet from PawMart?",
            answer: "Adopting a pet is simple! Browse our listings, find a pet that captures your heart, and click 'View Details'. You can then submit an adoption request by filling out the order form. The pet's current owner or shelter will contact you to complete the adoption process."
        },
        {
            category: "adoption",
            question: "What are the requirements to adopt a pet?",
            answer: "Requirements vary by pet and seller, but generally you need to be at least 18 years old, have a stable living situation suitable for the pet, and be prepared for the financial responsibility of pet ownership. Some sellers may request a home visit or references."
        },
        {
            category: "adoption",
            question: "Are the pets on PawMart vaccinated?",
            answer: "Most pets listed on PawMart come with vaccination records. Check the individual listing for specific health information. We encourage all adopters to schedule a vet visit after adoption for a health check-up."
        },
        {
            category: "adoption",
            question: "Can I return a pet if it doesn't work out?",
            answer: "We understand that sometimes matches don't work out. Contact the original seller/shelter directly to discuss options. Many have return policies, especially shelters. We encourage all parties to work together to find the best solution for the pet."
        },
        {
            category: "selling",
            question: "How do I list my pet for adoption?",
            answer: "Create an account, go to your Dashboard, and click 'Add Listing'. Fill in all the details about your pet including photos, description, health information, and your asking price (or set to $0 for free adoption). Our team reviews listings within 24 hours."
        },
        {
            category: "selling",
            question: "Can I sell pet supplies on PawMart?",
            answer: "Yes! PawMart supports listings for pet supplies including food, accessories, toys, and care products. Select the appropriate category when creating your listing to help buyers find your products easily."
        },
        {
            category: "selling",
            question: "How do I edit or delete my listing?",
            answer: "Go to Dashboard → My Listings. You'll see all your active listings with options to Edit or Delete each one. Changes take effect immediately after saving."
        },
        {
            category: "account",
            question: "How do I create an account?",
            answer: "Click 'Register' in the navigation bar. You can sign up using your email and password, or quickly register using your Google account. Complete your profile to start browsing and listing."
        },
        {
            category: "account",
            question: "How do I reset my password?",
            answer: "On the login page, click 'Forgot password?'. Enter your email address and we'll send you a password reset link. Follow the instructions in the email to create a new password."
        },
        {
            category: "account",
            question: "Can I have multiple accounts?",
            answer: "For security and trust reasons, each user should have only one account. If you need to manage multiple businesses or shelters, contact our support team for organization account options."
        },
        {
            category: "payment",
            question: "Is PawMart free to use?",
            answer: "Yes! Creating an account, browsing listings, and contacting sellers is completely free. We don't charge any fees for basic pet adoption listings. Premium features may be available in the future."
        },
        {
            category: "payment",
            question: "How do I pay for a pet or product?",
            answer: "Payment is handled directly between buyers and sellers. We recommend using secure payment methods and meeting in safe, public locations for exchanges. Always get receipts for your transactions."
        },
        {
            category: "payment",
            question: "What fees should I expect when adopting?",
            answer: "Adoption fees vary. Shelters typically charge $50-$300 which covers vaccinations, spaying/neutering, and microchipping. Private adopters may request rehoming fees. Free adoptions are also common. All fees are disclosed in the listing."
        },
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary to-secondary text-primary-content py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/2 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black mb-4"
                    >
                        Frequently Asked Questions
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl opacity-90 mb-8"
                    >
                        Find answers to common questions about PawMart
                    </motion.p>
                    
                    {/* Search Bar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative max-w-xl mx-auto"
                    >
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input input-lg w-full pl-12 bg-white/10 backdrop-blur-md border-white/20 placeholder-white/60 text-white focus:bg-white/20"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="bg-base-100 border-b border-base-200 sticky top-0 z-30">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex overflow-x-auto py-4 gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`btn btn-sm whitespace-nowrap ${
                                    activeCategory === cat.id 
                                        ? 'btn-primary' 
                                        : 'btn-ghost'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ List */}
            <div className="py-16 bg-base-200">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="space-y-4">
                        {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="collapse collapse-arrow bg-base-100 rounded-2xl shadow-lg"
                            >
                                <input type="radio" name="faq-main" defaultChecked={index === 0} />
                                <div className="collapse-title text-lg font-semibold pr-12">
                                    {faq.question}
                                </div>
                                <div className="collapse-content">
                                    <p className="text-base-content/70 leading-relaxed pt-2">
                                        {faq.answer}
                                    </p>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="text-center py-12">
                                <p className="text-2xl font-bold text-base-content/50 mb-2">No results found</p>
                                <p className="text-base-content/40">Try a different search term or category</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Still Need Help? */}
            <div className="py-16 bg-base-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                    <p className="text-base-content/70 mb-8 max-w-xl mx-auto">
                        Can't find what you're looking for? Our support team is here to help you with any questions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Contact Support
                        </Link>
                        <a href="mailto:support@pawmart.com" className="btn btn-outline btn-lg">
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
