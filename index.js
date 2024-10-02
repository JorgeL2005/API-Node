// index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/reservasDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Modelos y rutas (a definir más adelante)
app.use('/api/espacios', require('./routes/espacios'));
app.use('/api/reservas', require('./routes/reservas'));

// Servidor
app.listen(port, () => {
    console.log(`API ejecutándose en http://localhost:${port}`);
});
