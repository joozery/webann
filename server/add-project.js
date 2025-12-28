require('dotenv').config();
const mongoose = require('mongoose');
const { Project } = require('./models');

const additionalProject = {
    title: "AI Chatbot Integration",
    description: "ระบบแชทบอท AI อัจฉริยะ ตอบคำถามลูกค้าอัตโนมัติ 24 ชั่วโมง ลดภาระงานแอดมิน",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2095&auto=format&fit=crop",
    link: "#"
};

const addProject = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const exists = await Project.findOne({ title: additionalProject.title });
        if (!exists) {
            await Project.create(additionalProject);
            console.log('✅ Added 4th Project: AI Chatbot');
        } else {
            console.log('Project already exists');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

addProject();
