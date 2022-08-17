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






const fs= require('fs');

class Construye {

constructor (archivo){
      this.archivo=archivo
}

getAll(){

    try{

        const contenido= fs.readFileSync(this.archivo,'utf-8'); //sincrono solo se ejecuta este primero
        const datos=JSON.parse(contenido); //parse lo pone este string como array
        
        return datos;
    }

    catch (error){
        console.log('error');

    }

    
}


save(e){
    let obj= this.getAll();
    let arr = Object.keys(obj).map(function (key) {return obj[key];});
    arr.push(e);

    try {

    fs.writeFileSync(this.archivo,JSON.stringify(arr,null,2));

    } 
    catch (err){

    console.log('error',err);

    }

}

}




const express = require('express');
const morgan=require('morgan');





//Instancia Server
const app = express();
const routerProducto =require('./src/productos.routes.js');

//midlleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.use((req,res,next)=>{
console.log('Middleware');
next();
});
//Ruta
app.use('/api/productos', routerProducto);



const PORT = 8081;
const server = app.listen(PORT, ()=>{
    console.log(`Server on http://localhost:${PORT}/`)
})

//RUTAS
app.get('/', (req,res)=>{
    res.send('Hola Coders');
})