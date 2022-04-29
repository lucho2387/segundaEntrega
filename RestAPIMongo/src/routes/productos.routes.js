const express = require('express')
const productoController = require('../controllers/productos.controller')
const router = express.Router()

router.get('/', productoController.listar)

router.get('/:id', productoController.buscar)

router.post('/', productoController.guardar)

router.put('/:id', productoController.actualizar)

router.delete('/:id', productoController.eliminar)

module.exports = router