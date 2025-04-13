const express = require('express');
const si = require('systeminformation');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API route to return live system stats
app.get('/api/stats', async (req, res) => {
    try {
        const [cpuLoad, mem, gpu] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.graphics()
        ]);

        const cpuUsage = cpuLoad.currentLoad.toFixed(1);
        const ramUsage = ((mem.active / mem.total) * 100).toFixed(1);
        const gpuUsage = gpu.controllers?.[0]?.utilizationGpu?.toFixed(1) || '0.0';

        res.json({
            cpu: cpuUsage,
            ram: ramUsage,
            gpu: gpuUsage
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Error retrieving system stats.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Dashboard running on http://localhost:${PORT}`);
});
