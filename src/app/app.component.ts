import { Component, OnInit } from '@angular/core';
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
  public latestProducts: Array<any>;
  public productSKUsString = '6291646,6290657,6290652,6290686';
  public productSKUsArray = ['6291646','6290657','6290652','6290686'];

  public constructor(private pouch: PouchDBService, private bbApiService: BestBuyAPIService) {
    this.products = []; 
    this.latestProducts = [];
  }

  /**
   * On page load, retrieve the existing database entries and
   * construct the products array
   */
  public ngOnInit() {

    // Construct Database
    this.redrawFunction();

    // MAIN PROCESSING LOOP 
    //setInterval(()=>this.main(), 5000)

    // Test Utilities: 
    //this.database.simpleDeleteAll();
    //this.main();

  }

  public main() {

    // Perform the API request and parse the result into products
    this.bbApiService.getAndConstructMultipleProducts(this.productSKUsString).then(constructedProductsPromise => {

      return constructedProductsPromise;

    }).then(constructedProducts => {

      console.log('Completed API call');
      this.pouch.simpleMultiPut(constructedProducts);
      this.redrawFunction();

    }, error => {
      console.log(error);
    });
  }

  public redrawFunction() {
    this.rerenderProducts();                              // Full database requery re-constructs products[]
    this.reRenderLatestProducts(this.productSKUsArray);  // Filtered database query re-constructs latestProducts[]
  }

  /**
   * Perform a database query and retrieve all products
   * Set products: Array<Any>
   */
  public rerenderProducts() {
    this.pouch.fetch().then(result => {
      this.products = [];

      this.products = result.rows.map(function(aRow) {
        return aRow.doc;
      });

    }, error => {
      console.error(error);
    });
  }

  public reRenderLatestProducts(productSKUsArray) {
    this.latestProducts = [];

    productSKUsArray.map(aSKU => {
      this.pouch.getLatestEntryBySKU(aSKU).then(productEntry => {
        this.latestProducts.push(productEntry);
      })
    });

    

    /*
    for (let i = 0; i < productSKUsArray.length; i++) {
      this.database.getLatestEntryBySKU(productSKUsArray[i]).then(productEntry => {
        // Singular entry should be returned
        this.latestProducts.push(productEntry);
      });
    }
    */

  }



}