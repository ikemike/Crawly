import { Injectable } from '@angular/core'

@Injectable()
export class HttpRequestService {

    public constructor() {}

    public makeHTTPRequestReturnResponse(url: string) {
        let httpResponsePromise = fetch(url, {
          redirect: 'follow',
          headers : {
            'Content-Type': 'text/plain'
          }
        }).then(fetchedResponse => {
          return fetchedResponse.text();
        });
        return httpResponsePromise;
      }


    public parseHTTPResponseToJSON() {
        let url = 'https://www.newegg.com';
        let regexDollarPattern =  new RegExp('^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$'); // 1.00, 1,000, 1,500.50 valid 
        this.makeHTTPRequestReturnResponse(url).then(httpResponseText => {

            // Construct a Document 
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(httpResponseText, "text/html");

            // Parse the document to find product nodes
            let aProductElements = Array.from(htmlDocument.querySelectorAll("a"))
                .filter(a => a.textContent.includes("GIGABYTE")); // <= Product name would go here 
            console.log(aProductElements);


            // START ------------- Singular example (working)

            let elementParent = aProductElements[0].parentElement; // Should be div.item-info
            console.log(elementParent);

            // Find the associated price for this product
            
            let childElementsContainingPriceInfo = Array.from(elementParent.querySelectorAll("*"))
                .filter(elem => elem.textContent.includes("$"));
            console.log(childElementsContainingPriceInfo[0].textContent);

            let regexedPriceString = childElementsContainingPriceInfo[0].textContent.replace(/[^0-9.]/g,'');
            console.log(regexedPriceString);


            console.log('The query results are:');
            console.log(aProductElements[0].textContent);
            console.log(regexedPriceString);

            // END ------------- Singular example (working)



            // Version 2.0 Separate into two different arrays (or construct JSON)
            // For each product element, put the product name into a list 
            let productNames = aProductElements.map(aProductElement => {
                return aProductElement.textContent;
            })
            console.log(productNames);

            // Now, get the associated parent element for each, and then do a filter for the $
            let parentParentElements = new Array();


            aProductElements.map(aProductElement => {
                // For each product element, save the parent node 
                parentParentElements.push(aProductElement.parentElement);
            });
            console.log(parentParentElements);
            
            // From the parent product nodes, find the dollar figures
            parentParentElements.map(aParentParentElement => {

                // For each Parent-Parent node:
                let priceText = Array.from(aParentParentElement.querySelectorAll("*"))
                    //.filter(elem => elem.textContent.includes("$"));


                
            });

        });
    }
}