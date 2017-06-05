/*
  FUNCIONES DE AGREGADO - AGREGACIÓN PIPELINE
*/

/*Creamos la colección que vamos a utilizar como ejemplo con las siguientes ordenes */

db.articulos.drop();
db.articulos.insert({codigo:1,denominacion:"Portatil Acer", pvp: 500, categoria:"Informatica", uv:10, stock: 20})
db.articulos.insert({codigo:2,denominacion:"Pala Padel", pvp: 100, categoria:"Deportes", uv:5, stock: 30})
db.articulos.insert({codigo:3,denominacion:"Caja Lapices", pvp: 6, categoria:"Escritorio", uv:10, stock: 6})
db.articulos.insert({codigo:4,denominacion:"Marcadores", pvp: 10, categoria:"Escritorio", uv:20, stock: 19})
db.articulos.insert({codigo:5,denominacion:"Memoria 32GB", pvp: 120, categoria:"Informatica", uv:8, stock: 10})
db.articulos.insert({codigo:6,denominacion:"Micro Intel", pvp: 150, categoria:"Informatica", uv:4, stock: 10})
db.articulos.insert({codigo:7,denominacion:"Bolas Padel", pvp: 5, categoria:"Deportes", uv:15, stock: 30})
db.articulos.insert({codigo:8,denominacion:"Falda Padel", pvp: 15, categoria:"Deportes", uv:10, stock: 10})
db.articulos.find()

/* ---------
Ejemplos
------------*/

//Obtener las denominaciones de los artículos y la categoría convertida a mayúcula. Este ejemplo no guardaría los datos modificados
db.articulos.aggregate(
  [{$project:{
      denominacion: {$toUpper: "$denominacion"},
      categoria: {$toUpper: "$categoria"}
  }}]
)

//Si queremos que se guarden los datos modificados del ejercicio anterior en la colección tendriamos que añadir la etapa out
db.articulos.aggregate(
  [{
      $project:{
      denominacion: {$toUpper: "$denominacion"},
      categoria: {$toUpper: "$categoria"}
      }
    },{
        $out: "salidanueva"
    }
  ]
)

//Obtener la denominación en mayúsculas, el importe de las ventas, que sera uv*pvp y el stock actual que será el stock - uv
//Utilizamos las funciones $multiply y $subtract para multiplicar y restar respectivamente
db.articulos.aggregate(
  [{$project:{
    articulo:{$toUpper: "$denominacion"},
    importe:{$multiply:["$pvp","$uv"]},
    stockactual:{$subtract:["$stock","$uv"]}
  }}]
)

/* -------------------------
Condiciones de Agregación
----------------------------*/

/*
  $cond, se evalua una expresion devolviendo el valor de otras dos expresiones
  {$cond: [<expresion-logica>,<caso-verdadero>,<caso-falso>]}

  $ifNull, Devuelve el resultado de la primera expresion si es no nulo o el resultado de la segunda expresion si es nulo
  {$ifNull: [<expresion>,<expresion-si-es-nulo>]}
 */



//A la última consulta realizada vamos a comprobar si el stock es negativo y si así lo fuera crearemos un campo llamado areponer con
//valor verdadero si es negativo y falso si es positivo
db.articulos.aggregate(
  [{$project:{
    articulo:{$toUpper: "$denominacion"},
    importe:{$multiply:["$pvp","$uv"]},
    stockactual:{$subtract:["$stock","$uv"]},
    areponer:{
      $cond:[ {$lte:[{$subtract:["$stock","$uv"]},0]}   ,   true,   false ]
    }
  }}]
)


//Obtener por cada categoria el nº de artículos, el total de unidades vendidas de articulos y el importe total (suma de pvp*unidades)
db.articulos.aggregate([{
  $group:{
    _id: "$categoria", //Cuando utilizamos $group debemos añadir el identificador _id y le asignamos la categoria por la que agrupamos
    contador: {$sum:1}, //La funcion $sum:1 va contando los articulos
    sumaunidades: {$sum:"$uv"},
    totalimporte: {$sum:{$multiply:["$pvp","$uv"]}}
  }
}])

//Obtener el nº de documentos de la categoria Deportes, el total de unidades vendidas de sus artículos, el importe total
// y la media de unidades vendidas

db.articulos.aggregate([
  {$match: {categoria: "Deportes"}}, //Utilizamos $match para seleccionar la categoria
  {$group: { //Obtenemos los valores agrupados
    _id: "Deportes", //En Id podemos poner cualquier valor porque ya hemos realizado la criba con match
    contador: {$sum:1},
    sumaunidades:{$sum:"$uv"},
    media: {$avg:"$uv"},
    totalimporte: {$sum:{$multiply:["$pvp","$uv"]}}
  }
  }
])

//Obtener el precio más caro, agrupando los registros y obteniendo el máximo pvp

db.articulos.aggregate([{
  $group:{
    _id:null,
    maximo:{$max:"$pvp"}
  }
}])

/*Obtener el artículo con el precio más caro, utilizamos dos consultas.
1ª - Obtenemos los datos del pvp y la denominación de todos los artículos ordenados descendente por precio y denominacion.
  Para ello utilizamos la etapa $sort
2ª - El resultado obtenido se agrupa con $group, para luego obtener el primero con la función $first */

db.articulos.aggregate([
  {$sort: {pvp:-1, denominacion:-1}},
  {$group:{
    _id: null,
    mascaro: {$first:"$denominacion"},
    precio: {$first:"$pvp"}
  }}
])

/* Obtener la suma del importe de los artículos cuya denominación empieza por M o P. Para realizar la consulta tenemos que realizar
tres pasos.
1º - Obtener de todos los artículos el primer carácter de la denominación(para ello utilizamos la función $substr) y el
precio de cada artículo
2º - Seleccionar de los artículos seleccionados en la primera etapa aquellos que empiecen por M o P
3º - Finalmente se agrupan y se suman los importes.
*/
db.articulos.aggregate([
  {$project:{
    primercarac:{$substr:["$denominacion",0,1]}, //Tomamos la subcadena desde el caracter 0 hasta el 1
    importe:{$multiply:["$pvp","$uv"]} //Multiplicamos el precio por el número de unidades
  }},
  {$match:{ //Con match encontramos aquellos resultados que empiecen por M o P
    "primercarac" :{$in:["M","P"]}
  }},
  {$group:{ //Por último se agrupan los resultados y se realiza la función de agregado
    _id:1,
    totalimporte:{$sum: "$importe"}
  }}
])

//Obtener por cada categoría el artículo con el precio más caro.

db.articulos.aggregate([
  {$sort:{ //Ordenamos los registros por categoria, precio y denominacion
    categoria: -1,pvp:-1,denominacion:-1
  }},
  {$group:{ //Agrupamos los resultados anteriores por categoria
    _id: "$categoria",
    mascaro: {$first: "$denominacion"}, //Tomamos tanto la denominacion como el precio del primer resultado
    precio:{$first:"$pvp"}
  }}
])
