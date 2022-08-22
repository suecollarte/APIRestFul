/* Realizar un proyecto de servidor basado en node.js y express que 
ofrezca una API RESTful de productos. 
wc
En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.
 */

const express =require("express");
const morgan = require("morgan");
// extraer codigo y encapsularlo

const routerProducto = require("./src/productos.routes.js");
//instancia servidor 
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));




//Rutas
app.use("/api/productos", routerProducto);

//Servidor
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (err) => console.log(`Error en el servidor ${err}`));