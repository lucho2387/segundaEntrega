const app = require('./app')


app.listen(app.get('port'))
console.log(`Servidor corriendo en http://localhost:${app.get('port')}`)