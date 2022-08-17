const express=require('express');
const routerProducto=express.Router();

//DB

const DB_PRODUCTOS =[];

routerProducto.get('/',(req,res)=>{
   
    res.status(200).json(DB_PRODUCTOS);
})

routerProducto.get('/',(req,res)=>{
   
    res.status(200).json(DB_PRODUCTOS);
})
routerProducto.post('/',(req,res)=>{
    console.log(req.body);
    DB_PRODUCTOS.push.apply(req.body);
    res.status(201).json({msg:'Agregado!',data:req.body});
})
module.exports = routerProducto;