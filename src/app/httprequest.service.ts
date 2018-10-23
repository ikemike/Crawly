import { Injectable } from '@angular/core'
import { element } from 'protractor';
import { Keys } from './keys';

@Injectable()
export class HttpRequestService {

    public htmlDocument; // Global, set once for each http request

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

    /**
     * Makes a single page HTTP request and then parses the response into an HTML document 
     */
    public makeAndParseRequest(url) {
        let httpRequestAndParsePromise = this.makeHTTPRequestReturnResponse(url).then(httpResponseText => {
            // Construct a Document 
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(httpResponseText, "text/html");
            return htmlDocument;
        });
        return httpRequestAndParsePromise;
    }


    public newEggRequest() {
        let url = 'https://www.newegg.com/Product/Product.aspx?Item=14-932-067&cm_re=rtx%202080-_-14-932-067-_-Product&cm_sp=SearchSuccess-_-INFOCARD-_-rtx%202080ti-_-14-932-067-_-2';
        this.makeAndParseRequest(url).then(htmlDocument => {
            let buttonElements = Array.from(htmlDocument.querySelectorAll("button"));
            
            for (let i = 0; i < buttonElements.length; i++) { }
            // If buy element is still null, double check that it's not an inner button component like a <span>Buy Now</span>

            //let theButtonElement = buttonElements.filter(elem => elem.className = "btn btn-primary btn-wide");
            //console.log(theButtonElement);

            //console.log(buttonElements);
            let matchingElements; 

            if (buttonElements.length > 0) {
                for (let i = 0; i < buttonElements.length; i++) {
                    let childNodes = buttonElements[i].childNodes;
                    console.log(childNodes);
                    let buttonChildElements = Array.from(buttonElements[i].querySelectorAll("*"))
                        //.filter(elem => elem.textContent.includes("Add to Cart"));
                        //console.log(buttonChildElements);
                }
                
                

                /*
                // buttonElements is an array, so loop through all elements and find inner content
                for (let i = 0; i < buttonElements.length; i++) {
                    let elementChildNodes = buttonElements[i].children;
                    for (let j = 0; j < elementChildNodes.length; j++) {
                        let childNodeText = Array.from(elementChildNodes[j].querySelectorAll("*"))
                            .filter(elem => elem.textContent.includes("Buy now") 
                            || elem.textContent.includes("Add to cart"));

                        matchingElements.push(elementChildNodes[j]);
                    }
                }
                */
            }
            console.log('matching elements: ');
            console.log(matchingElements);
           

            // Debug:
            //console.log('All button elements: ');
            //console.log(buttonElements);

        })
    }
    

    


    public parseHTTPResponseToJSON() {
        let url = 'https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=rtx+2080ti&N=-1&isNodeId=1';
        let regexDollarPattern =  new RegExp('^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$'); // 1.00, 1,000, 1,500.50 valid 
        this.makeHTTPRequestReturnResponse(url).then(httpResponseText => {

            // Construct a Document 
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(httpResponseText, "text/html");

            // Parse the document to find product nodes
            let aProductElements = Array.from(htmlDocument.querySelectorAll("a"))
                .filter(a => a.textContent.includes("EVGA")); // <= Product name would go here 
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

    public testAmazonRequest() {
        let msi1080tiURL = 'https://www.amazon.com/MSI-GAMING-GTX-1080-TI/dp/B06XVG7M23';
        this.makeAndParseRequest(msi1080tiURL).then(httpResponseText => {

            this.htmlDocument = httpResponseText; // Reset the global html DOM variable

            let productTitle = this.getElementInnerText("productTitle");
            let priceInformation = this.getElementInnerText("priceblock_ourprice");
            
            console.log(productTitle);
            console.log(priceInformation);

            // Awesome! Now try to insert it into Salesforce! 
            this.doASalesforceRequest();

        });
    }

    public doASalesforceRequest() {
        this.getSFAccessToken().then(fetchedResponse => {
            
            let salesforceAccessToken = JSON.parse(fetchedResponse)["access_token"];
            
            // Great! We have the access token, now do a REST callout
            this.doSalesforceRestCallout(salesforceAccessToken);

        });

        let mytestjson = `
            {
                "agreementId" : "a3o0y0000016Jv8AAE",
                "proposalNumber" : "141588C-5",
                "studyNumber" : "8348-993",
                "modNumber" : "5"
            }
            `;
        let salesforceEndpoint = '';
        /*
        let httpResponsePromise = fetch(salesforceEndpoint, {
            redirect: 'follow',
            headers : {
              'Content-Type': 'application/json',
              'charset' : 'UTF-8',
              'Accept' : 'application/json'
            }
          }).then(fetchedResponse => {
            return fetchedResponse.text();
          });
          */
    }

    /**
     * Retrieve and return a Salesforce access token (needed for API REST queries)
     */
    public getSFAccessToken() {
        let clientId = new Keys().getClientId();
        let clientSecret = new Keys().getClientSecret();
        let tokenURL = 'https://domaindemo-dev-ed.my.salesforce.com/services/oauth2/token';
        let username = new Keys().getSalesforceUsername();
        let password = new Keys().getSalesforcePassword();
        let securityToken = new Keys().getSalesforceSecurityToken();

        let requestBody = `grant_type=password&client_id=${clientId}&client_secret=${clientSecret}&username=${username}&password=${password}${securityToken}`;

        let httpResponsePromise = fetch(tokenURL, {
            redirect: 'follow',
            method: "POST",
            body: requestBody,
            headers : {
              "Content-Type": "application/x-www-form-urlencoded",
            }
          }).then(fetchedResponse => {
            return fetchedResponse.text();
          });
          return httpResponsePromise;
    }

    public doSalesforceRestCallout(accessToken) {
        
    }

    /**
     * Public Utility Method - Used to retrieve inner element content of a DOM 
     * @param elementToFind 
     */
    public getElementInnerText(elementToFind) {
        return this.htmlDocument.getElementById(elementToFind).innerHTML.trim();
    }
}