// con estas lineas creamos un objeto json amigo y despues lo guardamos
Amigo1={nombre:'Ana',teléfono:545656885, curso:'1DAM', nota:7};
Amigo2={nombre:'Marleni',teléfono:3446500, curso:'1DAM', nota:8};
db.amigos.save(Amigo1);
db.amigos.save(Amigo2);
// con esta lineas lo insertamos directamente sin necesidad de crear previamente el json
db.amigos.insert({nombre:'Juanito',teléfono:55667788, curso:'2DAM', nota:6});