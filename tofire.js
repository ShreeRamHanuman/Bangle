// Your web app's Firebase configuration

console.log("JS File Loaded -- tofire.js 11:9");

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

export function saveToFirebase(patientName, currentTime, temperature) {
  id= id+1;
// Save patient data to the database
            set(ref(database, patientName+'/'+id), {
                patientName: patientName,
                currentTime: currentTime,
                temperature: temperature,
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
export function readFromFirebase(patientName, id) {
    const database = getDatabase();
  const path = `${patientName}/${id}`;
    const patientRef = ref(database, patientName);

    get(patientRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                // Data exists
                const data = snapshot.val();
                console.log("Time:", data.currentTime);
                console.log("Temperature:", data.temperature);
                // Process the data (e.g., display in the UI)
            } else {
                // Data does not exist
                console.log("No data available for this patient.");
            }
        })
        .catch((error) => {
            console.error("Error reading from database: ", error);
        });
}
//readFromFirebase("Puskar"); // Replace "JohnDoe" with the actual patient name


