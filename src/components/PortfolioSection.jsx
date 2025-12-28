import React, { useRef } from 'react';
import { useData } from '../context/DataContext';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PortfolioSection = () => {
    const { data } = useData();
    const { projects } = data;
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth / 3; // Scroll one "card width" amount more or less

            const targetScroll = direction === 'left'
                ? current.scrollLeft - scrollAmount
                : current.scrollLeft + scrollAmount;

            current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="portfolio" className="py-32 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-40 -mt-20 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-40 -mb-20 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-gray-100 pb-8"
                >
                    <div className="max-w-3xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider uppercase mb-4">
                            Selected Work
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                            Crafting Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Excellence.</span>
                        </h2>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pb-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 group"
                            aria-label="Previous project"
                        >
                            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 group"
                            aria-label="Next project"
                        >
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative w-full">
                    {/* Horizontal Scroll Layout */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-8 pb-12 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                // Calculate width: 
                                // Mobile: full width (85vm to hint)
                                // Tablet: 2 cards
                                // Desktop: Exactly 3 cards visible (calc(100% / 3 - gap adjustment))
                                className="group relative flex-none w-[85vw] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] snap-start"
                            >
                                {/* Card Image Wrapper */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 mb-6 shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-900/10 transition-all duration-500">
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors z-10 duration-500" />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />

                                    {/* Overlay Button */}
                                    <a
                                        href={project.link || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-6 right-6 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-blue-600 hover:text-white"
                                    >
                                        <ArrowUpRight size={24} strokeWidth={2} />
                                    </a>
                                </div>

                                {/* Card Content */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <span className="text-xs font-mono text-gray-400">0{index + 1}</span>
                                    </div>
                                    <div className="h-px w-0 group-hover:w-full bg-blue-600/30 transition-all duration-700 ease-in-out"></div>
                                    <p className="text-gray-500 line-clamp-2 leading-relaxed text-base group-hover:text-gray-600 transition-colors">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PortfolioSection;
