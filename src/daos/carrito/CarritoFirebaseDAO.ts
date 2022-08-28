import producto from "../../producto";
import CarritoDAO from "./CarritoDAOInterface";
import admin from 'firebase-admin'


export default class CarritoFirebaseDAO implements CarritoDAO{
    
    private db;
    private query;
    private readonly serviceAccount;
    constructor(){
        this.serviceAccount = require('../backendcoder-f473e-firebase-adminsdk-7itja-a34032e952.json');
        admin.initializeApp({
            credential:admin.credential.cert(this.serviceAccount),
            databaseURL:"firebase-adminsdk-7itja@backendcoder-f473e.iam.gserviceaccount.com"
        })
        this.db = admin.firestore();
        this.query = this.db.collection('Carrito')
    }

    async createCarrito() {
        try{
            let id = await this.readLastID()+1;
            let doc = this.query.doc(`${id}`)
            await doc.create({id:id,timeStamp:Date.now(),productos:[]});
        } catch(error){
            console.log(error)
        }
        
    }

    async deleteProductoEnCarrito(idCarrito: Number, idProducto: Number) {
        try{
            
        }catch(error){

        }
    }

    async deleteCarrito(id: Number) {
        try{
            let doc = this.query.doc(`${id}`);
            await doc.delete();

        } catch(error){

        }
    }

    async insertProductoEnCarrito(id: Number, producto: producto){
        
    }

    async readCarrito(id: any) {
        try{
            let doc = this.query.doc(`${id}`);
            let item = doc.get();
            return item.data();
        } catch(error){
            console.log(error);
        }
    }
    async readLastID() {
        try{
            let doc = this.query.doc("IDCounter");
            const item = await doc.get();
            const res = item.data();
            console.log(res);
            return res.count();
        } catch(error){
            console.log(error);
        }
    }

}
