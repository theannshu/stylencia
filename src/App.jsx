import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import StylingDemo from './components/StylingDemo';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Wardrobe from './pages/Wardrobe';
import Stylist from './pages/Stylist';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import BackgroundLayout from './components/BackgroundLayout';
import SmoothScroll from './components/SmoothScroll';

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
      <SmoothScroll>
        <BackgroundLayout>
          <div className="min-h-screen font-sans selection:bg-purple-500 selection:text-white">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wardrobe" element={<Wardrobe />} />
                <Route path="/stylist" element={<Stylist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BackgroundLayout>
      </SmoothScroll>
    </Router>
  );
}

export default App;
