/**
 * Salesforce Service
 * ------------------------------------------------
 * Contains methods for generating a client access token and making REST API calls to Salesforce
 * 
 */
import { Injectable } from '@angular/core';
import { Keys } from './keys';

@Injectable({
  providedIn: 'root'
})
export class SalesforceService {

  public accessToken;
  public salesforceRestEndpoint = 'https://domaindemo-dev-ed.my.salesforce.com/services/apexrest/ilem/ExampleRestResource';

  constructor(private keys: Keys) { }

  /* Do a special POST callout with the salesforce access token */
  public doSalesforceRestCallout(requestBody) {

    // First get the access token 
    this.getSFAccessToken().then(accessTokenResponse => {

      let sfAccessToken = JSON.parse(accessTokenResponse)["access_token"];
      
      // After retrieving access token (either previously stored, or newly created) make the REST callout
      let salesforceRESTPromise = fetch(this.salesforceRestEndpoint, {  // Global variable endpoint
        method: "POST",
        body: requestBody,
        headers : {
            'Content-Type': 'application/json',
            'Charset' : 'UTF-8',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${sfAccessToken}`
        }
      }).then(fetchedResponse => {
        //console.log(fetchedResponse);
        return fetchedResponse.text();
      }).catch((err) => {
        console.log(err);
      });
      return salesforceRESTPromise;
    });
  }

    /* UTILITY: Retrieve and return a Salesforce access token (needed for API REST queries) */
    public getSFAccessToken() {
      if (this.accessToken == null) {
        console.log('Access token was null');
  
        let clientId = this.keys.getClientId();
        let clientSecret = this.keys.getClientSecret();
        let tokenURL = 'https://domaindemo-dev-ed.my.salesforce.com/services/oauth2/token';
        let username = this.keys.getSalesforceUsername();
        let password = this.keys.getSalesforcePassword();
        let securityToken = this.keys.getSalesforceSecurityToken();
  
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
        }).catch((err) => {
          console.log(err);
        });
        this.accessToken = httpResponsePromise;
        return httpResponsePromise;
      } else {
          return this.accessToken;
      }
    }

}
