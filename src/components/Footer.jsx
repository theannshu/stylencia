import React from 'react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-[#0f0c29] border-t border-white/10 py-8 text-center text-gray-400 text-sm">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="mb-4">
                    <Logo className="w-12 h-12" showText={true} />
                </div>
                <p>&copy; {new Date().getFullYear()} Stylencia.me | Made with ❤️ by STUDENT</p>
                <div className="mt-4 flex justify-center space-x-4">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="mailto:stylencia.me@gmail.com" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
