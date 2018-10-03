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

  public constructor(private database: PouchDBService, private bbApiService: BestBuyAPIService) {
    this.products = []; 
  }

  /**
   * On page load, retrieve the existing database entries and
   * construct the products array
   */
  public ngOnInit() {

    // Construct Database
    this.database.fetch().then(result => {
      this.products = [];
      for (let i = 0; i < result.rows.length; i++) {
        this.products.push(result.rows[i].doc);
      }
    }, error => {
      console.error(error);
    });

    //this.database.simpleDeleteAll();

    // MAIN PROCESSING: Run main()
    this.main();
  }

  public main() {
    let productSKUsString = '6291646,6290657,6290652,6290686';
    let productSKU = '6290652';

/*
    this.bbApiService.getAndConstructProduct(productSKU).then(constructedProductPromise => {
      return constructedProductPromise;

    }).then(constructedProduct => {
      console.log('New Product Constructed for Entry...')
      console.log(constructedProduct);
      //this.insertProduct(constructedProduct);

    }, error => {
      console.log("The request or processing method has returned an error");
      console.log(error);
    });
*/
    this.bbApiService.getAndConstructMultipleProducts(productSKUsString).then(constructedProductsPromise => {

      return constructedProductsPromise;

    }).then(constructedProducts => {

      console.log(constructedProducts);
      this.database.simpleMultiPut(constructedProducts);
    
    }, error => {

      console.log(error);

    });

  }

  public insertProduct(product) {
    this.database.simplePut(product);
  }

}


// Main application logic 
let bb = new BestBuyAPIUtil();
//bb.getProductInformation('6291646'); // Works fine! Just make sure bb.keys is setup

let productX = { _id: '7', name: 'test product 7', price: 1250 };


// Get page text for product to search for

// Make API request

// Return API results 


