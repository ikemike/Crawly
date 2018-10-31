/**
 * Ebay Service
 * ------------------------------------------------
 * Contains service methods for processing ebay product requests
 */
import { Injectable } from '@angular/core';
import { SimplehttpService } from './simplehttp.service';

@Injectable({
  providedIn: 'root'
})
export class EbayService {

  public products;

  constructor(private simpleHttp: SimplehttpService) {}

  public getProductsFromWebsite(url: string) {

    this.products = [];
    
    let ebayServicePromise = this.simpleHttp.getDom(url).then(htmlResponseDOM => {
      
      let allListings = htmlResponseDOM.querySelectorAll('li[class*="s-item"]');
      console.log(allListings.length);

      
      allListings.forEach(aListing => {
        var aProduct = {name: "",price: 0,origin: "Ebay",url: ""};

        let productName = aListing.querySelector('[class="s-item__title"]').textContent.replace('New Listing','');
        let productPrice = parseFloat(aListing.querySelector('[class="s-item__price"]').textContent.replace('$',''));
        let shipTxt = aListing.querySelector('[class="s-item__shipping s-item__logisticsCost"]').textContent;
        let shipTxtParsed = shipTxt.substring(shipTxt.indexOf('$')+1, shipTxt.indexOf(' '));
        productPrice += shipTxtParsed != "Free" ? parseFloat(shipTxtParsed) : 0;
        let productUrl = aListing.querySelector('[class="s-item__link"]').getAttribute('href');
        
        aProduct.name = productName; 
        aProduct.price = productPrice;
        aProduct.url = productUrl;

        let matchingProducts = this.products.filter(anItem => {return anItem.url == aProduct.url;})
       

        let urlDifference = 0;

        // Filter out intrusive products that aren't 1080 tis or are duplicates
        if (!productName.includes('Water Block') && productName.includes('1080') 
          && !productName.includes('backplate') && matchingProducts.length == 0) {
          this.products.push(aProduct);
        }     
      });
      
      return this.products;

    }).catch(err => {
      console.log(err);
    });
    return ebayServicePromise;
  }

}
