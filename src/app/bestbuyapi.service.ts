import { Injectable } from '@angular/core'

@Injectable() 
export class BestBuyAPIService {
    
    private isInstantiated: boolean;
    private serv_k: string;

    public constructor() {
        if (!this.isInstantiated) {
            this.serv_k = 'serv_k';
            this.isInstantiated = true;
        } 
    }

    /**
     * Get and return product information via an HTTP request
     */
    getProductInformation(productSKU: string) { 
        let url = "https://api.bestbuy.com/v1/products/" + productSKU + ".json" + "?apiKey=" + this.serv_k;

        const Http = new XMLHttpRequest();
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            let resp = JSON.parse(Http.responseText);

            // Construct a product object
            let retrievedProduct = this.constructProductFromResponse(resp);

            // Return the new object
            return retrievedProduct;
            } else {
                return this.constructProductFromResponse("na");
            }
       }
    }

    /**
     * Constructs a "Product" object from the returned JSON
     */
    constructProductFromResponse(resp: string) {
        let product = {
            "id": new Date().toISOString(),
            "name": "",  
            "orderable": "",
            "regularPrice": "",
            "salePrice": "",
            "activeUpdateDate": "",
            "inStorePickup": "",
            "inStoreAvailability": "",
            "inStoreAvailabilityUpdateDate": "",
            "itemUpdateDate": "",
            "onlineAvailability": "",
            "onlineAvailabilityText": "",
            "onlineAvailabilityUpdateDate": "",
            "priceUpdateDate": "",
            "startDate": "",
            "addToCartUrl": ""
        };

        /*
        console.log('Active Update Date ' + resp.activeUpdateDate);
        console.log('In Store Availability Update ' + resp.inStoreAvailabilityUpdateDate);
        console.log('Item Update Date ' + resp.itemUpdateDate);
        console.log('Online Availability Update Date ' + resp.onlineAvailabilityUpdateDate);
        console.log('Price Update Date ' + resp.priceUpdateDate);
        */

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

        return product;
    }

}