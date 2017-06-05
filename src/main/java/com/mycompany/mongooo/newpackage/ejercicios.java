/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.mongooo.newpackage;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import org.bson.Document;

/**
 *
 * @author juanfdg
 */
public class ejercicios {
    public static void main(String[] args) {
       int opcion=0;
        Scanner sc = new Scanner(System.in);
        do{
            System.out.println("--------------------------------------");
            System.out.println("            Menú Principal");
            System.out.println("--------------------------------------");
            System.out.println("1. Ver los amigos.");
            System.out.println("2. Insertar un amigo.");
            System.out.println("3. Insertar varios a la vez.");
            System.out.println("4. Consultas sencillas sobre documentos.");
            System.out.println("5. Actualizar documentos.");
            System.out.println("6. Borrar documentos.");
            System.out.println("7. Gestionar colecciones MongoDB.");
            System.out.println("8. Exportar a fichero Json.");
            System.out.println("9. Leer un fichero Json.");
            System.out.println("10.Consultas de agregado.");
            System.out.println("0. Salir");
            System.out.print("Introduce la opción deseada: ");
            opcion = sc.nextInt();
            switch(opcion){
                case 1: {
                    verDatosCliente();
                    break;
                }
                case 2: {
                    insertarDatosEnColeccion();
                    break;
                }
                case 3: {
                    insertarVarios();
                    break;
                }
                case 4: {
                    consultasSencillas();
                    break;
                }
                case 5: {
                    actualizarDocumentos();
                    break;
                }
                case 6: {
                    borrarDocumentos();
                    break;
                }
                case 7: {
                    coleccionesMongoDB();
                    break;
                }
                case 8: {
                    escribirFicheroJson();
                    break;
                }
                case 9: {
                    leerFicheroJson();
                    break;
                }
                case 10: {
                    consultasAgregado();
                    break;
                }
                case 0:{
                    System.out.println("--- Fin del programa ---");
                    break;
                }
                default:{
                    System.out.println("Introduce una opción correcta.");
                    break;
                }
            }
        }while (opcion!=0);
    }

    private static void verDatosCliente() {
        MongoClient cliente = new MongoClient();
        MongoDatabase db = cliente.getDatabase("mibasedatos");
        MongoCollection<Document> coleccion = db.getCollection("amigos");
        
        // consulta
        List<Document> consulta = coleccion.find().into(new ArrayList<Document>());
        System.out.println("--- Amigos ---");
        for(Document doc : consulta){
            System.out.println("Nombre: "+doc.getString("nombre"));
        }
    }

    private static void insertarDatosEnColeccion() {
        Scanner sc = new Scanner(System.in);
        MongoClient cliente = new MongoClient();
        MongoDatabase db = cliente.getDatabase("mibasedatos");
        MongoCollection<Document> coleccion = db.getCollection("amigos");
        int continuar = 0;
        while(continuar == 0){
            System.out.print("Inserte el nombre: ");
            String nombre = sc.nextLine();
            System.out.print("Inserte el curso: ");
            String curso = sc.nextLine();
            System.out.print("Inserte la nota: ");
            String nota = sc.nextLine();
            System.out.print("Inserte el telefono: ");
            String telefono = sc.nextLine();
            coleccion.insertOne(new Document("nombre",nombre).
                            append("telefono", telefono).
                            append("curso",curso).
                            append("nota", nota));
            System.out.println("salir? 0/1");
            continuar = Integer.parseInt(sc.nextLine());
        }
        String[] nombres = {"Nene1","Nene2"};
        String[] telefonos = {"975","952"};
        String[] cursos = {"1DAM","2DAM"};
        String[] notas = {"0","10"};
        ArrayList<Document> docs = new ArrayList<Document>();
        for(int i = 0; i < 2; i++){
            docs.add(new Document("nombre",nombres[i]).
                            append("telefono", telefonos[i]).
                            append("curso",cursos[i]).
                            append("nota", notas[i]));
        }
        coleccion.insertMany(docs);
        
        
    }

    private static void insertarVarios() {
        MongoClient cliente = new MongoClient();
        MongoDatabase db = cliente.getDatabase("mibasedatos");
        MongoCollection<Document> coleccion = db.getCollection("amigos");
        String[] nombres = {"Nene1","Nene2"};
        String[] telefonos = {"975","952"};
        String[] cursos = {"1DAM","2DAM"};
        String[] notas = {"0","10"};
        ArrayList<Document> docs = new ArrayList<Document>();
        for(int i = 0; i < 2; i++){
            docs.add(new Document("nombre",nombres[i]).
                            append("telefono", telefonos[i]).
                            append("curso",cursos[i]).
                            append("nota", notas[i]));
        }
        Arrays.
        coleccion.insertMany(docs);
    }

    private static void consultasSencillas() {
        MongoClient cliente = new MongoClient();
        MongoDatabase db = cliente.getDatabase("mibasedatos");
        MongoCollection<Document> coleccion = db.getCollection("amigos");
        
        Document doc = (Document) coleccion.find(Filters.eq("nombre", "marleni")).first();
        System.out.println(doc.toJson());
        
        MongoCursor<Document> docs = coleccion.find(Filters.eq("nota",5)).iterator();
        while(docs.hasNext()){
            System.out.println(docs.next().toJson());
        }
        
        docs.close();
        docs = coleccion.find(Filters.or(Filters.eq("nota", 6),Filters.eq("nota",10))).iterator();
        while(docs.hasNext()){
            System.out.println(docs.toString());
        }
        docs.close();
        count
    }

    private static void actualizarDocumentos() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private static void borrarDocumentos() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    private static void coleccionesMongoDB() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private static void escribirFicheroJson() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private static void leerFicheroJson() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private static void consultasAgregado() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
