import { Keys } from './keys';
/**
 * @description:    API utility/helper interface for best buy
 * 
 */
export class BestBuyAPIUtil {

    apiKey: string;

     
    constructor() {

        this.apiKey = new Keys().getBBApiKey();
        /*
        fetch('/assets/private/BestBuyAPIKey.txt')
            .then(response => response.text())
            .then(data => this.apiKey = data)
        */     
        
    } 

    getProductInformation(productSKU: string) { 
        const Http = new XMLHttpRequest();
        const apiKeyString = "?apiKey=" + this.apiKey;

        let url = "https://api.bestbuy.com/v1/products/" + productSKU + ".json" + apiKeyString;

        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            let resp = JSON.parse(Http.responseText);


            console.log(resp);
            console.log('Active Update Date ' + resp.activeUpdateDate);
            console.log('In Store Availability Update ' + resp.inStoreAvailabilityUpdateDate);
            console.log('Item Update Date ' + resp.itemUpdateDate);
            console.log('Online Availability Update Date ' + resp.onlineAvailabilityUpdateDate);
            console.log('Price Update Date ' + resp.priceUpdateDate);
 

            /*
              inStoreAvailability
               inStorePickup
               onlineAvailability: false
                onlineAvailabilityText: "Shipping: Not Available"
                onlineAvailabilityUpdateDate: "2018-09-24T17:40:13"
                orderable: "SoldOut"
                regularPrice: 1199.99
                salePrice: 1199.99
                startDate: "2018-08-20"
                addToCartUrl: "https://api.bestbuy.com/click/-/6291646/cart"
             */
           }  
       }
    }



}