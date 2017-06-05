/*---------------------------------------------------
  Actualización de registros en MongoDB
  --------------------------------------------------*/

/* Las actualizaciones siguen el siguiente patrón para actualizar un registros

db.nombre_coleccion.update(
  filtro_busqueda,
  cambios_a_realizar,
  {
    upsert:booleano,
    multi: booleano
  }
);

En cambios a realizar tenemos que reflejar como tiene que quedar el documento, es decir tiene que tener todos
los campos que queramos que permanezcan sino los campos que no reflejemos se borraran. Cuando insertemos los cambios a realizar
tenemos que poner como queremos que quede el documento estableciendo tanto los campos que no se modifican como los que si.

upsert : Inserta un nuevo registro si el filtro_busqueda no devuelve ningún elementos

multi: Si el filtro_busqueda devuelve multiples resultados y queremos que los cambios sean realizados para todos asignamos true,
        de lo contrario solo se modificará el primero

*/
db.amigos.update(
{nombre:'Pepita'},
{nombre:'Pepita', telefono:12345},
{upsert: true}
);

/*---------------------------------------------------
  Operadores de modificación del método .update
  --------------------------------------------------*/

// $set, permite añadir nuevas propiedades a un documento
db.amigos.update(
  {nombre:"Ana"},
  {$set: {edad: 24}}
); //Su hubieran varios registros cuyo nombre es Ana actualizaría solo el primero

db.amigos.update(
  {nombre: "Marleni"},
  {$set: {edad:34}}
);

// $unset, al contrario que el anterior permite eliminar propiedades de un documentos

db.amigos.update(
  {nombre:"Marleni"},
  {$unset:{edad: 34}},
)

// $inc, incrementa la propiedad numerica en la cantidad indicada

db.amigos.update(
  {nombre: "Ana"},
  {$inc: {edad:1}}
)
// $rename, renombra los campos del documentos
db.amigos.update(
  {nombre:"Ana"},
  {$rename: {edad:'age', nombre:'name'}}
)

// Actualizar la nota de todos los alumnos de 1DAM

db.amigos.update(
  {curso: "1DAM"},
  {$inc: {nota:1}}
) //Esta acutalizaría solo el primer registro

db.amigos.update(
  {curso: "1DAM"},
  {$inc: {nota:1}},
  {multi:true}
)// Esta sentencia en cambio actualizaría todos los registros cuyo curso sea 1DAM

db.amigos.update(
  {curso:"1DAM"},
  {$set: {poblacion: "Talavera"}},
  {multi: true}
)
