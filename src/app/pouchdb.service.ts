import { Injectable, EventEmitter } from '@angular/core';
declare let require: any;
var PouchDB = require("pouchdb").default;


@Injectable()
export class PouchDBService {

    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();

    public constructor() {
        if(!this.isInstantiated) {
            this.database = new PouchDB("testdb");
            this.isInstantiated = true;
        }
    }

    public fetch() {
        return this.database.allDocs({include_docs: true});
    }

    public fetchByCreatedDateDesc() {
        return this.database.allDocs({include_docs: true, descending: true });
    }

    public get(id: string) {
        return this.database.get(id);
    }

    public put(id: string, document: any) {
        document._id = id;
        return this.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document);
        }, error => {
            if(error.status == "404") {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }

    public simpleMultiPut(products: any) {
        this.database.bulkDocs(products, function(error, response) {
            if (error) {
                return console.log(error);
            } else {
                console.log('Sucessfully Inserted Products')
            }
        });
    }

    public simplePut(product: any) {
        return this.database.put(product);
    }
 
    public simpleDeleteAll() {
        this.database.destroy();
    }

    public sync(remote: string) {
        let remoteDatabase = new PouchDB(remote);
        this.database.sync(remoteDatabase, {
            live: true
        }).on('change', change => {
            this.listener.emit(change);
        }).on('error', error => {
            console.error(JSON.stringify(error));
        });
    }

    public getChangeListener() {
        return this.listener;
    }

    /**
     * My method for finding the latest entry by sku -
     * Used to display live product information
     */
    public getLatestEntryBySKU(productSKU) {
        return this.database.changes({
            include_docs: true,
            descending: true,
            limit: 1,
            filter: function(doc) {
              return doc.sku == productSKU;
            }
        }).then(result => {
            return result.results[0].doc;
        });
    }

    public getLastInstockBySKU(productSKU) {
        return this.database.changes({
            include_docs: true,
            descending: true,
            limit: 1,
            filter: function(doc) {
                return doc.sku == productSKU && doc.orderable != "SoldOut"
            }
        })
    }
   

}