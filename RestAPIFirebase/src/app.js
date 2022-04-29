const express = require('express')
const morgan = require('morgan')
const routerProductos = require('./routes/productos.routes')
const routerCarrito = require('./routes/carrito.routes')
const path = require('path')
const app = express()


// Configuraciones
app.set("port", process.env.PORT || 8080)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Rutas
app.use("/api/productos", routerProductos)
app.use("/api/carrito", routerCarrito)
// Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app