require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Site, Service, Project, Admin } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'twelvesystems_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        // Seed initial data if empty
        const sitaData = await Site.findOne();
        if (!sitaData) {
            await Site.create({
                hero: {
                    title: "Twelve Systems",
                    subtitle: "We create digital experiences that empower your business.",
                    description: "บริษัท ทเวลฟ์ ซิสเต็มส์ จำกัด รับทำเว็บไซต์ พัฒนาเว็บแอปพลิเคชัน และระบบหลังบ้านครบวงจร มาตรฐานมืออาชีพ",
                    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
                },
                contact: {
                    address: "59 ม.3 ต.กระแชง อ.กันทรลักษ์ จ.ศรีสะเกษ",
                    email: "contact@twelvesystems.com",
                    phone: "0xx-xxx-xxxx",
                    socials: {
                        line: "https://line.me",
                        facebook: "https://facebook.com",
                        instagram: "https://instagram.com",
                        tiktok: "https://tiktok.com"
                    }
                }
            });
            console.log('Initial Site Data Seeded');
        }

        // Seed Admin User
        const adminUser = await Admin.findOne({ email: 'admin@twelvesystems.com' });
        if (!adminUser) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            await Admin.create({
                name: "Admin User",
                email: "admin@twelvesystems.com",
                password: hashedPassword,
                role: "Super Admin",
                avatar: "AD"
            });
            console.log('Initial Admin Seeded');
        }
    })
    .catch(err => console.error(err));

// Middleware to verify Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, user: { name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'twelve-systems',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const upload = multer({ storage: storage });

// Routes

// 1. Get All Data (formatted for frontend context)
app.get('/api/data', async (req, res) => {
    try {
        const site = await Site.findOne();
        const services = await Service.find();
        const projects = await Project.find();
        const admins = await Admin.find();

        const formattedData = {
            hero: site?.hero || {},
            contact: site?.contact || {},
            services: services.map(s => ({ ...s._doc, id: s._id })),
            projects: projects.map(p => ({ ...p._doc, id: p._id })),
            admins: admins.map(a => ({ ...a._doc, id: a._id })),
        };

        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Update Site Data (Hero or Contact)
app.put('/api/site/:section', async (req, res) => {
    const { section } = req.params; // 'hero' or 'contact'
    try {
        const update = {};
        update[section] = req.body;

        const site = await Site.findOneAndUpdate({}, { $set: update }, { new: true, upsert: true });
        res.json(site);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Services CRUD
app.post('/api/services', async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        res.json({ ...newService._doc, id: newService._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/services/:id', async (req, res) => {
    try {
        const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ ...updated._doc, id: updated._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/services/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Projects CRUD
app.post('/api/projects', async (req, res) => {
    try {
        const newProject = await Project.create(req.body);
        res.json({ ...newProject._doc, id: newProject._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ ...updated._doc, id: updated._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Admins CRUD
app.post('/api/admins', async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.json({ ...newAdmin._doc, id: newAdmin._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/admins/:id', async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. Upload Image
app.post('/api/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ url: req.file.path });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
