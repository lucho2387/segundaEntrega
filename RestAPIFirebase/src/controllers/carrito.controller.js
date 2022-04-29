const { firestore } = require('firebase-admin')
const { productos, carrito} = require('../config/db')

exports.listar = async (req,res) => {
    try {
        const documentos = await carrito.get()
        const listaCarrito = documentos.docs.map((doc) => ({id: doc.id,...doc.data()
        }))
        res.status(200).json(listaCarrito)
    } catch (error) {
        res.status(500).json(error)
    }
} 

exports.buscar = async (req,res) => {
    try {
        const id = req.params.id
        const carritoBuscado = await carrito.doc(id).get()
        if(!carritoBuscado.exists){
            res.status(404).json({error: "No se encontro el Carrito"})
        }else {
            res.status(200).json({id: carritoBuscado.id,...carritoBuscado.data()})
        }   
    } catch (error) {
        res.status(500).json(error)
    }
} 

exports.guardar = async (req,res) => {
    try {   
        const idProducto = req.params.idProducto
        const producto = await productos.doc(idProducto).get()
        if(!producto.exists) {
            res.status(404).json({error: "No se encontro el producto"})
        }else {
            await carrito.add({
                timestamps: Date.now(),
                productos: firestore.FieldValue.arrayUnion({id:idProducto,...producto.data()})
            })
            res.status(200).json({mensaje:"El Producto se guardo correctamente en el carrito"})
        }
       
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.guardarProductos = async (req,res) => {
    try {   
        const idCarrito = req.params.idCarrito
        const idProducto = req.params.idProducto
        const product = await productos.doc(idProducto).get()
        const cart = await carrito.doc(idCarrito).get()
        if(!product.exists) {
            res.status(404).json({error: "No se encontro el producto"})
        }else {
            if(!cart.exists){
                res.status(404).json({error: "No se encontro el carrito"})
            }else {
                await carrito.doc(idCarrito).update({
                    productos: firestore.FieldValue.arrayUnion({id:idProducto,...product.data()}),
                })
                res.status(200).json({mensaje: "El producto se pudo guardar en el carrito"})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.eliminar = async (req,res) => {
    try {
        const id = req.params.id
        const eliminarCarrito = await carrito.doc(id).delete()
        res.status(200).json({mensaje: "El carrito fue eliminado correctamente"})
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.eliminarProductos = async (req,res) => {
    try {   
        const idCarrito = req.params.idCarrito
        const idProducto = req.params.idProducto
        const product = await productos.doc(idProducto).get()
        const cart = await carrito.doc(idCarrito).get()
        if(!product.exists) {
            res.status(404).json({error: "No se encontro el producto"})
        }else {
            if(!cart.exists){
                res.status(404).json({error: "No se encontro el carrito"})
            }else {
                await carrito.doc(idCarrito).update({
                    productos: firestore.FieldValue.arrayRemove({id: idProducto,...product.data()}),
                })
                res.status(200).json({mensaje: "El producto se pudo eliminar del carrito"})
            }
        } 
    } catch (error) {
        res.status(500).json(error)
    }
}
