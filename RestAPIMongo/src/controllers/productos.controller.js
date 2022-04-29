const Producto = require('../models/Producto')

exports.listar = async (req,res) => {
    try {
        const productos = await Producto.find()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json(error)
    }
   
} 

exports.buscar = async (req,res) => {
    try {
        const id = req.params.id
        const productos = await Producto.findById(id)
        if(!productos){
            res.status(404).json({error: "No se encontro el producto"})
        }else {
            res.status(200).json(productos)
        }
    } catch (error) {
        res.status(500).json(error)
    }
   
} 

exports.guardar = async (req,res) => {
    try {   
        const {nombre,descripcion,codigo,imagen,precio,stock} = req.body

        if(nombre && descripcion && codigo && precio && imagen && stock) {
            const nuevoProducto = new Producto ({nombre,descripcion,codigo,imagen,precio,stock})
            await nuevoProducto.save() 
            res.status(200).json({mensaje: "El producto fue guardado correctamente", id: nuevoProducto._id}) 
        }else {
            res.status(500).json({error:"Los datos son requeridos"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.actualizar = async (req,res) => {
    try {
        const id = req.params.id
        const datos = req.body
        if(id && datos){
            await Producto.findByIdAndUpdate(id, datos)
            res.status(200).json({mensaje:"El producto fue actualizado correctamente"})
        }else {
            res.status(500).json({error: "Falta Datos"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
   
}

exports.eliminar = async (req,res) => {
    try {
        const id = req.params.id
        const eliminarProducto = await Producto.findByIdAndDelete(id)
        if(!eliminarProducto){
            res.status(404).json({error: "No se encontro el producto"})
        }else {
            res.status(200).json({mensaje: "El producto fue eliminado correctamente"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
}