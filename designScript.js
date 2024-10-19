// Dashboard Script
// Puskar KC
// 14 Sept 2024

console.log("Design file loaded");

function updateName() {
    const nameInput = document.getElementById('user-name').value;
    const nameDisplay = document.getElementById('watch-name');
    nameDisplay.textContent = nameInput.trim() !== "" ? `${nameInput}'s Bangle Readings` : "Bangle.js Dashboard";
}

const dateTimeElem = document.getElementById("date-time");
setInterval(() => {
    const now = new Date();
    dateTimeElem.textContent = `Date: ${now.toLocaleDateString()} Time: ${now.toLocaleTimeString()}`;
}, 1000);

// Initialize data arrays
let idFB1 = [];
let BPMFB1 = [];
let heartRateData = {};
let stepsData = {};
let temperatureData = {};
let accelerationData = {};

function updateCharts(currentTimeFB, BPMFB, StepFB, temperatureFB, Accel1FB, Accel2FB, Accel3FB) {
    idFB1.push(currentTimeFB);
    BPMFB1.push(BPMFB);

    heartRateData = createChartData(idFB1, BPMFB1, 'Heart Rate (bpm)', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 0.2)');
    stepsData = createChartData(idFB1, StepFB, 'Steps', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 0.2)');
    temperatureData = createChartData(idFB1, temperatureFB, 'Temperature (°C)', 'rgba(255, 206, 86, 1)', 'rgba(255, 206, 86, 0.2)');
    accelerationData = createChartData(idFB1, Accel1FB, 'Acceleration (m/s²)', 'rgba(75, 192, 192, 1)', 'rgba(75, 192, 192, 0.2)');
}

function createChartData(labels, data, label, borderColor, backgroundColor) {
    return {
        labels: labels,
        datasets: [{
            label: label,
            data: data,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
        }]
    };
}


let myChart = {}; // Store chart instances
function displayChart(chartId, data, label) {
    const chartContainer = document.querySelector(`#${chartId.replace('-chart', '-chart-container')}`);
    const chartCanvas = document.getElementById(chartId);
    chartContainer.style.display = 'flex';

    if (myChart[chartId]) {
        myChart[chartId].destroy(); // Destroy the existing chart instance
    }

    myChart[chartId] = new Chart(chartCanvas, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: label
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
}


function hideChart(event) {
    event.stopPropagation();
    const chartContainer = event.currentTarget;
    chartContainer.style.display = 'none';
}
