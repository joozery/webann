import React from 'react';
import { useData } from '../context/DataContext';
import BlurText from './ui/blur-text';
import TextType from './ui/text-type';

const HeroSection = () => {
    const { data } = useData();
    const { hero } = data;

    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
                    <BlurText
                        text={hero.title}
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 drop-shadow-sm justify-center"
                    />
                    <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
                        {hero.subtitle}
                    </p>
                    <div className="h-24 md:h-20 mb-10 flex items-center justify-center">
                        <TextType
                            text={hero.description}
                            typingSpeed={20}
                            deletingSpeed={10}
                            pauseDuration={3000}
                            className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl"
                            cursorCharacter="|"
                            loop={false}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-full bg-blue-500 text-white font-bold transition-all border-b-[6px] border-blue-700 hover:bg-blue-400 hover:border-blue-600 active:border-b-0 active:translate-y-2 active:shadow-inner shadow-xl"
                        >
                            View Our Work
                        </button>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-full bg-white text-gray-900 font-bold transition-all border-2 border-gray-200 border-b-[6px] border-b-gray-300 hover:bg-gray-50 active:border-b-2 active:translate-y-1 shadow-lg"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Graphic/Image */}
            <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${hero.image})` }} />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent" />
        </section>
    );
};

export default HeroSection;
