import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Shirt, Sparkles, LogIn, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useUser();

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-[#0f0c29]/80 backdrop-blur-xl shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">Stylencia</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center gap-4">
                    {currentUser ? (
                        <>
                            <Link to="/profile" className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300">
                                <User size={18} />
                                <span className="hidden md:inline">Profile</span>
                            </Link>
                            <button onClick={handleLogout} className="text-gray-300 hover:text-white transition-colors" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300 shadow-lg">
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                    )}

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-300 rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-200 ml-2"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-900/50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <Link to="/" className={`block py-2 px-3 rounded md:p-0 transition-colors ${isActive('/') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>Home</Link>
                        </li>
                        <li>
                            <Link to="/wardrobe" className={`block py-2 px-3 rounded md:p-0 transition-colors flex items-center gap-1 ${isActive('/wardrobe') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>
                                <Shirt size={16} /> Wardrobe
                            </Link>
                        </li>
                        <li>
                            <Link to="/stylist" className={`block py-2 px-3 rounded md:p-0 transition-colors flex items-center gap-1 ${isActive('/stylist') ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}>
                                <Sparkles size={16} /> Stylist
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
