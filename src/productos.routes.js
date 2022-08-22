const express = require("express");
const {Router}= express;
const routerProducto = Router();


//DB

    const DB_PRODUCTOS=[
        {
          "nombre": "Escuadra",
          "precio": "123.45",
          "thumbail": "https://cdn3.iconfinder.com/data/icons/education/64/ruler-trianglestationary-school-256.png"
        },
        {
          "nombre": "Calculadora",
          "precio": 234.56,
          "thumbail": "https://cdn3.iconfinder.com/data/icons/education/64/ruler-trianglestationary-school-256.png"
        },
        {
          "nombre": "Globo Terraqueo",
          "precio": 345.67,
          "thumbail": "https://cdn3.iconfinder.com/data/icons/education/64/ruler-trianglestationary-school-256.png"
        },
        {
          "nombre": "Escuadra",
          "precio": "123.45",
          "thumbail": "https://cdn3.iconfinder.com/data/icons/education/64/ruler-trianglestationary-school-256.png"
        },
        {
          "nombre": "Calculadora",
          "precio": 234.56,
          "thumbail": "https://cdn3.iconfinder.com/data/icons/education/64/ruler-trianglestationary-school-256.png"
        },
        {
          "nombre": "Globo Terraqueo",
          "precio": 345.67,
          "thumbail": "https://cdn3.iconfinder.com/data/icons/education/64/ruler-trianglestationary-school-256.png"
        }
      ];

//Router
routerProducto.get("/", (req, res) => {
  res.status(200).json(DB_PRODUCTOS);
});

routerProducto.post("/api/productos", (req, res) => {
    const { nombre, precio, thumbail } = req.body;
    DB_PRODUCTOS.push.apply(req.body);
    res.status(201).json({ code: 201, msg: `Producto guardado con exito` });
  });



let respuesta = {
  error: false,
  codigo: 200,
  mensaje: "",
};


routerProducto.get("/api/productos/:id", (req, res) => {
  try {
    const id = req.params.id;

    const indexObj = DB_PRODUCTOS.findIndex((o) => o.id == id);

    if (id == -1) {
      res.status(404).json({ code: 404, msg: `Producto ${id} no encontrado` });
    }
    res.status(200).json(DB_PRODUCTOS[id]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, msg: `Error al obtener ${req.method} ${req.url}` });
  }
});


routerProducto.put("/api/productos/:id", (req, res) => {
  const { nombre, precio } = req.body;
  if (!req.body.nombre) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: "El campo nombre es requeridos",
    };
  } else {
    let largo = DB_PRODUCTOS.lenght;
    for (let i = 0; i < largo; i++) {
      if (DB_PRODUCTOS[i].nombre == req.body.nombre) {
        DB_PRODUCTOS[i] = {
          nombre: req.body.nombre,
          precio: req.body.precio,
          thumbail: DB_PRODUCTOS[i].thumbail,
        };
        respuesta = {
          error: true,
          codigo: 201,
          mensaje: "Producto creado",
        };
      }
    }
  }
  res.status(201).json(respuesta);
});

routerProducto.delete("/api/productos/:id", (req, res) => {
  try {
    const id = req.params.id;
    const j = id;
    p.deletebyId(j);

    if (id == -1) {
      res.status(404).json({ code: 404, msg: `Producto ${id} no encontrado` });
    }
    res.status(200).json(j);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, msg: `Error al obtener ${req.method} ${req.url}` });
  }
});
routerProducto.get("*", (req, res) => {
  /* Returning a 404 status code. */
  res.status(404).json({
    code: 404,
    msg: "not found",
  });
});

module.exports = routerProducto;


