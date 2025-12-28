import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CurvedLoop from '../components/ui/curved-loop';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <HeroSection />
            <ServicesSection />
            <PortfolioSection />
            <div className="py-20 bg-slate-50 overflow-hidden">
                <CurvedLoop
                    marqueeText="Let's work together ✦ Build Your Dream ✦ Twelve Systems ✦ "
                    speed={2}
                    curveAmount={100}
                    direction="right"
                    className="text-slate-200"
                />
            </div>
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Home;
