import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getDatabase,onValue,ref,set,get,child,update,remove } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getStorage, ref as refS, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCsoMGSaVPWVlpEDzIG0HY_FZq1dgeFqzI",
    authDomain: "login-2a9ed.firebaseapp.com",
    projectId: "login-2a9ed",
    databaseURL: "https://login-2a9ed-default-rtdb.firebaseio.com",
    storageBucket: "login-2a9ed.appspot.com",
    messagingSenderId: "502384579306",
    appId: "1:502384579306:web:54d063b9928a5c7c16bd93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

//var btnMostrarImagen = document.getElementById('producto1');
//var btnMostrarImagen2 = document.getElementById('producto2');
//var archivo = document.getElementById('archivo');
//var Url = document.getElementById('url');
//var imgNombre = document.getElementById('imgNombre');


var btnInsertar = document.getElementById('btnInsertar');
var btnBuscar = document.getElementById('btnBuscar');
var btnActualizar = document.getElementById('btnActualizar');
var btnBorrar = document.getElementById('btnBorrar');
var btnTodos = document.getElementById('btnTodos');
var btnLimpiar = document.getElementById('btnLimpiar');

var lista = document.getElementById('lista'); // Lugar donde se mostrarán los productos en la ventana admin
var productosWeb = document.getElementById('productosAcomodados'); // Lugar donde se verán los productos en el sitio web



var archivo = document.getElementById('archivo');



var Id = "";
var nombreProducto = "";
var descripcion = "";
var precio = "";
var imgNombre = "";
var Url = "";

var estado = "";

if(window.location.href == "https://practicas84.000webhostapp.com/html/productos.html"){
    window.onload = mostrarProductos();
}






function mostrarProductos(){


  const db = getDatabase();
  const dbRef = ref(db, 'productos');


  onValue(dbRef, (snapshot) =>{
      if(lista){
        lista.innerHTML = "";
        
      }
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        
        if(lista){
          
            
            lista.innerHTML =  lista.innerHTML + "<div class='campo2'> <br/> <b>" + childData.nombreProducto + "</b> <br/>" + "<img src=' " + childData.Url + "'></img>" + "<p>"+ "Código:" + childKey + "<br/> "  +     "Descripción: " + childData.descripcion + " <br/> " + "Precio: " + childData.precio + "<br/>" + "Estado: " + childData.estado + " <p/> " + /*"Nombre de la imagen: " + childData.imgNombre + "<br/>" + "Url: " + childData.Url */" <br/><button>COMPRAR</button>" + "</div>";
          
                   
        }else if(childData.estado == 0){
        //productosWeb.innerHTML = productosWeb.innerHTML + "<div class='mostrarProductos'> " + "<img src = '" + childData.url + "'> <h1>" + childData.nombreProducto + "</h1><p>" + childData.descripcion + "</p><br><br> <p> Precio: $"  + childData.precio+ " MXN</p>" + "<button>COMPRAR</button>";
        //productosWeb.innerHTML = "<div style='font-family: arial; font-size: 10px'; display:inline; class='campo'> " + productosWeb.innerHTML + "<br/>"+ "Código:" + childKey + "<br/> " + "Producto: " + childData.nombreProducto + "<br/>"+ "Descripción: " + childData.descripcion + "<br/>" + "Precio: " + childData.precio + "<br/>" + "Nombre de la imagen: " + childData.imgNombre + "<br/>" + "<img class='imagenJuegos' src=' " + childData.Url + "'></img>" + "<br/> </div>";
       // productosWeb.innerHTML =  productosWeb.innerHTML + "<div class='campo2'> <br/>" + childData.nombreProducto + "<br/>" + "<img src=' " + childData.Url + "'></img>" + "<p>"+ "Código:" + childKey + "<br/> "  +     "Descripción: " + childData.descripcion + " <br/> " + "Precio: " + childData.precio + "<br/>" + "Estado: " + childData.estado + " <p/> " + /*"Nombre de la imagen: " + childData.imgNombre + "<br/>" + "Url: " + childData.Url */" <br/><button>COMPRAR</button>" + "</div>";
            productosWeb.innerHTML =  productosWeb.innerHTML + "<div class='campo2'> <br/> <b>" + childData.nombreProducto + "</b> <br/>" + "<img src=' " + childData.Url + "'></img>" + "<p>"+ "Código:" + childKey + "<br/> "  +     "Descripción: " + childData.descripcion + " <br/> " + "Precio: " + childData.precio + "<br/>" + "Estado: " + childData.estado + " <p/> " + /*"Nombre de la imagen: " + childData.imgNombre + "<br/>" + "Url: " + childData.Url */" <br/><button>COMPRAR</button>" + "</div>";

        }



      });
  },{
    onlyOnce: true
  });
}




