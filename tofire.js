// Your web app's Firebase configuration

console.log("JS File Loaded -- tofire.js 3:20");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, get, child, remove, update } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDE6Q7MLZi7vcXdNGE_BcF6m3CoZt3FUd0",
    authDomain: "newcrud-ba5a9.firebaseapp.com",
    projectId: "newcrud-ba5a9",
    storageBucket: "newcrud-ba5a9.appspot.com",
    messagingSenderId: "980767779596",
    appId: "1:980767779596:web:f915afab7ea87c540a3729"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set database variable
const database = getDatabase(app);

var id =1;

export function saveToFirebase(patientName, currentTime, 
  currentTemperature, currentBattery, currentAccel1, currentAccel2, currentAccel3, currentBPM,
  currentConfidence, currentStep, currentLatitde, currentLongititude ) {
  id= id+1;
// Save patient data to the database
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
           
                // Call the function to redirect to PatientList.html
                
                
            })
            .catch((error) => {
                console.error("Error writing to database: ", error);
            });
//window.location.href = 'Patient List.html';
}

       
// Function to read data based on patient name
export async function readFromFirebase(patientName, id) {
  try{  
  const database = getDatabase();
  const path = `${patientName}/${id}`;
    const patientRef = ref(database, path);
const snapshot = await get(patientRef);
    
            if (snapshot.exists()) {
                // Data exists
                const data = snapshot.val();
                console.log("Patient Datajs:", data.patientName);
                console.log("Time:js", data.currentTime);
                console.log("Longi:js", data.Latitude,);
              return {
                patientNameFB : data.patientName,
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
//readFromFirebase("Puskar"); // Replace "JohnDoe" with the actual patient name


