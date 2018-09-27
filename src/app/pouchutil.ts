//import pouchDB from 'pouchdb' // why don't I need this?? 
declare let require: any;

export class PouchUtil {

    db; 

    //PouchDB = require('pouchdb').default;
    //db = new this.PouchDB('products_db');

    setupDatabase() {
        const PouchDB = require('pouchdb').default;
        const db = new PouchDB('my_database');
        console.log('Database Created');
        this.db = db;
    }

    addProductQueryResultToDB(productName: string, inStoreAvailability: string, salePrice: number) {
        let entry = {
            _id: new Date().toISOString(),
            productName: productName,
            inStoreAvailability: inStoreAvailability,
            salePrice: salePrice
        };
        this.db.put(entry, function callback(err, result) {
            if (!err) {
                console.log('Successfully entered product into database');
            }
        });
    }

    showAllProducts() {
        this.db.allDocs({include_docs: true, descending: true}, function(err, doc) {
            console.log(doc.rows);
            //redrawTodosUI(doc.rows);
        });
          
    }
}
 