function leer(){
    Id =document.getElementById('codigo').value;
    nombreProducto = document.getElementById('nombreProducto').value;
    descripcion = document.getElementById('descripcion').value;
    precio = document.getElementById('precio').value;
    imgNombre = document.getElementById('imgNombre').value;
    Url = document.getElementById('url').value;

    estado = document.getElementById('estado').value;
    document.getElementById('imagen1').src = Url;
}




function insertarProductos(){
    
  
  
    setTimeout(leer, 3000);
    setTimeout(()=>{
      set(ref(db, 'productos/' + Id), {
        nombreProducto: nombreProducto,
        descripcion: descripcion,
        precio: precio,
        imgNombre: imgNombre,
        Url: Url,

        estado: estado

      }).then((response)=>{
        alert("Producto ingresado con éxito");
        limpiar();
        

      }).catch((error)=>{
        alert("Ha ocurrido un error" + error);
      });
    }, 5000);

    subirImagen();
}




function buscador(){
    document.getElementById('codigo').value = Id;
    document.getElementById('nombreProducto').value = nombreProducto;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('precio').value = precio;
    document.getElementById('imgNombre').value = imgNombre;
    document.getElementById('url').value =Url;
    document.getElementById('estado').value = estado;
    document.getElementById('imagen1').src = Url;
}

function enseñarDatos(){
    leer();
    const dbref = ref(db);

    get(child(dbref, 'productos/' + Id)).then((snapshot)=>{
        if(snapshot.exists()){
            nombreProducto = snapshot.val().nombreProducto;
            descripcion = snapshot.val().descripcion;
            precio = snapshot.val().precio;
            imgNombre = snapshot.val().imgNombre;
            Url = snapshot.val().Url;
            estado = snapshot.val().estado;
            subirImagen2();
            buscador();
        }else{
            alert("Error, el producto NO existe");
        }
    }).catch((error)=>{
        alert("Ha surgido un error " + error);
    });
}

var file = "";
var name = "";

function cargarImagen(){
    file = event.target.files[0];
    name = event.target.files[0].name;
    document.getElementById('imgNombre').value = name;
}

function subirImagen(){
    const storage = getStorage();
    const storageRef = refS(storage, 'imagenes/' + name);
    uploadBytes(storageRef, file).then((snapshot) => {
        //document.getElementById('imgNombre').value = name;
        //alert('Se cargó el archivo')
    });
    descargarImagenes();
}

function subirImagen2(){
    const storage = getStorage();
    const storageRef = refS(storage, 'imagenes/' + name);
    uploadBytes(storageRef, file)
}

function descargarImagenes(){

    //archivo = document.getElementById('imgNombre').value;
  
    // Create a reference to the file we want to download
    const storage = getStorage();
    const starsRef = refS(storage, 'imagenes/' + name);
  
    // Get the download URL
    getDownloadURL(starsRef)
    .then((url) => {
        document.getElementById('url').value = url;
        document.getElementById('imagen1').src = url;
    })

    .catch((error) => {  
        switch (error.code) {
            case 'storage/object-not-found':
            console.log("No existe el archivo");
            break;
            case 'storage/unauthorized':
            console.log("No tiene permisos");
            break;
            case 'storage/canceled':
            console.log("Se canceló o no hay internet")
            break;
            // ...
            case 'storage/unknown':
            console.log("Sucedió algo inesperado");
            break;
        }
    });
}

function actualizar(){
    leer();
    setTimeout(leer(), 3000)
    setTimeout(()=>{
        update(ref(db,'productos/' + Id),{
            nombreProducto: nombreProducto,
            descripcion: descripcion,
            precio: precio,
            imgNombre: imgNombre,
            Url: Url,
            estado: estado
        }).then(()=>{
            alert("Se ha actualizado el registro con éxito");
        }).catch(()=>{
            alert("Ha surgido un error " + error);
        })
    })

    subirImagen();
    mostrarProductos();
}

function limpiar(){
    Id = "";
    nombreProducto = "";
    descripcion = "";
    precio = "";
    imgNombre = "";
    Url = "";
    estado = "";
    lista.innerHTML = "";
    buscador();
    window.onload
}

if(archivo){
    archivo.addEventListener('change', cargarImagen);
}

if(btnInsertar){
    btnInsertar.addEventListener('click', insertarProductos);
}

if(btnBuscar){
    btnBuscar.addEventListener('click', enseñarDatos);
}

if(btnLimpiar){
    btnLimpiar.addEventListener('click', limpiar);
}

if(btnActualizar){
    btnActualizar.addEventListener('click', actualizar) 
}

if(btnTodos){
    btnTodos.addEventListener('click', mostrarProductos);
}
