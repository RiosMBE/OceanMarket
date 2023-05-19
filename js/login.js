// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getDatabase,onValue,ref,set,get,child,update,remove } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import{getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsoMGSaVPWVlpEDzIG0HY_FZq1dgeFqzI",
  authDomain: "login-2a9ed.firebaseapp.com",
  databaseURL: "https://login-2a9ed-default-rtdb.firebaseio.com",
  projectId: "login-2a9ed",
  storageBucket: "login-2a9ed.appspot.com",
  messagingSenderId: "502384579306",
  appId: "1:502384579306:web:54d063b9928a5c7c16bd93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Variables generales a usar
var btnIngresar = document.getElementById('btnLogin');
var btnDesconectar = document.getElementById('btnDesconectar');
var btnLimpiar = document.getElementById('btnLimpiar');


var email = "";
var contraseña = "";

const auth = getAuth();

function comprobarDatos(){
  email = document.getElementById('correo').value;
  contraseña = document.getElementById('Contraseña').value;
}

// IF que comprueba el correo y contraseña
if(btnIngresar){
  btnIngresar.addEventListener('click', (e)=>{
    console.log("HOLA")
    comprobarDatos();
    signInWithEmailAndPassword(auth, email, contraseña)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Ha iniciado sesión exitosamente")
      window.location.href = "admin.html";
    })
    .catch((error) => {
      alert("Los datos son incorrectos")
      const errorCode = error.code;
      const errorMessage = error.message;
      limpiar();
    });
  });
}

// IF que desconectará al usuario
if(btnDesconectar){
  btnDesconectar.addEventListener('click', (e)=>{
    signOut(auth).then(() => {
      alert("Desconexión exitosa")
      window.location.href = "inicio.html";
    }).catch((error) => {

    })
  })
}

function limpiar(){
  email = document.getElementById('correo');
  contraseña = document.getElementById('Contraseña');
  email.value = "";
  contraseña.value = "";  
}

btnLimpiar.addEventListener('click', limpiar)