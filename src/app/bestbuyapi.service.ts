import { Injectable } from '@angular/core'
import { Keys } from './keys';

@Injectable() 
export class BestBuyAPIService {
    
    private isInstantiated: boolean;
    private serv_k: string;

    public constructor() {
        if (!this.isInstantiated) {
            this.serv_k = new Keys().getBBApiKey();
            this.isInstantiated = true;
        } 
    }

    /**
     * Get and return product information via an HTTP request
     * @param productSKU The product's SKU number
     */
    getProductInformationViaFetch(productSKU: string) {
        let url = "https://api.bestbuy.com/v1/products/" + productSKU + ".json" + "?apiKey=" + this.serv_k;
        //let url = "http://localhost:4200/";
        return fetch(url);
    }

    getMultipleProductsViaFetch(productSKUsString: string) {
        let url = `https://api.bestbuy.com/v1/products(sku in ( ${ productSKUsString }?apiKey=${ this.serv_k }`;
    }

    /**
     * Attempt at retriving and parsing in one method
     * @param productSKU The Product SKU as a string
     */
    getAndConstructProduct(productSKU: string) {
       
        let url = "https://api.bestbuy.com/v1/products/" + productSKU + ".json" + "?apiKey=" + this.serv_k;

        let constructedProductPromise = fetch(url).then(fetchedResponse => {
            // Perform an HTTP request
            return fetchedResponse.json();
        }).then(responseJSON => {
            // After the HTTP request is complete, parse the data
            let constructedProductFromJSON = this.constructProductFromResponse(responseJSON);
            return constructedProductFromJSON;
        });
        return constructedProductPromise;
    }

    /**
     * Construct Multiple new Products from a String of SKUs (comma separated)
     * @param productSKUsString The Product SKUs as a string
     * @return                  An array of objects (products)
     */
    getAndConstructMultipleProducts(productSKUsString: string) {
        let url = `https://api.bestbuy.com/v1/products(sku in (${ productSKUsString }))?apiKey=${ this.serv_k }&format=json`;
        let products = [];
        let constructedProductsPromise = fetch(url).then(fetchedResponse => {

            // Perform an HTTP request - On complete, return JSON
            return fetchedResponse.json();
            
        }).then(responseJSON => {
            
            // Parse JSON by breaking each product down into a singular entry
            let i = "";
            for (i in responseJSON.products) {
                products.push(this.constructProductFromResponse(responseJSON.products[i]));     
            }
            return products;
        });
        return constructedProductsPromise;
    }

    

    /**
     * Constructs a "Product" object from the returned JSON
     */
    constructProductFromResponse(resp: any) {
        let id = new Date().toISOString() + resp.sku;
        let product = {
            "_id": id,
            "name": resp.name,  
            "orderable": resp.orderable,
            "regularPrice": resp.regularPrice,
            "salePrice": resp.salePrice,
            "activeUpdateDate": resp.activeUpdateDate,
            "inStorePickup": resp.inStorePickup,
            "inStoreAvailability": resp.inStoreAvailability,
            "inStoreAvailabilityUpdateDate": resp.inStoreAvailabilityUpdateDate,
            "itemUpdateDate": resp.itemUpdateDate,
            "onlineAvailability": resp.onlineAvailability,
            "onlineAvailabilityText": resp.onlineAvailabilityText,
            "onlineAvailabilityUpdateDate": resp.onlineAvailabilityUpdateDate,
            "priceUpdateDate": resp.priceUpdateDate,
            "startDate": resp.startDate,
            "addToCartUrl": resp.addToCartUrl,
            "alternateViewsImage": resp.alternateViewsImage,
            "sku": resp.sku
        };

        return product;
    }

}