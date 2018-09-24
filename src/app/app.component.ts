import { Component } from '@angular/core';
import { BestBuyAPIUtil } from './bbApiUtil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crawly';


  // Where do I put this?
  //let cheerio = require('cheerio');
  //let myData = cheerio.load('google.com');
  //console.log(myData);
}

// Main application logic 
let bb = new BestBuyAPIUtil();
bb.getProductInformation('test');



// Get page text for product to search for

// Make API request

// Return API results 


