// Function to read and process CSV file
function processCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');

    // Create table headers
    let tableHTML = '<tr>';
    headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr>';

    // Create table rows
    for (let i = 1; i < lines.length; i++) {
        const cells = lines[i].split(',');
        tableHTML += '<tr>';

        // Color cells with shift time randomly
        cells.forEach((cell, index) => {
            if (headers[index].toLowerCase().includes('time')) {
                const shiftColors = ['#87CEEB', '#FF6347', '#7FFF00', '#FFD700']; // Blue, Red, Green, Yellow
                const randomColor = shiftColors[Math.floor(Math.random() * shiftColors.length)];
                tableHTML += `<td style="background-color: ${randomColor};">${cell}</td>`;
            } else {
                tableHTML += `<td>${cell}</td>`;
            }
        });

        tableHTML += '</tr>';
    }

    // Update the table content
    document.getElementById('scheduleTable').innerHTML = tableHTML;
}

// Function to fetch and process CSV file
async function fetchCSV() {
    try {
        const response = await fetch('data.csv');
        const csvData = await response.text();
        processCSV(csvData);
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
}

// Call fetchCSV on page load
window.onload = fetchCSV;
