//// Script for HTML design Only for dashboard
/// Puskar KC
/// 14 Sept 2024

console.log("Design file loaded");


function updateName() {
    const nameInput = document.getElementById('user-name').value;
    const nameDisplay = document.getElementById('watch-name');
    nameDisplay.textContent = nameInput.trim() !== "" ? nameInput + "'s Bangle Readings" : "Bangle.js Dashboard";
}

const dateTimeElem = document.getElementById("date-time");
setInterval(() => {
    const now = new Date();
    dateTimeElem.textContent = `Date: ${now.toLocaleDateString()} Time: ${now.toLocaleTimeString()}`;
}, 1000);

// Initial time labels
var heartRateData="";
function updateCharts(idFB, BPMFB, StepFB, temperatureFB, Accel1FB,Accel2FB,Accel3FB) {
    // Heart Rate Data
    console.log("ID from Designscript update chart function", idFB);
    console.log("BPMFB from Designscript update chart function", BPMFB);
    console.log("StepFB from Designscript update chart function", StepFB);
    console.log("temperatureFB from Designscript update chart function", temperatureFB);
    console.log("Accel1FB from Designscript update chart function", Accel1FB + Accel2FB + Accel3FB);

 heartRateData = {
    labels: idFB, // get time labels from firebase
    datasets: [{
        label: 'Heart Rate (bpm)',
        data: BPMFB,// get heart rate from firebase
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
    }]
};

const stepsData = {
    labels: idFB,
    datasets: [{
        label: 'Steps',
        data: [1000, 2000, 3000, 4000, 5000],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
    }]
};

const temperatureData = {
    labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM'],
    datasets: [{
        label: 'Temperature (°C)',
        data: [36.3, 36.4, 36.5, 36.7, 36.8],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
    }]
};

const accelerationData = {
    labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM'],
    datasets: [{
        label: 'Acceleration (m/s²)',
        data: [2.1, 2.2, 2.3, 2.4, 2.5],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }]
};
}
function displayChart(chartId, data, label) {
    const chartContainer = document.querySelector(`#${chartId.replace('-chart', '-chart-container')}`);
    const chartCanvas = document.getElementById(chartId);
    chartContainer.style.display = 'flex'; // Show chart container

    const myChart = new Chart(chartCanvas, {
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
    event.stopPropagation(); // Prevent the click event from bubbling up
    const chartContainer = event.currentTarget;
    chartContainer.style.display = 'none'; // Hide chart container
}
