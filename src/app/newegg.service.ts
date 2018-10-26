/**
 * NewEgg Service
 * ------------------------------------------------
 * Contains methods for making and parsing HTTP GET requests to newegg for product information
 * 
 */
import { Injectable } from '@angular/core';
import { SalesforceService } from './salesforce.service';

@Injectable({
  providedIn: 'root'
})
export class NeweggService {

  constructor(private sfService: SalesforceService) { }

  /* Utility: Makes a single page HTTP request and then parses the response into an HTML document */
  public makeHTTPRequestReturnResponseDOM(url: string) {
    let httpResponsePromise = fetch(url, {
      redirect: 'follow',
      headers : {
        'Content-Type': 'text/plain'
      }
    }).then(fetchedResponse => {
      return fetchedResponse.text();
    }).then(fetchedResolvedPromise => {
      return new DOMParser().parseFromString(fetchedResolvedPromise, "text/html");
    });
    return httpResponsePromise;
  }

  /* Make a single newegg page product request and get the product name and price */
  public getNeweggProductDetails(url: string) {
    let httpRequestedDOM = this.makeHTTPRequestReturnResponseDOM(url).then(htmlResponseDOM => {
      let productName = htmlResponseDOM.querySelector('[itemprop="price"]').getAttribute("content");
      let productPrice = htmlResponseDOM.querySelector('[id*="grpDescrip_"]').firstElementChild.innerHTML.trim();

      console.log(productName);
      console.log(productPrice);
      let testJSONresponse = `{
        "products" : [
            { "name" : "test product 1", "price" : "100", "origin" : "newegg" },
            { "name" : "test product 2", "price" : "200", "origin" : "amazon" }
        ]
      }`;

      this.sfService.doSalesforceRestCallout(testJSONresponse);
    });
  }

  /* MAIN */
  public testNeweggServiceClass() {
    this.getNeweggProductDetails('https://www.newegg.com/Product/Product.aspx?Item=N82E16814125955&cm_re=1080ti-_-14-125-955-_-Product');
  }

}