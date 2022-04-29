const {productos} = require('../config/db')

exports.listar = async (req,res) => {
    try {
        const documentos = await productos.get()
        const listaProductos = documentos.docs.map((doc) => ({id: doc.id,...doc.data()
        }))
        res.status(200).json(listaProductos)
    } catch (error) {
        res.status(500).json(error)
    }
   
} 

exports.buscar = async (req,res) => {
    try {
        const id = req.params.id
        const producto = await productos.doc(id).get()
        if(!producto.exists){
            res.status(404).json({error: "No se encontro el Producto"})
        }else {
            res.status(200).json({id: producto.id,...producto.data()})
        }   
    } catch (error) {
        res.status(500).json(error)
    }
   
} 

exports.guardar = async (req,res) => {
    try {   
        const nuevoProducto = {
            timestamp: Date.now(),
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            imagen: req.body.imagen,
            precio: req.body.precio,
            stock: req.body.stock
            }
        await productos.add(nuevoProducto)
        res.status(200).json({mensaje:"El producto fue guardado correctamente"})
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.actualizar = async (req,res) => {
    try {
        const id = req.params.id
        const datos = req.body
        await productos.doc(id).update(datos)
        res.status(200).json({mensaje: "El producto fue actualizado correctamente"})
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.eliminar = async (req,res) => {
    try {
        const id = req.params.id
        const producto = await productos.doc(id).delete()
        if(!producto.exists){
            res.status(404).json({error: "No se encontro el Producto"})
        }else {
            res.status(200).json({mensaje: "El producto fue eliminado correctamente"})
        }   
    } catch (error) {
        res.status(500).json(error)
    }
}