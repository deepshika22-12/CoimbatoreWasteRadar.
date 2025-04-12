// Bin statuses and hazard levels initialization
let binStatuses = {
    bin1: 'low', bin2: 'low', bin3: 'medium', bin4: 'medium', bin5: 'low',
    bin6: 'high', bin7: 'low', bin8: 'medium', bin9: 'high', bin10: 'medium',
    bin11: 'low', bin12: 'high', bin13: 'medium', bin14: 'low', bin15: 'high'
};

let binHazards = {
    bin1: 'safe', bin2: 'safe', bin3: 'moderate', bin4: 'safe', bin5: 'safe',
    bin6: 'machine-only', bin7: 'safe', bin8: 'moderate', bin9: 'machine-only', bin10: 'safe',
    bin11: 'safe', bin12: 'machine-only', bin13: 'moderate', bin14: 'safe', bin15: 'machine-only'
};

// Function to update bin statuses and hazards
function updateBinStatuses() {
    Object.keys(binStatuses).forEach(bin => {
        let status = binStatuses[bin];
        let hazard = binHazards[bin];

        // Update bin text content
        document.getElementById(`status-${bin}`).textContent = status.charAt(0).toUpperCase() + status.slice(1);
        document.getElementById(`hazard-${bin}`).textContent = hazard.charAt(0).toUpperCase() + hazard.slice(1);

        // Update the bin colors based on status and hazard
        const binElement = document.getElementById(bin);
        binElement.classList.remove('low', 'medium', 'high', 'safe', 'moderate', 'machine-only');
        binElement.classList.add(status, hazard); // Add the new status and hazard level
    });
}

// Initialize map
const map = L.map('map').setView([11.0168, 76.9558], 13);

// Add tile layer to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add bin markers to map
const bins = [
    { id: 'bin1', name: 'RS Puram', lat: 11.0016, lon: 76.9670 },
    { id: 'bin2', name: 'Gandhipuram', lat: 11.0077, lon: 76.9774 },
    { id: 'bin3', name: 'Peelamedu', lat: 11.0392, lon: 76.9572 },
    { id: 'bin4', name: 'Kovai Pudur', lat: 11.0789, lon: 76.9523 },
    { id: 'bin5', name: 'Singanallur', lat: 11.0341, lon: 76.9519 },
    { id: 'bin6', name: 'Tidel Park', lat: 11.0184, lon: 76.9657 },
    { id: 'bin7', name: 'Ukkadam', lat: 11.0331, lon: 76.9789 },
    { id: 'bin8', name: 'Peelamedu Market', lat: 11.0275, lon: 76.9616 },
    { id: 'bin9', name: 'Saibaba Colony', lat: 11.0102, lon: 76.9553 },
    { id: 'bin10', name: 'Race Course', lat: 10.9979, lon: 76.9648 },
    { id: 'bin11', name: 'Pappanaickenpalayam', lat: 11.0387, lon: 76.9709 },
    { id: 'bin12', name: 'Tatabad', lat: 11.0120, lon: 76.9732 },
    { id: 'bin13', name: 'Tatabad (2)', lat: 11.0214, lon: 76.9737 },
    { id: 'bin14', name: 'Peelamedu (2)', lat: 11.0418, lon: 76.9527 },
    { id: 'bin15', name: 'Gandhipuram (2)', lat: 11.0042, lon: 76.9736 }
];

// Add markers to map
bins.forEach(bin => {
    const binMarker = L.marker([bin.lat, bin.lon]).addTo(map);
    binMarker.bindPopup(`<b>${bin.name}</b><br>Status: ${binStatuses[bin.id]}<br>Hazard: ${binHazards[bin.id]}`);
});

// Call the function to update bin statuses on page load
updateBinStatuses();

// Add event listener for "Update All Bin Statuses"
document.getElementById("update-btn").addEventListener("click", function () {
    // Simulate status and hazard change
    Object.keys(binStatuses).forEach(bin => {
        binStatuses[bin] = (binStatuses[bin] === 'low') ? 'medium' :
                           (binStatuses[bin] === 'medium') ? 'high' : 'low';

        binHazards[bin] = (binHazards[bin] === 'safe') ? 'moderate' :
                          (binHazards[bin] === 'moderate') ? 'machine-only' : 'safe';
    });

    // Update bin statuses after changes
    updateBinStatuses();
});
