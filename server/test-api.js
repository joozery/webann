
// If node is older, I might need to use http/https module or install node-fetch.
// Let's assume Node 18+ features availability or just use simple http.
// Actually, to be safe, I'll use standard http module or check if fetch is available.
// The user is on Mac, likely has recent Node.
// Let's try to use a simple script that uses native fetch (Node 18+).

const BASE_URL = 'http://localhost:8000/api';

async function runTests() {
    console.log('Starting API Tests...\n');

    try {
        // 1. GET ALL DATA
        console.log('1. Testing GET /api/data');
        const getDataRes = await fetch(`${BASE_URL}/data`);
        const data = await getDataRes.json();
        if (getDataRes.ok) console.log('✅ GET /api/data passed');
        else console.error('❌ GET /api/data failed', data);

        // 2. UDPATE HERO
        console.log('\n2. Testing PUT /api/site/hero');
        const newHero = { ...data.hero, title: "Twelve Systems Tested" };
        const updateHeroRes = await fetch(`${BASE_URL}/site/hero`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newHero)
        });
        const updatedHero = await updateHeroRes.json();
        if (updateHeroRes.ok && updatedHero.hero.title === "Twelve Systems Tested") console.log('✅ PUT /api/site/hero passed');
        else console.error('❌ PUT /api/site/hero failed', updatedHero);

        // Revert Hero
        await fetch(`${BASE_URL}/site/hero`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data.hero)
        });

        // 3. CREATE SERVICE
        console.log('\n3. Testing POST /api/services');
        const newService = { title: "Test Service", description: "Test Desc", image: "https://via.placeholder.com/150" };
        const createServiceRes = await fetch(`${BASE_URL}/services`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newService)
        });
        const createdService = await createServiceRes.json();
        if (createServiceRes.ok && createdService.title === "Test Service") console.log('✅ POST /api/services passed');
        else console.error('❌ POST /api/services failed', createdService);

        // 4. UPDATE SERVICE
        console.log('\n4. Testing PUT /api/services/:id');
        const updateServiceRes = await fetch(`${BASE_URL}/services/${createdService.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...createdService, title: "Updated Service" })
        });
        const updatedService = await updateServiceRes.json();
        if (updateServiceRes.ok && updatedService.title === "Updated Service") console.log('✅ PUT /api/services/:id passed');
        else console.error('❌ PUT /api/services/:id failed', updatedService);

        // 5. DELETE SERVICE
        console.log('\n5. Testing DELETE /api/services/:id');
        const deleteServiceRes = await fetch(`${BASE_URL}/services/${createdService.id}`, { method: 'DELETE' });
        if (deleteServiceRes.ok) console.log('✅ DELETE /api/services/:id passed');
        else console.error('❌ DELETE /api/services/:id failed');


        // 6. CREATE PROJECT
        console.log('\n6. Testing POST /api/projects');
        const newProject = { title: "Test Project", description: "Test Desc", image: "https://via.placeholder.com/150", link: "#" };
        const createProjectRes = await fetch(`${BASE_URL}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        });
        const createdProject = await createProjectRes.json();
        if (createProjectRes.ok && createdProject.title === "Test Project") console.log('✅ POST /api/projects passed');
        else console.error('❌ POST /api/projects failed', createdProject);

        // 7. DELETE PROJECT
        console.log('\n7. Testing DELETE /api/projects/:id');
        const deleteProjectRes = await fetch(`${BASE_URL}/projects/${createdProject.id}`, { method: 'DELETE' });
        if (deleteProjectRes.ok) console.log('✅ DELETE /api/projects/:id passed');
        else console.error('❌ DELETE /api/projects/:id failed');

        // 8. CREATE ADMIN
        console.log('\n8. Testing POST /api/admins');
        const newAdmin = { name: "Test Admin", email: "test@test.com", role: "Viewer", avatar: "T" };
        const createAdminRes = await fetch(`${BASE_URL}/admins`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAdmin)
        });
        const createdAdmin = await createAdminRes.json();
        if (createAdminRes.ok && createdAdmin.name === "Test Admin") console.log('✅ POST /api/admins passed');
        else console.error('❌ POST /api/admins failed', createdAdmin);

        // 9. DELETE ADMIN
        console.log('\n9. Testing DELETE /api/admins/:id');
        const deleteAdminRes = await fetch(`${BASE_URL}/admins/${createdAdmin.id}`, { method: 'DELETE' });
        if (deleteAdminRes.ok) console.log('✅ DELETE /api/admins/:id passed');
        else console.error('❌ DELETE /api/admins/:id failed');

        console.log('\n🎉 All Logic Tests Completed!');

    } catch (error) {
        console.error('Test script failed:', error);
    }
}

runTests();
