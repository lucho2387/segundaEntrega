const Producto = require('../models/Producto')
const Carrito = require('../models/Carrito')
// const Contenedor = require('../DAO/contenedor')

exports.listar = async (req,res) => {
    try {
        const carrito = await Carrito.find()
        res.status(200).json(carrito)
    } catch (error) {
        res.status(500).json(error)
    }
   
} 

exports.buscar = async (req,res) => {
    try {
        const id = req.params.id
        const carrito = await Carrito.findById(id)
        if(!carrito){
            res.status(404).json({error: "No se encontro el carrito"})
        }else {
            res.status(200).json(carrito)
        }
    } catch (error) {
        res.status(500).json(error)
    }
   
}

exports.guardar = async (req,res) => {
    try {   
        // const {nombre,precio,imagen} = req.body
        const id = req.params.id
        const productos = await Producto.findById(id)
        if(productos){
            const nuevoCarrito = new Carrito ({productos})
            await nuevoCarrito.save() 
            res.status(200).json({mensaje: "El producto fue guardado en el carrito", id: nuevoCarrito._id}) 
        }else {
            res.status(400).json({error: "No se encontro el producto"})
        }
       
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.guardarProductos = async (req,res) => {
    try {   
        const idCarrito = req.params.idCarrito
        const idProducto = req.params.idProducto
        const productos = await Producto.findById(idProducto)
        const carrito = await Carrito.findById(idCarrito)
        if(!productos) {
            res.status(404).json({error: "No se encontro el producto"})
        }else {
            if(!carrito){
                res.status(404).json({error: "No se encontro el carrito"})
            }else {
                await Carrito.updateOne({_id: idCarrito}, {$push: {productos: productos}})
                res.status(200).json({mensaje: "El producto se pudo guardar en el carrito"})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// VER
// exports.actualizarProductos = async (req,res) => {
//     try {   
//         const idCarrito = req.params.idCarrito
//         const idProducto = req.params.idProducto
//         const productos = await Producto.findById(idProducto)
//         const carrito = await Carrito.findById(idCarrito)
//         const {nombre, precio, imagen} = req.body
//         if(!productos) {
//             res.status(404).json({error: "No se encontro el producto"})
//         }else {
//             if(!carrito){
//                 res.status(404).json({error: "No se encontro el carrito"})
//             }else {
//                 // await Carrito.findByIdAndUpdate({$and: [{_id: idCarrito},{_id: idProducto}]},{nombre: nombre, precio:precio, imagen: imagen})
//                 await Carrito.findByIdAndUpdate({_id: idCarrito},{nombre: nombre, precio:precio, imagen: imagen})
//                 res.status(200).json({mensaje: "El producto se pudo actualizar"})
//             }
//         }
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

exports.eliminar = async (req,res) => {
    try {
        const id = req.params.id
        const eliminarCarrito = await Carrito.findByIdAndDelete(id)
        if(!eliminarCarrito){
            res.status(404).json({error: "No se encontro el carrito"})
        }else {
            res.status(200).json({mensaje: "El carrito fue eliminado correctamente"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
}

exports.eliminarProductos = async (req,res) => {
    try {   
        const idCarrito = req.params.idCarrito
        const idProducto = req.params.idProducto
        const productos = await Producto.findById(idProducto)
        const carrito = await Carrito.findById(idCarrito)
        if(!productos) {
            res.status(404).json({error: "No se encontro el producto"})
        }else {
            if(!carrito){
                res.status(404).json({error: "No se encontro el carrito"})
            }else {
                await Carrito.updateOne({_id: idCarrito}, {$pull: {productos: productos}})
                res.status(200).json({mensaje: "El producto se pudo eliminar del carrito"})
            }
        } 
    } catch (error) {
        res.status(500).json(error)
    }
}