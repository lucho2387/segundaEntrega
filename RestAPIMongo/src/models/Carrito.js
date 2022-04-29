const mongoose = require('mongoose')
const { Schema } = mongoose;


const CarritoSchema = new Schema (
    {
    productos: [
        {
            type: Object,
        }
    ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Carrito', CarritoSchema)