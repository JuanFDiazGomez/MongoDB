/* ---------------------------------------------------
UTILIZACIÓN DE ARRAYS, CAMPOS COMPUESTOS Y AGREGADOS
-------------------------------------------------------*/

//Utilizamos la colección trabajadores

db.trabajadores.drop();
db.trabajadores.insert({nombre: {nomb:"Alicia",ape1:"Ramos", ape2:"Martin"},
                        direccion: {poblacion: "Madrid", calle : "Avda Toledo 10"},
						salario: 1200,
						oficios:["Profesora", "Analista"],
						primas: [20,30,40],
						edad:50
						})

db.trabajadores.insert({nombre: {nomb:"Juan",ape1:"Gil", ape2:"Sanchez"},
                        direccion: {poblacion: "Madrid", calle : "Mayor 12"},
						salario: 1400,
						oficios:["Programador", "Analista"],
						primas: [120,130,40],
						edad: 30
						})

db.trabajadores.insert({nombre: {nomb:"Raquel",ape1:"Garcia", ape2:"del Amo"},
                        direccion: {poblacion: "Toledo", calle : "Ocada 22"},
						salario: 1500,
						oficios:["Profesor"],
						primas: [60, 30, 80],
						edad: 45
						})
db.trabajadores.insert({nombre: {nomb:"Fernando",ape1:"Romo", ape2:"Perez"},
                        direccion: {poblacion: "Talavera", calle : "Las cabas 2"},
						salario: 1300,
						oficios:["Profesor", "Representante"],
						edad: 43
						})
db.trabajadores.insert({nombre: {nomb:"Maria",ape1:"Suarez", ape2:"Verdes"},
                        direccion: {poblacion: "Toledo", calle : "Av Madrid 32"},
						salario: 1600,
						oficios:["Profesor", "Contable"],
						primas: [30, 70, 80],
						edad: 55
						})

db.trabajadores.insert({nombre: {nomb:"Santiago",ape1:"Gomez", ape2:"Corregidor"},
                        direccion: {poblacion: "Toledo", calle : "Av Madrid 32"},
						salario: 1600,
						edad: 55
						})


/*
  Consultas con campos compuestos
*/

/* Obtenemos la población, el nombre descompuesto (nombre, ape1, ape2), el primer oficio del array de oficios,
  el segundo y el último. Si no los tiene no devuelve nada. Ordenados por poblacion ascendentemente. */

  db.trabajadores.aggregate([
    {$sort:{
      "direccion.poblacion": 1 //Accedemos a los campos compuestos como si de un objeto Java se tratara
    }},
    {$project:{
      poblacion: "$direccion.poblacion",
      nombre: "$nombre.nomb",
      ape1:"$nombre.ape1",
      ape2:"$nombre.ape2",
      oficio1: {$arrayElemAt:["$oficios",0]}, //La función $arrayElemAt devuelve el elmento de un array dentro de una posicion, empezando por 0
      oficio2: {$arrayElemAt:["$oficios",1]}, //A esta función le pasamos tanto un array como la posicion del elemento que queremos
      oficioultimo: {$arrayElemAt:["$oficios",-1]}// La posición -1 índica el último elemento del array
    }}
  ])

/*
Obtener los elementos de los array que tinen los trabajadores (oficios y primas) concatenados
*/

db.trabajadores.aggregate([
  {$project: { //Utilizamos la función $project porque solo queremos mostrar los resultados
      nombre: "$nombre.nomb",
      numerooficios: {$size: {"$ifNull":["$oficios",[]]}}, //calculamos el tamaño del array, la función $ifNull se utiliza para evitar
      numeroprimas:{$size:{"$ifNull":["$primas",[]]}}, //un error si lo aplicamos sobre un campo null, aquellos trabajadores que no tiene primas
      oficiosconcatenados: {$concatArrays:["$oficios","$primas"]} //Por último se concatenan los arrays primero todos los valores de oficios y luego de primas
  }}
])


/*
Obtener el número de trabajadores y la media de edad de los trabajadores que han tenido el oficio de Analista
*/

db.trabajadores.aggregate([
  {$match:{
    oficios: "Analista"
  }},
  {$group:{
    _id:"analista",
    contador: {$sum:1},
    media:{$avg:"$edad"}
  }}
])
