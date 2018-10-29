/**
 * NewEgg Service
 * ------------------------------------------------
 * Contains service methods for processing newegg product requsts
 */
import { Injectable } from '@angular/core';
import { SimplehttpService } from './simplehttp.service';

@Injectable({
  providedIn: 'root'
})
export class NeweggService {

  constructor(private simpleHttp: SimplehttpService) {}

  public getProductFromWebsite(url: string) {

    let aProduct = {
      name: "",
      price: 0,
      origin: "NewEgg",
      url: url
    }

    let productRequestPromise = this.simpleHttp.getDom(url).then(htmlResponseDOM => {
      let productName = htmlResponseDOM.querySelector('[id*="grpDescrip_"]').firstElementChild.innerHTML.trim();
      let priceText = htmlResponseDOM.querySelector('[itemprop="price"]').getAttribute("content");
      let productPrice = parseFloat(priceText);

      aProduct.name = productName;
      aProduct.price = productPrice;

      return aProduct;
    }).catch(err => {
      console.log(err);
    });

    return productRequestPromise;

  }

}
