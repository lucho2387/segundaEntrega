const admin = require('firebase-admin')

var serviceAccount = require("../../key/apifirebase-7a796-firebase-adminsdk-rq1pa-d8ac63339d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://apifirebase-7a796.firebaseio.com/'
})

// Conexion a la BD
const db = admin.firestore();
const productos = db.collection('productos')
const carrito = db.collection('carrito')
console.log('Base de Datos Conectada')

module.exports = {productos,carrito}