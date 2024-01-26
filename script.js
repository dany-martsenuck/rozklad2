// Function to read and process CSV file
function processCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');

    // Create table headers
    let tableHTML = '<thead><tr>';
    headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';

    // Create table rows
    for (let i = 1; i < lines.length; i++) {
        const cells = lines[i].split(',');
        tableHTML += '<tr>';

        // Color cells with shift time randomly
        cells.forEach((cell, index) => {
            if (headers[index].toLowerCase().includes('time')) {
                const shiftColors = ['#87CEEB', '#FF6347', '#7FFF00', '#FFD700']; // Blue, Red, Green, Yellow
                const randomColor = shiftColors[Math.floor(Math.random() * shiftColors.length)];
                tableHTML += `<td style="background-color: ${randomColor};">${cell.replace(/"/g, '')}</td>`;
            } else {
                tableHTML += `<td>${cell.replace(/"/g, '')}</td>`;
            }
        });

        tableHTML += '</tr>';
    }

    tableHTML += '</tbody>';

    // Update the table content
    document.getElementById('scheduleTable').innerHTML = tableHTML;

    // Activate table sorting
    $("#scheduleTable").tablesorter();
}

// Function to fetch and process CSV file
async function fetchCSV() {
    try {
        // Use the full path to your file
        const response = await fetch('data.csv');

        const csvData = await response.text();
        processCSV(csvData);
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
}

// Call fetchCSV on page load
window.onload = fetchCSV;
