// Your web app's Firebase configuration

console.log("index.js loaded-- by Puskar");

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

const getSave = document.getElementById('save');
const getAgeCalc = document.getElementById('dob');
const getClearText = document.getElementById('resetForm');

function redirectToFile(fileName) {
  // Get current URL details
  const protocol = window.location.protocol; // e.g., 'http:'
  const hostname = window.location.hostname; // e.g., '127.0.0.1'
  const port = window.location.port; // e.g., '5500'
  
  // Construct the full URL
  //const url = `${hostname}${port ? ':' + port : ''}/${fileName}`;
  const url = `$/${fileName}`;
  // Redirect to the constructed URL
  window.location.href = url;
  alert(url);
}



var id =1;

function save() {
var patientName = document.getElementById("patientName").value;
var dob = document.getElementById("dob").value;
var age = document.getElementById("age").value;
var admissionDate = document.getElementById("admissionDate").value;
// Save patient data to the database
            set(ref(database, 'Patient/'+patientName), {
                patientName: patientName,
                dob: dob,
                age: age,
                admissionDate: admissionDate
            })
            .then(() => {
              redirectToFile('PatientList.html');
                alert('Saved');
           
                // Call the function to redirect to PatientList.html
                
                
            })
            .catch((error) => {
                console.error("Error writing to database: ", error);
            });
//window.location.href = 'Patient List.html';
}
getSave.addEventListener('click',save)

function calculateAge() {
  var dob = document.getElementById("dob").value;
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  document.getElementById("age").value = age;
}
getAgeCalc.addEventListener('change',calculateAge)
function submitForm() {
  // logic to handle form submission
  var patientName = document.getElementById("patientName").value;
  var dob = document.getElementById("dob").value;
  var age = document.getElementById("age").value;
  var admissionDate = document.getElementById("admissionDate").value;
  alert(patientName);
  // Redirect to PatientList.html
  window.location.href = 'Patient List.html';
}

function resetForm() {
  document.getElementById("patientName").value = '';
  document.getElementById("dob").value = '';
  document.getElementById("age").value = '';
  document.getElementById("admissionDate").value = ''; // Clear admission date
  alert("Data Cleard");
}
getClearText.addEventListener('click',resetForm)
function goToMainMenu() {
  // Redirect to PatientList.html
  window.location.href = 'Patient List.html';
}

// Function to set Admission Date to today
const setToday= document.getElementById('admissionDate');
function setAdmissionDateToday() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById("admissionDate").value = today;
}
setToday.addEventListener('click', setAdmissionDateToday)
