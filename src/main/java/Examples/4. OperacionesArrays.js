/*
  OPERACIONES CON ARRAYS
*/

/*---------------------------------------------------
  Consultas
  --------------------------------------------------*/

db.libros.insert({codigo:1, nombre: "Acceso a datos", pvp:35, editorial:"Garceta",temas: ["Base de datos", "Hibernate", "Neodatis"]});
db.libros.insert({codigo:2, nombre: "Entornos de desarrollo", pvp:27, editorial:"Garceta",temas: ["UML", "Subversion", "ERMaster"]});
db.libros.insert({codigo:3, nombre: "Programación de servicios", pvp:25, editorial:"Garceta",temas: ["SOCKET", "Multihilo"]});

//Libros que tengan el tema UML
db.libros.find({temas: "UML"});

//Libros que tengan el tema UML o Neodatis
db.libros.find({$or :[{temas: "UML"},{temas:"Neodatis"}]});

//Libros de la editorial Garceta, con un pvp>25€ y que tengan el tema UML o Neodatis
db.libros.find({ editorial:"Garceta",pvp:{ $gt:25 }, $or:[{ temas:"UML" },{ temas:"Neodatis" }]})

/*---------------------------------------------------
  Operaciones de Modificación con Arrays
  --------------------------------------------------*/

/* $push, añade un elemento al Arrays */
//En el ejemplo se añade el tema MongoDB al libro con código 1
db.libros.update(
  {codigo:1},
  {$push: {temas:"MongoDB"}}
);

/* $addToSet, agrega elementos a un array si estos no existen previamente */
// Añade el tema Base de datos a todos los libros. Primero se comprueba que tengan campo temas
db.libros.update(
  {temas : { $exists:true }},
  {$addToSet: {temas:"Base de datos"}},
  {multi:true}
)

/* $each, se utiliza junto con $push y $addToSet para añadir varios elementos a la vez en un array */
db.libros.update(
  {codigo: 1},
  {$push: {temas:{$each: ["JSON","XML"]}}}
)
db.libros.update(
  {codigo:2},
  {$addToSet: {temas: {$each: ["Eclipse","Developer"]}}}
)

/* $pop, elimina el primer o último elemento de un array (con -1 el primero, otro valor el último) */
//Borrado del primer tema del libro con código 3
db.libros.update(
  {codigo:3},
  {$pop: {temas:-1}}
)

/* $pull, elimina los valores de un array que cumplan con el filtro indicado */
//Borrado de los temas JSON y Base de datos de todos los libros
db.libros.update(
  {},
  {$pull: {temas: {$in:["Base de datos","JSON"]}}},
  {multi:true}
)
