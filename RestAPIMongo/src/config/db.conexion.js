const mongoose = require('mongoose');

const conexionDB = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://luis:coderhouse@cluster0.9xnml.mongodb.net/ecommerce?retryWrites=true&w=majority');
        console.log("Se conecto a la BD:", db.connection.name)
    } catch (error) {
        console.log(error)
    }
}

module.exports = conexionDB