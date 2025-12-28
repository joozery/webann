import React from 'react';
import { useData } from '../context/DataContext';
import { Phone, Mail, MapPin, Facebook, Instagram, Share2 } from 'lucide-react';

// Custom icons due to Lucide limitations or preference
const LineIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 10.3c0-4.9-5-9-11.3-9S-.6 5.4-.6 10.3c0 4.4 3.9 8.1 9.4 8.9.4.1.9.2.9.6 0 .2.1.8-.3 2-.2 1.2 1.1 1.1 1.8.8 3.5-2 9.5-6.5 9.5-6.5C21.4 14.7 22 12.6 22 10.3z" />
    </svg>
);

const TiktokIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0v17.5c0 2.5-1.5 4-3.5 4-2.5 0-4-2-4-4s1.5-4 4-4v-4c-5 0-8 4-8 8s3 8 8 8c5.5 0 7.5-3.5 7.5-6h-4z" />
        <path d="M24 6.5h-4v-6h-4v6h-4v4h4v13.5h4v-13.5h4z" />
    </svg>
)

const ContactSection = () => {
    const { data } = useData();
    const { contact } = data;

    return (
        <section id="contact" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">Let's work together.</h2>
                        <p className="text-xl text-gray-500 mb-12">
                            Ready to start your project? We are here to help you achieve your digital goals.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4 shrink-0" />
                                <span className="text-lg text-gray-700">{contact.address}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-6 h-6 text-blue-600 mr-4 shrink-0" />
                                <a href={`tel:${contact.phone}`} className="text-lg text-gray-700 hover:text-blue-600 transition-colors">{contact.phone}</a>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-6 h-6 text-blue-600 mr-4 shrink-0" />
                                <a href={`mailto:${contact.email}`} className="text-lg text-gray-700 hover:text-blue-600 transition-colors">{contact.email}</a>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Follow Us</h3>
                            <div className="flex space-x-6">
                                {contact.socials.line && (
                                    <a href={contact.socials.line} className="text-gray-400 hover:text-[#06C755] transition-colors"><LineIcon className="w-8 h-8" /></a>
                                )}
                                {contact.socials.facebook && (
                                    <a href={contact.socials.facebook} className="text-gray-400 hover:text-[#1877F2] transition-colors"><Facebook className="w-8 h-8" /></a>
                                )}
                                {contact.socials.instagram && (
                                    <a href={contact.socials.instagram} className="text-gray-400 hover:text-[#E4405F] transition-colors"><Instagram className="w-8 h-8" /></a>
                                )}
                                {contact.socials.tiktok && (
                                    <a href={contact.socials.tiktok} className="text-gray-400 hover:text-black transition-colors"><TiktokIcon className="w-8 h-8" /></a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 md:p-12 rounded-3xl">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white resize-none" placeholder="Tell us about your project..."></textarea>
                            </div>
                            <button type="submit" className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
