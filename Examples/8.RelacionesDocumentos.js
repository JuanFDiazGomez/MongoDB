/* ---------------------------------------------------
RELACIONES ENTRE DOCUMENTOS EN MongoDB
-------------------------------------------------------*/


/* Se guarda el campo _id de un documento como referencia en otro documento. Similar al concepto de clave ajena */

//Creamos la colección emple
db.emple.drop();
db.emple.insert({_id:'emp1',nombre:"Juan", salario:1000, fechaalta:"10/10/1999"})
db.emple.insert({_id:'emp2',nombre:"Alicia", salario:1400, fechaalta:"07/08/2000", oficio: "Profesora"})
db.emple.insert({_id:'emp3',nombre:"Maria Jesus", salario:1500, fechaalta: "05/01/2005", oficio: "Analista", comision:100})
db.emple.insert({_id:'emp4',nombre:"Alberto", salario:1100, fechaalta:"15/11/2001"})
db.emple.find();

//Creamos la colección depart
db.depart.drop();
db.depart.insert({_id:'dep1',nombre:"Informatica",loc:'Madrid', emple:['emp1', 'emp2']})
db.depart.insert({_id:'dep2',nombre:"Gestion",loc:'Talavera', emple:['emp3', 'emp4' ]})
db.depart.find()

/* Para visualizar los datos de la combinación de colecciones necesitaremos hacer dos Consultas
  una para obtener los departamentos a consultar y otra para obtener los empleados de ese departamentos
  que están dentro del array (emple) del departamento. Tenemos que realizar los siguientes pasos:
 */

 //1º - Cargamos el departamento con _id:dep1 en una variable y utilizamos el método .findOne
 departrabajo = db.depart.findOne({_id:'dep1'});

 //2º - Recuperamos los empleados cuyo _id se encuentre enlazado a este departamento
 emplesdep = db.emple.find({ _id: { $in: departrabajo.emple}}).toArray() //Con toArray devolvemos un array de documentos es decir todos los empleados


/* La siguiente consulta devuelve los empleados del departamento dep2 que tiene salario > 1400 */

// 1º - Cargamos el departamento
departrabajo = db.depar.findOne({ _id:'dep2'});

//2º - Luego cargamos los empleados
emplesdep = db.depar.emple.find({ _id:{$in: departrabajo.emple} , salario: {$gt:1400}}).toArray();
 
