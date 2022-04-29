const express = require('express')
const carritoController = require('../controllers/carrito.controller')
const router = express.Router()

router.get('/', carritoController.listar)
router.get('/:id', carritoController.buscar)
router.post('/:id/productos', carritoController.guardar)
router.post('/:idCarrito/productos/:idProducto', carritoController.guardarProductos)
// router.put('/:idCarrito/productos/:idProducto', carritoController.actualizarProductos)
router.delete('/:id', carritoController.eliminar)
router.delete('/:idCarrito/productos/:idProducto', carritoController.eliminarProductos)
// router.put('/:idCart/productos/:idProduct', carritoController.actualizar)
module.exports = router