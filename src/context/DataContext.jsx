import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial Data
const initialData = {
    hero: {
        title: "Twelve Systems",
        subtitle: "We create digital experiences that empower your business.",
        description: "บริษัท ทเวลฟ์ ซิสเต็มส์ จำกัด รับทำเว็บไซต์ พัฒนาเว็บแอปพลิเคชัน และระบบหลังบ้านครบวงจร มาตรฐานมืออาชีพ",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    },
    services: [
        {
            id: 1,
            title: "Web Design",
            description: "ออกแบบเว็บไซต์ทันสมัย รองรับทุกหน้าจอ (Responsive Design) เน้น UX/UI ที่ใช้งานง่าย",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Web Application",
            description: "พัฒนาเว็บแอปพลิเคชันตามความต้องการ เพื่อเพิ่มประสิทธิภาพในธุรกิจของคุณ",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Backend Systems",
            description: "ระบบจัดการหลังบ้าน (CMS) และ API ที่ปลอดภัยและขยายตัวได้",
            image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop"
        }
    ],
    projects: [
        {
            id: 1,
            title: "Government E-Service",
            description: "ระบบสารสนเทศหน่วยงานราชการ รองรับการใช้งานมือถือ",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            link: "#"
        },
        {
            id: 2,
            title: "E-Commerce Platform",
            description: "เว็บขายสินค้าออนไลน์ พร้อมระบบจัดการสต็อกและ CRM",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
            link: "#"
        },
        {
            id: 3,
            title: "School Management",
            description: "เว็บโรงเรียนมาตรฐาน พร้อมระบบข่าวสารและบุคลากร",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
            link: "#"
        }
    ],
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
    },
    admins: [
        { id: 1, name: "Admin User", email: "admin@twelvesystems.com", role: "Super Admin", status: "Active", avatar: "AD" },
        { id: 2, name: "Editor Staff", email: "editor@twelvesystems.com", role: "Editor", status: "Active", avatar: "ES" }
    ]
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(initialData);
    const API_URL = 'http://localhost:8000/api';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/data`);
                if (response.ok) {
                    const fetchedData = await response.json();

                    // Merge fetched data into structure to ensure all keys exist
                    // This handles cases where DB might be partially empty initially
                    const mergedData = {
                        ...initialData,
                        ...fetchedData,
                        hero: { ...initialData.hero, ...fetchedData.hero },
                        contact: { ...initialData.contact, ...fetchedData.contact },
                        services: fetchedData.services || [],
                        projects: fetchedData.projects || [],
                        admins: fetchedData.admins || []
                    };

                    setData(mergedData);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // Fallback to local storage if API fails (optional, or just stick to initial)
                const saved = localStorage.getItem('siteData');
                if (saved) setData(JSON.parse(saved));
            }
        };
        fetchData();
    }, []);

    const updateSection = async (section, newData) => {
        // Optimistic UI Update
        setData(prev => ({ ...prev, [section]: newData }));

        try {
            await fetch(`${API_URL}/site/${section}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            });
        } catch (error) {
            console.error(`Failed to update ${section}:`, error);
        }
    };

    const updateItem = async (section, itemId, updatedItem) => {
        // Optimistic UI Update
        setData(prev => ({
            ...prev,
            [section]: prev[section].map(item => item.id === itemId ? updatedItem : item)
        }));

        try {
            await fetch(`${API_URL}/${section}/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem)
            });
        } catch (error) {
            console.error(`Failed to update item in ${section}:`, error);
        }
    };

    const addItem = async (section, newItem) => {
        // For adding, we need the real ID from server to avoid sync issues.
        // So we wait for server response.
        try {
            const response = await fetch(`${API_URL}/${section}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });

            if (response.ok) {
                const createdItem = await response.json();
                setData(prev => ({
                    ...prev,
                    [section]: [...prev[section], createdItem]
                }));
            }
        } catch (error) {
            console.error(`Failed to add item to ${section}:`, error);
        }
    };

    const deleteItem = async (section, itemId) => {
        // Optimistic UI Update
        setData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== itemId)
        }));

        try {
            await fetch(`${API_URL}/${section}/${itemId}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error(`Failed to delete item from ${section}:`, error);
        }
    };

    return (
        <DataContext.Provider value={{ data, updateSection, updateItem, addItem, deleteItem }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
