require('dotenv').config();
const mongoose = require('mongoose');
const { Service, Project } = require('./models');

const services = [
    {
        title: "Mobile App Development",
        description: "บริการพัฒนาแอปพลิเคชันบนมือถือทั้ง iOS และ Android ด้วยเทคโนโลยี Cross-Platform และ Native",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470&auto=format&fit=crop"
    },
    {
        title: "Digital Marketing",
        description: "วางแผนการตลาดออนไลน์ ดูแลโฆษณา Facebook, Google Ads และทำ SEO เพื่อเพิ่มยอดขาย",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    },
    {
        title: "UX/UI Design",
        description: "ออกแบบประสบการณ์ผู้ใช้ (UX) และส่วนต่อประสาน (UI) ที่สวยงาม ใช้งานง่าย และตอบโจทย์ธุรกิจ",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
    }
];

const projects = [
    {
        title: "Smart Logistics Dashboard",
        description: "ระบบบริหารจัดการขนส่งและโลจิสติกส์อัจฉริยะ ติดตามสถานะรถแบบ Real-time",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Food Delivery App",
        description: "แอปพลิเคชันสั่งอาหารเดลิเวอรี่ รองรับระบบจ่ายเงินออนไลน์และติดตามไรเดอร์",
        image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Corporate Website Redesign",
        description: "รีดีไซน์เว็บไซต์บริษัทมหาชน เพิ่มความทันสมัยและรองรับการแสดงผลทุกอุปกรณ์",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf7d?q=80&w=2069&auto=format&fit=crop",
        link: "#"
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding');

        // Check if services exist, if not add them
        const existingServices = await Service.countDocuments();
        if (existingServices < 5) { // Add if fewer than 5 to avoid dupes on re-run
            await Service.insertMany(services);
            console.log('✅ Added Sample Services');
        }

        // Check if projects exist, if not add them
        const existingProjects = await Project.countDocuments();
        if (existingProjects < 5) {
            await Project.insertMany(projects);
            console.log('✅ Added Sample Projects');
        }

        console.log('🎉 Seeding Completed!');
        process.exit();
    } catch (error) {
        console.error('Seeding Failed:', error);
        process.exit(1);
    }
};

seedData();
