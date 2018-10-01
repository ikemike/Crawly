/**
 * THIS CLASS IS NO LONGER IN USE
 */
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
        const PouchDB = require('pouchdb').default;
        const myDB = new PouchDB('my_database');
        let docRows; 

        myDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
            console.log(doc.rows);
            docRows = doc.rows;
        }); 
        return docRows;
    }

    promiseProductsQuery() {
        const PouchDB = require('pouchdb').default;
        const myDB = new PouchDB('my_database');

        return myDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
        });
    }

}
 
