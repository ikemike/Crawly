/**
 * EVGA Service
 * ------------------------------------------------
 * Contains service methods for processing EVGA's website product requsts
 */
import { Injectable } from '@angular/core';
import { SimplehttpService } from './simplehttp.service';

@Injectable({
  providedIn: 'root'
})
export class EvgaService {

  constructor(private simpleHttp: SimplehttpService) {}

  public getProductFromWebsite(url: string) {

    let aProduct = {
      name: "",
      price: 0,
      origin: "EVGA",
      url: url,
      available: null
    }

    let productRequestPromise = this.simpleHttp.getDom(url).then(htmlResponseDOM => {
      let productName = htmlResponseDOM.querySelector('[class*="product-name"]').innerHTML.trim();
      let priceText = htmlResponseDOM.querySelector('[class="price"]').firstElementChild.innerHTML.trim();
      let productPrice = parseFloat(priceText);
      let productAvailable = htmlResponseDOM.querySelector('[class="btnBigAutoNotify"]') === null ? true : false;

      aProduct.name = productName;
      aProduct.price = productPrice;
      aProduct.available = productAvailable;
 
      return aProduct;
    }).catch(err => {
      console.log(err);
    });

    return productRequestPromise;

  }

}
