db.amigos.find(); //Todos los elementos de la coleccion amigos
db.amigos.find().sort({nombre:1}); //Consulta por nombre ordenada de forma ascendente
db.amigos.find().sort({nombre:-1}); //Consulta por nombre ordenada de forma descendente
db.amigos.find({nombre:"Marleni"}); //Consulta todos los campos del amigo con nombre Marleni
db.amigos.find({nombre:"Marleni"},{teléfono:1}); //Devuelve el campo teléfono del amigo con nombre Marleni
db.amigos.find({curso:"1DAM"},{nombre:1,nota:1}); //Devuelve los campos nombre y nota de los amigos cuyo curso sea 1DAM
//En general la estructura de la funcion find, es la siguiente: db.nombre_coleccion.find(filtro, campos)
//Tambien podemos cambiar los 1's y 0's por la palabra true y false
db.amigos.find({curso:"1DAM"},{nombre:true,nota:true});
//Para conocer el número de registrsos que devuelve una consulta utilizamos la siguiente estructura
db.amigos.find({curso:"1DAM"},{nombre:true,nota:true}).count();

/*---------------------------------------------------
  Comparadores que podemos utilizar en las busquedas
  --------------------------------------------------*/

//$eq - equal
db.amigos.find({nota: {$eq:6}});

//$gt -greater than
db.amigos.find({nota: {$gt:6}});

//gte - greater than equal
db.amigos.find({nota: {$gte:6}});

//$lt - lower than
db.amigos.find({nota: {$lt:7}});

//$lte - lower than equal
db.amigos.find({curso:"1DAM",nota: {$gte:7, $lte:9}});

//$ne - not equal
db.amigos.find({nota: {$ne:7}});

//$in - entre la lista de valores
db.amigos.find({nota: {$in:[5, 7, 8]}});

//$nin - no entre la lista de valores
//nombre y curso de los amigos cuya nota no es ni 5, ni 7, ni 8
db.amigos.find({nota: {$nin:[5, 7, 8]}},{nombre:true,curso:true});

/*---------------------------------------------------------
Comparadores lógicos que podemos utilizar en las busquedas
----------------------------------------------------------*/

/* $or - comprueba que se cumplan una de las dos o más condiciones */
//En el ejemplo se obtienen los documentos cuyo curso es primero de DAM o que tienen una nota mayor que 7
db.amigos.find({ $or: [ {nota: {$gt:7}}, {curso: "1DAM"} ]});

//Obtener los amigos cuyo nombre sea Ana o Marleni
db.amigos.find({ $or: [ {nombre: "Ana"}, {nombre:"Marleni"}]})

/* $and - comprueba que se cumplan dos o más condiciones */
//La siguiente consulta devuelve los amigos de 2DAM con nota igual a 6
db.amigos.find({ $and: [ {curso: "2DAM"}, {nota:{$eq:6} }]})
db.amigos.find({curso:"2DAM"},{nota:6}); //Seria equivalente a la anterior

//Si quisieramos que la condicion de la nota cumpliera que fuera superior a 5 deberiamos utilizar $and
//db.amigos.find({curso:"2DAM"},{nota:{$gt:5}}); //Daria error de ejecucion
db.amigos.find({ $and: [ {curso: "2DAM"}, {nota:{$gt:5} }]})//No produciría ningún error

//Devuelve el documento con nombre Marleni y telédono 3446500
db.amigos.find({ $and: [ {nombre: "Marleni"}, {teléfono: 3446500 }]})
db.amigos.find({nombre: "Marleni"}, {teléfono: 3446500 })//Seria equivalente a la consulta anterior

/* $not - negación */
//Devuelve los amigos con nota no mayor de 7
db.amigos.find({nota: {$not: {$gt:7}}})

//Devuelve nombre, nota y curso de los amigos cuya nota es no mayor que 7
db.amigos.find({nota: {$not: {$gt:7}}},{_id:false,nombre:true,nota:1,curso:true})//Se desactiva que se muestre el _id del documentos

/* $exists - Permite comprobar la existencia o no del campo */
//Devuelve aquellos registros que tengan nota
db.amigos.find({nota: {$exists : true}})
