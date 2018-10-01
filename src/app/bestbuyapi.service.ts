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
        let productInformation = {};
        //let url = "https://api.bestbuy.com/v1/products/" + productSKU + ".json" + "?apiKey=" + this.serv_k;
        let url = "http://localhost:4200/";

        const http = new XMLHttpRequest();
        http.open("GET", url);
        http.send();

        http.onreadystatechange = (e) => {
        if (http.readyState == 4 && http.status == 200) {
            //let resp = JSON.parse(http.responseText);
            let resp = JSON.parse(`{"name":"gpu product 1", "orderable":"false"}`);

            // Construct a product object
            productInformation = this.constructProductFromResponse(resp);
            return productInformation;

            } else {
                productInformation = this.constructProductFromResponse("na");
                return productInformation;
            }
       }
    }

    getProductInformationViaFetch(productSKU: string) {
        let url = "http://localhost:4200/";
        let resp = JSON.parse(`{"name":"gpu product 1", "orderable":"false"}`);


        
        fetch(url)
        .then(data => { return 'test' })
        .then(res=>{ return 'test' })
        
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

        console.log(product);
        return product;
    }

}