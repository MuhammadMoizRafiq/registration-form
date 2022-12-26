// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPec2eT_fbrRC88w38Q-clTW-MIirepQU",
  authDomain: "registration-form-3c0eb.firebaseapp.com",
  databaseURL: "https://registration-form-3c0eb-default-rtdb.firebaseio.com",
  projectId: "registration-form-3c0eb",
  storageBucket: "registration-form-3c0eb.appspot.com",
  messagingSenderId: "1524565611",
  appId: "1:1524565611:web:02f07ccb6341ed3c4cd32e",
  measurementId: "G-E0W0W486MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)


var txtUsername = document.getElementById('txtUsername');
var txtEmail = document.getElementById('txtEmail');
var btnRegister = document.getElementById('btnRegister');
var btnLogin = document.getElementById('btnLogin');
var registrationTable = document.getElementById('registrationTable');
var loginTable = document.getElementById('loginTable');
var info = document.getElementById('info');

//Firebase Config
var firebaseRef = firebase.database().ref();

//Email Validation
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


//Register Button Click Event
btnRegister.addEventListener('click', function(e){
  e.preventDefault();
  if(txtUsername.value == '' || txtEmail.value == '' || txtPassword.value == ''){
    info.className = '';
    info.innerHTML = 'Please fill the form!';
    info.style.color = '#e74c3c';
    info.style.display = 'block';
    info.className += 'animated shake';
  }
  else{
      if(txtUsername.value.length < 3){
        info.className = '';
        info.innerHTML = 'Username must contain at least 3 character!';
        info.style.color = '#e74c3c';
        info.style.display = 'block';
        info.className += 'animated shake';
      }else{
        if(!validateEmail(txtEmail.value)){
          info.className = '';
          info.innerHTML = 'Invalid Email!';
          info.style.color = '#e74c3c';
          info.style.display = 'block';
          info.className += 'animated shake';
        }else{
          if(txtPassword.value.length < 6){
            info.className = '';
            info.innerHTML = 'Password must contain at least 6 character!';
            info.style.color = '#e74c3c';
            info.style.display = 'block';            
            info.className += 'animated shake';
          }
          else{
            info.innerHTML = 'You"ve registered successfully!';
            info.className += 'animated bounce';
            info.style.color = '#2ecc71';
            info.style.display = 'block';
            firebaseRef.child('Users').child('Username').push(txtUsername.value);
            firebaseRef.child('Users').child('Email').push(txtEmail.value);
            firebaseRef.child('Users').child('Password').push(txtPassword.value);         
            txtUsername.value = '';
            txtEmail.value = '';
            txtPassword.value = '';
            txtUsername.focus();
          }
        }
      }
  
  }
  
});