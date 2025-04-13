const express = require('express');
const si = require('systeminformation');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/stats', async (req, res) => {
    try {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        const gpuData = await si.graphics();

        let gpuLoad = 0;
        if (gpuData.controllers && gpuData.controllers.length > 0) {
            gpuLoad = gpuData.controllers[0].utilizationGpu || 0;
        }

        res.json({
            cpu: cpu.currentLoad.toFixed(1),
            ram: ((mem.active / mem.total) * 100).toFixed(1),
            gpu: gpuLoad.toFixed(1)
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve stats' });
    }
});

app.listen(PORT, () => {
    console.log(`NZXT Dashboard running at http://localhost:${PORT}`);
});