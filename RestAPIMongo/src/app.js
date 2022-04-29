const express = require('express')
const routerProductos = require('./routes/productos.routes')
const routerCarrito = require('./routes/carrito.routes')
const morgan = require('morgan')
const conexionDB = require('./config/db.conexion')
const app = express()


// Conexion a la BD
conexionDB()

// Configuracion
app.set("nombre", "Rest-Api-Mongo")
app.set("port", process.env.PORT || 8080)

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

// Rutas
app.use(express.static("public"))
app.use("/api/productos", routerProductos)
app.use("/api/carrito", routerCarrito)

module.exports = app