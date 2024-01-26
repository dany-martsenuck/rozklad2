// Function to fetch and parse CSV data
async function fetchData() {
    try {
        const response = await fetch('data/schedule.csv');
        const text = await response.text();
        return Papa.parse(text, { header: true, dynamicTyping: true });
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to generate random colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to add colors to cells based on shift time
function addColorsToCells() {
    const cells = document.querySelectorAll('td');

    cells.forEach(cell => {
        const cellContent = cell.textContent.trim();
        if (isShiftTime(cellContent)) {
            cell.style.backgroundColor = getRandomColor();
        }
    });
}

// Function to check if a given time represents a shift
function isShiftTime(time) {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

// Function to handle sorting
function handleSorting(columnIndex) {
    const rows = Array.from(document.querySelectorAll('tbody tr'));

    rows.sort((a, b) => {
        const aValue = a.children[columnIndex].textContent.trim();
        const bValue = b.children[columnIndex].textContent.trim();

        // Example: Sorting based on alphanumeric values
        return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
    });

    const tableBody = document.getElementById('scheduleTableBody');
    tableBody.innerHTML = '';

    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}

// Function to handle filtering
function handleFiltering(columnIndex, filterValue) {
    const rows = Array.from(document.querySelectorAll('tbody tr'));

    rows.forEach(row => {
        const cellValue = row.children[columnIndex].textContent.trim().toLowerCase();

        // Example: Filtering based on substring match
        if (cellValue.includes(filterValue.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Your additional functions and logic go here

// ... (Other functions)

// Example: Adding random colors to cells on button click
const addColorsButton = document.getElementById('addColorsButton');
addColorsButton.addEventListener('click', () => {
    addColorsToCells();
});

// Example: Adding event listeners for sorting and filtering
const sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click', () => {
    handleSorting(0); // Sort based on the first column (index 0)
});

const filterButton = document.getElementById('filterButton');
filterButton.addEventListener('click', () => {
    handleFiltering(1, 'desiredFilterValue'); // Filter based on the second column (index 1) and a specific value
});

// Fetch data and render table on page load
document.addEventListener('DOMContentLoaded', async () => {
    const scheduleData = await fetchData();
    if (scheduleData) {
        renderTable(scheduleData.data);
    }
});