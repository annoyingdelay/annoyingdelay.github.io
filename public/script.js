async function fetchStats() {
    try {
        const res = await fetch('/api/stats');
        const data = await res.json();

        document.getElementById('cpu').textContent = `${data.cpu}%`;
        document.getElementById('ram').textContent = `${data.ram}%`;
        document.getElementById('gpu').textContent = `${data.gpu}%`;
    } catch (err) {
        console.error('Error fetching stats:', err);
    }
}

setInterval(fetchStats, 2000); // Update every 2s
fetchStats(); // Initial call