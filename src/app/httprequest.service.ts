import { Injectable } from '@angular/core'
import { element } from 'protractor';
import { Keys } from './keys';

@Injectable()
export class HttpRequestService {

    public htmlDocument;    // Global, set once for each http request
    public accessToken;     // Global Session ID from Salesforce, set on first call  

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
        let zotacAmp1080ti= 'https://www.amazon.com/ZOTAC-GeForce-352-bit-Graphics-ZT-P10810D-10P/dp/B06XXVVQYH';
        let zotacAmpExtreme1080ti = 'https://www.amazon.com/ZOTAC-GeForce-Extreme-Graphics-ZT-P10810F-10P/dp/B07113WJPC';
        let asusRogStrix1080ti = 'https://www.amazon.com/STRIX-GeForce-Gaming-Graphics-ROG-STRIX-GTX1080TI-11G-GAMING/dp/B06XY25VTC';
        let msiGaming1080ti = 'https://www.amazon.com/MSI-GAMING-GTX-1080-TI/dp/B06XVG7M23';
        let evgaBlackGaming1080ti = 'https://www.amazon.com/EVGA-Optimized-Interlaced-Graphics-11G-P4-6393-KR/dp/B06Y11DFZ3';
        let founders1080ti = 'https://www.amazon.com/Nvidia-GEFORCE-GTX-1080-Ti/dp/B06XH5ZCLP';
        let gigabyteAorus1080ti = 'https://www.amazon.com/Gigabyte-GeForce-Graphic-GV-N108TAORUS-X-11GD/dp/B06XXJL3HM';
        let evgaHybrid1080ti = 'https://www.amazon.com/EVGA-GeForce-HYBRID-GAMING-Technology/dp/B074D7S8HR';
        let gigabyteAorusExtreme1080ti = 'https://www.amazon.com/Gigabyte-AORUS-GeForce-Graphic-GV-N108TAORUS-11GD/dp/B06XXJL3HM';
        let gigabyteAorusGamingOc1080ti = 'https://www.amazon.com/Gigabyte-AORUS-GeForce-Graphic-GV-N108TAORUS-11GD/dp/B06XXJMDTM';
        let msiArmor1080ti = 'https://www.amazon.com/MSI-GAMING-GTX-1080-TI/dp/B06XX3S2MF';
        let msiDuke1080ti = 'https://www.amazon.com/MSI-GAMING-GTX-1080-TI/dp/B0722YBZGK';
        //let msiGamingXTrio1080ti = 'https://www.amazon.com/MSI-GAMING-GTX-1080-TI/dp/B076LWZHBK';

        let productsArray = new Array();
        productsArray.push(zotacAmp1080ti, zotacAmpExtreme1080ti, asusRogStrix1080ti, 
            msiGaming1080ti, evgaBlackGaming1080ti, founders1080ti, gigabyteAorus1080ti, evgaHybrid1080ti,
            gigabyteAorusExtreme1080ti, gigabyteAorusGamingOc1080ti, msiArmor1080ti, msiDuke1080ti
            );

        productsArray.forEach(productUrl => {
            this.amazonRequest(productUrl);
        })
        
        
    }

    public amazonRequest(amazonProductURL) {

        let productName = '';
        let productPrice = '';

        this.makeAndParseRequest(amazonProductURL).then(httpResponseText => {
            this.htmlDocument = httpResponseText; // Reset the global html DOM variable
            
            productName = this.getElementInnerText("productTitle");
            productPrice = this.getElementInnerText("priceblock_ourprice");

            let altPriceElement = this.getElementInnerText("olp_feature_div");
            let startPos = altPriceElement.indexOf('$');
            let endPos = altPriceElement.indexOf('.')+3;
            let altProductPrice = altPriceElement.substring(startPos, endPos);

            // Assume if it has an alt price, it's probably lower and should be used
            if (altProductPrice != null || altProductPrice != '') {
                productPrice = altProductPrice;
            }
            console.log('Request Complete');

        }).catch((err) => {
            if (productName != '' && productPrice == '') {
                // This product is only sold by alternative vendors, need to use a different DOM query
                let altPriceElement = this.getElementInnerText("olp_feature_div");
                let startPos = altPriceElement.indexOf('$');
                let endPos = altPriceElement.indexOf('.')+3;
                productPrice = altPriceElement.substring(startPos, endPos);
            }
        }).then(uhh => {
            // Client side validation of value:
            if (parseFloat(productPrice.replace('$','')) <= 700) {
                this.insertIntoSalesforce(productName, productPrice);
            }
            //console.log('Product: ' + productName  + '\nPrice: ' + productPrice);

        });

        

    }

    public insertIntoSalesforce(productName, productPrice) {

        this.getSFAccessToken().then(accessTokenResponse => {
            
            let accessToken = JSON.parse(accessTokenResponse)["access_token"];
            
            // Great! We have the access token, now do a REST callout
            let restEndpoint = 'https://domaindemo-dev-ed.my.salesforce.com/services/apexrest/ilem/ExampleRestResource';
            let requestBody = `{
                "productName" : "${productName}",
                "productPrice" : "${productPrice}"
            }`;

            this.doSalesforceRestCallout(accessToken, restEndpoint, requestBody).then(endpointResponse => {
                //console.log(endpointResponse);
            });

        });

    }

    /**
     * Retrieve and return a Salesforce access token (needed for API REST queries)
     */
    public getSFAccessToken() {

        if (this.accessToken == null) {

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
            this.accessToken = httpResponsePromise;
            return httpResponsePromise;
        } else {
            return this.accessToken;
        }
    }

    public doSalesforceRestCallout(accessToken, salesforceRestEndpoint, requestBody) {
        console.log(salesforceRestEndpoint);
        let httpResponsePromise = fetch(salesforceRestEndpoint, {
            method: "POST",
            body: requestBody,
            headers : {
                'Content-Type': 'application/json',
                'Charset' : 'UTF-8',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
              }
        }).then(fetchedResponse => {
            return fetchedResponse.text();
        });
        return httpResponsePromise;
    }

    /**
     * Public Utility Method - Used to retrieve inner element content of a DOM 
     * @param elementToFind 
     */
    public getElementInnerText(elementToFind) {
        return this.htmlDocument.getElementById(elementToFind).innerHTML.trim();
    }

}