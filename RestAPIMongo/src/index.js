const app = require('./app')

// Inicializando el Servidor
app.listen(app.get("port"), () => {
    console.log(`Servidor corriendo en http://localhost:${app.get("port")}`)
    console.log("Nombre de la aplicacion:", app.get("nombre"))
})