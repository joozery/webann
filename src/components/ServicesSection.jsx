import React from 'react';
import { useData } from '../context/DataContext';

const ServicesSection = () => {
    const { data } = useData();
    const { services } = data;

    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Comprehensive digital solutions tailored to your business needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {services.map((service) => (
                        <div key={service.id} className="group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                            <div className="w-full h-48 mb-6 overflow-hidden rounded-xl bg-gray-100 shadow-sm relative group-hover:shadow-md transition-shadow">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
