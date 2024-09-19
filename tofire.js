// Your web app's Firebase configuration

console.log("tofire.js loaded-- by Puskar");

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
const database = getDatabase(app)

var id =1;

function save(patientName, currentTime, temperature) {
// Save patient data to the database
            set(ref(database, 'Patient/'+patientName), {
                patientName: patientName,
                currentTime: currentTime,
                temperature: temperature
            })
            .then(() => {
             // redirectToFile('PatientList.html');
                alert('Saved');
           
                // Call the function to redirect to PatientList.html
                
                
            })
            .catch((error) => {
                console.error("Error writing to database: ", error);
            });
//window.location.href = 'Patient List.html';
}
