import { Link } from "react-router";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <aside>
                    <h2 className="text-4xl font-black text-primary mb-4">PawMart <span className="text-secondary text-2xl">🐾</span></h2>
                    <p className="font-medium text-lg leading-relaxed text-neutral-content/80">
                        PawMart connects local pet owners and buyers for <br /> adoption and pet care products.
                    </p>
                </aside>
                <nav className="flex flex-col gap-3">
                    <h6 className="footer-title text-white opacity-100 text-lg mb-2">Explore</h6>
                    <Link to="/" className="link link-hover hover:text-primary transition-colors">Home</Link>
                    <Link to="/pets-supplies" className="link link-hover hover:text-primary transition-colors">Adoption & Supplies</Link>
                    <Link to="/about" className="link link-hover hover:text-primary transition-colors">About Us</Link>
                    <Link to="/blogs" className="link link-hover hover:text-primary transition-colors">Pet Care Blog</Link>
                </nav>
                <nav className="flex flex-col gap-3">
                    <h6 className="footer-title text-white opacity-100 text-lg mb-2">Support</h6>
                    <Link to="/contact" className="link link-hover hover:text-primary transition-colors">Contact Support</Link>
                    <Link to="/terms" className="link link-hover hover:text-primary transition-colors">Terms of Service</Link>
                    <Link to="/privacy" className="link link-hover hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link to="/faq" className="link link-hover hover:text-primary transition-colors">FAQs</Link>
                </nav>
                <nav>
                    <h6 className="footer-title text-white opacity-100 text-lg mb-4">Connect With Us</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost hover:bg-neutral-focus hover:text-primary transition-all">
                            <FaTwitter className="w-6 h-6" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost hover:bg-neutral-focus hover:text-primary transition-all">
                            <FaFacebookF className="w-6 h-6" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost hover:bg-neutral-focus hover:text-primary transition-all">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                    </div>
                </nav>
            </div>
            <div className="border-t border-neutral-content/10 mt-8 pt-8 text-center text-sm text-neutral-content/60">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by PawMart Industries Ltd</p>
            </div>
        </footer>
    );
};

export default Footer;
