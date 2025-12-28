import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Image as ImageIcon,
    Briefcase,
    Layers,
    Contact,
    LogOut,
    Plus,
    Trash2,
    Settings,
    ChevronRight,
    Menu,
    ExternalLink,
    Upload
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { cn } from '../lib/utils';


const handleImageUpload = async (event, callback) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch('http://localhost:8000/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            callback(data.url);
        } else {
            console.error('Upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { id: 'hero', label: 'Hero Section', icon: ImageIcon },
        { id: 'services', label: 'Services', icon: Layers },
        { id: 'projects', label: 'Portfolio', icon: Briefcase },
        { id: 'contact', label: 'Contact Info', icon: Contact },
    ];

    return (
        <div className="h-screen bg-slate-50/50 flex overflow-hidden">
            {/* Sidebar */}
            {/* Professional Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] text-slate-300 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-[#1f1f1f] flex flex-col",
                    !isSidebarOpen && "-translate-x-full"
                )}
            >
                {/* Brand Header */}
                <div className="flex h-20 items-center px-8 border-b border-[#1f1f1f]">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:shadow-blue-900/40 transition-shadow">
                            <LayoutDashboard className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <span className="block font-bold text-white text-lg tracking-tight group-hover:text-blue-400 transition-colors">TwelveCMS</span>
                            <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-medium">Enterprise</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 py-8 px-4 space-y-8 overflow-y-auto">
                    {/* Group 1 */}
                    <div className="space-y-2">
                        <h3 className="px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">Content Modules</h3>
                        {menuItems.slice(0, 3).map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                                    activeTab === item.id
                                        ? "bg-slate-900 text-white shadow-inner shadow-black/50 border border-[#1f1f1f]"
                                        : "text-slate-400 hover:bg-[#1a1a1a] hover:text-white"
                                )}
                            >
                                <span className={cn(
                                    "p-2 rounded-lg bg-[#1a1a1a] transition-colors group-hover:bg-[#252525]",
                                    activeTab === item.id && "bg-blue-600/10 text-blue-400"
                                )}>
                                    <item.icon className="h-4 w-4" />
                                </span>
                                {item.label}
                                {activeTab === item.id && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Group 2 */}
                    <div className="space-y-2">
                        <h3 className="px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">Settings & Config</h3>
                        <button
                            onClick={() => setActiveTab('contact')}
                            className={cn(
                                "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                                activeTab === 'contact'
                                    ? "bg-slate-900 text-white shadow-inner shadow-black/50 border border-[#1f1f1f]"
                                    : "text-slate-400 hover:bg-[#1a1a1a] hover:text-white"
                            )}
                        >
                            <span className={cn(
                                "p-2 rounded-lg bg-[#1a1a1a] transition-colors group-hover:bg-[#252525]",
                                activeTab === 'contact' && "bg-blue-600/10 text-blue-400"
                            )}>
                                <Contact className="h-4 w-4" />
                            </span>
                            Company Info
                            {activeTab === 'contact' && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={cn(
                                "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                                activeTab === 'settings'
                                    ? "bg-slate-900 text-white shadow-inner shadow-black/50 border border-[#1f1f1f]"
                                    : "text-slate-400 hover:bg-[#1a1a1a] hover:text-white"
                            )}
                        >
                            <span className={cn(
                                "p-2 rounded-lg bg-[#1a1a1a] transition-colors group-hover:bg-[#252525]",
                                activeTab === 'settings' && "bg-blue-600/10 text-blue-400"
                            )}>
                                <Settings className="h-4 w-4" />
                            </span>
                            System Settings
                            {activeTab === 'settings' && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* User / Footer */}
                <div className="p-4 border-t border-[#1f1f1f] bg-[#0d0d0d]">
                    <div className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-1 flex items-center justify-between shadow-sm">
                        <Link to="/" className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors flex-1 min-w-0 group">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center font-bold text-xs text-white border border-slate-500 shadow-sm">
                                AD
                            </div>
                            <div className="overflow-hidden text-left">
                                <p className="truncate text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">Admin User</p>
                                <p className="truncate text-[10px] text-slate-500">View Website</p>
                            </div>
                        </Link>
                        <div className="h-8 w-[1px] bg-[#1f1f1f] mx-1"></div>
                        <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Logout">
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 flex items-center justify-between border-b bg-white px-6 shadow-sm z-10">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 -ml-2 text-slate-500">
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-lg font-semibold text-slate-800 capitalize">
                        {menuItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link to="/" target="_blank">
                                View Site <ExternalLink className="ml-2 h-3 w-3" />
                            </Link>
                        </Button>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mx-auto max-w-5xl space-y-8 animate-fade-in-down">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

const Admin = () => {
    const { data, updateSection, updateItem, addItem, deleteItem } = useData();
    const [activeTab, setActiveTab] = useState('hero');

    // Helper State
    const [newService, setNewService] = useState({ title: '', description: '', image: '' });
    const [newProject, setNewProject] = useState({ title: '', description: '', image: '', link: '' });

    const HeroTab = () => (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Hero Configuration</CardTitle>
                    <CardDescription>Manage your website's main banner section.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="hero-title">Main Title</Label>
                        <Input
                            id="hero-title"
                            value={data.hero.title}
                            onChange={(e) => updateSection('hero', { ...data.hero, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hero-subtitle">Subtitle</Label>
                        <Input
                            id="hero-subtitle"
                            value={data.hero.subtitle}
                            onChange={(e) => updateSection('hero', { ...data.hero, subtitle: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hero-desc">Description</Label>
                        <Textarea
                            id="hero-desc"
                            rows={3}
                            value={data.hero.description}
                            onChange={(e) => updateSection('hero', { ...data.hero, description: e.target.value })}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Banner Image</CardTitle>
                    <CardDescription>Update your hero background image.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-slate-100">
                        <img src={data.hero.image} alt="Banner Preview" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Upload Image</Label>
                        <div className="flex gap-2">
                            <Input
                                id="hero-image-upload"
                                type="file"
                                className="cursor-pointer"
                                onChange={(e) => handleImageUpload(e, (url) => updateSection('hero', { ...data.hero, image: url }))}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Or verify the URL below:</p>
                        <Input
                            placeholder="Image URL..."
                            value={data.hero.image}
                            onChange={(e) => updateSection('hero', { ...data.hero, image: e.target.value })}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const ServicesTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Services</h2>
                    <p className="text-slate-500">Manage the services you offer.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Add New Service Card */}
                <Card className="border-dashed border-2 flex flex-col justify-center items-center p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => document.getElementById('new-service-form').scrollIntoView({ behavior: 'smooth' })}>
                    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold">Add New Service</h3>
                    <p className="text-sm text-slate-500 mt-1">Create a new service offering</p>
                </Card>

                {data.services.map((service) => (
                    <Card key={service.id} className="flex flex-col overflow-hidden group">
                        <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                            <img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="destructive" size="icon" onClick={() => deleteItem('services', service.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <CardContent className="p-4 space-y-3 flex-1">
                            <Input
                                className="font-semibold text-lg border-transparent px-0 hover:border-slate-200 focus:border-slate-300 focus:ring-0 h-auto py-1"
                                value={service.title}
                                onChange={(e) => updateItem('services', service.id, { ...service, title: e.target.value })}
                            />
                            <Textarea
                                className="text-sm text-slate-500 border-transparent px-0 hover:border-slate-200 focus:border-slate-300 focus:ring-0 min-h-[60px] resize-none"
                                value={service.description}
                                onChange={(e) => updateItem('services', service.id, { ...service, description: e.target.value })}
                            />
                            <Input
                                className="text-xs text-slate-400 border-transparent px-0 hover:border-slate-200 focus:border-slate-300 focus:ring-0 h-8 font-mono"
                                value={service.image}
                                onChange={(e) => updateItem('services', service.id, { ...service, image: e.target.value })}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card id="new-service-form" className="bg-slate-50/50">
                <CardHeader>
                    <CardTitle>Add New Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Service Title</Label>
                            <Input
                                placeholder="e.g., Mobile App Development"
                                value={newService.title}
                                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Image (Upload or URL)</Label>
                            <Input
                                id="service-image-upload"
                                type="file"
                                className="mb-2 cursor-pointer"
                                onChange={(e) => handleImageUpload(e, (url) => setNewService({ ...newService, image: url }))}
                            />
                            <Input
                                placeholder="https://..."
                                value={newService.image}
                                onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Brief description of the service..."
                            value={newService.description}
                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => {
                        if (newService.title) {
                            addItem('services', newService);
                            setNewService({ title: '', description: '', image: '' });
                        }
                    }}>
                        <Plus className="mr-2 h-4 w-4" /> Create Service
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );

    const ProjectsTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Portfolio Projects</h2>
                    <p className="text-slate-500">Showcase your best work.</p>
                </div>
            </div>

            <div className="space-y-4">
                {data.projects.map((project) => (
                    <Card key={project.id} className="flex flex-col md:flex-row overflow-hidden group">
                        <div className="w-full md:w-48 aspect-video md:aspect-square bg-slate-100 flex-shrink-0 relative">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-6 flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label>Project Title</Label>
                                <Input
                                    value={project.title}
                                    onChange={(e) => updateItem('projects', project.id, { ...project, title: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={project.description}
                                    onChange={(e) => updateItem('projects', project.id, { ...project, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Image URL</Label>
                                    <Input
                                        className="font-mono text-xs"
                                        value={project.image}
                                        onChange={(e) => updateItem('projects', project.id, { ...project, image: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Link URL</Label>
                                    <Input
                                        className="font-mono text-xs text-blue-600"
                                        value={project.link}
                                        onChange={(e) => updateItem('projects', project.id, { ...project, link: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex items-start justify-end border-l border-slate-100 bg-slate-50/30">
                            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => deleteItem('projects', project.id)}>
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="border-dashed bg-slate-50">
                <CardHeader>
                    <CardTitle>Add New Project</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Input
                            placeholder="Project Name"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        />
                        <Input
                            placeholder="Project Link (Optional)"
                            value={newProject.link}
                            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Project Image</Label>
                            <Input
                                type="file"
                                className="cursor-pointer mb-2"
                                onChange={(e) => handleImageUpload(e, (url) => setNewProject({ ...newProject, image: url }))}
                            />
                            <Input
                                placeholder="Image URL"
                                value={newProject.image}
                                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Project Description</Label>
                            <Input
                                placeholder="Description"
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <Button className="w-fit" onClick={() => {
                        if (newProject.title) {
                            addItem('projects', newProject);
                            setNewProject({ title: '', description: '', image: '', link: '' });
                        }
                    }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

    const ContactTab = () => (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Company Details</CardTitle>
                    <CardDescription>Update your business contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Address</Label>
                        <Input
                            value={data.contact.address}
                            onChange={(e) => updateSection('contact', { ...data.contact, address: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input
                            value={data.contact.email}
                            onChange={(e) => updateSection('contact', { ...data.contact, email: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Phone</Label>
                        <Input
                            value={data.contact.phone}
                            onChange={(e) => updateSection('contact', { ...data.contact, phone: e.target.value })}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Media Links</CardTitle>
                    <CardDescription>Manage your social presence URLs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Line</Label>
                        <Input
                            value={data.contact.socials.line}
                            onChange={(e) => updateSection('contact', { ...data.contact, socials: { ...data.contact.socials, line: e.target.value } })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Facebook</Label>
                        <Input
                            value={data.contact.socials.facebook}
                            onChange={(e) => updateSection('contact', { ...data.contact, socials: { ...data.contact.socials, facebook: e.target.value } })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Instagram</Label>
                        <Input
                            value={data.contact.socials.instagram}
                            onChange={(e) => updateSection('contact', { ...data.contact, socials: { ...data.contact.socials, instagram: e.target.value } })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>TikTok</Label>
                        <Input
                            value={data.contact.socials.tiktok}
                            onChange={(e) => updateSection('contact', { ...data.contact, socials: { ...data.contact.socials, tiktok: e.target.value } })}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const SettingsTab = () => {
        const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Admin' });

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
                        <p className="text-slate-500">Manage admin users and system preferences.</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Admin Users</CardTitle>
                                <CardDescription>List of users with access to this dashboard.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {(data.admins || []).map((admin) => (
                                        <div key={admin.id} className="flex items-center justify-between p-4 rounded-lg border bg-slate-50/50">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                                    {admin.avatar || admin.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{admin.name}</p>
                                                    <p className="text-sm text-slate-500">{admin.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={cn(
                                                    "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                    admin.role === 'Super Admin'
                                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                                        : "bg-blue-50 text-blue-700 border-blue-200"
                                                )}>
                                                    {admin.role}
                                                </span>
                                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600" onClick={() => deleteItem('admins', admin.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Admin</CardTitle>
                                <CardDescription>Invite a new user to the team.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                        placeholder="John Doe"
                                        value={newAdmin.name}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={newAdmin.email}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={newAdmin.role}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Viewer">Viewer</option>
                                    </select>
                                </div>
                                <Button className="w-full" onClick={() => {
                                    if (newAdmin.name && newAdmin.email) {
                                        addItem('admins', { ...newAdmin, status: 'Active', avatar: newAdmin.name.charAt(0).toUpperCase() });
                                        setNewAdmin({ name: '', email: '', role: 'Admin' });
                                    }
                                }}>
                                    <Plus className="mr-2 h-4 w-4" /> Invite User
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === 'hero' && <HeroTab />}
            {activeTab === 'services' && <ServicesTab />}
            {activeTab === 'projects' && <ProjectsTab />}
            {activeTab === 'contact' && <ContactTab />}
            {activeTab === 'settings' && <SettingsTab />}
        </AdminLayout>
    );
};

export default Admin;
