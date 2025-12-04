import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import StylingDemo from './components/StylingDemo';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Wardrobe from './pages/Wardrobe';
import Stylist from './pages/Stylist';

const Home = () => (
  <>
    <Hero />
    <Features />
    <StylingDemo />
    <WaitlistForm />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f0c29] text-white font-sans selection:bg-purple-500 selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/stylist" element={<Stylist />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
