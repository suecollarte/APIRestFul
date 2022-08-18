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

class Contenedor {

    constructor (archivo){
          this.archivo=archivo
          
    }

    static array=[]

    getById(j)
    {
        
        let todo= this.getAll();
        
        const arr=todo.map(function(obj){
            return obj;
        });
        Contenedor.array=arr;
       
        for(let i=0;i< Contenedor.array.length;i++)
        {
            if(i==j-1){
               i=Contenedor.array.length;
               return Contenedor.array[j-1];
               
            }
        }
        
       
        
        
    }

    getAll(){
    
        try{
    
            const contenido= fs.readFileSync(this.archivo,'utf-8'); //sincrono solo se ejecuta este primero
            const datos=JSON.parse(contenido); //parse lo pone este string como array
            return datos;
        }
    
        catch (error){
            console.log('error getAll');
    
        }
    
        
    }
    
   
    
    save(e){
    const obj=this.getAll();
    const obj1=obj.map(function(obj2){
    return obj2;
    });

    Contenedor.array=obj1;
    Contenedor.array.push(e);
   
    const paso=JSON.stringify(Contenedor.array,null,2);

        try {
    
        fs.writeFileSync(this.archivo,paso);
       console.log('Largo actual:'+Contenedor.array.length);
        } 
        catch (err){
    
        console.log('error no escribe',err);
    
        }
    
    }
    
    

    deleteAll(){
    
        Contenedor.array=[];
        try {
        fs.writeFileSync(this.archivo,JSON.stringify(Contenedor.array,null,2));
        }   
        catch (err){
    
            console.log('error',err);
        
            }
    
}



    deletebyId(j){
    
    let todo= this.getAll();
    
    
    const arr=todo.map(function(obj){
        return obj;
    });
    Contenedor.array=arr;
    let arr2=[];
    for(let i=0;i< Contenedor.array.length;i++)
    {
        if(i==j){
           
            console.log('se borra el elemento',i); i=i+1;
        }else{
        let obj1=arr[i];
        arr2.push(obj1);
       }
    }
    Contenedor.array=arr2;
    console.log('Largo Nuevo array',Contenedor.array.length);
    try {
    
        fs.writeFileSync(this.archivo,JSON.stringify(arr2,null,2));
    
        } 
        catch (err){
    
        console.log('error',err);
    
        }

    
    
}
}

const p=new Contenedor();

p.archivo = './src/productos.txt';


const express = require('express');

const app = express();

let todo=p.getAll();
const arr=todo.map(function(obj){
    return obj;
});

const DB_PRODUCTOS=arr;
  
//Middleware
app.use(express.json());


app.get('/api/productos', (req, res)=>{
    res.status(200).json(DB_PRODUCTOS);
});

app.get('/api/productos/:id', (req, res)=>{
    try {
        const id = req.params.id+0;
        
        //const indexObj = arr.findIndex((o)=> o.id == id);
        
        if (id == -1) {
            res.status(404).json({code: 404, msg: `Producto ${id} no encontrado`})
        } 
        res.status(200).json(arr[id]);
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
    }
});

app.post('/api/productos', (req, res)=>{
    const {nombre, precio, thumbail } = req.body;
    DB_PRODUCTOS.push(req.body);
    res.status(201).json({code: 201, msg: `Producto ${nombre} guardado con exito`});
});
app.put('/api/productos', (req, res)=>{
    const {nombre, precio, thumbail } = req.body;
    DB_PRODUCTOS.push(req.body);
    res.status(201).json({code: 201, msg: `Producto ${nombre} guardado con exito`});
});

app.delete('/api/productos/:id', (req, res)=>{
    try {
        const id = req.params.id;
        const j=id;
       p.deletebyId(j);
        
        if (id == -1) {
            res.status(404).json({code: 404, msg: `Producto ${id} no encontrado`})
        } 
        res.status(200).json(j);
    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`});
    }
});
app.get('*', (req, res)=>{
    /* Returning a 404 status code. */
    res.status(404).json({
        code: 404,
        msg: 'not found'
    })
});



const PORT = 3000;
const server = app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});
server.on('error', err => console.log(`Error en el servidor ${err}`));