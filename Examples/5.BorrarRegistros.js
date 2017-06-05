/*
  BORRADO DE REGISTROS
*/

/*
Para borrar datos en JSON podemos utilizar las órdenes .remove y .drop, se pueden eliminar documentos que cumplan una condición,
todos los documentos de una colección o la colección completa
*/

//Borrar de la coleccion amigos, el registro Marleni
db.amigos.remove({nombre:"Marleni"});

//Borrar de la colección amigos, el registro con nombre Ana y telefono 545656885
db.amigos.remove({nombre:"Ana", teléfono:545656885});

//Para borrar todos los elementos de una colección se introducirá
db.amigos.remove({});

//Para borrar la colección entera utilizaremos
db.amigos.drop();
