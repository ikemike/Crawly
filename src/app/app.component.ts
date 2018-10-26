/* git update-index --assume-unchanged src\app\keys.ts */
import { Component, OnInit } from '@angular/core';
import { PouchDBService } from './pouchdb.service';
import { BestBuyAPIService } from "./bestbuyapi.service";
import { HttpRequestService } from "./httprequest.service";
import { NeweggService } from './newegg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Crawly';
  
  public products: Array<any>;
  public latestProducts: Array<any>;
  public latestAvailabilityInformation: Array<any>;

  public productSKUsString = '6291646,6290657,6290652,6290686,6291648';
  public productSKUsArray = ['6291646','6290657','6290652','6290686', '6291648'];

  public constructor(private pouch: PouchDBService, 
    private bbApiService: BestBuyAPIService, 
    private httpService: HttpRequestService,
    private neweggService: NeweggService) {}
    
    

  /**
   * On page load, retrieve the existing database entries and
   * construct the products array
   */
  public ngOnInit() {

    // Construct Database
    //this.redrawFunction();

    // MAIN PROCESSING LOOP 
    //setInterval(()=>this.main(), 30000)

    // Test Utilities: 
    //this.database.simpleDeleteAll();
    //this.main();

    //this.myTestHTMLtoJSONFunction();

    //this.testAmazonQuery();
    //setInterval(()=>this.testAmazonQuery(), 60000);
    this.neweggService.testNeweggServiceClass();
 
    
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
    this.reRenderProducts();                              // Full database requery re-constructs products[]
    //this.reRenderLatestProducts(this.productSKUsArray);  // Filtered database query re-constructs latestProducts[]
    //this.rerenderLatestStockInformation(this.productSKUsArray);
  }

  /**
   * Perform a database query and retrieve all products
   * Set products: Array<Any>
   */
  public reRenderProducts() {
    this.pouch.fetch().then(result => {
      this.products = [];

      this.products = result.rows.map(function(aRow) {
        return aRow.doc;
      })

    }, error => {
      console.error(error);

    }).then(allProductsAfterRetrieve => {
      // After getting all products from the database, perform additional parsing
      this.reRenderLatestProducts(this.productSKUsArray);

    });
  }

  /**
   * GET/SET Latest Products (as in most-recent databse results)
   * @param productSKUsArray 
   */
  public reRenderLatestProducts(productSKUsArray) {

    // New method: Tries to parse the existing products array 
    let filteredResults = [];
    let availabilityResults = [];

    productSKUsArray.map(aSKU => {
      let allSKUResultsForThisProduct = this.products.filter(aProduct => aProduct.sku == aSKU);
      filteredResults.push(allSKUResultsForThisProduct[allSKUResultsForThisProduct.length-1]);
    });

    productSKUsArray.map(aSKU => {
      let availableProductEntries = this.products.filter(aProduct => 
        aProduct.orderable == 'Available' && aProduct.sku == aSKU && aProduct.onlineAvailabilityText != 'Shipping: Not Available'
      );
      
      if (availableProductEntries.length > 0) {
        availabilityResults.push(availableProductEntries[availableProductEntries.length -1]);
      }
      
    });

    this.latestProducts = filteredResults;
    this.latestAvailabilityInformation = availabilityResults;
  }

  /**
   * Get the last time the product was spotted in stock 
   * @param productSKUsArray 
   */
  public rerenderLatestStockInformation(productSKUsArray) {
    let filteredResults = [];
    this.latestAvailabilityInformation = [];

    /*
    productSKUsArray.map(aSKU => {
      this.pouch.getLastInstockBySKU(aSKU).then(productEntry => {
        this.latestAvailabilityInformation.push(productEntry);
      })
    });
    */

   // For each product in the array, 
  }

  /**
   * Test function to do an amazon page query
   */
  public testAmazonQuery() {
    this.httpService.testAmazonRequest();
  }

  

}