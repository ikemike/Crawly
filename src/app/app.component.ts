import { Component, OnInit } from '@angular/core';
import { BestBuyAPIUtil } from './bbApiUtil';
import { PouchDBService } from './pouchdb.service';
import { BestBuyAPIService } from "./bestbuyapi.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Crawly';
  
  public products: Array<any>;

  public constructor(private database: PouchDBService, private BBApiService: BestBuyAPIService) {
    this.products = [];
    let product1 = { _id: '5', name: 'test product 5', price: 100 };
    let product2 = { _id: '6', name: 'test product 6', price: 200 };

    // MAIN PROCESSING 
    // Set timeout and do requests on a loop
    let result = this.BBApiService.getProductInformation('productSKU');
    console.log(result);

    //this.insertProduct(product1);
    //this.insertProduct(product2);
  }

  /**
   * On page load, retrieve the existing database entries and
   * construct the products array
   */
  public ngOnInit() {
    this.database.fetch().then(result => {
      this.products = [];
      for (let i = 0; i < result.rows.length; i++) {
        this.products.push(result.rows[i].doc);
      }
    }, error => {
      console.error(error);
    });
  }

  public insertProduct(product) {
    this.database.simplePut(product);
  }

  public main() {
    console.log('main');
  }


}


// Main application logic 
let bb = new BestBuyAPIUtil();
//bb.getProductInformation('6291646'); // Works fine! Just make sure bb.keys is setup

let productX = { _id: '7', name: 'test product 7', price: 1250 };


// Get page text for product to search for

// Make API request

// Return API results 


