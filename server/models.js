const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    hero: {
        title: String,
        subtitle: String,
        description: String,
        image: String
    },
    contact: {
        address: String,
        email: String,
        phone: String,
        socials: {
            line: String,
            facebook: String,
            instagram: String,
            tiktok: String
        }
    }
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    link: String
}, { timestamps: true });

const AdminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Admin' },
    status: { type: String, default: 'Active' },
    avatar: String
}, { timestamps: true });

module.exports = {
    Site: mongoose.model('Site', SiteSchema),
    Service: mongoose.model('Service', ServiceSchema),
    Project: mongoose.model('Project', ProjectSchema),
    Admin: mongoose.model('Admin', AdminSchema)
};
