import { Component } from '@angular/core';
import { BestBuyAPIUtil } from './bbApiUtil';
import { TaffyUtil } from './taffyutil';
import { PouchUtil } from './pouchutil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

function getProducts() {
  let pouch = new PouchUtil();
  pouch.setupDatabase();
  pouch.addProductQueryResultToDB('test product 1', 'available', 1200);
  return pouch.showAllProducts();
}
export class AppComponent {
  title = 'Crawly';
  productsDatabaseString = getProducts();
}

// Main application logic 
let bb = new BestBuyAPIUtil();
//bb.getProductInformation('6291646'); // Works fine! Just make sure bb.keys is setup

//let taffyUtil = new TaffyUtil();
//taffyUtil.testFunction();

// First attemp at PouchDB
//let pouch = new PouchUtil();
//pouch.setupDatabase();
//pouch.addProductQueryResultToDB('test product 1', 'available', 1200);
//pouch.showAllProducts();




// Get page text for product to search for

// Make API request

// Return API results 


