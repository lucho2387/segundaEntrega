const express = require('express')
const carritoController = require('../controllers/carrito.controller')
const router = express.Router()

router.get('/', carritoController.listar)

router.get('/:id', carritoController.buscar)

router.post('/:idProducto/productos', carritoController.guardar)

router.put('/:idCarrito/productos/:idProducto', carritoController.guardarProductos)

router.delete('/:id', carritoController.eliminar)

router.delete('/:idCarrito/productos/:idProducto', carritoController.eliminarProductos)

module.exports = router