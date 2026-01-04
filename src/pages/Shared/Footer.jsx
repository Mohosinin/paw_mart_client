import { Link } from "react-router";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiHeart } from "react-icons/fi";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-neutral text-neutral-content">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black text-primary flex items-center gap-2">
                            PawMart <span className="text-2xl">🐾</span>
                        </h2>
                        <p className="text-neutral-content/80 leading-relaxed">
                            Connecting loving homes with pets in need. Your trusted marketplace for pet adoption and premium supplies.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition-all">
                                <FaTwitter className="w-4 h-4" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition-all">
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition-all">
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition-all">
                                <FaYoutube className="w-4 h-4" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-primary-content transition-all">
                                <FaLinkedinIn className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h6 className="text-lg font-bold text-white mb-6">Quick Links</h6>
                        <ul className="space-y-3">
                            <li><Link to="/" className="hover:text-primary transition-colors hover:pl-1 inline-block">Home</Link></li>
                            <li><Link to="/pets-supplies" className="hover:text-primary transition-colors hover:pl-1 inline-block">Pets & Supplies</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors hover:pl-1 inline-block">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors hover:pl-1 inline-block">Contact</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors hover:pl-1 inline-block">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h6 className="text-lg font-bold text-white mb-6">Categories</h6>
                        <ul className="space-y-3">
                            <li><Link to="/category-filtered-product/Pets" className="hover:text-primary transition-colors hover:pl-1 inline-block">Pets</Link></li>
                            <li><Link to="/category-filtered-product/Pet Food" className="hover:text-primary transition-colors hover:pl-1 inline-block">Pet Food</Link></li>
                            <li><Link to="/category-filtered-product/Accessories" className="hover:text-primary transition-colors hover:pl-1 inline-block">Accessories</Link></li>
                            <li><Link to="/category-filtered-product/Pet Care Products" className="hover:text-primary transition-colors hover:pl-1 inline-block">Pet Care Products</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h6 className="text-lg font-bold text-white mb-6">Contact Us</h6>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FiMapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-neutral-content/80">123 Pet Street, Dhaka<br />Bangladesh, 1205</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiPhone className="w-5 h-5 text-primary flex-shrink-0" />
                                <a href="tel:+8801234567890" className="text-neutral-content/80 hover:text-primary transition-colors">+880 1234-567890</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiMail className="w-5 h-5 text-primary flex-shrink-0" />
                                <a href="mailto:support@pawmart.com" className="text-neutral-content/80 hover:text-primary transition-colors">support@pawmart.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-content/10">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-neutral-content/60 text-center md:text-left">
                            © {currentYear} PawMart. All rights reserved.
                        </p>
                        <div className="flex items-center gap-1 text-sm text-neutral-content/60">
                            <span>Made with</span>
                            <FiHeart className="w-4 h-4 text-red-500 fill-current" />
                            <span>for pets everywhere</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <Link to="/faq" className="text-neutral-content/60 hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link to="/faq" className="text-neutral-content/60 hover:text-primary transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
