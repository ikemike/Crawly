/**
 * @description:    API utility/helper interface for best buy
 * 
 */
export class BestBuyAPIUtil {

    apiKey: string;

    
    constructor() {
        fetch('/assets/private/BestBuyAPIKey.txt')
            .then(response => response.text())
            .then(text => console.log(text));
    } 

    getProductInformation(product: string) { 
        console.log('Making request to BB API...');

        console.log('test');
    }



}