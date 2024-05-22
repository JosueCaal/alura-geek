const express = require('express');
const app = express();
const port = 3001;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas de ejemplo
app.get('/products', (req, res) => {
    // Aquí deberías devolver la lista de productos desde tu base de datos o archivo JSON
    res.json([
        { id: 1, name: 'Producto 1', price: 100, image: 'url-imagen-1' },
        { id: 2, name: 'Producto 2', price: 200, image: 'url-imagen-2' }
    ]);
});

app.post('/products', (req, res) => {
    // Aquí deberías agregar el producto a tu base de datos o archivo JSON
    const newProduct = req.body;
    // Devuelve el nuevo producto con un ID asignado
    res.status(201).json({ ...newProduct, id: Date.now() });
});

app.delete('/products/:id', (req, res) => {
    // Aquí deberías eliminar el producto de tu base de datos o archivo JSON
    const { id } = req.params;
    // Devuelve una respuesta de éxito
    res.status(200).json({ message: `Producto con id ${id} eliminado` });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
