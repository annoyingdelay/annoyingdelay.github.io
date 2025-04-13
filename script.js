async function fetchStats() {
    try {
        const res = await fetch('/api/stats');
        const data = await res.json();

        document.getElementById('cpu').textContent = `${data.cpu}%`;
        document.getElementById('ram').textContent = `${data.ram}%`;
        document.getElementById('gpu').textContent = `${data.gpu}%`;
    } catch (err) {
        console.error('Failed to fetch stats:', err);
    }
}

// Refresh every 2 seconds
setInterval(fetchStats, 2000);
fetchStats(); // Initial fetch
