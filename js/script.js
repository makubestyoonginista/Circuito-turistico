const mysql = require('mysql')
const express = require('express');
const app = express();
const fs = require('fs');

//Configurar conexion:
const conexion = mysql.createConnection({
    host:'localhost',
    port:'3306', //3307
    user:'root',
    password: '',
    database:'fullstack'
})

conexion.connect( (err) =>{
    if(err) throw err;
    console.log("Conexion exitosa")
})

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    //CONTROLAR QUE ENCUENTRE EL INDEX
    res.sendFile(__dirname + '/form.html');
});

app.post('/submit', (req, res) => {
    //NAME Y EMAIL SON LOS ID DE HTML
  const nombre = req.body.nombre;
  const email = req.body.email;
  const mensaje = req.body.mensaje;
    //CAMBIAR EL NMBRE DE LA TABLA
  const insertar = "INSERT INTO formulario (nombre, email, mensaje) VALUES ('"+nombre+"','"+email+"','"+mensaje+"')"

  conexion.query(insertar, (err, rows) => {
    if (err) throw err;
})
});

app.listen(1500, () => {
  console.log('Servidor escuchando en el puerto 1500');
});


function cambiarTitulo() {
  var titulo = document.getElementById("titulo");

  if (titulo.innerHTML === "Turismo en San Francisco") {
    titulo.innerHTML = "Bienvenidx, esperamos que lo disfrutes";
  } else {
    titulo.innerHTML = "Turismo en San Francisco";
  }
}
