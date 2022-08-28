import producto from '../../producto'
import ProductosDAO from './ProductosDAOInteface'
import admin from 'firebase-admin'
import { DllReferencePlugin } from 'webpack';

class ProductosFirebaseDAO implements ProductosDAO{

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
        this.query = this.db.collection('Productos');
    }

    async insertProduct(Producto: producto){
        try{
            let id = await this.readLastID() +1 ;
            let doc = this.query.doc(`${id}`)
            await doc.create(Producto)
            doc = this.query.doc("IDCounter");
            await doc.update({Count:id})
        } catch(error){
            console.log(error)
        }
    }

    async deleteProduct(id: Number) {
        try{
            let doc = this.query.doc(`${id}`);
            await doc.delete();
        } catch(error){
            console.log(error);
        }
        
    }
    async readProducts(id?: Number) {
        try{
            if(id === undefined){
                let docs = this.query.get().docs;
                return docs;
            } else {
                let doc = this.query(`${id}`)
                let item = doc.get();
                return item.data();
            }
            
            
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

    async updateProduct(id: Number, Producto: producto) {
        try{
            let doc = this.query.doc(`${id}`)
            await doc.upgrade({Producto:Producto})
        } catch(error){
            console.log(error);
        }
    }
}