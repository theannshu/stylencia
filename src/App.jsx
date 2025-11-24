import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import StylingDemo from './components/StylingDemo';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0f0c29] text-white font-sans selection:bg-purple-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <StylingDemo />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
