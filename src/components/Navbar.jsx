import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import Logo from './Logo';

const CustomNavLink = ({ to, children, active }) => (
    <Link
        to={to}
        className={`relative text-sm font-medium transition-colors duration-300 ${active ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
    >
        {children}
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${active ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
            }`} />
    </Link>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { currentUser, logout, wardrobe, userProfile } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
                ? 'bg-[#050510]/60 backdrop-blur-xl border-white/5 py-3'
                : 'bg-transparent border-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link to="/" className="group">
                    <Logo showText={true} className="group-hover:scale-105 transition-transform duration-300" textClassName="text-2xl" />
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <CustomNavLink to="/" active={isActive('/')}>Home</CustomNavLink>
                    <CustomNavLink to="/features" active={isActive('/features')}>Features</CustomNavLink>
                    {currentUser && (
                        <>
                            <CustomNavLink to="/wardrobe" active={isActive('/wardrobe')}>
                                Wardrobe
                                {wardrobe && wardrobe.length > 0 && (
                                    <span className="ml-2 bg-gradient-to-r from-primary to-secondary text-[#050510] text-[10px] font-bold px-1.5 py-0.5 rounded-full align-top">
                                        {wardrobe.length}
                                    </span>
                                )}
                            </CustomNavLink>
                            <CustomNavLink to="/stylist" active={isActive('/stylist')}>AI Stylist</CustomNavLink>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {currentUser ? (
                        <>
                            <Link to="/profile">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border transition-all ${isActive('/profile')
                                        ? 'bg-gradient-to-r from-primary to-secondary border-transparent text-[#050510]'
                                        : 'bg-white/5 border-white/10 text-white hover:border-primary/50'
                                        }`}
                                >
                                    {userProfile?.avatar ? (
                                        <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={20} />
                                    )}
                                </motion.div>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                            >
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-white/80 hover:text-white font-medium transition-colors text-sm">
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-white text-[#050510] px-5 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button - Simplified */}
                    <button className="md:hidden text-white/80 hover:text-white">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
