// Puskar K C
// This file uploads & Download data to Firbase realtime database - BangleJs1

console.log("JS File Loaded -- FIREBASE DATABASE JS FILE");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, set, get, child, remove, update } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
  
// Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCPDcL-frGybKKl5ueoqo8uVPTqC0xrXHY",
    authDomain: "banglejs1.firebaseapp.com",
    projectId: "banglejs1",
    storageBucket: "banglejs1.appspot.com",
    messagingSenderId: "878784356528",
    appId: "1:878784356528:web:ddc37c286b0c1bc5b49b75",
    measurementId: "G-MW87BHX89S"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set database variable
const database = getDatabase(app);

var id =0;

export function saveToFirebase(patientName, currentTime, 
  currentTemperature, currentBattery, currentAccel1, currentAccel2, currentAccel3, currentBPM,
  currentConfidence, currentStep, currentLatitde, currentLongititude ) 
  {
  id= currentTime;
// Save patient data to the database
return new Promise((resolve, reject) => {
            set(ref(database, patientName+'/'+id), {
                patientName: patientName,
                currentTime: currentTime,
                temperature: currentTemperature,
                battery: currentBattery,
                Accel1: currentAccel1,
                Accel2: currentAccel2,
                Accel3: currentAccel3,
                BPM: currentBPM,
                Confidence: currentConfidence,
                Step: currentStep,
                Latitude: currentLatitde,
                Longitude: currentLongititude,

                id: id
            })
            .then(() => {
            // redirectToFile('PatientList.html');
            //  alert('Saved');
            // Call the function to redirect to PatientList.html - Not implemented in this build   
            console.log("Data saved successfully.");
            resolve(id); // Pass the id to the next step
            })
            .catch((error) => {
                console.error("Error writing to database: ", error);
            });
          });
            //window.location.href = 'Patient List.html';
    }

       
// Function to read data based on patient name
var patientRef="";
export async function readFromFirebase(patientName, id) {
  try{  
  const database = getDatabase();
  const path = `${patientName}/${id}`;
     patientRef = ref(database, path);
const snapshot = await get(patientRef);
    
            if (snapshot.exists()) {
                // Data exists
                const data = snapshot.val();
                console.log("Patient Datajs:", data.patientName);
                console.log("Time:js", data.currentTime);
                console.log("Longi:js", data.Latitude,);
              return {
                patientNameFB: data.patientName,
                currentTimeFB : data.currentTime,
                temperatureFB: data.temperature,
                batteryFB: data.battery,
                Accel1FB: data.Accel1,
                Accel2FB: data.Accel2,
                Accel3FB: data.Accel3,
                BPMFB: data.BPM,
                ConfidenceFB: data.Confidence,
                StepFB: data.Step,
                LatitudeFB: data.Latitude,
                LongitudeFB: data.Longitude,
                idFB: data.id
            };
              
            } else {
                console.log("No data available for this patient.");
              return null;
            }     
  }
        catch(error) {
            console.error("Error reading from database: ", error);
        }
}
/// Function to update chart when new child is added
/// Why i am writing this function , already data is download from above function.

export function listenForFirebaseUpdate(chartInstance) {
  if(patientRef){
  
  onChildAdded(patientRef, (snapshot) => {
    const newData = snapshot.val();
    
    // Assuming newData contains "timestamp" and "value"
    const newLabel = newData.currentTime; // e.g., '2024-10-17 10:30:00'
    const newValue = newData.BPM; // e.g., heart rate in bpm
    
    // Add new data to chart
    chartInstance.data.labels.push(newLabel);
    chartInstance.data.datasets[0].data.push(newValue);
    
    // Update the chart
    chartInstance.update();
  });
}else{
  console.log("Database on patientRef varaible is not coming");
}
}


