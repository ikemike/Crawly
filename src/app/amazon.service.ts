/**
 * Amazon Service 
 * ------------------------------------------------
 * Contains service methods for calling amazon 
 */
import { Injectable } from '@angular/core';
import { SimplehttpService } from './simplehttp.service';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {

  constructor(private simpleHttp: SimplehttpService) {}

  public getProductFromWebsite(url: string) {

    let aProduct = {
      name: "",
      price: 0,
      origin: "Amazon",
      url: url
    }

    let httpRequestedDOM = this.simpleHttp.getDom(url).then(htmlResponseDOM => {
      let productName = htmlResponseDOM.querySelector('[id="productTitle"]').innerHTML.trim();
      let priceText = htmlResponseDOM.querySelector('[id="olp_feature_div"]').innerHTML.trim();
      let productPrice = parseFloat(priceText.substring(priceText.indexOf('$')+1, priceText.indexOf('.')+3));

      aProduct.name = productName;
      aProduct.price = productPrice;
    });

    return aProduct;
  }

}
